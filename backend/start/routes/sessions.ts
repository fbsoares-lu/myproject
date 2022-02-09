import Route from '@ioc:Adonis/Core/Route'

Route.post('sessions/signin', 'Auth/SessionsController.signIn');
Route.post('sessions/signup', 'UsersController.store');
