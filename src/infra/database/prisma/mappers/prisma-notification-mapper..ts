import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification) {
    return new Notification({
      recipientId: raw.recipientId,
      category: raw.category,
      content: new Content(raw.content),
      createdAt: raw.createdAt,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
    });
  }
}
