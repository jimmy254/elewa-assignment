import {
  HttpException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { CreateUserDto, UserRole } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Create a new user instance
  async create(createUser: CreateUserDto): Promise<User | HttpException> {
    //Generate a salt for hashing the password
    const salt = randomBytes(20).toString('hex');
    const hashedPassword = pbkdf2Sync(
      createUser.password,
      salt,
      1000,
      100,
      'sha512',
    ).toString('hex');

    try {
      const newUser = new User();
      newUser.hashedPassword = hashedPassword;
      newUser.salt = salt;
      newUser.email = createUser.email;
      switch (createUser.role) {
        case 'Admin':
          newUser.role = UserRole.Admin;
          break;
        case 'Tutor':
          newUser.role = UserRole.Tutor;
          break;

        default:
          newUser.role = UserRole.Student;
      }
      const addedUser = new this.userModel(newUser);
      console.log(`New user created: ${addedUser.email}`);
      return addedUser.save();
    } catch (error) {
      return new NotImplementedException(
        `Something went wrong!. ${error.error}-${error.message}`,
      );
    }
  }

  //Return all available courses
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  //Get on user document based on given filtering criteria
  async findOne(criteria: Object) {
    return this.userModel.findOne(criteria).exec();
  }
}
