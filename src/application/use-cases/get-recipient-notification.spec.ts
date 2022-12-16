import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notification use case', () => {
  it('should be able to list the notifications by recipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-id-example-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-example-1' }),
        expect.objectContaining({ recipientId: 'recipient-id-example-1' }),
      ]),
    );
  });
});
