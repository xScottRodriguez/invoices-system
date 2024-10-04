import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// get user decorator
type TGetUserType = (...dataOrPipes: any[]) => ParameterDecorator;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): TGetUserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
