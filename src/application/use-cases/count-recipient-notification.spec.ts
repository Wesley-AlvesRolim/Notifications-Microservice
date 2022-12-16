import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipient notification use case', () => {
  it('should be able to count notifications by recipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id-example-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id-example-1',
      }),
    );

    await notificationsRepository.create(makeNotification());

    const count = await countRecipientNotification.execute({
      recipientId: 'recipient-id-example-1',
    });

    expect(count).toEqual({ count: 2 });
  });
});
