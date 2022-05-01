import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import getClientByAuth from '../../../helpers/get_client_by_auth';
import getUserByAuth from '../../../helpers/get_user_by_auth';

export default class ClientsController {
    public async index({response}:HttpContextContract){
        try{
            // get client
            const client = await Client.all();
            response.status(200);
            return{
                data: client
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }

    }
    public async store({auth, request, response}:HttpContextContract){
        // get body request
        const {name, cpf} = request.body();

        // verify body
        if(!name){
            response.status(422)
            return{
                message:"É necessario preencher o email para prosseguir"
            }
        }
        if(!cpf){
            response.status(422)
            return{
                message:"É necessario preencher o cpf para prosseguir"
            }
        }

        // get user by auth
        const user = await getUserByAuth(auth)
        const user_id = user?.id;
        
        // verify if user return null
        if(!user){
            response.status(400)
            return{message:"Usuário indefinido!"}
        }

        // verify if clients is already registered
        const client = await getClientByAuth(auth);

        if(client){
            response.status(422)
            return{
                message:"Cliente já está cadastrado!"
            }
        }

        try{
            // create client
            const client = await Client.create({name,cpf, user_id})
    
            response.status(200)
            return {
                message: "Cliente criado!",
                data: client
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async show({response, request}:HttpContextContract){
        // get id param
        const {id, date} = request.params();
        
        try{
            // get client by id
            const client = await Client.query().where({id}).preload("sales", (sale)=>{
                if(date){ 
                    // filter by date
                    const month = date.split('-')[0], year = date.split('-')[1];
                    
                    // setting querys
                    if(year)
                        sale.whereRaw("year(created_at) = "+year);
                    if(month && month != 0)
                        sale.whereRaw("month(created_at) = "+month);
                }  
                // order by date
                sale.orderBy("createdAt");
            });

            // verify if client exists
            if(!client[0]){
                response.status(404);
                return{
                    message: "Cliente não encontrado"
                }
            }
            response.status(200);
            return{
                data: client[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }

    }
    public async update({response, request, auth}:HttpContextContract){
        // get body request
        const {name, cpf} = request.body();

        // get user by id
        const client = await getClientByAuth(auth);

        // verify if client return null
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido!"}
        }

        // update client using body
        client.name = name;
        client.cpf = cpf;
        
        try{
            // update client
            await client.save();
            
            response.status(200)
            return{
                message: "Cliente editado!",
                data: client
            }

        }catch(err){
            response.status(500);
            return{message: err}
        }
        
    }
    public async destroy({response, auth}:HttpContextContract){
        // get client by auth
        const client = await getClientByAuth(auth);

        // verify if client return null
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido!"}
        }

        try{
            // destroy client
            await client.delete();
            
            response.status(200)
            return{
                message: "Cliente excluido!"
            }
        } catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async me({response, auth}:HttpContextContract){
        // get client id
        const id = (await getClientByAuth(auth))?.id;
        
        // verify if client exists
        if(!id){
            response.status(404);
            return{
                message: "Cliente não encontrado"
            }
        }

        try{
            // get client
            const client = await Client.query().where({id}).preload('addresses').preload('phones').preload('sales');
            response.status(200);
            return{
                data: client
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }

    }
}
