import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado a MongoDB");
  } catch (error) {
    console.error("🔴 Error al conectar a MongoDB:", error);
    process.exit(1); // Detener el servidor si hay error
  }
};