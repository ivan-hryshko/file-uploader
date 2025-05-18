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
    console.log('uploadFilesDto :>> ', uploadFilesDto);
    return { data: uploadFilesDto }
    // return this.filesService.uploadFiles(uploadFilesDto.urls);
  }
}
