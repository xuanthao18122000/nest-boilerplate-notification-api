import { Module } from '@nestjs/common';
import { NotificationCard, NotificationDetail } from 'src/database/entities';
import { NotificationAppController } from './notification-app.controller';
import { NotificationAppService } from './notification-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationCard, NotificationDetail])],
  controllers: [NotificationAppController],
  providers: [NotificationAppService],
})
export class NotificationAppModule {}
