// src/odoo/odoo.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OdooService {
    private readonly odooUrl: string;

    constructor(private configService: ConfigService) {
        this.odooUrl = this.configService.get<string>('ODOO_URL');
    }

    async login(username: string, password: string): Promise<any> {
        const url = `${this.odooUrl}/web/session/authenticate`;
        const data = {
            jsonrpc: "2.0",
            params: {
                db: this.configService.get<string>('ODOO_DB'),
                login: username,
                password,
            },
        };

        try {
            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true  // This ensures cookies are sent and received
            });
            // Parse cookies to extract the session_id
            const cookies = response.headers['set-cookie'];
            const sessionId = cookies
                .map(cookie => cookie.split(';')[0])
                .find(cookie => cookie.startsWith('session_id='))
                .split('=')[1];
            return { sessionId, userData: response.data.result };
        } catch (error) {
            console.error('Odoo login error:', error);
            throw new Error('Failed to authenticate with Odoo');
        }
    }
}
