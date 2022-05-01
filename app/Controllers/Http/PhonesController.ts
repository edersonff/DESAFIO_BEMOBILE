import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import getClientByAuth from '../../../helpers/get_client_by_auth';
import Phone from'../../Models/Phone';

export default class PhonesController {

    public async index({auth, response}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get Phone
            const phoneSearch = await Phone.query().where({clientId: client.id});

            // verify if phone exists
            if(!phoneSearch[0]){
                response.status(404)
                return{message:"Celulares não encontrado"}
            }

            return{
                data: phoneSearch
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async store({auth, request, response}:HttpContextContract){
        const {phone} = request.body();

        // verify body request
        if(!phone){
            response.status(422)
            return{message:"É necessario preencher o numero de celular para prosseguir"}
        }

        // get client by auth
        const client = await getClientByAuth(auth); 

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        //verify if phone exists
        const phoneExists = await Phone.find({phone});
        if(phoneExists){
            response.status(409)
            return{
                message:"Telefone já cadastrado!"
            }
        }


        try{
            // create phone
            const phoneNew = await Phone.create({phone, clientId: client.id})
            return{
                message: "Celular criado!",
                data: phoneNew
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
            return{message: "Não foi especificado o celular!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get phone
            const phoneSearch = await Phone.query().where({clientId: client.id}).where({id:id});

            // verify if phone exists
            if(!phoneSearch[0]){
                response.status(404)
                return{message:"Celular não encontrado"}
            }

            return{
                data: phoneSearch[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }   
    }
    public async update({auth, request, response}:HttpContextContract){
        const {phone} = request.body();
        const id = request.param('id');

        // verify body request
        if(!phone){
            response.status(422)
            return{message:"É necessario preencher o numero de celular para prosseguir"}
        }

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado o celular!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get phone
            const phoneUpdated = await Phone.query().where({clientId: client.id}).where({id:id});
            
            // verify if phone exists
            if(!phone[0]){
                response.status(404)
                return{message:"Celular não encontrado"}
            }

            // update phone using body
            phoneUpdated[0].phone = phone;

            // save update phone
            await phoneUpdated[0].save();

            return{
                message: "Celular editado!",
                data: phoneUpdated
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
            return{message: "Não foi especificado o celular!"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        try{
            // get phone
            const phoneDeleted = await Phone.query().where({clientId: client.id}).where({id:id});

            // verify if phone exists
            if(!phoneDeleted[0]){
                response.status(404)
                return{message:"Celular não encontrado"}
            }

            // delete phone
            await phoneDeleted[0].delete();

            return{
                message: "Celular excluido!",
                data: phoneDeleted
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
}
