import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
