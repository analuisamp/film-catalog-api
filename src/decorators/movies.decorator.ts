import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const Movie = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (request.movie) {
    return request.movie;
  } else {
    throw new NotFoundException ("Movie not found in the request. Use AuthGuard to retrieve the movie.")
  }
})
