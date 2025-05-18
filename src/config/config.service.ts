import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceNest } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: ConfigServiceNest) {}

  get(key: string): string {
    const env = this.configService.get<string>(key)
    return env ? env : ''
  }

  get databaseHost(): string {
    return this.get('POSTGRES_HOST');
  }

  get databasePort(): number {
    return parseInt(this.get('POSTGRES_PORT'), 10);
  }

  get databaseUser(): string {
    return this.get('POSTGRES_USER');
  }

  get databasePassword(): string {
    return this.get('POSTGRES_PASSWORD');
  }

  get databaseName(): string {
    return this.get('POSTGRES_DB');
  }

  get googleCloudProjectId(): string {
    return this.get('GOOGLE_CLOUD_PROJECT_ID');
  }

  get googleCloudClientEmail(): string {
    return this.get('GOOGLE_CLOUD_CLIENT_EMAIL');
  }
  get googleCloudPrivateKey(): string {
    return this.get('GOOGLE_CLOUD_PRIVATE_KEY');
  }
  get googleCloudKeyfilePath(): string {
    return this.get('GOOGLE_CLOUD_KEYFILE_PATH');
  }

  get googleDriveFolderId(): string {
    return this.get('GOOGLE_DRIVE_FOLDER_ID');
  }
}