import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { RUNTIME_CONFIG } from './app/config/runtime-config.token';
import { mergeApplicationConfig } from '@angular/core';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Read runtime config JSON from disk for SSR.
 * Priority:
 * 1. process.env.RUNTIME_CONFIG_PATH
 * 2. <process.cwd()>/config.json
 * If the file is missing or invalid, fallback to an empty object.
 */
function loadRuntimeConfigFromDisk(): Record<string, any> {
    const envPath = process.env['RUNTIME_CONFIG_PATH'];
    const defaultPath = join(process.cwd(), 'config.json');
    const tryPaths = envPath ? [envPath, defaultPath] : [defaultPath];

    for (const p of tryPaths) {
        try {
            const raw = readFileSync(p, { encoding: 'utf8' });
            return JSON.parse(raw);
        } catch (err) {
            // Continue to next path
        }
    }

    // If none found/parsed, return empty config
    return {};
}

const bootstrap = (context: BootstrapContext) => {
    const runtimeConfig = loadRuntimeConfigFromDisk();

    // Merge runtime config provider into the server application config
    const mergedConfig = mergeApplicationConfig(config, {
        providers: [{ provide: RUNTIME_CONFIG, useValue: runtimeConfig }]
    });

    return bootstrapApplication(App, mergedConfig, context);
};

export default bootstrap;
