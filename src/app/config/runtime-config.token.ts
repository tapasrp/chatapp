import { InjectionToken } from '@angular/core';

export type RuntimeConfig = Record<string, any>;

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG');
