import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const User = createParamDecorator(
  (data: string, host: ExecutionContextHost) => {
    const req = host.switchToHttp().getRequest();
    return data ? req.user[data] : req.user;
  },
);
