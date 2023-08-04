// Import required modules and libraries
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@utils/database";
import User from "@models/user";

// Create the NextAuth handler
const handler = NextAuth({
    // Configure the authentication providers, in this case, GoogleProvider
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }) 
    ],

    // Define callbacks to handle certain events during the authentication process
    callbacks: {
        // The session callback is used to keep the user logged in even after refreshing the page
        async session({ session }) {
            // Retrieve the user from the database based on the email stored in the session
            const sessionUser = await User.findOne({ email: session.user.email });
            // Assign the user's database ID to the session user object
            session.user.id = sessionUser._id.toString();
            return session;
        },

        // The signIn callback is executed when a user successfully signs in
        async signIn({ profile }) {
            try {
                // Connect to the database
                await connectDB();

                // Check if the user already exists in the database based on their email
                const userExist = await User.findOne({ email: profile.email });

                // If the user doesn't exist, create a new user in the database
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }

                // Return true to indicate successful sign-in
                return true;
            } catch (error) {
                // Log any errors that occur during the sign-in process
                console.log(error);
                // Return false to indicate failed sign-in
                return false;
            }
        }
    }
});

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST };
