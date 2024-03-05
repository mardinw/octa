import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${new Date().getTime()}-${file.originalname}`;
    const filePath = `./external/uploads/${fileName}`;

    await fs.promises.writeFile(filePath, file.buffer);
    return fileName;
  }

  async getFiles(): Promise<string[]> {
    const files = await fs.promises.readdir('./external/uploads');
    return files;
  }
}
