import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Database connect');
        
    } catch (error) {
        console.log(`Error on connecting to databse: ${error}`);
        
    }
}