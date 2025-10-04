import { Watchlist } from "@/database/models/watchlist.model";
import { connectToDBViaMongoose } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  try {
    const mongoose = await connectToDBViaMongoose();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Mongodb connection not found");
    }

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return [];

    const userId = (user.id as string) || String(user._id || user.id || "");

    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (error) {
    console.log("Error while fetching symboles for a user", error);
    return [];
  }
}
