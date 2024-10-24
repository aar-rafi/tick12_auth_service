# API Endpoints Documentation

## User

### Register User

- **Endpoint**: `http://localhost:8000/api/user/register`
- **Method**: `POST`

#### Request Body

```json
{
  "name": "Jon Snow",
  "phone_number": "01827216261",
  "password": "jonsnow"
}
```

#### Response

```json
{
  "user": {
    "user_id": "6037e588-7da9-4422-8bfc-d780eb7d39e0",
    "name": "Imtiaz Kabir",
    "phone_number": "01838383224",
    "password": "$2a$10$qh2OirvcKIehIHZO/jlOTeSgj.PdxRfxN5R7lR/AibVtqijIp7Bg6",
    "createdat": "2024-10-24T11:36:29.612Z"
  },
  "webToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAzN2U1ODgtN2RhOS00NDIyLThiZmMtZDc4MGViN2QzOWUwIiwiaWF0IjoxNzI5NzY5ODM5LCJleHAiOjE3MzA2MzM4Mzl9.xBX5QCwEywDy3fkC7_zVy4r_zhK0E3xdhdAXydyHhdE"
}
```


### Login User

- **Endpoint**: `http://localhost:8000/api/user/login`
- **Method**: `POST`

#### Request Body

```json
{
  "phone_number": "01827216261",
  "password": "jonsnow"
}
```

#### Response

```json
{
  "user": {
    "user_id": "6037e588-7da9-4422-8bfc-d780eb7d39e0",
    "name": "Imtiaz Kabir",
    "phone_number": "01838383224",
    "password": "$2a$10$qh2OirvcKIehIHZO/jlOTeSgj.PdxRfxN5R7lR/AibVtqijIp7Bg6",
    "createdat": "2024-10-24T11:36:29.612Z"
  },
  "webToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAzN2U1ODgtN2RhOS00NDIyLThiZmMtZDc4MGViN2QzOWUwIiwiaWF0IjoxNzI5NzY5ODM5LCJleHAiOjE3MzA2MzM4Mzl9.xBX5QCwEywDy3fkC7_zVy4r_zhK0E3xdhdAXydyHhdE"
}
```

### Get User

- **Endpoint**: `http://localhost:8000/api/user/:id`
- **Method**: `GET`

#### Request Body

```json
{
  "id": "userid",
}
```

### Validate User

- **Endpoint**: `http://localhost:8000/api/user/validate/:id`
- **Method**: `GET`

#### Request Body

```json
{
  "id": "userid",
}
```