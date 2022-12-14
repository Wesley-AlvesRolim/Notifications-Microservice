import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @Length(5, 252)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}
