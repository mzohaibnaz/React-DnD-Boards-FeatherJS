# React DnD Boards with (Redux+FeathersJS)

This project uses best practice for react drag & drop using Redux and FeathersJS

![App Demo](https://s8.gifyu.com/images/ezgif.com-gif-maker8429d32583dfe6c1.gif)

## Teachs in use

```p
NodeJs 12.19.0
Feathersjs 4.5.9
React 17.0.1
React Redux 7.2
React DnD
ReactStrap + Bootstrap
Express
NeDB
```

## Features

```php
React Drag & Drop
Authentication ( Local Strategy )
NeDB ( no config required )
Dynamic Boards
Dynamic Media Images
Keeps Redux State on Local Storage
```

## Installation

Clone repo & inside project directory run following commands:

##### app `folder` includes `production` app with FeathersJS

```bash
// install dependencies
> npm install

// run app
> npm start
```

note: feathersJS `public` folder already include compiled `react code`. After `npm start` please visit given URL in `cli` for app demo.

##### React-App`folder` includes React code

if you want to modify some codes or want to run react app in `development`.
go inside `react-app` folder. Run following commands.

```bash
// install dependencies
> npm install

// run app
> npm start
```

Before start make sure, feathersJS app is running for APIs communications.
Please change backend URL in feathersJS Client file.

```text
// in react-app folder
Edit: src > App > feather-client.js

// Change the following `Variable`
const server = "http://localhost:3030";

```

### Test Login Credentials

These are just pre-registered users which i used for testing,
you can create as many as you like using APIs, please check PostMan Collections

```text
// user test
Email: test@test.com
Password: test

// user 2
Email: mzohaibnaaz@gmail.com
password: gmail
```

### APis Routes (Postman Collection)

Click to [Download](https://www.postman.com/collections/8453500e622d0f5a7c39) collection to get to know how to use project APIs.

## License

[MIT](https://choosealicense.com/licenses/mit/)
