/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/naming-convention */

import { applyDecorators, SetMetadata } from '@nestjs/common';

import { Action } from '../../../enums/action.enum';
type TCheckActionAndResource = <TFunction extends Function, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
/**
 * Decorador para establecer la acción y el recurso en el controlador o método del controlador
 * Este decorador agrega la acción y el recurso a los metadatos del endpoint.
 */
export const CheckActionAndResource = (
  action: Action,
  resource: string,
): TCheckActionAndResource => {
  return applyDecorators(
    SetMetadata('action', action),
    SetMetadata('resource', resource),
  );
};
