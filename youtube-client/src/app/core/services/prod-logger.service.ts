import { Injectable } from '@angular/core';
import { LoggerService } from './LoggerService';

@Injectable()
export class ProdLoggerService extends LoggerService {
  constructor() {
    super();
    this.logMessage('App is running in the production mode');
  }

  logMessage(str: string): void {
    console.log(`[PROD]: ${str}`);
  }
}
