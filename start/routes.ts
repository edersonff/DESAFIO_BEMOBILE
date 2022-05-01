import Route from '@ioc:Adonis/Core/Route'

import AddressesController from '../app/Controllers/Http/AddressesController'
import ClientsController from '../app/Controllers/Http/ClientsController'
import PhonesController from '../app/Controllers/Http/PhonesController'
import ProductsController from '../app/Controllers/Http/ProductsController'
import SalesController from '../app/Controllers/Http/SalesController'
import UsersController from '../app/Controllers/Http/UsersController'
import SalesProductsController from '../app/Controllers/Http/SalesProductsController'

/* -- API Group -- */

Route.group(()=>{

  /* -- Using resource -- */

  Route.group(()=>{
    Route.resource('/address', 'AddressesController').apiOnly();
    Route.resource('/phone', 'PhonesController').apiOnly();
  }).middleware('auth')

  Route.resource('/product', 'ProductsController').apiOnly();

  /* -- Using resource -- */


  // Sale Routes
  Route.group(()=>{
    Route.get('/', 'SalesController.index') // show all sales
    Route.get('/:id', 'SalesController.show') // show a sale
    Route.delete('/:id', 'SalesController.destroy') // remove a sale
    Route.patch('/', 'SalesController.completed') // mark completed last sale
    // Sales and Products
    Route.group(()=>{
      Route.post('/', 'SalesProductsController.addProduct') // add a product in sale
      Route.delete('/:id', 'SalesProductsController.removeProduct') // remove a product in sale
    }).prefix('/product')

  }).prefix('/sale').middleware('auth');

  // User Routes
  Route.group(()=>{
    Route.post('/register', 'UsersController.register') // register user
    Route.post('/login', 'UsersController.login') // login user
    Route.patch('/', 'UsersController.update').middleware('auth') // update user
    Route.delete('/', 'UsersController.destroy').middleware('auth') // delete user
  }).prefix('/user');
  
  // Client Routes
  Route.group(()=>{
    Route.get('/', 'ClientsController.index').middleware('auth') // show all clients
    Route.get('/:id', 'ClientsController.show') //show a client by id
    Route.get('/:id/:date', 'ClientsController.show') // show a client
    Route.post('/', 'ClientsController.store').middleware('auth') // store client
    Route.patch('/', 'ClientsController.update').middleware('auth') // update client
    Route.delete('/', 'ClientsController.destroy').middleware('auth') // delete client
  }).prefix('/client');

}).prefix('api')

/* -- API Group -- */