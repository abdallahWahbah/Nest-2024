import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

// interceptor is used to change ongoing data or response
// we made this interceptor to exclude password from response when we get user data
export class SerializeInterceptor implements NestInterceptor
{
    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> 
    {
        // Run run code before a request is handeled by the request handler (modify request)
        // console.log("I am running before the handler", context)

        // change response
        return handler.handle().pipe(
            map((data: any) => {
                // Run something before response is sent out
                // console.log("I am running before response is sent out", data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}