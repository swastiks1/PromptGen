import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/user";

// Checkout Next Auth documentation for more info

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        })
    ],
    callbacks: {
        async session({ session }) {
          // store the user id from MongoDB to session
          const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();
    
          return session;
        },
    
    async signIn({ account, profile, user, credentials }) {
        try {
            // serverless route->which means its a lambda function that open up only when it is called
            await connectToDB();

            // check if a ueser already exists
            const userExists = await User.findOne({ email: profile.email });

            // if not create a new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture,
                });
            }


            return true;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    },
}

})

export { handler as GET, handler as POST }