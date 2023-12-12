import { Controller, Get, Param } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private schedulingServices: SchedulingService) {}

  @Cron(CronExpression.EVERY_5_SECONDS, { name: 'greeting' })
  handleCron() {
    console.log('handleCron');
  }

  @Interval(10000)
  handleInterval() {
    console.log('handleInterval');
  }

  @Timeout(30000)
  handleTimeout() {
    console.log('handleTimeout');
  }

  @Get('cron/:action')
  managementCron(@Param('action') action: string) {
    return this.schedulingServices.managementCron('greeting', action);
  }
}
