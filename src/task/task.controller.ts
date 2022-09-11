import { ITaskService } from "./../interfaces";
import { Controller, Get, Inject, Param } from "@nestjs/common";

@Controller("tasks")
export class TaskController {
    constructor(@Inject("ITaskService") private taskService: ITaskService) {}

    @Get()
    async listTasks() {
        return this.taskService.listTasks();
    }

    @Get(":id")
    async getTask(@Param("id") id: string) {
        return this.taskService.getTask(id);
    }
}
