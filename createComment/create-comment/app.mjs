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
      required: true,
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

  const requiredFields = [
    "commentId",
    "content",
    "selectedText",
    "transcriptId",
    "userId",
  ];
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    console.error("Missing required fields:", missingFields);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      }),
    };
  }

  const { commentId, content, selectedText, transcriptId, userId } = body;
  try {
    const newComment = new CommentModel({
      commentId,
      content,
      selectedText,
      transcriptId,
      userId,
    });
    await newComment.save();

    console.log("Comment created successfully:", newComment);

    const response = {
      statusCode: 201,
      body: JSON.stringify({
        message: "Successfully created a comment",
        comment: newComment,
      }),
    };

    return response;
  } catch (err) {
    console.error("Error creating comment:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
    };
  }
};
