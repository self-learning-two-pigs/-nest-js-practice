import { Controller } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Controller('scheduling')
export class SchedulingController {
  @Cron('* 15 * * * *')
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
}
