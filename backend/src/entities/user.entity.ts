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

export type UsersDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  parent: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  children: Types.ObjectId[];

  @Prop({ default: 0 })
  funds: number;

  @Prop({ enum: ['internship', 'regular'], default: 'internship' })
  accountType: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop()
  internshipExpiry: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
