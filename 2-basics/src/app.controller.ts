import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController
{
    @Get("/hello")
    getRootRoute()
    {
        return "Hello Hello!"
    }

    @Get("bye")
    sayBye()
    {
        return "Sorry to leave"
    }
}