import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, resolve } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  removeFile(image: string) {
    throw new Error('Method not implemented.');
  }
  async createFile(file: Express.Multer.File) {
    try {
      const fileName = `${v4()}_${file.originalname}`;
      const filePath = resolve(__dirname, '..', '..', 'uploads');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      await new Promise<void>((resolve, reject) => {
        writeFile(join(filePath, fileName), file.buffer, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
      return fileName;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on uploading file: ${error}`,
      );
    }
  }
}
