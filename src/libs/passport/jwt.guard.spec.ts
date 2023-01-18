import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new Reflector())).toBeDefined();
  });
});
