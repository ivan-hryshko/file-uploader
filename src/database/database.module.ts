import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { FileEntity } from './entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUser,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [FileEntity],
        synchronize: true, // У продакшені використовуйте міграції
      }),
    }),
    TypeOrmModule.forFeature([FileEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}