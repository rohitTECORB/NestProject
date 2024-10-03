import { Injectable } from "@nestjs/common";
import { PassportStrategy} from "passport"


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    
}


