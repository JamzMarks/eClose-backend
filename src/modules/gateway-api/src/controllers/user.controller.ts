import { Controller, Get } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Controller('user')
export class UserController {
    private client: ClientProxy;
    constructor() {
    
        
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3001 },
    });
  }
    @Get()
    async getUsers() {
        const users = await this.client.send({ cmd: 'get_users' }, {}).toPromise();
        return users;
    }
}