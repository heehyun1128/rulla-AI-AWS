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

  if (!body.selectedTextId || !body.startIndex || !body.endIndex) {
    console.error("Missing required fields");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  try {
    const updatedSelectedText = await SelectedTextModel.update(
      {
        selectedTextId: body.selectedTextId,
        startIndex: body.startIndex,
        endIndex: body.endIndex,
        transcriptId: body.transcriptId,
      },
      { return: "item" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully updated selectedText",
        selectedText: updatedSelectedText,
      }),
    };
  } catch (err) {
    console.error("Error updating selectedText:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update the selectedText" }),
    };
  }
};
