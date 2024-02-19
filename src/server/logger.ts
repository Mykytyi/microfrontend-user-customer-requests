import pino from 'pino';
import { tracingContextGetTraceId, tracingContextGetUsername } from '@a1/gucci-common-tracing/lib/node';

const logger = pino({
  level: process.env.NODE_ENV === 'local-dev' || process.env.ENABLE_DEBUG_LOG === 'true' ? 'debug' : 'info',
  formatters: {
    level: (level) => ({ level }),
  },
  messageKey: 'message',
  timestamp: () => `,"time": "${new Date().toISOString()}"`,
  ...(process.env.NODE_ENV === 'local-dev' || process.env.NODE_ENV === 'test' ? {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: false,
      },
    },
  } : {}),
});

const debugFn = (level: 'debug' | 'info' | 'warn' | 'error', message: string, ...interpolationValues: Array<any>) => {
  const username = tracingContextGetUsername();
  const traceId = tracingContextGetTraceId();
  if (username || traceId) {
    logger[level]({ username, traceId }, message, ...interpolationValues);
  } else {
    logger[level](message, ...interpolationValues);
  }
};

export default {
  debug: (message: string, ...interpolationValues: Array<any>) => debugFn('debug', message, ...interpolationValues),
  info: (message: string, ...interpolationValues: Array<any>) => debugFn('info', message, ...interpolationValues),
  warn: (message: string, ...interpolationValues: Array<any>) => debugFn('warn', message, ...interpolationValues),
  error: (message: string, ...interpolationValues: Array<any>) => debugFn('error', message, ...interpolationValues),
};
