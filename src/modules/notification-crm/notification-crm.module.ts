import { Module } from '@nestjs/common';
import { NotificationCard, NotificationDetail } from 'src/database/entities';
import { NotificationCrmController } from './notification-crm.controller';
import { NotificationCrmService } from './notification-crm.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationCard, NotificationDetail])],
  controllers: [NotificationCrmController],
  providers: [NotificationCrmService],
})
export class NotificationCrmModule {}
