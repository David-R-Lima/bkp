import { Injectable } from '@nestjs/common';
import {
  Uploader,
  UploadParams,
} from 'src/domain/backup/application/storage/uploader';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorage implements Uploader {
  private basePath: string;

  constructor() {
    // Define the base directory for storing files
    this.basePath = path.resolve(__dirname, '../../../../local-uploads'); // Adjust path as needed
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
    const filePath = path.join(this.basePath, fileName + '.gz'); // Save with .gz extension

    try {
      await fs.writeFile(filePath, file);
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }

  // Fetch a file from the local file system
  async fetch(fileName: string): Promise<Uint8Array> {
    try {
      // Find the first matching file
      const matchedFile = await this.findFile(fileName);
      const filePath = path.join(this.basePath, matchedFile);

      const data = await fs.readFile(filePath);
      return new Uint8Array(data);
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  // Delete a file from the local file system
  async delete(fileName: string): Promise<void> {
    try {
      // Find the first matching file
      const matchedFile = await this.findFile(fileName);
      const filePath = path.join(this.basePath, matchedFile);

      await fs.unlink(filePath);
      console.log(`File "${matchedFile}" deleted successfully.`);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  // Utility method to find a file by name prefix
  private async findFile(fileName: string): Promise<string> {
    try {
      // List all files in the directory
      const files = await fs.readdir(this.basePath);

      // Find the first file that starts with the fileName
      const matchedFile = files.find((file) => file.startsWith(fileName));

      if (!matchedFile) {
        throw new Error(`File with name "${fileName}" not found.`);
      }

      return matchedFile; // Return the matched file name
    } catch (error) {
      throw new Error(`Failed to find file: ${error.message}`);
    }
  }
}
