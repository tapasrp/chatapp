import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { RUNTIME_CONFIG } from './app/config/runtime-config.token';

async function bootstrap() {
  let runtimeConfig: Record<string, any> = {};
  try {
    const res = await fetch('/config.json');
    if (res.ok) {
      runtimeConfig = await res.json();
    } else {
      console.warn('Failed to fetch /config.json, status', res.status);
    }
  } catch (err) {
    console.warn('Could not fetch /config.json, using defaults.', err);
    runtimeConfig = {};
  }

  // Merge providers so the appConfig providers are preserved
  const providers = [...(appConfig.providers ?? []), { provide: RUNTIME_CONFIG, useValue: runtimeConfig }];

  await bootstrapApplication(App, { ...appConfig, providers });
}

bootstrap().catch((err) => console.error(err));
