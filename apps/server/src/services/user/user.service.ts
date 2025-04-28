import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user/user.schema';

export interface PikkuKirjastoUser {
  userId: string;
  _id: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'pikkukirjasto-db') private userModel: Model<User>,
  ) {}

  public async getUserById(id: string): Promise<User | any> {
    const user = await this.userModel.findOne({
      userId: id,
    });

    return user;
  }

  public async getUserByDeviceId(deviceId: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      userId: deviceId,
    });

    return user;
  }

  public async createUser(
    createUserDto: Pick<PikkuKirjastoUser, 'userId'>,
  ): Promise<User> {
    const createdUser = this.userModel.create(createUserDto);
    return createdUser;
  }
}
