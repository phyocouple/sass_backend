// src/odoo/odoo.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OdooService } from './odoo.service';

@Controller('odoo')
export class OdooController {
  constructor(private odooService: OdooService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { username: string; password: string;}) {
    return this.odooService.login(loginDto.username, loginDto.password);
  }
}
