import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],
  exports: [DeskService],
  providers: [DeskService],
})
export class DeskModule {}
