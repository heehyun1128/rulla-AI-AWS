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
import dynamoose from "dynamoose";

export const SelectedTextSchema = new dynamoose.Schema(
  {
    selectedTextId: {
      type: String,
      hashKey: true,
      required: true,
    },
    selectedText: {
      type: String,
      required: true,
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

const rawHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  let selectedTextId;
  try {
    selectedTextId = event.pathParameters?.selectedTextId;
  } catch (error) {
    console.error("Error parsing event path parameters:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request parameters" }),
    };
  }

  if (!selectedTextId) {
    console.error("Missing required parameter: selectedTextId");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameter: selectedTextId" }),
    };
  }

  try {
    const selectedText = await SelectedTextModel.get({ selectedTextId });
    if (!selectedText) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Selected text not found!" }),
      };
    }

    console.log("Selected text fetched successfully:", selectedText);

    const response = {
      statusCode: 200,
      body: JSON.stringify(selectedText),
    };

    return response;
  } catch (err) {
    console.error("Error fetching selected text:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` }),
    };
  }
};

export const lambdaHandler = corsMiddleware(rawHandler);