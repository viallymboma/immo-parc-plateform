import { Document } from 'mongoose';

/* eslint-disable prettier/prettier */
import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Packages extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  level: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: Map, of: String }) // Dynamic additional options
  options?: Map<string, string>;
}

export const PackagesSchema = SchemaFactory.createForClass(Packages);
