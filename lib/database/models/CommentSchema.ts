import dynamoose from "dynamoose";

export const CommentSchema=new dynamoose.Schema({
    "commentId":{
        type:String
    },
    "content":String,
    "transcriptId": String,
    "userId": String,
    "selectedTextId": String,

}, {
    timestamps: true 
})

const CommentModel=dynamoose.model("Comments",CommentSchema)
export default CommentModel