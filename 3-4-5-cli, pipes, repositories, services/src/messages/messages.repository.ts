import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessageRepository
{
    // messages are stored in object like this    
    // {
    //     12: {content: "hi there",id: 12},
    //     50: {content: "new message",id: 50},
    // }
    async findOne(id: string)
    {
        const content = await readFile("messages.json", "utf8")
        // utf8: tells readFile what format or what encoding this file uses
        // "messages.json" file must exist or it will throw error
        const messages = JSON.parse(content);
        return messages[id]
    }

    async findAll()
    {
        const content = await readFile("messages.json", "utf8")
        const messages = JSON.parse(content);
        return messages
    }

    async create(comingMessage: string)
    {
        const content = await readFile("messages.json", "utf8");
        const messages = JSON.parse(content)
        const randomId = Math.floor(Math.random() * 999);
        
        messages[randomId] = { randomId, content: comingMessage };
        await writeFile("messages.json", JSON.stringify(messages));
        return messages;

    }
}