import { Module } from "@nestjs/common";
import { RelayerService } from "./relayer.service";
import { RelayerController } from "./relayer.controller";
@Module({
    controllers: [RelayerController],
    providers: [
        {
            provide: "IRelayerService",
            useClass: RelayerService
        }
    ]
})
export class RelayerModule {}
