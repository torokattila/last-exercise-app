import { getDatabaseConfig } from './database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

describe('getDatabaseConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment variables after each test
    process.env = originalEnv;
  });

  it('should return default configuration when no environment variables are set', () => {
    delete process.env.POSTGRES_HOST;
    delete process.env.POSTGRES_PORT;
    delete process.env.POSTGRES_USER;
    delete process.env.POSTGRES_PASSWORD;
    delete process.env.POSTGRES_DB;

    const config: TypeOrmModuleOptions = getDatabaseConfig();

    expect(config).toEqual({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    });
  });

  it('should return configuration based on environment variables', () => {
    process.env.POSTGRES_HOST = 'custom-host';
    process.env.POSTGRES_PORT = '1234';
    process.env.POSTGRES_USER = 'custom-user';
    process.env.POSTGRES_PASSWORD = 'custom-password';
    process.env.POSTGRES_DB = 'custom-db';

    const config: TypeOrmModuleOptions = getDatabaseConfig();

    expect(config).toEqual({
      type: 'postgres',
      host: 'custom-host',
      port: 1234,
      username: 'custom-user',
      password: 'custom-password',
      database: 'custom-db',
      autoLoadEntities: true,
      synchronize: true,
    });
  });

  it('should handle invalid POSTGRES_PORT gracefully', () => {
    process.env.POSTGRES_PORT = 'invalid-port';

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      port: number;
    };

    expect(config.port).toBeNaN(); // Invalid port should result in NaN
  });

  it('should handle missing POSTGRES_PORT gracefully', () => {
    delete process.env.POSTGRES_PORT;

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      port: number;
    };

    expect(config.port).toBe(5432); // Default port should be used
  });

  it('should handle missing POSTGRES_HOST gracefully', () => {
    delete process.env.POSTGRES_HOST;

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      host: string;
    };

    expect(config.host).toBe('localhost'); // Default host should be used
  });

  it('should handle missing POSTGRES_USER gracefully', () => {
    delete process.env.POSTGRES_USER;

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      username: string;
    };

    expect(config.username).toBe('postgres'); // Default username should be used
  });

  it('should handle missing POSTGRES_PASSWORD gracefully', () => {
    delete process.env.POSTGRES_PASSWORD;

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      password: string;
    };

    expect(config.password).toBe('postgres'); // Default password should be used
  });

  it('should handle missing POSTGRES_DB gracefully', () => {
    delete process.env.POSTGRES_DB;

    const config = getDatabaseConfig() as TypeOrmModuleOptions & {
      database: string;
    };

    expect(config.database).toBe('postgres'); // Default database should be used
  });
});
