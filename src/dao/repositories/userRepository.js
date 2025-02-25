import { UserModel } from "../models/user.js";

export class UserRepository {
  async findById(id) {
    return await UserModel.findById(id);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(userData) {
    return await UserModel.create(userData);
  }
}
