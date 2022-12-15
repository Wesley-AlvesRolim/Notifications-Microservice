import { Notification } from '../entities/Notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const notificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send notification use case', () => {
  it('should be able to send a notification', async () => {
    await new SendNotification(notificationsRepository).execute({
      recipientId: 'recipient-id-example',
      category: 'social',
      content: 'You have a new connection invite',
    });

    expect(notifications).toHaveLength(1);
  });
});
