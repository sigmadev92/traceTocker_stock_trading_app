"use server";

import { connectToDBViaMongoose } from "@/database/mongoose";

export const getAllUserDNSForNewsEmail = async () => {
  try {
    const mongoose = await connectToDBViaMongoose();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Mongoose Connection not connected");
    }
    const users = await db
      .collection("user")
      .find(
        {
          email: { $exists: true, $ne: null },
        },
        { projection: { _id: 1, email: 1, name: 1, country: 1 } }
      )
      .toArray();
    return users
      .filter((user) => user.email && user.name)
      .map((user) => ({
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
      }));
  } catch (error) {
    console.log(error);
    return [];
  }
};
