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
  "commentImageUrl": { type: String, required: false },

}, {
  timestamps: true 
})


const CommentModel = dynamoose.model("Comments", CommentSchema);

export const SelectedTextSchema = new dynamoose.Schema(
  {
    "selectedTextId": {
      type: String,
    },
    // "content": String,
    "startIndex": Number,
    "endIndex": Number,
    "transcriptId": String,
  },
  {
    timestamps: true,
  }
);

const SelectedTextModel = dynamoose.model("SelectedTexts", SelectedTextSchema);

export const lambdaHandler = async (event) => {
  // const { commentId } = event.pathParameters || {};

  const body = event.body ? JSON.parse(event.body) : null;
  if (!body.commentId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing commentId" }),
    };
  }

  try {
    const { commentId } = body;
    const comment = await CommentModel.get({ commentId });
    if (!comment) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Comment not found!" }),
      };
    }
    const { selectedTextId } = comment;

    if (selectedTextId) {
      await SelectedTextModel.delete({ selectedTextId });
    }
    await CommentModel.delete({ commentId });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully deleted comment" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` })
    };
  }
};
