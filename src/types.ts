export enum ConfigSettings {
    DEFENDER_API_KEY = "DEFENDER_API_KEY",
    DEFENDER_API_SECRET = "DEFENDER_API_SECRET",
    TOKEN_ADDRESS = "TOKEN_ADDRESS",
    DEFENDER_TEAM_API_KEY = "DEFENDER_TEAM_API_KEY",
    DEFENDER_TEAM_API_SECRET = "DEFENDER_TEAM_API_SECRET"
}

export type SendTokenRequest = {
    addresses: string[];
    amounts: number[];
};
