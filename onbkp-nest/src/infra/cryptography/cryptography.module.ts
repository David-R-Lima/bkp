import { Module } from '@nestjs/common';
import { Encrypter } from 'src/domain/backup/application/cryptography/encrypter';
import { JwtEncrypter } from './jwt-encrypter';
import { HashComparer } from 'src/domain/backup/application/cryptography/hash-comparer';
import { BcryptHasher } from './bcrypt.hasher';
import { HashGenerator } from 'src/domain/backup/application/cryptography/hash-generator';
import { RandomCrypt } from 'src/domain/backup/application/cryptography/random-crypt';
import { GenerateRandomCrypto } from './generate-random-crypto.js';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: RandomCrypt, useClass: GenerateRandomCrypto },
  ],
  exports: [Encrypter, HashComparer, HashGenerator, RandomCrypt],
})
export class CryptographyModule {}
