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
Only works on Linux and macOS for now.

To install the dependencies of the application, use the Bun package manager:
```
bun install
```

## Running the Application

To start the application in development mode, use the dev script:
```
bun run dev
```

To start the application, use the start script:
```
bun run start
```

To test the application, use the test script:
```
bun test
```

## Packages of the Application

The application uses the following packages:

Live-reloading: @elysiajs/bun-dev
@types/supertest
