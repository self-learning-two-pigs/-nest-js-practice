import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SchedulingService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  managementCron(jobName: string, action: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      if (action === 'info') {
        console.log('last execute at: ', job.lastDate());
        console.log('next execute at: ', job.nextDates(5));
      }
      if (action === 'stop') {
        job.stop();
      }
      if (action === 'start') {
        job.start();
      }
    } catch (e) {
      throw new NotFoundException(`no ${jobName} job`);
    }
  }
}
