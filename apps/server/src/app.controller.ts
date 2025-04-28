import { Controller, Get } from '@nestjs/common';
import { AppService, IAppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRootRoute(): IAppService {
    return this.appService.getRoot();
  }
}
