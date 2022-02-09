import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserService from 'App/Services/UserService';
import CreateUserValidator from 'App/Validators/User/CreateUserValidator';

export default class UsersController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user;
      const page = request.input('page');

      if (!user) {
        throw new Error('Unauthorized');
      }

      const result = await UserService.index(page);
      return response.json(result);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);

    try {
      const user = await UserService.store(payload);
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show({ response, params, auth }: HttpContextContract) {
    try {
      const user = auth.user;

      if (!user) {
        throw new Error('Unauthorized');
      }

      const result = await UserService.show(params.id);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    try {
      const user = auth.user;

      if (!user) {
        throw new Error('Unauthorized');
      }

      await UserService.update(params.id, payload);
      return response.status(201).send;
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    try {
      const user = auth.user;

      if (!user) {
        throw new Error('Unauthorized')
      }

      await UserService.delete(params.id);
      return response.status(201).send;
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
