import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
    DefenderRelayProvider,
    DefenderRelaySigner
} from "defender-relay-client/lib/ethers";
import { BigNumber, ethers } from "ethers";
import { ConfigSettings, SendTokenRequest } from "../types";
import TokenABI from "../contracts/WzglERC20.sol/WzglERC20.json";
import { IRelayerService } from "../interfaces";
import {
    Relayer,
    RelayerGetResponse,
    RelayerTransaction
} from "defender-relay-client";

@Injectable()
export class RelayerService implements IRelayerService {
    private readonly logger = new Logger(RelayerService.name);
    private readonly signer: DefenderRelaySigner;
    private readonly provider: DefenderRelayProvider;
    private readonly relayer: Relayer;

    constructor(private config: ConfigService) {
        const credentials = {
            apiKey: this.config.get(ConfigSettings.DEFENDER_API_KEY),
            apiSecret: this.config.get(ConfigSettings.DEFENDER_API_SECRET)
        };
        this.provider = new DefenderRelayProvider(credentials);
        this.signer = new DefenderRelaySigner(credentials, this.provider, {
            speed: "fast"
        });
        this.relayer = new Relayer(credentials);
    }

    async getRelayerTransactions(): Promise<RelayerTransaction[]> {
        this.logger.log("Getting relayer transactions");
        return this.relayer.list();
    }

    async getRelayerTransaction(id: string): Promise<RelayerTransaction> {
        this.logger.log(`Getting relayer transaction ${id}`);
        return this.relayer.query(id);
    }

    async getRelayer(): Promise<RelayerGetResponse> {
        this.logger.log("Getting relayer");
        return this.relayer.getRelayer();
    }

    async getRelayerAddress(): Promise<string> {
        this.logger.log("Getting relayer address");
        return this.signer.getAddress();
    }

    async signMessage(message: string): Promise<string> {
        this.logger.log(`Signing message ${message}`);
        return this.signer.signMessage(message);
    }

    async getBalance(): Promise<BigNumber> {
        this.logger.log("Getting balance");
        return this.provider.getBalance(await this.signer.getAddress());
    }

    async sendTokens(request: SendTokenRequest): Promise<string[]> {
        const tokenAddress = this.config.get(ConfigSettings.TOKEN_ADDRESS);
        const token = new ethers.Contract(
            tokenAddress,
            TokenABI.abi,
            this.signer
        );
        const txs = [];
        if (request.addresses.length != request.amounts.length)
            throw new Error("Addresses and amounts must be the same length");

        try {
            for (let i = 0; i < request.addresses.length; i++) {
                const address = request.addresses[i];
                const amount = ethers.utils.parseEther(
                    request.amounts[i].toString()
                );
                this.logger.log(`Sending ${amount} tokens to ${address}`);
                const tx = await (
                    await token.transfer(address, amount, {
                        gasLimit: 100000
                    })
                ).wait();
                txs.push(tx);
            }
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }

        return txs;
    }
}
