import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string)
    {
        const user = this.repo.create({ email, password });

        return this.repo.save(user)
    }

    findOne(id: number)
    {
        if(!id) return null; // if you called findOneBy(null) in the next line, it will return the first item in the users list 
        return this.repo.findOneBy({ id })
    }

    find(email: string)
    {
        return this.repo.find({ where: { email } }) // find all users that has email of (email)
    }

    async update(id: number, userAttributes: Partial<User>)
    {
        const user = await this.findOne(id);
        if(!user) throw new NotFoundException("User Not Found");

        Object.assign(user, userAttributes);
        return this.repo.save(user);
    }

    async remove(id: number)
    {
        const user = await this.findOne(id);
        if(!user) throw new NotFoundException("User Not Found");

        return this.repo.remove(user);
    }
}
