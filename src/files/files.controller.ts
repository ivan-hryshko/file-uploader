import { Body, Controller, Post } from '@nestjs/common';
import { FilesService } from './files.service';

interface UploadFilesDto {
  urls: string[];
}

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async uploadFiles(@Body() uploadFilesDto: UploadFilesDto) {
    const uploadedFiles = await this.filesService.uploadFiles(uploadFilesDto.urls);
    return { data: uploadedFiles }
  }
}
