import { Injectable } from '@nestjs/common';
import {
  Uploader,
  UploadParams,
} from 'src/domain/backup/application/storage/uploader';
import { promises as fs } from 'fs'; // Import the file system module
import * as path from 'path'; // For file paths

@Injectable()
export class LocalStorage implements Uploader {
  private basePath: string;

  constructor() {
    // Define the base directory for storing files
    this.basePath = path.resolve(__dirname, '../../../storage'); // Adjust path as needed
  }

  // Ensure the base directory exists
  private async ensureDirectory() {
    try {
      await fs.mkdir(this.basePath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory: ${error.message}`);
    }
  }

  // Upload a file to the local file system
  async upload({ fileName, file }: UploadParams): Promise<void> {
    await this.ensureDirectory();
    const filePath = path.join(this.basePath, fileName);

    try {
      await fs.writeFile(filePath, file);
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }

  // Fetch a file from the local file system
  async fetch(fileName: string): Promise<Uint8Array> {
    const filePath = path.join(this.basePath, fileName);

    try {
      const data = await fs.readFile(filePath);
      return new Uint8Array(data);
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  // Delete a file from the local file system
  async delete(fileName: string): Promise<void> {
    const filePath = path.join(this.basePath, fileName);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
