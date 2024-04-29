// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: any) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' };
        }
        return this.authService.login(user);
    }
}
