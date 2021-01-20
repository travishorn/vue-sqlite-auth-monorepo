# Auth Server

Backend Express server for use with [vue-sqlite-auth client](https://github.com/travishorn/vue-sqlite-auth-monorepo/tree/master/client).

## Installation

Clone the repository

```
git clone https://github.com/travishorn/vue-sqlite-auth-monorepo.git
```

Change into the directory

```
cd vue-sqlite-auth-monorepo/server
```

Install dependencies

```
npm install
```

Run database migrations

```
npm run db:migrate
```

Seed the database

```
npm run db:seed
```

Note that this will create the following "test" users:

| Username | Password |
|----------|----------|
| test1    | test1    |
| test2    | test2    |
| test3    | test3    |

Copy `.env.example` to `.env` and set your configuration in that file.

Run the server

```
npm start
```

The server will be listening on the port set in the `.env` file.

## API

### `POST /user`

Creates a new user in the database. Once created, you can consider the user "registered". They can "log in" by creating a session via `POST /user/session`.

#### Parameters

Type: `application/json`

`username`: Username to register. Must be at least 1 character and unique.

`password`: Password the user will use to log in. Must be at least 1 character.

#### Response

```
{
  "errors": [],
  "userCreated": true
}
```

For all request types, if errors exist, they will be returned in a format like this:

```
{
  "errors": [
    {
      "value": "test1",
      "msg": "Username already in use.",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### `POST /user/session`

Creates a new user session. This is analogous to "logging in."

#### Parameters

Type: `application/json`

`username`: Username of the user trying to log in. Must be registered already.

`password`: Password of the user trying to log in. Hash must match the database.

#### Response

```
{
  "errors": [],
  "sessionKey": "9b112ab2-21e2-48fe-94db-de0b6636a466"
}
```

This session key must be included as a bearer token in the authorization header on future requests where user authorization is required.

### `DELETE /user/session`

Deactivates a user session. This is analogous to "logging out." They session key used when making this request will no longer be valid.

#### Headers

Note that this value is part of the request headers, not the body.

```
"Authorization": "Bearer 9b112ab2-21e2-48fe-94db-de0b6636a466"
```

The key must match an active key that was supplied via `POST /user/session`

#### Response

```
{
  "errors": []
  "sessionDeleted": true
}
```

## License

The MIT License

Copyright 2021 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
