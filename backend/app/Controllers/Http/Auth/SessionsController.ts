import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignInValidator from 'App/Validators/Auth/SignInValidator'

export default class SessionsController {
  public async signIn({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(SignInValidator);

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password);
      return response.json(token);
    } catch(error) {
      return response.json({ error: error.message})
    }
  }
}
