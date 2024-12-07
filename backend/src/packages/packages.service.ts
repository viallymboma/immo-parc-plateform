import { Model } from 'mongoose';
import { Packages } from 'src/entities/package.entity';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PackageService {
  constructor(@InjectModel(Packages.name) private readonly packageModel: Model<any>) {}

  async createPackage(data: Partial<Packages>): Promise<Packages> {
    const pkg = new this.packageModel(data);
    return pkg.save();
  }

  async findAllPackages(): Promise<Packages[]> {
    return this.packageModel.find().exec();
  }

  async updatePackage(packageId: string, data: Partial<Packages>): Promise<Packages> {
    return this.packageModel.findByIdAndUpdate(packageId, data, { new: true }).exec();
  }

  async deletePackage(packageId: string): Promise<void> {
    await this.packageModel.findByIdAndDelete(packageId).exec();
  }

  async findPackageById(packageId: string): Promise<Packages | null> {
    return this.packageModel.findById(packageId).exec();
  }
}
