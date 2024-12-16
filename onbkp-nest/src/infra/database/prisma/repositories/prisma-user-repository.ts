import { User } from 'src/domain/backup/enterprise/entities/user';
import { IUserRepository } from 'src/domain/backup/enterprise/repositories/user-repository';
import { UserMapper } from '../mappers/user-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User): Promise<User | null> {
    const data = UserMapper.toPrisma(user);
    try {
      const res = await this.prisma.user.create({
        data,
      });

      return UserMapper.toDomain(res);
    } catch (error) {
      return null;
    }
  }
  async findById(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({
      where: {
        id_user: id,
      },
    });
    return UserMapper.toDomain(data);
  }
  async update(user: User): Promise<null | User> {
    const data = UserMapper.toPrisma(user);
    try {
      await this.prisma.user.update({
        where: {
          id_user: user.id.toString(),
        },
        data,
      });
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!data) {
      return null;
    }
    return UserMapper.toDomain(data);
  }
}
