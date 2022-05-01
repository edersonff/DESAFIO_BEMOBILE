import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sale from 'App/Models/Sale';

import getClientByAuth from '../../../helpers/get_client_by_auth';

export default class SalesController {
    public async index({auth, response}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get sale
            const sale = await Sale.query().where({clientId: client.id}).preload("products").withAggregate('products', (query)=>{
                // sum all products price
                query.sum('price').as('price');
            });

            // verify if sale exists
            if(!sale[0]){
                response.status(404)
                return{message:"Compras não encontrado"}
            }
            
            // set total_price to product's sum
            sale[0].total_price = sale[0].$extras.price;

            return{
                data: sale[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async store({auth, response}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth); 

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // create sale
            const sale = await Sale.create({clientId: client.id})
            return{
                message: "Compra criada!",
                data: sale
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async show({auth, request, response}:HttpContextContract){
        const id = request.param('id');

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado a compra!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get sale
            const sale = await Sale.query().where({clientId: client.id}).preload("products").withAggregate('products', (query)=>{
                // sum all products price
                query.sum('price').as('price');
            });

            // verify if sale exists
            if(!sale[0]){
                response.status(404)
                return{message:"Compras não encontrado"}
            }
            
            // set total_price to product's sum
            sale[0].total_price = sale[0].$extras.price;

            return{
                data: sale[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }   
    }
    public async completed({auth, response}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get sale
            const sale = await Sale.query().where({clientId: client.id}).where({finished: false});

            // verify if sale exists
            if(!sale[0]){
                response.status(404)
                return{message:"Compra não encontrado"}
            }

            // delete sale
            sale[0].finished = true;

            await sale[0].save();

            return{
                message: "Compra completa!",
                data: sale
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async destroy({auth, request, response}:HttpContextContract){
        const id = request.param('id');

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado a compra!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get sale
            const sale = await Sale.query().where({clientId: client.id}).where({id:id});

            // verify if sale exists
            if(!sale[0]){
                response.status(404)
                return{message:"Compra não encontrado"}
            }

            // delete sale
            await sale[0].delete();

            return{
                message: "Compra excluida!",
                data: sale[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
}
