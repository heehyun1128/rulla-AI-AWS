## OVERVIEW

![Screenshot 2024-08-26 at 8 43 29 AM](https://github.com/user-attachments/assets/a9364b7b-56e0-470c-b72b-d4f19f04c213)

![Screenshot 2024-08-26 at 8 47 01 AM](https://github.com/user-attachments/assets/c8e27bfd-a634-48cd-9502-8b500c86e2bf)

![Screenshot 2024-08-26 at 8 48 12 AM](https://github.com/user-attachments/assets/4975237c-346e-47c4-9ad7-cb35086686be)

![Screenshot 2024-08-26 at 8 47 42 AM](https://github.com/user-attachments/assets/fe323fca-e63a-4fb8-98fd-5b5c94c7de02)

## API DOCUMENTATION

API ENDPOINTS

    - GET /getAllComments
        
    - GET /getComment
        
    - GET /getAllSelectedTexts

    - GET /getSelectedText

    - POST /createComment

    - POST /createSelectedText

    - DELETE /deleteComment

    - DELETE /deleteSelectedText

    - UPDATE /updateComment
  
    - UPDATE /updateSelectedText

  
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




