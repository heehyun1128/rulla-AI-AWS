import CommentModel from "../database/models/CommentSchema";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body ? JSON.parse(event.body) : null;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }
  const { commentId, content, transcriptId, userId, selectedTextId } = body;
  try {
    const newComment = new CommentModel({
      commentId,
      content,
      transcriptId,
      userId,
      selectedTextId,
      // createdAt: new Date().toISOString(),
    });
    await newComment.save();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Successfully created a comment",
        comment: newComment,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
