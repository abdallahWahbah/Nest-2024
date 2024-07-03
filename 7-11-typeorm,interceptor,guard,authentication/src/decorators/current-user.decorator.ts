import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => { // "never" meanse it's not possible to pass arguments to this decorator
        const request = context.switchToHttp().getRequest();

        return request.currentUser
    }
)