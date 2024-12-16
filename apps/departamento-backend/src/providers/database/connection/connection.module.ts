import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST_V1,
          port: +process.env.DB_PORT_V1,
          database: process.env.DB_NAME_V1,
          username: process.env.DB_USER_V1,
          password: process.env.DB_PASS_V1,
          ssl: {
            rejectUnauthorized: false, // Permite certificados auto-firmados
          },
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class ConnectionModule {}
