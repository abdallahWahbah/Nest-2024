import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@UseInterceptors(new SerializeInterceptor(UserDto)) 
// we put it here to use it for all http requests in this controller not only @Get("/:id")
// or you can copy and paste it for all requests which is baaaaaaad
export class UsersController {

    constructor(private userService: UsersService,
                private authService: AuthService
    ){}

    // BASICS OF SESSION
    // @Get("/colors/:color")
    // setColor(@Param("color") color: string, @Session() session: any)
    // {
    //     session.color = color
    // }
    // @Get("/colors")
    // getColor(@Session() session: any)
    // {
    //     return session.color;
    // }

    // @Get("/whoami")
    // whoAmI(@Session() session: any)
    // {
    //     return this.userService.findOne(session.userId);
    // }

    @Get("/whoami")
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User)
    {
        return user;
    }

    @Post("/signout")
    signout(@Session() session: any)
    {
        session.userId = null;
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any)
    {
        const user =await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post("/signin")
    async signin(@Body() body: CreateUserDto, @Session() session: any)
    {
        const user =await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto)) // to exclude password from response
    @Get("/:id")
    async findUser(@Param("id") id: string)
    {
        const user = await this.userService.findOne(+id)
        if(!user) throw new NotFoundException("User Not Found");
        return user;
    }

    @Get()
    findAllUsers(@Query("email") email: string)
    {
        return this.userService.find(email)
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string)
    {
        return this.userService.remove(+id)
    }
    
    @Patch("/:id")
    updateUser( @Param("id") id: string, @Body() body: UpdateUserDto)
    {
        return this.userService.update(+id, body)
    }
}
