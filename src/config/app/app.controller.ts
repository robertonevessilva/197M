import { Controller, Get } from '@nestjs/common';
import { ApiDescriptionType, AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  showApiDescription(): ApiDescriptionType {
    return this.appService.showApiDescription();
  }
}
