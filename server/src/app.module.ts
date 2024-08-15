import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { TasksModule } from './tasks/tasks.module';
import { FarmingModule } from './farming/farming.module';

@Module({
	imports: [UserModule, AuthModule, FriendModule, TasksModule, FarmingModule]
})
export class AppModule {}
