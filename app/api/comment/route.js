import { connectToDB } from "@/utils/database";
import Comment from "@/models/comments";

export async function POST(req) {
  await connectToDB();

  try {
    const body = await req.json();

    let newComment = await Comment.create(body);
    newComment = await newComment.populate("authorId");

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
