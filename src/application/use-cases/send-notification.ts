import { Content } from '../entities/Content';
import { Notification } from '../entities/Notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  category: string;
  content: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    this.notificationsRepository.create(notification);
    return { notification };
  }
}