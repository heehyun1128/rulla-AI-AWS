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

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.error("Error parsing event body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  if (!body.commentId || !body.content || !body.selectedText) {
    console.error("Missing required fields");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  try {
    const existingComment = await CommentModel.get({
      commentId: body.commentId,
    });
    if (!existingComment) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Comment not found" }),
      };
    }

    const updatedComment = await CommentModel.update({
      commentId: body.commentId,
      content: body.content,
      selectedText: body.selectedText,
      transcriptId: body.transcriptId,
      userId: body.userId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Comment updated successfully",
        comment: updatedComment,
      }),
    };
  } catch (error) {
    console.error("Error updating comment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update comment" }),
    };
  }
};
