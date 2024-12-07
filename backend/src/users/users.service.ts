/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Packages } from 'src/entities/package.entity';
import {
  Users,
  UsersDocument,
} from 'src/entities/user.entity';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Packages.name) private readonly packageModel: Model<any>
  ) {}
  // constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>) {}


  async createUser(password: string, packageId: string, parentId?: string, email?: string,): Promise<Users> {
    const parent: any = parentId ? await this.userModel.findById(parentId) : null;

    const pkg = packageId ? await this.packageModel.findById(packageId) : null;

    if (packageId && !pkg) throw new Error('Package not found');

    const user = new this.userModel({
      email,
      password,
      status: 'active',
      accountType: 'internship', 
      parent: parent ? parent._id : null,
      package: pkg ? pkg._id : null,
      internshipExpiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    await user.save();

    if (parent) {
      parent.children.push(user._id);
      await parent.save();
    }

    return user;
  }

  async createSuperAdmin(phone: string, password: string, email?: string,): Promise<Users> {
    console.log(phone, password, email, "in the service")
    const existingAdmin = await this.userModel.findOne({ role: 'super_admin' });
    if (existingAdmin) throw new Error('Super admin already exists');
  
    const superAdmin = new this.userModel({
      email,
      password,
      phone,
      status: 'active',
      accountType: 'regular', 
      role: 'super_admin',
      parentId: null, // No parent for super admin
      children: [],
    });
  
    return superAdmin.save();
  }

  async updateStatus(userId: string, status: 'internship' | 'regular'): Promise<Users> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    user.accountType = status;
    return await user.save();
  }

  async assignPackageToUser(userId: string, packageId: string): Promise<Users> {
    const user = await this.userModel.findById(userId);
    const pkg = await this.packageModel.findById(packageId);
  
    if (!user) throw new Error('User not found');
    if (!pkg) throw new Error('Package not found');
  
    user.package = pkg._id;
    return user.save();
  }
  

  async findAllUsers(): Promise<Users | null> {
    const result: any = await this.userModel.find();
    console.log(result, "hello result"); 
    return result;
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.userModel.findOne({ email });
  }

  async findUserById(userId: string): Promise<Users | null> {
    return this.userModel.findById(userId);
  }

  async findUserByIdForReport(userId: string): Promise<Users | null> {
    return this.userModel
      .findById(userId)
      .populate('children')
      .populate('tasks');
  }

  async getDownline(userId: string): Promise<Users[] | null> {
    const user: any = await this.userModel
      .findById(userId)
      .populate('children', 'email accountType funds'); // Adjust fields as necessary

    return user?.children || null;
  }
}

