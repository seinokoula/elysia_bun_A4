# elysia_bun

elysia_bun is a web application built with ElysiaJS, a fast and friendly web framework designed for the Bun runtime. This application is designed with performance, simplicity, and flexibility in mind, leveraging the power of ElysiaJS and Bun to deliver a high-performance web application.
Features

- ElysiaJS: The application uses ElysiaJS, a web framework designed for the Bun runtime. ElysiaJS provides a simple and flexible way to build web applications, with built-in support for TypeScript and a variety of plugins for extended functionality1.

- Bun Runtime: The Bun runtime is a fast JavaScript runtime designed as a drop-in replacement for Node.js. It supports TypeScript and JSX out of the box, and it's designed with today's JavaScript ecosystem in mind2.

- Middleware: The application uses several middleware packages to enhance its functionality, including @elysiajs/cors for handling Cross-Origin Resource Sharing (CORS), @elysiajs/html for serving HTML content, @elysiajs/jwt for handling JSON Web Tokens (JWT), and @elysiajs/swagger for API documentation.

- Security: The application uses elysia-helmet for setting HTTP headers related to security and elysia-rate-limit for limiting repeated requests to public APIs and/or endpoints.

- Database: The application uses mongoose for object data modeling (ODM) to manage application data in MongoDB.
Scripts

- start: Starts the application using the Bun runtime.

- dev: Starts the application in development mode with hot-reloading enabled.
Installation

## Installation

If you haven't already, install the Bun runtime:
```
curl -fsSL https://bun.sh/install | bash
```
Only works on Linux and macOS for now, windows is quite tricky.

To install the dependencies of the application, use the Bun package manager:
```
bun install
```

## Running the Application

To see the application in action, start the application in development mode:
```
bun dev
```
and open http://localhost:3000/ in your browser. You will see a form to create a new user and all the user with thei username and email.

To start the application, use the start script:
```
bun start
```

To test the application, use the test script:
```
bun test
```

## Packages of the Application

The application uses the following packages:

 - @types/supertest : 
    This packages is for testing the application.
    it can be used with this command
    ```
    bun test
    ```
    
- @elysiajs/swagger:
    This package is for interacting with and testing the API you are building.
    It can be used with 
    ```
    /api
    ```
    in base url of http://localhost:3000/. so http://localhost:3000/api/ will show the swagger ui.



## Structure of the Application

```
📁 public
├──index.js
📁 src
├── controllers
│   ├── users.ts
├── database
│   ├── setup.ts
├── entities
│   ├── user.ts
├── modules
│   ├── hooks.ts
│   ├── security.ts
├── test
│   ├── users.test.ts
| index.tsx
.env
.gitignore
bun.lockb
package-lock.json
package.json
README.md
tsconfig.json
```

The application has the following directory structure:
	•	public: Contains the compiled assets like ﻿index.js.
	•	src: Contains the source code of the application, including controllers, database setup, entities, modules, and tests.
	•	controllers: Contains the controller files responsible for handling different routes and requests.
	•	database: Contains the setup file for connecting and configuring the MongoDB database.
	•	entities: Contains entity or model files for defining the data structure to be stored in the database.
	•	modules: Contains module files that provide additional functionality or hooks for the application.
	•	test: Contains test files for testing the application.
Other files include configuration files, package files, and the application's main file.
