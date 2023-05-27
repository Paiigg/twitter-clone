import { connectToDB } from "@/utils/database";

import Tweets from "@/models/tweets";

export async function GET(req) {
  await connectToDB();

  try {
    const tweets = await Tweets.find({}).populate("authorId");
    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDB();

  try {
    const body = await req.json();
    const newTweets = await Tweets.create(body);

    return new Response(JSON.stringify(newTweets), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
