import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';

import getClientByAuth from '../../../helpers/get_client_by_auth';

export default class AddressesController {
    public async index({auth, response}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get address
            const address = await Address.query().where({clientId: client.id});

            // verify if address exists
            if(!address[0]){
                response.status(404)
                return{message:"Endereços não encontrado"}
            }

            return{
                data: address
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async store({auth, request, response}:HttpContextContract){
        const {cep, country, city, street, number} = request.body();

        // verify body request
        if(!cep){
            response.status(422)
            return{message:"É necessario preencher o cep para prosseguir"}
        }
        if(!country){
            response.status(422)
            return{message:"É necessario preencher o pais para prosseguir"}
        }
        if(!city){
            response.status(422)
            return{message:"É necessario preencher a cidade para prosseguir"}
        }
        if(!street){
            response.status(422)
            return{message:"É necessario preencher a rua para prosseguir"}
        }
        if(!number){
            response.status(422)
            return{message:"É necessario preencher o numero da residência para prosseguir"}
        }

        // get client by auth
        const client = await getClientByAuth(auth); 

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // create address
            const address = await Address.create({cep, country, city, street, number, clientId: client.id})
            return{
                message: "Endereço criado!",
                data: address
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
            return{message: "Não foi especificado o endereço!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get address
            const address = await Address.query().where({clientId: client.id}).where({id:id});

            // verify if address exists
            if(!address[0]){
                response.status(404)
                return{message:"Endereço não encontrado"}
            }

            return{
                data: address
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }   
    }
    public async update({auth, request, response}:HttpContextContract){
        const {cep, country, city, street, number} = request.body();
        const id = request.param('id');

        // verify body request
        if(!cep){
            response.status(422)
            return{message:"É necessario preencher o cep para prosseguir"}
        }
        if(!country){
            response.status(422)
            return{message:"É necessario preencher o pais para prosseguir"}
        }
        if(!city){
            response.status(422)
            return{message:"É necessario preencher a cidade para prosseguir"}
        }
        if(!street){
            response.status(422)
            return{message:"É necessario preencher a rua para prosseguir"}
        }
        if(!number){
            response.status(422)
            return{message:"É necessario preencher o numero da residência para prosseguir"}
        }

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado o endereço!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get address
            const address = await Address.query().where({clientId: client.id}).where({id:id});

            // verify if address exists
            if(!address[0]){
                response.status(404)
                return{message:"Endereço não encontrado"}
            }

            // update address using body
            address[0].cep = cep;
            address[0].country = country;
            address[0].city = city;
            address[0].street = street;
            address[0].number = number;

            // save update address
            await address[0].save();

            return{
                message: "Endereço editado!",
                data: address
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
            return{message: "Não foi especificado o endereço!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get address
            const address = await Address.query().where({clientId: client.id}).where({id:id});

            // verify if address exists
            if(!address[0]){
                response.status(404)
                return{message:"Endereço não encontrado"}
            }

            // delete address
            await address[0].delete();

            return{
                message: "Endereço excluido!",
                data: address
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
}
