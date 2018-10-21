ts-framework-maintenance
========================

A minimalistic framework for typescript based applications, with async/await and decorators support.

This plugin extends the Server for handling maintenance mode for all the controllers in the system

```bash
# Install using yarn
yarn add git:https://github.com/bitcapital-hq/ts-framework-maintenance.git#master

# Install using NPM
npm install --save git:https://github.com/bitcapital-hq/ts-framework-maintenance.git#master
```

## Getting Started (TS-Framework)

Add the module as a Server middleware overriding the router registration method.

```typescript
import Server from 'ts-framework';
import { Maintenance } from 'ts-framework-maintenance';

class MyServer extends Server {
  constructor() {
    super({
      port: process.env.PORT as any || 3333,
      routes: {
        get: { '/': (req, res) => res.success({ test: 'ok' }) }
      },
    })
  }

  public register() {
    // Initialize the version middleware
    this.app.use(Maintenance.middleware(async () => {
      return true; // Maintenance enabled
    }));

    // Continue with the router initialization
    return super.register();
  }
}
```
<br />

## Getting Started (Express)

This module is also compatible with an Express server.

```typescript
const express = require('express');
const { Maintenance } = require('ts-framework-maintenance');

const app = express();

app.use(Maintenance.middleware(async () => {
  return true; // Maintenance enabled
}));

app.listen(3000, () => console.log('Server listening on port: 3000'));
```
<br />

## Documentation

#### Maintenance.middleware(active: MaintenanceValue)
- **active (Required):** It can be a boolean, a function that returns a boolean or a promise
that returns a boolean.

## License

The project is licensed under the [MIT License](./LICENSE.md).