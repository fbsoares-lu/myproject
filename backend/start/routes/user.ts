import Route from '@ioc:Adonis/Core/Route'

Route.get('users', 'UsersController.index').middleware(['auth']);
Route.get('users/:id', 'UsersController.show').middleware(['auth']);
Route.post('users', 'UsersController.store');
Route.put('users/:id', 'UsersController.update').middleware(['auth']);
Route.delete('users/:id', 'UsersController.delete').middleware(['auth']);
