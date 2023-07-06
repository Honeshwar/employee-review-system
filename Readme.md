# Employee Review System

Create an application that allows employees to submit feedback toward each other’s performance

## Features

#### 1. Admin view :

```
a. Add/remove/update/view employees.

b. Add/update/view performance reviews.

c. Assign employees to participate in another employee's performance review.
```

#### 2. Employee view

```
a. List of performance review requiring feedback.
b. Submit feedback.
```

#### 3. Make 1 login for admin and employee

#### 4. An employee can register, only admin can make an employee an admin

## File structure

here you are looking at directory structure with root level files only.

```sh
employee-review-system
├── assets
│   ├── images
│   └── styles
├── node_modules
├── configs
├── controllers
├── models
├── routers
└── views
|   ├── layouts
│   |── pages
│   │    ├── admin pages
│   │    |── employee pages
│   │    └── auth pages
|   └── partials
│        ├── admin
│        |── employee
|        └── _header.ejs
├── index.js
├── package-lock.json
├── package.json
└── readme.md

```

## How to setup on local machine

1. To use this repository your machine should have [node](https://nodejs.org/en/), npm, [mongodb](https://docs.mongodb.com/manual/installation/) , and git . Now check for this things is install or not :

```go
node --version
npm --version
mongodb --version
git --version
```

2. Clone repository :

```go
git clone  https://github.com/Honeshwar/employee-review-system
cd employee-review-system
```

3. Install dependencies :

```go
npm install
```

4. Now, run the application using this command :

```go
npm start
```

# " Now , Website is running "

## how to add admin

```
1. use signUp page and there use admin_token = 12345 to create an   admin

2. using this token you can create admin/owner and you can only create one owner/admin using this token
3. now you can signIn using admin
4. to make employee as admin that is not done from signUp page,that is part of admin feature
```

## how to add ademployee

```
1. use signIn and signUp page to add employees
2. note: To create both employee and admin/owner we use same signIn and signUp page

```

## notes

- when add feedback that store in + feedback collection and also that employee document that belong to feedback (employee = for feedback/performance review submitted) .

- when do Assign task that store in + AssignTask collection and also that employee document that is reviewer .

## Project Screenshots

- SignIn and SignUp pages Screenshots
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/1.png)
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/2.png)

- Admin pages Screenshots
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/3.png)
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/4.png)
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/5.png)
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/6.png)

- employee pages Screenshots
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/7.png)
  ![App Screenshot](https://github.com/Honeshwar/employee-review-system/assets/images/8.png)
