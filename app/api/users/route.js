import { connectToDB } from "@/utils/database";

import User from "@/models/user";

export async function GET(req) {
  await connectToDB();

  try {
    const user = await User.find({}).populate("_id");
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
