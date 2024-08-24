import dynamoose from "dynamoose";

export const CommentFileSchema=new dynamoose.Schema({
    "commentFileId":{
        type:String
    },
    "commentId":String,
    "imageURL":String,
    "uploadedBy":String

}, {
    timestamps: true 
})

const CommentFileModel=dynamoose.model("CommentFiles",CommentFileSchema)


export default CommentFileModel