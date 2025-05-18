// src/files/files.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../database/entities/file.entity';
import { GoogleService } from '../google/google.service';
import { isURL } from 'class-validator';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity) private repo: Repository<FileEntity>,
    private readonly googleService: GoogleService,
  ) {}

  async uploadFiles(links: string[]) {
    const invalidLinks = links.filter((link) => !isURL(link));
    if (invalidLinks.length > 0) {
      throw new BadRequestException(`Invalid URLs: ${invalidLinks.join(', ')}`);
    }

    const results: FileEntity[] = [];

    for (const url of links) {
      const file = this.repo.create({ originalUrl: url, status: 'pending' });
      await this.repo.save(file);

      try {
        const { driveFileId, driveLink } = await this.googleService.uploadFromUrl(url);
        file.googleDriveId = driveFileId;
        file.googleDriveUrl = driveLink;
        file.status = 'success';
      } catch (e) {
        console.log('e :>> ', e);
        file.status = 'error';
      }

      await this.repo.save(file);
      results.push(file);
    }

    return results;
  }

  getFiles() {
    // return this.repo.find();
  }
}