## Quick SSR server start with custom config

You can start the SSR server with a specific config file using the included npm script:

```bash
npm run serve:ssr:config
```

This will start the server and supply `./config.json` as the runtime config. You can edit `config.json` at the project root to change the API URL or other settings for SSR.

# Chatapp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Runtime configuration (client & server)

This project supports external runtime configuration so you can change the API URL (and other settings) without rebuilding the app.

- Client: the browser app fetches `/config.json` from the `public` assets at startup. Edit `public/config.json` on your hosting static site to change client runtime values.
- Server (SSR): the Node server reads a JSON config file from disk and provides it to the server bootstrap. By default the server looks for a `config.json` file in the working directory (this repo now includes a default `config.json` at the project root).

You can also specify a custom path for the server config using the `RUNTIME_CONFIG_PATH` environment variable. Example:

```bash
# Use a custom config file path when starting the server
RUNTIME_CONFIG_PATH=/etc/chatapp/config.json node dist/chatapp/server/server.mjs
```

Example config (`config.json`):

```json
{
	"apiUrl": "https://api.example.com"
}
```

Notes:
- Do not put secrets or private keys in `public/config.json` — any file in `public` is publicly accessible.
- For SSR deployments, keep server config files outside the build artifacts (e.g. `/etc/chatapp/config.json`) and pass their path with `RUNTIME_CONFIG_PATH`.

