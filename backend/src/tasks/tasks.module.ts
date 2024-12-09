import { TaskSchema } from 'src/entities/task.entity';
import { UsersModule } from 'src/users/users.module';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksService } from './task.service';
import { TasksController } from './tasks.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]), 
        UsersModule,
    ],
    providers: [TasksService],
    controllers: [TasksController], 
    exports: [TasksService, MongooseModule],
})
export class TasksModule {}
