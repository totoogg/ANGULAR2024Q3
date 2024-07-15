import { Injectable } from '@angular/core';
import { LoggerService } from './LoggerService';

@Injectable()
export class DevLoggerService extends LoggerService {
  constructor() {
    super();
    this.logMessage('App is running in the development mode');
  }

  logMessage(str: string): void {
    console.log(`[DEV]: ${str}`);
  }
}
