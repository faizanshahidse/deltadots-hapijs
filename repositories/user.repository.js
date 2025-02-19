import User from '../models/user.model.js';
import { UserDto, EmailAndIdDto } from '../dtos/user.dto.js';

class UserRepository {
  static async create(user = UserDto) {
    const newUser = await User().insert(user).returning('*');
    return newUser[0];
  }

  /**
   * @typedef {Object} User
   * @property {Object} query
   * @property {string} query.email
   * @property {number} query.id
   *
   * @returns {import('knex').Knex.QueryBuilder<User, {}>}
   */
  static async findOne(query = EmailAndIdDto) {
    const user = await User().select('*').where(query).limit(1);
    return user[0];
  }

  static async find() {
    return await User().select('*');
  }

  static async updateById(userId, user = UserDto) {
    const updatedUser = await User()
      .where({ id: userId })
      .update(user)
      .returning('*');
    return updatedUser[0];
  }

  static async deleteById(userId) {
    const deletedUser = await User().where({ id: userId }).del().returning('*');
    return deletedUser[0];
  }
}

export default UserRepository;
