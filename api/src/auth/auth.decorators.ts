import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlGetCurrentUser = createParamDecorator(
  (_, context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req.user,
);

export const GqlGetCookies = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;
    return key ? request.cookies?.[key] : request.cookies;
  },
);
