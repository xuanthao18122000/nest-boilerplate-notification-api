import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationCrmService } from './notification-crm.service';
import { SendResponse } from 'src/common/response/send-response';
import {
  CreateNotificationDto,
  ListNotificationDto,
} from './dto/notification-crm.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('3. Notifications CRM')
@Controller('crm/notifications')
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationCrmController {
  constructor(
    private readonly notificationCrmService: NotificationCrmService,
  ) {}

  @Get()
  async getAll(@Query() query: ListNotificationDto, @Res() response: Response) {
    const notificationCards = await this.notificationCrmService.getAll(query);
    if (query.download) {
      const fileBuffer = await this.notificationCrmService.exportNotifications(
        notificationCards.list,
      );
      return SendResponse.downloadExcel('notifications', fileBuffer, response);
    }
    return SendResponse.success(
      notificationCards,
      'Get all notifications successful',
      response,
    );
  }

  @Get(':id')
  async getOneNotification(@Param('id') id: number) {
    const notification = await this.notificationCrmService.getOne(id);
    return SendResponse.success(
      notification,
      'Get detail notification successful',
    );
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationDto) {
    await this.notificationCrmService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }
}
