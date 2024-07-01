import { IsString } from "class-validator";

// DTO >>>> Data Transfer Object
export class CreateMessageDto
{
    @IsString()
    content: string;
}