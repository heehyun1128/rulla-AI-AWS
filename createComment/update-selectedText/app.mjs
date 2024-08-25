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
  const body = event.body ? JSON.parse(event.body) : null;

  if (!body.selectedTextId || !body) {
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

  try {
    const { selectedTextId, ...updateFields } = body;

    const existingSelectedText = await SelectedTextModel.get({
      selectedTextId,
    });
    if (!existingSelectedText) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "SelectedText not found" }),
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        },
      };
    }

    const updatedSelectedText = await SelectedTextModel.update(
      { selectedTextId },
      updateFields,
      {
        return: "item",
      }
    );

    const response = {
      statusCode: 200,
    
      body: JSON.stringify({
        message: "Successfully updated selectedText",
        selectedText: updatedSelectedText,
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
