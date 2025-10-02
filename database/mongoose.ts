import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDBViaMongoose = async () => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be set within .env");
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
    console.log(
      `Connected to database using Mongoose in ${process.env.NODE_ENV} mode successsfully`
    );
  } catch (error) {
    console.log(error);
    cached.promise = null;
    throw error;
  }
  return cached.conn;
};
