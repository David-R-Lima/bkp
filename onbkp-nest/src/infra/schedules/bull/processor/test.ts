import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class RedisConnectionService implements OnModuleInit {
  constructor(@InjectQueue('backup') private backupQueue: Queue) {}

  // Método que será chamado quando o módulo for inicializado
  async onModuleInit() {
    try {
      const redisClient = await this.backupQueue.client;
      console.log('redisClient: ', 'here');
      await redisClient.ping((err, res) => {
        if (err) {
          console.error('Redis connection failed:', err);
        } else {
          console.log('Redis connection successful:', res);
        }
      });
    } catch (error) {
      console.error('Error initializing Redis connection:', error);
    }
  }
}
