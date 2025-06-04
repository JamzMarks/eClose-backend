import { createRmqClient } from '@app/common/utils/rmq-client.factory';
import { Module } from '@nestjs/common';

const userClient = createRmqClient('USER_SERVICE', 'user_queue');

@Module({
  imports: [userClient],
  exports: [userClient],
})
export class UserClientModule {}
