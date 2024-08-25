## API DOCUMENTATION

- endpoints

    - GET /getAllComments

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/getAllComments
        
    - GET /getComment

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/getComment
        
    - GET /getAllSelectedTexts

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/getAllSelectedTexts

    - GET /getSelectedText

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/getSelectedText

    - POST /createComment

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/createComment

    
    - POST /createSelectedText

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/createSelectedText

    - DELETE /deleteComment

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/deleteComment

       
    - DELETE /deleteSelectedText

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/deleteSelectedText

    - UPDATE /updateComment

        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/updateComment
    
  
    - UPDATE /updateSelectedText
    
        https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage/updateSelectedText
    
  
## API ENDPOINTS TESTING

COMMENTS

- getComment

    {"body": "{\"commentId\": \"1\"}"}

- createComment 

    {
  "body": "{\"commentId\": \"5\", \"content\": \"test\", \"transcriptId\": \"1\", \"userId\": \"1\", \"selectedTextId\": \"1\"}"
}

- updateComment

    {
  "body": "{\"commentId\": \"1\", \"content\": \"test\", \"transcriptId\": \"1\", \"userId\": \"1\", \"selectedTextId\": \"1\"}"
}

- deleteComment

    {
  "body": "{\"commentId\": \"1\"}"
}


SELECTED_TEXTS

- getSelectedText

    {
  "body": "{\"selectedTextId\": \"3\"}"
}

- createSelectedText

    {
  "body": "{\"selectedTextId\": \"3\", \"startIndex\": 2, \"endIndex\": 6, \"transcriptId\": \"1\"}"
}



- updateSelectedText

    {
  "body": "{\"selectedTextId\": \"1\", \"startIndex\": 3, \"endIndex\": 8, \"transcriptId\": \"1\"}"
}

- deleteSelectedText

    {
  "body": "{\"selectedTextId\": \"1\"}"
}




