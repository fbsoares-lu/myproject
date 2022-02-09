import User from "App/Models/User";
import { DateTime } from "luxon";

interface IUserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  birthday: DateTime;
  mothersName: string;
  status: string;
}

export default class UserService {
  static async store(payload: IUserData) {
    try {
      const user = await User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        cpf: payload.cpf,
        birthday: payload.birthday,
        mothersName: payload.mothersName,
        status: payload.status
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async index(page: 1) {
    try {
      const query = await User.query().paginate(page, 10);

      return query;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async show(userId: number) {
    try {
      const user = await User.find(userId);

      if (!user) {
        throw new Error('User does not exists');
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(userId: number, payload: IUserData) {
    try {
      const user = await User.find(userId);

      if (!user) {
        throw new Error('User does not exists');
      }

      user.merge({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        cpf: payload.cpf,
        birthday: payload.birthday,
        mothersName: payload.mothersName,
        status: payload.status
      });
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(userId: number) {
    try {
      const user = await User.find(userId);

      if (!user) {
        throw new Error('User does not exists');
      }

      return await user.delete();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
