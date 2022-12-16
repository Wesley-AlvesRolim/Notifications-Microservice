import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    CountRecipientNotification,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
