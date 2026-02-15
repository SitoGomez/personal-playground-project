import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: 'https://e926d84ef6c0db7ce2731286d5c3c1b4@o4510883525230592.ingest.de.sentry.io/4510883527655504',
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  ignoreSpans: [
    {
      op: 'middleware.express',
    },
    {
      op: 'request_handler.express',
    },
  ],
  enableLogs: true,
  replaysOnErrorSampleRate: 1.0,
});
