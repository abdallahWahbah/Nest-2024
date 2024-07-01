import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from 'src/cpu/cpu.module';
import { DeskModule } from 'src/desk/desk.module';

@Module({
  imports: [CpuModule, DeskModule],
  controllers: [ComputerController]
})
export class ComputerModule {}
