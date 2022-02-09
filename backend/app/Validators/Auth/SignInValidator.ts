import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SignInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [ rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string()
  });

  public messages = {
    required: 'This  {{ field }} is required'
  }
}
