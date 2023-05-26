import { connectToDB } from "@/utils/database";
import Comment from "@/models/comments";

export async function GET(req, ctx) {
  await connectToDB();

  // blog id !!
  const id = ctx.params.id;

  try {
    const comments = await Comment.find({ tweetId: id }).populate("authorId");

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, ctx) {
  await connectToDB();

  const id = ctx.params.id;
  try {
    const comment = await Comment.findById(id).populate("authorId");

    await Comment.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ msg: "Successfully deleted comment" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
