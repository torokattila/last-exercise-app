import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

const mockApp = {
  useGlobalPipes: jest.fn(),
  enableCors: jest.fn(),
  listen: jest.fn(),
};

describe('Bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('should bootstrap the application without errors', async () => {
    const { bootstrap } = await import('./main');
    await expect(bootstrap()).resolves.not.toThrow();

    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.any(ValidationPipe),
    );
    expect(mockApp.enableCors).toHaveBeenCalled();
    expect(mockApp.listen).toHaveBeenCalled();
  });

  it('should log an error if bootstrap fails', async () => {
    const error = new Error('Bootstrap error');
    (NestFactory.create as jest.Mock).mockRejectedValue(error);

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { bootstrap } = await import('./main');

    await expect(bootstrap()).rejects.toThrow('Bootstrap error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error during application bootstrap:',
      error,
    );

    consoleErrorSpy.mockRestore();
  });
});
