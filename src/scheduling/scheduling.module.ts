import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulingController } from './scheduling.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [SchedulingController],
})
export class SchedulingModule {}
