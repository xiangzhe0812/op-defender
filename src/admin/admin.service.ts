import { Injectable, Logger } from "@nestjs/common";
import { IAdminService } from "../interfaces";
import { ConfigService } from "@nestjs/config";
import { ConfigSettings } from "../types";
import { AdminClient, Contract } from "defender-admin-client";

@Injectable()
export class AdminService implements IAdminService {
    private readonly logger = new Logger(AdminService.name);
    private readonly adminClient: AdminClient;

    constructor(private config: ConfigService) {
        this.adminClient = new AdminClient({
            apiKey: this.config.get(ConfigSettings.DEFENDER_TEAM_API_KEY),
            apiSecret: this.config.get(ConfigSettings.DEFENDER_TEAM_API_SECRET)
        });
    }

    async getContracts(): Promise<Omit<Contract, "abi">[]> {
        this.logger.log("Getting contracts");
        return this.adminClient.listContracts();
    }
}
