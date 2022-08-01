import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

class UserService {
  public userModel : UserModel;

  constructor(model: UserModel = new UserModel(connection)) {
    this.userModel = model;
  }

  create = async (user: User): Promise<User> => this.userModel.create(user);

  login = async (user: User): Promise<User[]> => this.userModel.login(user);
}

export default UserService;