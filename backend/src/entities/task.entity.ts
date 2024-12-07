/* eslint-disable prettier/prettier */
import {
  Document,
  Types,
} from 'mongoose';

import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  videoLink: string;

  @Prop({ enum: ['unassigned', 'assigned', 'completed', 'overdue'], default: 'unassigned' })
  status: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  assignedTo: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  completedBy: Types.ObjectId[];

  @Prop()
  dueDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

