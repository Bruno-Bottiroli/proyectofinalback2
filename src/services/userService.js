import { UserRepository } from "../dao/repositories/userRepository.js";

const userRepository = new UserRepository();

export class UserService {
  async getUserById(id) {
    return await userRepository.findById(id);
  }

  async getUserByEmail(email) {
    return await userRepository.findByEmail(email);
  }

  async createUser(userData) {
    return await userRepository.create(userData);
  }
}
