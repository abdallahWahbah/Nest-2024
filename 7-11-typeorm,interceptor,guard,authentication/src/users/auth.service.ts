import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService
{
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string)
    {
        // see if email is in use
        const users = await this.usersService.find(email);
        if(users.length) throw new BadRequestException("User is used")

        // Hashing password
        const salt = randomBytes(8).toString("hex");
        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
        const hashedPasswordWithSalt = salt + "." + hashedPassword.toString("hex");

        // create a user and save it
        const user = await this.usersService.create(email, hashedPasswordWithSalt);

        return user;
    }

    async signin(email: string, password: string)
    {
        const [user] = await this.usersService.find(email);
        if(!user) throw new NotFoundException("User Not Found");

        const [salt, storedHash] = user.password.split(".")
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString("hex")) throw new BadRequestException("Bad Password")
        return user;
    }
}