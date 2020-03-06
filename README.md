# Backend

## **API Documentation**

**BASE URL** https://co-make-database.herokuapp.com/api/users

- Attach endpoints to the Base URL to hit them with HTTP Requests.

### **Table of Contents**

#### NON-PROTECTED ENDPOINTS

| Links                                   | Endpoints             |
| --------------------------------------- | --------------------- |
| [POST Registration](#post-registration) | `/api/users/register` |
| [POST Login](#post-login)               | `/api/users/login`    |

#### PROTECTED ENDPOINTS

> **All EndPoints listed below require a `token`! Send an `Authorizatoin header` with the token provided upon login.**

| Links                                                  | Endpoints                               |
| ------------------------------------------------------ | --------------------------------------- |
| [GET All Users](#get-all-users)                        | `/api/users/users`                      |
| [GET User by ID](#get-user-by-id)                      | `/api/users/:id`                        |
| [GET User by Username](#get-user-by-username)          | `/api/users/name/:username`             |
| [GET All Projects](#get-all-trips)                     | `/api/projects`                         |
| [GET Projects by ID](#get-trip-by-id)                  | `/api/projects/:id`                     |
| <!--                                                   | [GET Projects by Name](#get-trip-by-id) | `/api/projects/pname/:project_name` | --> |
| [GET All Comments](#get-all-expenses)                  | `/api/comments`                         |
| [GET Comments by ID](#get-expenses-by-id)              | `/api/comments/:id`                     |
| [GET Projects by User ID](#get-trips-by-user-id)       | `/api/projects/user/:id`                |
| [GET Expenses by User ID](#get-expenses-by-user-id)    | `/api/comments/user/:id`                |
| [GET Expenses by Project ID](#get-expenses-by-user-id) | `/api/comments/projects/:id`            |
| <!--                                                   | [POST Projects](#post-trip)             | `/api/projects` |
| [POST Expense](#post-expense)                          | `/api/comments`                         |
| [PUT Projects by ID](#put-trip-by-id)                  | `/api/projects/:id`                     |
| [PUT Expense by ID](#put-expense-by-id)                | `/api/comments/:id`                     |
| [DELETE Projects by ID](#delete-trip-by-id)            | `/api/projects/:id`                     |
| [DELETE Expense by ID](#delete-expense-by-id)          | `/api/comments/:id`                     | --> |

<!-- | [POST Projects User](#post-trip-user)                   | `/api/projects/user`            | -->

---

### [POST] Registration

#### URL: https://co-make-database.herokuapp.com/api/users/register

**Payload:** _an object with the following credentials:_

> **Required:** `username`, `email`, & `password`

```json
{
  "username": "newUsername",
  "password": "newPassword",
  "email": "johndoe@gmail.com",
  "name": "John Doe"
}
```

**Return:** _an object with the user credentials provided in the request body_

```json
{
  "id": 1,
  "username": "newUsername",
  "password": "hashedPassword",
  "email": "johndoe@gmail.com",
  "name": "John Doe"
}
```

[Back to Top](#table-of-contents)

---

### [POST] Login

#### URL: https://co-make-database.herokuapp.com/api/users/login

**Payload:** _an object with the following:_

```json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

**Return:** _an object with a welcome message, authentication token, and user info. Save this token to local storage (or similar). This token will be required for all HTTP requests below (protected endpoints)._

```json
{
  "message": "Welcome newUsername!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Im5ld1VzZXI0IiwiaWF0IjoxNTY3MTAwNTAzLCJleHAiOjE1NjcxODY5MDN9.BrCNULMh7pLMFGzY6HyX5CK_tA7ek8bUQSFiWkrPBQQ"
}
```

[Back to Top](#table-of-contents)

---

### [GET] All Users

#### URL: https://co-make-database.herokuapp.com/api/users

**Return:** _an array of registered user objects_

```json
[
  {
    "id": 1,
    "username": "user1",
    "password": "hashedPassword",
    "email": "user1@gmail.com",
    "name": "Bob"
  },
  {
    "id": 2,
    "username": "user2",
    "password": "hashedPassword",
    "email": "user2@gmail.com",
    "name": "Billy
  }
];
```

[Back to Top](#table-of-contents)

---

### [GET] User by id

#### URL: https://co-make-database.herokuapp.com/api/users/:id

> Place the id of the user which you are requesting data for in the url parameter `:id`

**Return:** _the user object._

```json
{
  "id": 1,
  "username": "user1",
  "password": "hashedPassword",
  "email": "user1@gmail.com",
  "name": "Bob"
}
```

[Back to Top](#table-of-contents)

---

### [GET] User by Username

#### URL: https://co-make-database.herokuapp.com/api/users/getby/:username

> Place the username of the user which you are requesting data for in the url parameter `:username`

**Return:** _the user object._

```json
{
  "id": 1,
  "username": "user1",
  "email": "user1@gmail.com",
  "password": "hashedPassword",
  "name": "Bob"
}
```

[Back to Top](#table-of-contents)

---

### [GET] All Projects

#### URL: https://co-make-database.herokuapp.com/api/projects

**Return:** _all projects in **an array of objects** as follows:_

```json
[
  {
    "id": 1,
    "project_name": "Paris Business Trip",
    "description": "Going to Paris for business meetings and week-long conferences. Representing my local branch of the company.",
    "vote": 5,
    "created_by": 2,
    "state": "MO"
  },
  {
    "id": 2,
    "project_name": "Bali Vaca!",
    "description": "Relaxing with friends and checking out from responsibilities.",
    "vote": 2,
    "created_by": 3,
    "state": "MO"
  },
  {
    "id": 3,
    "project_name": "Family Adventure to DisneyLand",
    "description": "Loading everyone up for some family fun with Disney!",
    "vote": 3,
    "created_by": 5,
    "state": "MO"true
  }
];
```

[Back to Top](#table-of-contents)

---

### [GET] Projects By ID

#### URL: https://co-make-database.herokuapp.com/api/projects/:id

**Return:** _the projects in an object ._

```json
{
  "id": 2,
  "project_name": "Bali Vaca!",
  "description": "Relaxing with friends and checking out from responsibilities.",
  "vote": 3,
  "created_by": 1,
  "state": "MO"
}
```

[Back to Top](#table-of-contents)

---

### [GET] All Comments

#### URL: https://co-make-database.herokuapp.com/api/comments

**Return:** _all comments in **an array of objects** as follows:_

> `project_id` references which project the comments _belongs_ to.
> `created_by` references which user left the comment by there user id.

```json
[
  {
    "id": 1,
    "created_by": 1,
    "project_id": 2,
    "description": "Hotel - Entire Trip",
    "vote": 2
  },
    {
    "id": 2,
    "created_by": 2,
    "project_id": 2,
    "description": "Food - Entire Trip",
    "vote": 4
  },
    {
    "id": 2,
    "created_by": 3,
    "project_id": 3,
    "description": "Drinks in the Hotel Lounge",
    "vote": 5
  }
];
```

[Back to Top](#table-of-contents)

---

### [GET] Comments By ID

#### URL: https://co-make-database.herokuapp.com/api/comments/:id

> Place the id of the comments in the url parameter `:id`

**Return:** _the comments object as follows:_

```json
{
  "id": 2,
  "created_by": 3,
  "project_id": 3,
  "description": "Drinks in the Hotel Lounge",
  "vote": 5
}
```

[Back to Top](#table-of-contents)

---

### [GET] Projects By User ID

### URL: https://co-make-database.herokuapp.com/api/projects/user/:id

**Return:** _an **array of objects** displaying a list of each project for a specified user._

> Place the id of the user which you are requesting projects data for in the url parameter `:id`

```json
[
  {
    "id": 2,
    "project_name": "Test Project 2",
    "description": "Stuff Needs Fixed",
    "vote": null,
    "created_by": 2,
    "state": "MO"
  },
  {
    "id": 4,
    "project_name": "Test Project 4",
    "description": "Here we go again",
    "vote": 2,
    "created_by": 2,
    "state": "MO"
  }
]
```

[Back to Top](#table-of-contents)

---

### [GET] Comments By User ID

#### NOT WORKING

### URL: https://co-make-database.herokuapp.com/api/comments/user/:id

**Return:** _an **array of objects** displaying a list of each expense for a specified user._

> Place the id of the user which you are requesting expenses data for in the url parameter `:id`

```json
[
  {
    "id": 1,
    "created_by": 1,
    "project_id": 2,
    "description": "Good Job",
    "vote": 3
  },
  {
    "id": 2,
    "created_by": 2,
    "project_id": 3,
    "description": "Ok Job",
    "vote": 1
  },
  {
    "id": 3,
    "created_by": 3,
    "project_id": 1,
    "description": "Bad Job",
    "vote": null
  },
  {
    "id": 4,
    "created_by": 3,
    "project_id": 1,
    "description": "Bestest Job ever!!",
    "vote": 5
  },
  {
    "id": 5,
    "created_by": 3,
    "project_id": 1,
    "description": "Bestest Job ever!!",
    "vote": 5
  }
]
```

[Back to Top](#table-of-contents)

---

### [POST] Projects

#### URL: https://co-make-database.herokuapp.com/api/projects

**Payload:** _an object with the following:_

<!--
- a property `projects` that contains the projects object of which will be inserted into the database
- a `users` array, containing the user `id`s that are attending this projects

**project_name & users are REQUIRED**

```json
{
  "projects": {
    "project_name": "Test!",
    "description": "Going on a projects to a place!",
    "location": "Test City",
    "vote": "2019-09-02",
    "created_by": 5": [3, 5, 7]
}
```

**Return:** _the complete projects object (`id` is automatically generated, `complete` has a default value of `false`)_

```json
{
  "id": 8,
  "project_name": "Test!",
  "description": "Going on a projects to a place!",
  "location": "Test City",
  "vote": "2019-09-02T05:00:00.000Z",
  "created_by": 5,
  "state": "MO"false
}
``` -->

[Back to Top](#table-of-contents)

---

### [POST] Comments

#### URL: https://co-make-database.herokuapp.com/api/comments

**Payload:** _an object with the following:_

<!-- - a property `comments` that contains the comments object of which will be inserted into the database
- a `users` array, containing the user `id`s that are splitting this comments

**`project_name`, `users`, and `trip_id` are REQUIRED**

> `trip_id` is to let the database know which trip the comments _belongs_ to.
> This endpoint will create a new `comments`, but will also create new expences for each user passed into the `users` array
> The total `amount` of the comments will be divided evenly between each `user`, and this split amount will be stored for each user

```json
{
  "expense": {
    "project_name": "Takoyaki Party!",
    "category": "Food/Beverage",
    "amount": 100.0,
    "date": "2019-10-01",
    "trip_id": 6
  },
  "users": [1, 2, 6, 7]
}
```

**Return:** _the complete expense object (`id` is automatically generated, `complete` has a default value of `false`)_

```json
{
  "id": 17,
  "project_name": "Takoyaki Party!",
  "category": "Food/Beverage",
  "amount": 100,
  "date": "2019-10-01T05:00:00.000Z",
  "trip_id": 6,
  "state": "MO"false
}
``` -->

[Back to Top](#table-of-contents)

---

<!-- ### [POST] Trip User

#### URL: https://co-make-database.herokuapp.com/api/trips/user

**Payload:** _an object as follows:_

```json
{
  "trip_id": 1,
  "user_id": 1,
  "project_name": "Paris Bussiness Trip",
  "location": "Paris, France",
  "vote": 1560643200,
  "created_by": 5

```json

```

[Back to Top](#table-of-contents)

--- -->

### [PUT] Projects By ID

#### URL: https://co-make-database.herokuapp.com/api/projects/:id

**Payload:** _an object with the properties you'd like to make changes to and the values of those changes._

<!--
> `id` cannot be changed
> types must reamain the same, i.e. `complete` will accept a boolean value, `project_name` will accept a string, etc.

```json
{
  "project_name": "Updated project_name",
  "created_by": 5rn:** _the complete trip object, including the changes made in the request._

```json
{
  "id": 9,
  "project_name": "Updated project_name",
  "description": "Attending Lambda School Event",
  "location": "Salt Lake City",
  "vote": "2019-09-02T05:00:00.000Z",
  "created_by": 5,
  "state": "MO"false
}
``` -->

[Back to Top](#table-of-contents)

---

### [PUT] Comments By ID

#### URL: https://co-make-database.herokuapp.com/api/comments/:id

**Payload:** _an object with the properties you'd like to make changes to and the values of those changes._

<!--
> `id` cannot be changed
> types must reamain the same, i.e. `complete` will accept a boolean value, `project_name` will accept a string, etc.

```json
{
  "project_name": "Updated project_name",
  "complete": true
}
```

**Return:** _the complete expense object, including the changes made in the request._

```json
{
  "id": 18,
  "project_name": "Updated project_name",
  "category": "Food/Beverage",
  "amount": 100,
  "date": "2019-10-01T05:00:00.000Z",
  "trip_id": 6,
  "complete": true
}
``` -->

[Back to Top](#table-of-contents)

---

### [DELETE] Projects By ID

#### URL: https://co-make-database.herokuapp.com/api/projects/:id

<!--
> id from params will select the trip object to be deleted

**Return:** _1 means true_

```json
{
  "removed": 1
}
``` -->

[Back to Top](#table-of-contents)

---

### [DELETE] Comments By ID

#### URL: https://co-make-database.herokuapp.com/api/comments/6

<!-- > id from params will select the comments object to be deleted

**Return:** _1 means true_

```json
{
  "removed": 1
}
``` -->

[Back to Top](#table-of-contents)

---
