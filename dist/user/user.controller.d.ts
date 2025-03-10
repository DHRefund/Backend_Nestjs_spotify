import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(userId: string): Promise<{
        email: string;
        id: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
