import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationAppService } from './notification-app.service';
import { SendResponse } from 'src/common/response/send-response';
import {
  ListNotificationsDto,
  SignOutFireBaseDto,
  SignUpFireBaseDto,
} from './dto/notification-app.dto';
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
  async signUpFirebase(@Body() body: SignUpFireBaseDto) {
    await this.notificationAppService.signUpFirebase(body);
    return SendResponse.success([], 'Sign up firebase token successful!');
  }

  @Put('firebase/sign-out')
  async signOutFirebase(@Body() body: SignOutFireBaseDto) {
    await this.notificationAppService.signOutFirebase(body);
    return SendResponse.success([], 'Sign out firebase token successful!');
  }

  @Get()
  async getListNotifications(@Query() query: ListNotificationsDto) {
    const notifications =
      await this.notificationAppService.getListNotifications(query);
    return SendResponse.success(
      notifications,
      'Get list notifications successful!',
    );
  }

  @Get('count-unread')
  async countUnreadNotifications() {
    const data = await this.notificationAppService.countUnreadNotifications();
    return SendResponse.success(data, 'Get notifications unread successful!');
  }

  @Get('total-news')
  async totalNewsNotifications() {
    const data = await this.notificationAppService.getTotalNewsNotify();
    return SendResponse.success(
      data,
      'Get total news notifications successful!',
    );
  }

  @Put('read-all')
  async readAllNotifications() {
    await this.notificationAppService.readAllNotifications();
    return SendResponse.success([], 'Read all notifications successful!');
  }

  @Put('read/:id')
  async readOneNotification() {
    await this.notificationAppService.readOneNotification();
    return SendResponse.success([], 'Read notification successful!');
  }
}
