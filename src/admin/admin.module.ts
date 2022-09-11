import { AdminController } from "./admin.controller";
import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Module({
    controllers: [AdminController],
    providers: [
        {
            provide: "IAdminService",
            useClass: AdminService
        }
    ]
})
export class AdminModule {}
