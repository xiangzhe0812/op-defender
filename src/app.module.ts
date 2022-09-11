import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RelayerModule } from "./relayer/relayer.module";
import { TaskModule } from "./task/task.module";
import { AdminModule } from "./admin/admin.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        RelayerModule,
        TaskModule,
        AdminModule
    ]
})
export class AppModule {}
