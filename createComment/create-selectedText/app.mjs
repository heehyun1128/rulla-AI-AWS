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
import { v4 as uuidv4 } from 'uuid';

export const SelectedTextSchema = new dynamoose.Schema(
  {
    selectedTextId: {
      type: String,
    },

    startIndex: Number,
    endIndex: Number,
    transcriptId: String,
  },
  {
    timestamps: true,
  }
);

const SelectedTextModel = dynamoose.model("SelectedTexts", SelectedTextSchema);

export const lambdaHandler = async (event) => {
  const body = event.body ? JSON.parse(event.body) : null;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }
  const { startIndex, endIndex, transcriptId } = body;
  try {
    const selectedTextId = uuidv4();
    const newSelectedText = new SelectedTextModel({
      selectedTextId,

      startIndex,
      endIndex,
      transcriptId,
      // createdAt: new Date().toISOString(),
    });
    await newSelectedText.save();

    const response = {
      statusCode: 201,

      body: JSON.stringify({
        message: "Successfully created a selected text",
        selectedText: newSelectedText,
      }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };

    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",

        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }
};
