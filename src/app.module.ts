import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [ConfigModule, DatabaseModule, FilesModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
