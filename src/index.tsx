import { Elysia } from 'elysia';
import './database/setup';
import { securitySetup } from './modules/security'
import { hooksSetup } from './modules/hooks';
import { usersController } from './controllers/users';
import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';

const PORT = process.env.PORT || 3000;
export const app = new Elysia();

app
  .use(securitySetup)
  .use(swagger({
    path: '/api',
  }
  ))
    .listen(8080)
  .use(hooksSetup)
  .group('', (app: Elysia) =>
    app
      .use(usersController)
  )
  .use(html())
  .get(
    '/',
    () => `
            <html lang='en'>
                <head>
                    <title>Hello World</title>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
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

                    <h1>Users</h1>
                    <table id="usersTable">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>

                    <script>
                        axios.get('/users')
                            .then(function (response) {
                                const users = response.data;
                                const tableBody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
                                users.forEach(user => {
                                    let newRow = tableBody.insertRow();
                                    let usernameCell = newRow.insertCell(0);
                                    let emailCell = newRow.insertCell(1);
                                    usernameCell.textContent = user.username;
                                    emailCell.textContent = user.email;
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    </script>
                </body>
            </html>`
  )
  .listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
  });