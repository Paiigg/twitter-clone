import { connectToDB } from "@/utils/database";
import Tweets from "@/models/tweets";
import User from "@/models/user";

export async function GET(req, ctx) {
  await connectToDB();

  const id = ctx.params.id;

  try {
    const tweets = await Tweets.findById(id)
      .populate("authorId")
      .select("-password");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, ctx) {
  await connectToDB();

  const id = ctx.params.id;
  //   const accessToken = req.headers.get("authorization");
  //   const token = accessToken.split(" ")[1];

  //   const decodedToken = verifyJwtToken(token);

  //   if (!accessToken || !decodedToken) {
  //     return new Response(
  //       JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
  //       { status: 403 }
  //     );
  //   }

  try {
    const body = await req.json();
    const tweets = await Tweets.findById(id).populate("authorId");

    // if (tweets?.authorId?._id.toString() !== decodedToken._id.toString()) {
    //   return new Response(
    //     JSON.stringify({ msg: "Only author can update his tweets" }),
    //     { status: 403 }
    //   );
    // }

    const updatedTweets = await Tweets.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedTweets), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await connectToDB();

  const id = ctx.params.id;

  //   const accessToken = req.headers.get("authorization");
  //   const token = accessToken.split(" ")[1];

  //   const decodedToken = verifyJwtToken(token);

  //   if (!accessToken || !decodedToken) {
  //     return new Response(
  //       JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
  //       { status: 403 }
  //     );
  //   }

  try {
    const tweets = await Tweets.findById(id).populate("authorId");
    // if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
    //   return new Response(
    //     JSON.stringify({ msg: "Only author can delete his blog" }),
    //     { status: 403 }
    //   );
    // }

    await Tweets.findByIdAndDelete(id);

    return new Response(JSON.stringify({ msg: "Successfully deleted tweet" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
