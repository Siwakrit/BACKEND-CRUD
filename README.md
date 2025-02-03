When testing your API in Postman using data in the body, you can use the following information:

Register User (POST /register) When you want to register a new user, send name, email, and password in the body.

Body (JSON):

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}

name: The new user's name.
email: The new user's email.
password: The new user's password (must be at least 8 characters long).
Login User (POST /login) When you want to log in and get a JWT token for authentication to access other APIs, send email and password in the body.

Body (JSON):

{
  "email": "johndoe@example.com",
  "password": "password123"
}

email: The email used to log in.
password: The password used to log in.
Response:

{
  "success": true,
  "token": "yourJWTtoken",
  "userId": "userId_of_the_logged_in_user"
}

You will receive a token, which you must use in the headers for API calls that require authentication.

Get User Profile (GET /users/:id) When you want to fetch the user’s data, you need to use the JWT token in the Authorization header and use userId in the URL or body.

Authorization Header:

makefile

Authorization: Bearer yourJWTtoken
Response Example:

{
  "_id": "userId_of_the_logged_in_user",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "hashedpassword"
}
Update User (PUT /users/:id) When you want to update the user's data, you need to use the JWT token in the Authorization header and send name, email, or password in the body.

Authorization Header:



Authorization: Bearer yourJWTtoken
Body (JSON):

{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"
}
name: The new name of the user.
email: The new email of the user.
password: The new password of the user.
Response Example:

{
  "message": "User updated successfully",
  "user": {
    "_id": "userId_of_the_logged_in_user",
    "name": "John Updated",
    "email": "johnupdated@example.com"
  }
}

Delete User (DELETE /users/:id) When you want to delete a user, you need to use the JWT token in the Authorization header.

Authorization Header:

Authorization: Bearer yourJWTtoken
Response Example:

{
  "message": "User deleted successfully"
}
How to Test in Postman:
Register User:

Use POST to http://localhost:5000/register
Use the JSON body as shown in example 1 (Register User)
Click "Send" to submit the request.
Login User:

Use POST to http://localhost:5000/login
Use the JSON body as shown in example 2 (Login User)
Receive the token in the response.
Get User Profile:

Use GET to http://localhost:5000/users/:id
Add Authorization: Bearer yourJWTtoken in the headers
Click "Send" to fetch the user data.
Update User:

Use PUT to http://localhost:5000/users/:id
Add Authorization: Bearer yourJWTtoken in the headers
Use the JSON body as shown in example 4 (Update User)
Click "Send" to update the user's data.
Delete User:

Use DELETE to http://localhost:5000/users/:id
Add Authorization: Bearer yourJWTtoken in the headers
Click "Send" to delete the user.
