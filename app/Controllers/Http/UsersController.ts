import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import getUserByAuth from '../../../helpers/get_user_by_auth';

export default class UsersController {
    public async login({auth,request, response}:HttpContextContract){
        // get body requests
        const {email, password} = request.body();

        // verify if user exists using email
        const user = await User.find({email});
        
        if(!user){
            response.status(404);
            return {
                message:'Usuário não encontrado'
            }   
        }

        // verify password
        if (!(await Hash.verify(user.password, password))) {
            response.status(401);
            return {
                message:'Credenciais inválidas'
            }   
        }

        try{
            // generate token
            const token = await auth.use('api').attempt(email,password,{
                expiresIn: '1days'
              });
            return {
                message: "Usuário logado!",
                token
            };
        } catch(err){
            response.status(500);
            return {
                message:'Credenciais inválidas'
            }
        }
    }
    public async register({request, response, auth}:HttpContextContract){
        // get body request
        const {email, password} = request.body();

        // check request body
        if(!email){
            response.status(422)
            return{
                message:"É necessario preencher o email para prosseguir"
            }
        }
        if(!password){
            response.status(422)
            return{
                message:"É necessario preencher a senha para prosseguir"
            }
        }

        // check if email is beeing used
        const userEmail = await User.query().where({email});
        if(userEmail[0]){
            response.status(409)
            return{
                message:"O email já está em uso!"
            }
        }


        try{
            // create user and generate token
            const newUser = await User.create({email,password});
            const token = await auth.use('api').attempt(email,password,{
                expiresIn: '1days'
              });
            return{
                message: "Usuário registrado!",
                data:newUser,
                token
            }
        } catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async update({request, response, auth}:HttpContextContract){
        // get body request
        const {email, password} = request.body();

        // get user by id
        const user = await getUserByAuth(auth)
        //verify if user exists
        if(!user){
            response.status(422)
            return{
                message: "Usúario não encontrado!"
            }
        }

        // update user
        user.email = email;
        user.password = password;

        try{
            // create user and generate token
            await user.save();

            response.status(200)
            return{
                message: "Usuário editado!",
                data:user
            }
        } catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async destroy({auth, response}:HttpContextContract){
        // get user by id
        const user = await getUserByAuth(auth)
        //verify if user exists
        if(!user){
            response.status(422)
            return{
                message: "Usúario não encontrado!"
            }
        }

        try{
            await user.delete();
        } catch(err){
            response.status(500);
            return{message: err}
        }

        response.status(200)
        return{
            message: "Usuario excluido!",
            data: user
        }
        
    }
}
