import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GoogleService {
  private drive: drive_v3.Drive;
  private readonly logger = new Logger(GoogleService.name);

  constructor(private readonly configService: ConfigService) {
    // const auth = new google.auth.GoogleAuth({
    //   keyFile: 'google-apikey.json',
    //   // keyFile: {},
    //   scopes: ['https://www.googleapis.com/auth/drive.file'],
    // });
    const auth = new google.auth.JWT({
    projectId: this.configService.googleCloudProjectId,
    email: this.configService.googleCloudClientEmail,
    key: this.configService.googleCloudPrivateKey?.replace(/\\n/g, '\n'),
    // scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadFromUrl(fileUrl: string) {
    const response = await axios.get(fileUrl, {
      responseType: 'stream',
      timeout: 20000,
    });

    if (!response.headers['content-type']) {
      throw new BadRequestException('Unknown file type');
    }

    const fileName = `${uuid()}-${path.basename(fileUrl.split('?')[0])}`;
    const folderId = this.configService.googleDriveFolderId

    const res = await this.drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: response.headers['content-type'],
        body: response.data,
      },
      fields: 'id,webViewLink',
    });

    const fileId = res.data.id;
    if (!fileId) {
      throw new Error('File ID is missing in Google Drive response');
    }


    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return {
      driveFileId: fileId,
      driveLink: `https://drive.google.com/uc?id=${fileId}&export=download`,
    };
  }
}
