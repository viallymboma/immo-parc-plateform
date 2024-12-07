/* eslint-disable prettier/prettier */
import {
  Packages,
  PackagesSchema,
} from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PackageService } from './packages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Packages.name, schema: PackagesSchema }]),
  ],
  providers: [PackageService],
  exports: [PackageService, MongooseModule],
})
export class PackageModule {}
