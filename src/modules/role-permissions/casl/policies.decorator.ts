/* eslint-disable @typescript-eslint/naming-convention */

import { CustomDecorator, SetMetadata } from '@nestjs/common';

// export const CHECK_POLICIES_KEY = 'check_policy';
// export type PolicyHandler = (...args: any[]) => boolean;

// export const CheckPolicies = (
//   ...handlers: PolicyHandler[]
// ): CustomDecorator<string> => SetMetadata(CHECK_POLICIES_KEY, handlers);

import { Action } from './action.enum';

/**
 * Decorador para establecer la acción y el recurso en el controlador o método del controlador
 * Este decorador agrega la acción y el recurso a los metadatos del endpoint.
 */
export const CheckActionAndResource = (
  action: Action,
  resource: string,
): CustomDecorator<string> =>
  SetMetadata('action', action) && SetMetadata('resource', resource);
