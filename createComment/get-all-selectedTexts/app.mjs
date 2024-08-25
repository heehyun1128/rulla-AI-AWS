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
  try {
    // Fetch all selectedTexts
    const selectedTexts = await SelectedTextModel.scan().exec();

    return {
      statusCode: 200,
      body: JSON.stringify(selectedTexts),
    };
  } catch (err) {
    console.error("Error fetching selectedTexts:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal server error: ${err}` })
    };
  }
};
