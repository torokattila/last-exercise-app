import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function Match<T>(
  property: keyof T,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    if (!object || typeof object !== 'object') {
      throw new Error('Invalid object provided for Match decorator.');
    }

    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as [keyof T];
          const relatedValue =
            typeof args.object === 'object' && args.object !== null
              ? (args.object as Record<string, unknown>)[
                  relatedPropertyName as string
                ]
              : undefined;

          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must match ${args.constraints[0]}`;
        },
      },
    });
  };
}
