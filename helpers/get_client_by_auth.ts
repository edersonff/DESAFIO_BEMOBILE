import Client from "../app/Models/Client";

import getUserById from "./get_user_by_auth";

export default async function getClientByAuth(auth){
        // get user by id
        const user = await getUserById(auth);
        const user_id = user?.id;

        // get client by userId
        const client = await Client.query().where({user_id});
        
        if(!client[0])
                return null

        return client[0];
}