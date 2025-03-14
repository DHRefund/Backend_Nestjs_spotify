import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(req: any): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
    updateMe(userId: string, updateData: {
        name?: string;
        email?: string;
    }): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
}
