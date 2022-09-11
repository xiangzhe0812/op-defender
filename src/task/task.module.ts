import { TaskController } from "./task.controller";
import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";

@Module({
    controllers: [TaskController],
    providers: [
        {
            provide: "ITaskService",
            useClass: TaskService
        }
    ]
})
export class TaskModule {}
