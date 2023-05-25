import { Schema, model, models } from "mongoose";

const TweetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      min: 6,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Tweets = models.Tweets || model("Tweets", TweetSchema);
export default Tweets;
