import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';

export interface User {
  userId: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
}

@Injectable()
export class UsersService {
  private users = [
    {
      userId: '1f5d72f6-9985-4c04-b264-9cddb8f65878',
      username: 'john',
      password: 'changeme',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [Role.Admin],
    },
    {
      userId: 'b876c2b1-ca92-4f49-b827-a4dadb058ef8',
      username: 'maria',
      password: 'guess',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [Role.Admin],
    },
  ] as User[];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.userId === id);
  }

  async insertUser(username: string, password: string) {
    const { v4: uuidv4 } = await import('uuid');
    const id = uuidv4();
    const insertedUser = {
      userId: id,
      username,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [Role.User],
    };

    this.users.push(insertedUser);

    return insertedUser;
  }

  async deleteUserById(id: string): Promise<string | undefined> {
    this.users = this.users.filter((user) => user.userId !== id);
    return id;
  }
}
