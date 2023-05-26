import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: "Tweets",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = models?.Comment || model("Comment", CommentSchema);

export default Comment;
