import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { RandomCrypt } from 'src/domain/backup/application/cryptography/random-crypt';

@Injectable()
export class GenerateRandomCrypto implements RandomCrypt {
  generate(): string {
    const randomCryptString = faker.internet.password();

    return randomCryptString;
  }
}
