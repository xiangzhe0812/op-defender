import { Contract } from "defender-admin-client";
import { Autotask } from "defender-autotask-client/lib/models/autotask";
import { AutotaskListResponse } from "defender-autotask-client/lib/models/response";
import { RelayerGetResponse, RelayerTransaction } from "defender-relay-client";
import { BigNumber } from "ethers";
import { SendTokenRequest } from "./types";

export interface IRelayerService {
    sendTokens(request: SendTokenRequest): Promise<string[]>;
    getRelayerTransactions(): Promise<RelayerTransaction[]>;
    getRelayerTransaction(id: string): Promise<RelayerTransaction>;
    getRelayer(): Promise<RelayerGetResponse>;
    getRelayerAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    getBalance(): Promise<BigNumber>;
}

export interface ITaskService {
    listTasks(): Promise<AutotaskListResponse>;
    getTask(taskId: string): Promise<Autotask>;
}

export interface IAdminService {
    getContracts(): Promise<Omit<Contract, "abi">[]>;
}
