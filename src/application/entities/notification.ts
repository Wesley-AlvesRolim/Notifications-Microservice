import { Optional } from '../helpers/optional';
import { Content } from './Content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Optional<NotificationProps, 'createdAt'>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get content(): Content {
    return this.props.content;
  }

  set content(content: Content) {
    this.props.content = content;
  }

  get category(): string {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
