import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // Create an instance of that data, this will handle
    // Entity has a hook when you save, update, or remove a record in the database

    const user = this.repo.create({ email, password });

    // Then save this to our database
    // Don't save directly, because it will be hard to insert a record if the data is not sanitize
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    if (!user) {
      throw new Error('User not found')
    }
    const updatedUser = Object.assign(user, attrs);
    return this.repo.save(updatedUser)
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found')
    }
    return this.repo.remove(user)
  }
}
