import { Notification } from '@application/entities/Notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) return null;

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    this.notifications[notificationIndex] = notification;
  }
}
