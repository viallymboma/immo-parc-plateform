/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { TasksService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() body: { description: string; imageUrl: string; videoLink: string }) {
    return this.tasksService.createTask(body.description, body.imageUrl, body.videoLink);
  }

  @Post(':id/assign')
  assignTask(@Param('id') taskId: string, @Body() body: { userId: string }) {
    return this.tasksService.assignTask(taskId, body.userId);
  }

  @Post(':id/complete')
  completeTask(@Param('id') taskId: string, @Body() body: { userId: string }) {
    return this.tasksService.completeTask(taskId, body.userId);
  }

  // @Post('upload-image')
  // // @UseInterceptors(FileInterceptor('image'))
  // @UseInterceptors(FileInterceptor('image', multerOptions))
  // uploadTaskImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: { taskId: string },
  // ) {
  //   return this.tasksService.attachImageToTask(body.taskId, file.filename);
  // }
}
