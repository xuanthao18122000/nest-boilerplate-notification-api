import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationAppService } from './notification-app.service';
import { SendResponse } from 'src/common/response/send-response';
import { CreateNotificationDto } from './dto/notification-app.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('3. Notifications APP')
@Controller('app/notifications')
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationAppController {
  constructor(
    private readonly notificationAppService: NotificationAppService,
  ) {}

  @Post('firebase/sign-up')
  async signUpFirebase(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Post('firebase/sign-out')
  async signOutFirebase(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Get()
  async getNotifications(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Get('count-unread')
  async countUnreadNotifications(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Get('total-news')
  async totalNewsNotifications(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Put('read-all')
  async readAllNotifications(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }

  @Put('read/:id')
  async readOneNotification(@Body() body: CreateNotificationDto) {
    await this.notificationAppService.create(body);
    return SendResponse.success([], 'Create notification successful');
  }
}
