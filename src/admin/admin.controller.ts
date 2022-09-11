import { Controller, Get, Inject } from "@nestjs/common";
import { IAdminService } from "../interfaces";

@Controller("admin")
export class AdminController {
    constructor(@Inject("IAdminService") private adminService: IAdminService) {}

    @Get("contracts")
    async getContracts() {
        return this.adminService.getContracts();
    }
}
