import dynamoose from "dynamoose";

export const SelectedTextSchema=new dynamoose.Schema({
    "SelectedTextId":{
        type:String
    },
    "content":String,
    "startIndex":Number,
    "endIndex":Number,
    "transcriptId": String,

   

}, {
    timestamps: true 
})

const SelectedTextModel=dynamoose.model("SelectedTexts",SelectedTextSchema)

export default SelectedTextModel