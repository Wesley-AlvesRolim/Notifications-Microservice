import { Module } from '@nestjs/common';
import { NotificationController } from './infra/http/notification.controller';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [NotificationController, DatabaseModule],
})
export class AppModule {}
