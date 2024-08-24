import dynamoose from "dynamoose";

export const TranscriptSchema=new dynamoose.Schema({
    "transcriptId":{
        type:String
    },
    "content":String,

}, {
    timestamps: true 
})

const TranscriptModel=dynamoose.model("Transcripts",TranscriptSchema)

export default TranscriptModel