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
import { corsMiddleware } from './cors.mjs';
import dotenv from 'dotenv';
dotenv.config();

export const SelectedTextSchema = new dynamoose.Schema(
  {
    selectedTextId: {
      type: String,
      hashKey: true,
    },
    selectedText: String,
    transcriptId: String,
  },
  {
    timestamps: true,
  }
);

const SelectedTextModel = dynamoose.model("SelectedTexts", SelectedTextSchema);

const CommentSchema = new dynamoose.Schema(
  {
    commentId: {
      type: String,
      hashKey: true,
    },
    selectedTextId: String,
    content: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const CommentModel = dynamoose.model("Comments", CommentSchema);

const rawHandler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  if (!body || !body.selectedTextId || !body.selectedText || !body.transcriptId || !body.commentId || !body.commentContent || !body.userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }
  const { selectedTextId, selectedText, transcriptId, commentId, commentContent, userId } = body;
  try {
    const newSelectedText = new SelectedTextModel({
      selectedTextId,
      selectedText,
      transcriptId,
    });
    await newSelectedText.save();

    const newComment = new CommentModel({
      commentId,
      selectedTextId,
      content: commentContent,
      userId,
    });
    await newComment.save();

    const response = {
      statusCode: 201,
      body: JSON.stringify({
        message: "Successfully created a selected text with comment",
        selectedText: newSelectedText,
        comment: newComment,
      }),
    };

    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
    };
  }
};

export const lambdaHandler = corsMiddleware(rawHandler);