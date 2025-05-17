import { Body, Controller, Post } from '@nestjs/common';

interface UploadFilesDto {
  urls: string[];
}

@Controller('files')
export class FilesController {
  @Post('upload')
  async uploadFiles(@Body() uploadFilesDto: UploadFilesDto) {
    console.log('uploadFilesDto :>> ', uploadFilesDto);
    return { data: uploadFilesDto }
    // return this.filesService.uploadFiles(uploadFilesDto.urls);
  }
}
