import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
