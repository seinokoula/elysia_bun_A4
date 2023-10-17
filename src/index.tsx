import { Elysia } from 'elysia';
import './database/db.setup';
import { securitySetup } from './startup/security'
import { hooksSetup } from './startup/hooks';
import { usersController } from './controllers/users.controller';
import { html } from '@elysiajs/html'; // Add this line to import the html module
import React from 'react'; // Add this line to import React

const PORT = process.env.PORT || 3000;
export const app = new Elysia();

app
    .use(securitySetup)
    .use(hooksSetup)
    .get('/', () => 'Hello Bun.js!')
    .group('', (app: Elysia) =>
        app
            .use(usersController)
    )
    .use(html()) // Add this line to use the html module
    .get(
        '/',
        () => `
            <html lang='en'>
                <head>
                    <title>Hello World</title>
                </head>
                <body>
                    <h1>Sign up</h1>
                    <form method="POST" action="/users">
                        <label>
                            Username:
                            <input type="text" name="username" />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" />
                        </label>
                        <button type="submit">Create User</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={users._id}>
                                    <td>{users.username}</td>
                                    <td>{users.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </body>
            </html>`
    )
    .listen(PORT, () => {
        console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
    });