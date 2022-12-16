import { Content } from '@application/entities/Content';
import { Notification } from '@application/entities/Notification';

type Override = Partial<Notification>;

export function makeNotification(override?: Override) {
  return new Notification({
    recipientId: 'recipient-id-example',
    category: 'social',
    content: new Content('You have a new connection invite'),
    ...override,
  });
}
