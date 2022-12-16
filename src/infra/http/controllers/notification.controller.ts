import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../../dtos/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';
import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

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
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly getRecipientNotification: GetRecipientNotifications,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly cancelNotification: CancelNotification,
  ) {}

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    const notificationsConvertedToDomain = notifications.map((notification) =>
      NotificationViewModel.toHTTP(notification),
    );

    return { notifications: notificationsConvertedToDomain };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({
      notificationId,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({
      notificationId,
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({
      notificationId,
    });
  }

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
