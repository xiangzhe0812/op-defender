import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { RelayerGetResponse, RelayerTransaction } from "defender-relay-client";
import { IRelayerService } from "src/interfaces";
import { SendTokenRequest } from "src/types";

@Controller("relayers")
export class RelayerController {
    constructor(
        @Inject("IRelayerService") private relayerService: IRelayerService
    ) {}

    @Post("sendTokens")
    async sendTokens(@Body() body: SendTokenRequest): Promise<string[]> {
        return this.relayerService.sendTokens(body);
    }

    @Get("transactions")
    async getRelayerTransactions(): Promise<RelayerTransaction[]> {
        return this.relayerService.getRelayerTransactions();
    }

    @Get("transactions/:id")
    async getRelayerTransaction(
        @Param("id") id: string
    ): Promise<RelayerTransaction> {
        return this.relayerService.getRelayerTransaction(id);
    }

    @Get()
    async getRelayer(): Promise<RelayerGetResponse> {
        return this.relayerService.getRelayer();
    }

    @Get("address")
    async getRelayerAddress(): Promise<string> {
        return this.relayerService.getRelayerAddress();
    }

    @Post("signMessage")
    async signMessage(@Body() body: { message: string }): Promise<string> {
        return this.relayerService.signMessage(body.message);
    }

    @Get("balance")
    async getBalance(): Promise<string> {
        return (await this.relayerService.getBalance()).toString();
    }
}
