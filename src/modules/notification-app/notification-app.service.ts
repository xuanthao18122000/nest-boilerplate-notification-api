import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationCard } from 'src/database/entities';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import {
  CreateNotificationDto,
  ListNotificationDto,
} from './dto/notification-app.dto';
import { throwHttpException } from 'src/common/exceptions/throw.exception';
import { listResponse } from 'src/common/response/response-list.response';
import FilterBuilder from 'src/common/filter-builder/filter-builder.service';

@Injectable()
export class NotificationAppService {
  constructor(
    @InjectRepository(NotificationCard)
    private notifyRepo: Repository<NotificationCard>,
  ) {}

  async getAll(query: ListNotificationDto) {
    const { page = 1, perPage = 10 } = query;
    const entity = {
      entityRepo: this.notifyRepo,
      alias: 'notification',
    };
    const select = [
      'id',
      'title',
      'body',
      'shortBody',
      'sendingSchedule',
      'creator',
      'typeSchedule',
      'category',
      'status',
      'isAutoNotification',
      'typeReference',
      'linkedObject',
      'receivers',
      'meta',
      'createdAt',
      'updatedAt',
    ];

    const filterBuilder = new FilterBuilder<
      NotificationCard,
      ListNotificationDto
    >(entity, query)
      .addSelect(select)
      .addNumber('category')
      .addNumber('typeSchedule')
      .addNumber('creatorId')
      .addNumber('typeReceiver')
      .addNumber('status')
      .addUnAccentString('title')
      .addDate('createdAt', 'sentDateFrom', 'sentDateTo')
      .addPagination()
      .sortBy('id');

    const [list, total] = await filterBuilder.queryBuilder.getManyAndCount();

    return listResponse(list, total, page, perPage);
  }

  async exportNotifications(notifications: NotificationCard[]) {
    console.log(notifications);
    const workbook = new ExcelJS.Workbook();
    return workbook.xlsx.writeBuffer();
  }

  async getOne(id: number): Promise<Partial<Notification>> {
    const notificationCard = await this.findNotificationCardByPk(id);

    if (!notificationCard) {
      throwHttpException(HttpStatus.NOT_FOUND, 'NOTIFY_NOT_FOUND');
    }
    return notificationCard.serialize();
  }

  async create(body: CreateNotificationDto) {
    const { title } = body;

    const notificationCard = this.notifyRepo.create({
      title,
    });

    return await this.notifyRepo.save(notificationCard);
  }

  async findNotificationCardByPk(id: number): Promise<NotificationCard> {
    const notification = await this.notifyRepo.findOneBy({ id });
    if (!notification) {
      throwHttpException(HttpStatus.NOT_FOUND, 'NOTIFY_NOT_FOUND');
    }
    return notification;
  }
}
