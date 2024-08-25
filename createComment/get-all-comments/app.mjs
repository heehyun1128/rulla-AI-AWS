/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
import dynamoose from "dynamoose";

export const CommentSchema=new dynamoose.Schema({
  "commentId":{
      type:String
  },
  "content":String,
  "transcriptId": String,
  "userId": String,
  "selectedTextId": String,
  // "commentImageUrl": { type: String, required: false },

}, {
  timestamps: true 
})

const CommentModel = dynamoose.model("Comments", CommentSchema);

export const lambdaHandler = async (event) => {
  try {
    // Fetch all comments
    const comments = await CommentModel.scan().exec();

    return {
      statusCode: 200,
      body: JSON.stringify(comments),
    };
  } catch (err) {
    console.error("Error fetching comments:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` })
    };
  }
};
