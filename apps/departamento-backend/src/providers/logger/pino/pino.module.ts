import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => ({
        pinoHttp: {
          level: 'debug',
          customProps: () => ({
            context: 'HTTP',
          }),
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
        },
      }),
    }),
  ],
})
export class PinoLoggerModule {}
