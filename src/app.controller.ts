import { Controller, Get } from '@nestjs/common';
import { CommonConstants } from './infrastructure/constants/common.constants';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return CommonConstants.EMPTY;
  }
}
