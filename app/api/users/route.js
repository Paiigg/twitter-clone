import { connectToDB } from "@/utils/database";

import User from "@/models/user";

export async function GET() {
  await connectToDB();

  try {
    const user = await User.find({});
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
