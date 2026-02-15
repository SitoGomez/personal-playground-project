// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://e926d84ef6c0db7ce2731286d5c3c1b4@o4510883525230592.ingest.de.sentry.io/4510883527655504',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});
