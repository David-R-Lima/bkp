import { Module } from '@nestjs/common';
import { ImplModule } from '../impl/impl.module';

@Module({
  imports: [ImplModule],
  exports: [ImplModule],
})
export class LocalModule {}
