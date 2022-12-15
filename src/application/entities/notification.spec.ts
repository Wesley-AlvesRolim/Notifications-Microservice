import { Content } from './Content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'Some-recipient-id',
      category: 'social',
      content: new Content('You have a connection invite.'),
    });

    expect(notification).toBeTruthy();
  });
});
