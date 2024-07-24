import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async(request,{params})=>{

    try{
        await connectToDB();

        // here we will get the profile of the users using their id as dynamic route to navigate
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts),{status : 200})

    }catch(error){
        return new Response("Failed to fetch all prompts",{status : 500})
    }

}