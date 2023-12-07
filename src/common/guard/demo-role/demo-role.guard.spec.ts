import { DemoRoleGuard } from './demo-role.guard';
import { Reflector } from '@nestjs/core';

describe('DemoRoleGuard', () => {
  it('should be defined', () => {
    expect(new DemoRoleGuard(new Reflector())).toBeDefined();
  });
});
