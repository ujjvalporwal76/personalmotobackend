import mongoose from "mongoose";

const mongoUrl = process.env.DATABASE;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
