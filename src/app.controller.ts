import { Controller, Get, Post, Req } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Req() request: Request): Promise<void> {
    const { category, content, recipientId } = request.body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        category,
        content,
        recipientId,
      },
    });
  }
}
