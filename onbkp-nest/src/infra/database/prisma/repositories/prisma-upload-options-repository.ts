import { Injectable } from '@nestjs/common';
import { IUploadOptionsRepository } from 'src/domain/backup/enterprise/repositories/upload-options-repository';
import { PrismaService } from '../prisma.service';
import { UploadOptions } from 'src/domain/backup/enterprise/entities/upload-options';
import { UploadOptionsMapper } from '../mappers/upload-options-mapper';

@Injectable()
export class PrismaUploadOptionsRepository implements IUploadOptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(upload_options: UploadOptions): Promise<UploadOptions> {
    const data = UploadOptionsMapper.toPrisma(upload_options);

    const res = await this.prisma.upload_options.create({
      data,
    });

    return UploadOptionsMapper.toDomain(res);
  }

  async findById(id: string): Promise<UploadOptions | null> {
    const res = await this.prisma.upload_options.findUnique({
      where: {
        id: Number(id),
      },
    });

    return UploadOptionsMapper.toDomain(res);
  }

  async update(upload_options: UploadOptions): Promise<UploadOptions | void> {
    const data = UploadOptionsMapper.toPrisma(upload_options);

    const res = await this.prisma.upload_options.update({
      where: {
        id: Number(upload_options.id.toString()),
      },
      data,
    });

    return UploadOptionsMapper.toDomain(res);
  }

  async findByUserId(id_user: string): Promise<UploadOptions[] | null> {
    const res = await this.prisma.upload_options.findMany({
      where: {
        id_user,
      },
    });

    return res.map(UploadOptionsMapper.toDomain);
  }
}
