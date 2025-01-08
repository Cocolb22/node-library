import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return await this.findById(id);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
