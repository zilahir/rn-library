import { Injectable } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';

export interface IAppService {
  online: boolean;
  database: string;
  timestamp: number;
}

@Injectable()
export class AppService {
  getRoot(): IAppService {
    return {
      online: true,
      database: getConnectionToken('pikkukirjasto-db'),
      timestamp: new Date().getTime(),
    };
  }
}
