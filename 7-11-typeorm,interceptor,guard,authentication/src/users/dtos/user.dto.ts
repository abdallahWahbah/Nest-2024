import { Expose } from "class-transformer";

export class UserDto
{
    @Expose() // expose to show only id, email and exclude password
    id: number;
    
    @Expose() 
    email: string;
}