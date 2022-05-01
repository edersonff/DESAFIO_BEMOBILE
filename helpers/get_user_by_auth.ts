import User from "App/Models/User";

export default async function getUserByAuth(auth){
        // get id by auth
        const id = auth.user?.id;

        // get user by id
        const user = await User.query().where({id});

        if(!user[0])
                return null

        return user[0];
}