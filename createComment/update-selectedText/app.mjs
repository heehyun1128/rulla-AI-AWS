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
    "selectedTextId": {
      type: String,
    },
 
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
 
  const body = event.body ? JSON.parse(event.body) : null;

  if (!body.selectedTextId || !body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  try {
    const { selectedTextId, ...updateFields } = body;

    const existingSelectedText = await SelectedTextModel.get({ selectedTextId });
    if (!existingSelectedText) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "SelectedText not found" }),
      };
    }
    

    const updatedSelectedText = await SelectedTextModel.update(
      { selectedTextId },
      updateFields,
      {
        return: "item",
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully updated selectedText",
        selectedText: updatedSelectedText,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` })
    };
  }
};
