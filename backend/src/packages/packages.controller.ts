import { Packages } from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PackageService } from './packages.service';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Body() data: Partial<Packages>): Promise<Packages> {
    return this.packageService.createPackage(data);
  }

  @Get()
  async findAll(): Promise<Packages[]> {
    return this.packageService.findAllPackages();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Packages> {
    return this.packageService.findPackageById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Packages>): Promise<Packages> {
    return this.packageService.updatePackage(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.packageService.deletePackage(id);
  }
}
