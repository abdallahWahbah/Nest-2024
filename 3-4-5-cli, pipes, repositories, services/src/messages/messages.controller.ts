import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

// @Controller()
@Controller('messages')
export class MessagesController 
{
    constructor(private messagesService: MessagesService){}

    // @Get("/messages")
    @Get()
    getAllMessages()
    {
        return this.messagesService.findAll()
    }

    // @Post("/messages")
    @Post()
    createMessage(@Body() body: CreateMessageDto)
    {
        return this.messagesService.createMessage(body.content)
    }

    // @Get("/messages/:id")
    @Get("/:id")
    async getOneMessage(@Param("id") id: string)
    {
        const message = await this.messagesService.findOne(id);
        if(!message) throw new NotFoundException("Message Not Found");
        return message;
    }
}
