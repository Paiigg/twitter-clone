import { Schema, model, models } from "mongoose";

const TweetSchema = new Schema(
  {
    tweet: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    imageProfile: {
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
