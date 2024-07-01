import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DeskService {

    constructor(private powerService: PowerService){}

    getData()
    {
        console.log("DeskServie: we are making use of power service from Desk Service");
        this.powerService.supplyPower(20);
        return "data!"
    }
}
