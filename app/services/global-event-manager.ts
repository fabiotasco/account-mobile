import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventManager {
  updateUserBalance = new EventEmitter();
  constructor() {}
}
