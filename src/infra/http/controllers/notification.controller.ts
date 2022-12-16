import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../../dtos/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';

interface CreateNotificationResponse {
  notification: {
    id: string;
    content: string;
    category: string;
    recipientId: string;
  };
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

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
