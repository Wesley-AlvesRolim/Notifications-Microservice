import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { SendNotification } from './send-notification';

describe('Cancel notification use case', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const cancelNotification = new CancelNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'recipient-id-example',
      category: 'social',
      content: 'You have a new connection invite',
    });

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when does not exist.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const cancel = () => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    };

    expect(cancel()).rejects.toThrow('Notification not found.');
  });
});
