import { ConfigService } from "@nestjs/config";
import { ITaskService } from "./../interfaces";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigSettings } from "../types";
import { AutotaskClient } from "defender-autotask-client";
import { AutotaskListResponse } from "defender-autotask-client/lib/models/response";
import { Autotask } from "defender-autotask-client/lib/models/autotask";
@Injectable()
export class TaskService implements ITaskService {
    private readonly logger = new Logger(TaskService.name);

    private readonly client: AutotaskClient;
    constructor(private config: ConfigService) {
        const credentials = {
            apiKey: this.config.get(ConfigSettings.DEFENDER_TEAM_API_KEY),
            apiSecret: this.config.get(ConfigSettings.DEFENDER_TEAM_API_SECRET)
        };
        this.client = new AutotaskClient(credentials);
    }

    async listTasks(): Promise<AutotaskListResponse> {
        this.logger.log("Getting tasks");
        return this.client.list();
    }

    async getTask(taskId: string): Promise<Autotask> {
        this.logger.log(`Getting task ${taskId}`);
        return this.client.get(taskId);
    }
}
