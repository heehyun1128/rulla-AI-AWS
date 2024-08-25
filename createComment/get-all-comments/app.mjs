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

export const CommentSchema = new dynamoose.Schema(
  {
    commentId: {
      type: String,
      hashKey: true,
    },
    content: {
      type: String,
      required: true,
    },
    selectedText: {
      type: String,
      required: true,
    },
    transcriptId: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = dynamoose.model("Comments", CommentSchema);

export const lambdaHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  let transcriptId;
  try {
    transcriptId = event.queryStringParameters?.transcriptId;
  } catch (error) {
    console.error("Error parsing event query parameters:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request parameters" }),
    };
  }

  if (!transcriptId) {
    console.error("Missing required parameter: transcriptId");
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing required parameter: transcriptId",
      }),
    };
  }

  try {
    const comments = await CommentModel.scan("transcriptId")
      .eq(transcriptId)
      .exec();

    console.log("Comments fetched successfully:", comments);

    const response = {
      statusCode: 200,
      body: JSON.stringify(comments),
    };

    return response;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
    };
  }
};
