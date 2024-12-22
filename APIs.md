# API Documentation

### Register User
**Endpoint:**  
`https://district12.xyz/user/api/user/register`

**Local Dev Endpoint:**  
`http://localhost:8000/api/user/register`

**Method:**  
`POST`

**Body:**
```json
{
  "name": "Jon Snow",
  "phone_number": "01234567891",
  "password": "aboltabol123",
}
```

**Response:**

**Status Code: 201**
```json
{
  "name": "Jon Snow",
  "webToken": "jdlhlsljheh838h@ilhaalau3}lgkksii{skala;ebbea//a#3e9", 
  "password": "aboltabol123",
}
```

**Error:**

**Status Code: 500**
```json
{
  "error": "error message",
}
```

### Login User
**Endpoint:**  
`https://district12.xyz/user/api/user/login`

**Local Dev Endpoint:**  
`http://localhost:8000/api/user/login`

**Method:**  
`POST`

**Body:**
```json
{
  "phone_number": "01234567891",
  "password": "aboltabol123",
}
```

**Response:**

**Status Code: 201**
```json
{
  "user": "A user object holding all user information. User ref: Databse folder in main repo",
  "webToken": "jdlhlsljheh838h@ilhaalau3}lgkksii{skala;ebbea//a#3e9", 
}
```

**Error:**

**Status Code: 500**
```json
{
  "error": "error message",
}
```

### Get User By ID
**Endpoint:**  
`https://district12.xyz/user/api/user/:id`

**Local Dev Endpoint:**  
`http://localhost:8000/api/user/:id`

**Method:**  
`GET`

**Paramenters:**
```json
{
  "id": "user_id",
}
```

**Response:**

**Status Code: 200**
```json
{
  "user": "A user object holding all user information. User ref: Databse folder in main repo",
}
```

**Error:**

**Status Code: 500**
```json
{
  "error": "error message",
}
```


### Validate/Authorize User By ID
### Probably not required in front end

**Endpoint:**  
`https://district12.xyz/user/api/user/validate/:id`

**Local Dev Endpoint:**  
`http://localhost:8000/api/user/validate/:id`

**Method:**  
`GET`

**Paramenters:**
```json
{
  "id": "user_id",
}
```

**Response on valid user:**

**Status Code: 200**
```json
{
  "user": "A user object holding all user information. User ref: Databse folder in main repo",
}
```

**Response on invalid user:**

**Status Code: 404**
```json
{
  "error": "No such id found",
}
```

**Error:**

**Status Code: 500**
```json
{
  "error": "error message",
}
```