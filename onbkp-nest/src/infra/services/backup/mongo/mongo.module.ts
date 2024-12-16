import { Module } from '@nestjs/common';
import { ImplModule } from '../impl/imlp.module';

@Module({
  imports: [ImplModule],
  exports: [ImplModule],
})
export class MongoModule {}
