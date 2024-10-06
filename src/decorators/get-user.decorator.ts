import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// get user decorator
type TGetUserType = (...dataOrPipes: any[]) => ParameterDecorator;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): TGetUserType => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
