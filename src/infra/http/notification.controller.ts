import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { Notification } from 'src/application/entities/Notification';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

interface CreateNotificationResponse {
  notification: Notification;
}

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<CreateNotificationResponse> {
    const { category, content, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
