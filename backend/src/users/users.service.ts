/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
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
  constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>) {}

  async createUser(email: string, password: string, parentId?: string): Promise<Users> {
    const parent: any = parentId ? await this.userModel.findById(parentId) : null;

    const user = new this.userModel({
      email,
      password,
      status: 'internship',
      parent: parent ? parent._id : null,
      internshipExpiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    await user.save();

    if (parent) {
      parent.children.push(user._id);
      await parent.save();
    }

    return user;
  }

  async updateStatus(userId: string, status: 'internship' | 'regular'): Promise<Users> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    user.accountType = status;
    return await user.save();
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

