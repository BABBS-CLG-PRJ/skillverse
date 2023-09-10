import mongoose from 'mongoose';
async function connectToDatabase() {
    if (mongoose.connection.readyState == 0) { // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Database Connection Established");
        } catch (error) {
            console.error("Error connecting to the database", error);
            throw error;
        }
    }
}
export { connectToDatabase };