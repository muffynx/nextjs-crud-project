import mongoose , { Schema} from "mongoose";

const postSchema = new Schema(

    {
        title: String,
        content:String,
        status:Boolean,
        dueDate:Date
    },
    {
        timestamps: true
    }
    
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
