import { validate } from 'class-validator';
import { Match } from './match.validator';

class TestDto {
  @Match<TestDto>('relatedProperty', { message: 'Values must match' })
  property?: string;

  relatedProperty?: string;
}

describe('Match Validator', () => {
  let dto: TestDto;

  beforeEach(() => {
    dto = new TestDto();
  });

  it('should pass validation when properties match', async () => {
    dto.property = 'testValue';
    dto.relatedProperty = 'testValue';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation when properties do not match', async () => {
    dto.property = 'testValue';
    dto.relatedProperty = 'differentValue';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('Match');
    expect(errors[0].constraints?.Match).toBe('Values must match');
  });

  it('should fail validation when related property is missing', async () => {
    dto.property = 'testValue';
    dto.relatedProperty = undefined;

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('Match');
    expect(errors[0].constraints?.Match).toBe('Values must match');
  });

  it('should fail validation when target property is missing', async () => {
    dto.property = undefined;
    dto.relatedProperty = 'testValue';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('Match');
    expect(errors[0].constraints?.Match).toBe('Values must match');
  });

  it('should fail validation when values are of different types', async () => {
    dto.property = '123'; // string
    dto.relatedProperty = 123 as unknown as string; // number

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('Match');
    expect(errors[0].constraints?.Match).toBe('Values must match');
  });

  it('should return the default error message when no custom message is provided', async () => {
    class DefaultMessageDto {
      @Match<DefaultMessageDto>('relatedProperty')
      property: string;

      relatedProperty: string;
    }

    const defaultDto = new DefaultMessageDto();
    defaultDto.property = 'testValue';
    defaultDto.relatedProperty = 'differentValue';

    const errors = await validate(defaultDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('Match');
    expect(errors[0].constraints?.Match).toBe(
      'property must match relatedProperty',
    );
  });

  it('should throw an error if an invalid object is provided', () => {
    expect(() => {
      Match<any>('relatedProperty', { message: 'Values must match' })(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        null as any,
        'property',
      );
    }).toThrow('Invalid object provided for Match decorator.');
  });
});
