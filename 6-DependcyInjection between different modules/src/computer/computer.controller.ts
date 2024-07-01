import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DeskService } from 'src/desk/desk.service';

@Controller('computer')
export class ComputerController {

    constructor(private cpuService: CpuService,
                private deskService: DeskService
    ){}

    @Get()
    run()
    {
        return [
            this.cpuService.compute(1, 2),
            this.deskService.getData()
        ]
    }
}
