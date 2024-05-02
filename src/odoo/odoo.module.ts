import { Module } from '@nestjs/common';
import { OdooService } from './odoo.service';
import { OdooController } from './odoo.controller';

@Module({
  providers: [OdooService],
  controllers: [OdooController]
})
export class OdooModule {}
