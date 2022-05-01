import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";

export default class ProductsController {

    public async index({response}:HttpContextContract){

        try{
            // get Product
            const productSearch = await Product.query().orderBy('title').where({deleted: false});

            // verify if product exists
            if(!productSearch){
                response.status(404)
                return{message:"Produtoes não encontrado"}
            }

            return{
                data: productSearch
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async store({request, response}:HttpContextContract){
        const {title, author, description, quantity, price, publication_date, publishing_company, language} = request.body();
        
        // verify body request
        if(!title){
            response.status(422)
            return{message:"É necessario preencher o titulo do livro para prosseguir"}
        }
        if(!author){
            response.status(422)
            return{message:"É necessario preencher o author do livro para prosseguir"}
        }
        if(!description){
            response.status(422)
            return{message:"É necessario preencher a descrição do livro para prosseguir"}
        }
        if(!quantity){
            response.status(422)
            return{message:"É necessario preencher a quantidade para prosseguir"}
        }
        if(!price){
            response.status(422)
            return{message:"É necessario preencher preço para prosseguir"}
        }
        if(!publication_date){
            response.status(422)
            return{message:"É necessario preencher a data de publicação para prosseguir"}
        }

        try{
            // create product
            const productNew = await Product.create({title, author, description, publication_date, quantity, price, publishing_company, language})
            return{
                message: "Produto criado!",
                data: productNew
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
    public async show({request, response}:HttpContextContract){
        const id = request.param('id');

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado o produto!"}
        }

        try{
            // get product
            const productSearch = await Product.query().where({id:id});

            // verify if product exists
            if(!productSearch[0]){
                response.status(404)
                return{message:"Produto não encontrado"}
            }

            return{
                data: productSearch[0]
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }   
    }
    public async update({request, response}:HttpContextContract){
        const {title, author, description, quantity, price, publication_date, publishing_company, language} = request.body();
        const id = request.param('id');

        // verify body request
        if(!title){
            response.status(422)
            return{message:"É necessario preencher o titulo do livro para prosseguir"}
        }
        if(!author){
            response.status(422)
            return{message:"É necessario preencher o author do livro para prosseguir"}
        }
        if(!description){
            response.status(422)
            return{message:"É necessario preencher a descrição do livro para prosseguir"}
        }
        if(!quantity){
            response.status(422)
            return{message:"É necessario preencher a quantidade para prosseguir"}
        }
        if(!price){
            response.status(422)
            return{message:"É necessario preencher preço para prosseguir"}
        }
        if(!publication_date){
            response.status(422)
            return{message:"É necessario preencher a data de publicação para prosseguir"}
        }

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado o produto!"}
        }

        try{
            // get product
            const product = await Product.query().where({id:id});
            
            // verify if product exists
            if(!product[0]){
                response.status(404)
                return{message:"Produto não encontrado"}
            }

            // update product using body
            product[0].title = title;
            product[0].author = author;
            product[0].description = description;
            product[0].publication_date = publication_date;
            product[0].quantity = quantity;
            product[0].price = price;
            product[0].publishing_company = publishing_company;
            product[0].language = language;

            // save update product
            await product[0].save();

            return{
                message: "Produto editado!",
                data: product
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }        
    }
    public async destroy({request, response}:HttpContextContract){
        const id = request.param('id');

        // verify id param
        if(!id){
            response.status(422)
            return{message: "Não foi especificado o produto!"}
        }

        try{
            // get product
            const product = await Product.query().where({id:id}).where({deleted: false});

            // verify if product exists
            if(!product[0]){
                response.status(404)
                return{message:"Produto não encontrado"}
            }

            // soft delete
            product[0].deleted = true;

            await product[0].save();

            return{
                message: "Produto excluido!",
                data: product
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }
    }
}
