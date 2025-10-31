import { Injectable, inject } from '@angular/core';
import { RUNTIME_CONFIG, RuntimeConfig } from './runtime-config.token';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = inject(RUNTIME_CONFIG, { optional: true }) as RuntimeConfig | undefined;

  /** Get a config value with an optional fallback */
  get<T = any>(key: string, fallback?: T): T | undefined {
    if (!this.config) return fallback;
    return Object.prototype.hasOwnProperty.call(this.config, key)
      ? (this.config[key] as T)
      : fallback;
  }
}
