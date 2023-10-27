import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseFilter } from 'src/common/filter-builder/custom-base.filter';

export class ListNotificationsDto extends BaseFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  category: number;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  typeSchedule: number;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  creatorId: number;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  typeReceiver: number;

  @ApiProperty({ example: '', required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  status: number;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'Type: YYYY/mm/dd',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  sentDateFrom: Date;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'Type: YYYY/mm/dd',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  sentDateTo: Date;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'Type: YYYY/mm/dd',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  createDateFrom: Date;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'Type: YYYY/mm/dd',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  createDateTo: Date;

  @ApiProperty({ required: false, type: Boolean })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  download?: boolean;
}

export class SignUpFireBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  token: string;
}

export class SignOutFireBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  token: string;
}
