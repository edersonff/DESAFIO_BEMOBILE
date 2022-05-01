import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';
import Sale from 'App/Models/Sale';
import ProductSale from 'App/Models/ProductSale';

import getClientByAuth from '../../../helpers/get_client_by_auth';

export default class SalesController {
    public async addProduct({auth, request, response}:HttpContextContract){
        const {productId} = request.body();
        let id;

        // verify body request
        if(!productId){
            response.status(422)
            return{message:"É necessario preencher o produto para prosseguir"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);
        
        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        // get sale not finished
        const saleNotFinished = await Sale.query().where({clientId: client.id}).where({finished: false});

        // create sale if it isn't exists
        if(!saleNotFinished[0]){
            const newSale = await Sale.create({clientId: client?.id})
            id = newSale.id;
        } else{
            id = saleNotFinished[0].id;
        }
        
        // get product
        const product = await Product.query().where({id: productId});

        // check if product exists
        if(!product[0]){
            response.status(404)
            return{message:"Produto não encontrado"}
        }

        try{         
            // get sale
            const sale = await Sale.query().where({id}).where({clientId: client.id});   
            
            // add product to sale
            await ProductSale.create({sale_id: sale[0].id, product_id: product[0].id})

            return{
                message: "Produto adicionado!",
                data: sale,
                product: product
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }        
    }
    public async removeProduct({auth, request, response}:HttpContextContract){
        const id = request.param('id');

        // verify body request
        if(!id){
            response.status(422)
            return{message:"É necessario preencher o produto para prosseguir"}
        }

        // get client by auth
        const client = await getClientByAuth(auth);
        
        // verify if client exists
        if(!client){
            response.status(400)
            return{message:"Cliente indefinido"}
        }

        // get sale not finished
        const saleNotFinished = await Sale.query().where({clientId: client.id}).where({finished: false});

        // create sale if it isn't exists
        if(!saleNotFinished[0]){
            response.status(422)
            return{message:"Não há nenhuma compra para excluir um produto"}
        }

        try{         
            // add product to sale
            const product_sale = await ProductSale.query().where({id: id});

            // check if product is in the sale
            if(!product_sale[0]){
                response.status(422)
                return{message:"O produto não está na compra!"}
            }

            product_sale[0].delete();

            return{
                message: "Produto removido!"
            }
        }catch(err){
            response.status(500);
            return{message: err}
        }        
    }
}
