import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}),
    email: schema.string({}, [
      rules.email(), rules.unique({ table: 'users', column: 'email' })
    ]),
    password: schema.string({}, [ rules.confirmed() ]),
    phone: schema.string(),
    cpf: schema.string(),
    birthday: schema.date({ format: 'yyyy-MM-dd' }),
    mothersName: schema.string(),
    status: schema.enum(['APPROVED', 'NOT_APPROVED'] as const)
  });

  public messages = {
    required: 'This  {{ field }} is required'
  }
}
