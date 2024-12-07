/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import {
  Task,
  TaskDocument,
} from 'src/entities/task.entity';
import {
  Users,
  UsersDocument,
} from 'src/entities/user.entity';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { Task, TaskDocument } from '../schemas/task.schema';
// import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async createTask(description: string, imageUrl: string, videoLink: string): Promise<Task> {
    const task = new this.taskModel({
      description,
      imageUrl,
      videoLink,
      status: 'not_assigned',
    });
    return task.save();
  }

  async assignTask(taskId: string, userId: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    const user: any = await this.userModel.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');

    task.assignedTo.push(user._id);
    task.status = 'assigned';

    await task.save();
    return task;
  }

  async completeTask(taskId: string, userId: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    const user: any = await this.userModel.findById(userId);

    if (!task) throw new Error('Task not found');
    if (!user) throw new Error('User not found');
    if (!task.assignedTo.includes(user._id)) {
      throw new Error('Task is not assigned to this user');
    }

    task.status = 'completed';
    return task.save();
  }

  async attachImageToTask(taskId: string, imageUrl: string): Promise<Task> {
    const task: any = await this.taskModel.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.imageUrl = imageUrl;
    return task.save();
  }
}















// import { Repository } from 'typeorm';

// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { Task } from '../entities/task.entity';
// import { User } from '../entities/user.entity';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
//     @InjectRepository(User) private readonly userRepo: Repository<User>,
//   ) {}

//   async createTask(description: string, imageUrl: string, videoLink: string) {
//     const task = this.taskRepo.create({ description, imageUrl, videoLink, status: 'not_assigned' });
//     return this.taskRepo.save(task);
//   }

//   async assignTask(taskId: string, userId: string) {
//     const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignedTo'] });
//     const user = await this.userRepo.findOne({ where: { id: userId } });

//     if (task && user) {
//       task.assignedTo.push(user);
//       task.status = 'assigned';
//       return this.taskRepo.save(task);
//     }
//   }

//   async completeTask(taskId: string, userId: string) {
//     const task = await this.taskRepo.findOne({ where: { id: taskId }, relations: ['assignedTo'] });
//     const user = await this.userRepo.findOne({ where: { id: userId } });

//     if (task && user && task.assignedTo.find((u) => u.id === userId)) {
//       task.status = 'completed';
//       return this.taskRepo.save(task);
//     }
//   }

// async attachImageToTask(taskId: string, imageUrl: string) {
//   const task = await this.taskRepo.findOne({ where: { id: taskId } });
//   if (!task) throw new Error('Task not found');
//   task.imageUrl = imageUrl;
//   return this.taskRepo.save(task);
// }

// }
