import { Elysia, t } from 'elysia';
import User, { IUser } from '../entities/user';
import { jwt } from '@elysiajs/jwt';
import liveReload from 'bun-livereload';

// Exporting the usersController which is a liveReload function
export const usersController = liveReload((app: Elysia) =>
  // Grouping all the routes under '/users'
  app.group('/users', (app: Elysia) =>
    app

      // Using JWT for authentication
      .use(
        jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string,
        })
      )

      // Guarding the routes with a body schema
      .guard({
        body: t.Object({
          username: t.String(),
          email: t.String(),
          password: t.String()
        })
      }, (app: Elysia) => app
      // POST route for creating a new user
      .post('/', async (handler: Elysia.Handler) => {
        try {
          console.log('handler.body', handler.body);
      
          // Creating a new user
          const newUser = new User();
          newUser.username = handler.body.username;
          newUser.email = handler.body.email;
          newUser.password = await Bun.password.hash(handler.body.password);
      
          // Saving the new user
          const savedUser = await newUser.save();
      
          // Generating an access token for the new user
          const accessToken = await handler.jwt.sign({
            userId: savedUser._id
          });
      
          // Setting the response headers and status
          handler.set.headers = {
            'Authorisation': accessToken,
          };
          handler.set.status = 201;
            return newUser;
          } catch (e: any) {
            if (e.name === 'MongoServerError' && e.code === 11000) {
              // Handling duplicate resource error
              handler.set.status = 422;
              return {
                message: 'Resource already exists!',
                status: 422,
              };
            }

            // Handling other errors
            handler.set.status = 500;
            return {
              message: e.message,
              status: 500,
            };
          }
        }, {
          // Handling errors during the execution of the route
          onError(handler: Elysia.Handler) {
            console.log(`wwwwwww  Handler - Status Code: ${handler.set.status}`);
          }
        })

      )

      // GET route for fetching all users
      .get('/', async ({ set }: Elysia.Set) => {
        try {
          // Fetching all users
          const users = await User.find({});
          return users;
        } catch (e: unknown) {
          // Handling errors during the execution of the route
          set.status = 500;
          return {
            message: 'Unable to retrieve items from the database!',
            status: 500,
          };
        }
      })

      // GET route for fetching a user by ID
      .get('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          // Fetching the user by ID
          const existingUser = await User.findById(id);

          if (!existingUser) {
            // Handling resource not found error
            handler.set.status = 404;
            return {
              message: 'Requested resource was not found!',
              status: 404,
            };
          }

          return existingUser;
        } catch (e: unknown) {
          // Handling errors during the execution of the route
          handler.set.status = 500;
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          };
        }
      })

      // PATCH route for updating a user by ID
      .patch('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          // Getting the changes to be made
          const changes: Partial<IUser> = handler.body;

          // Updating the user
          const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { ...changes } },
            { new: true }
          );

          if (!updatedUser) {
            // Handling resource not found error
            handler.set.status = 404;
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            };
          }

          return updatedUser;
        } catch (e: unknown) {
          // Handling errors during the execution of the route
          handler.set.status = 500;
          return {
            message: 'Unable to update resource!',
            status: 500,
          };
        }
      })

      // DELETE route for deleting a user by ID
      .delete('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          // Fetching the user by ID
          const existingUser = await User.findById(id);

          if (!existingUser) {
            // Handling resource not found error
            handler.set.status = 404;
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            };
          }

          // Deleting the user
          await User.findOneAndRemove({ _id: id });

          return {
            message: `Resource deleted successfully!`,
            status: 200,
          };
        } catch (e: unknown) {
          // Handling errors during the execution of the route
          handler.set.status = 500;
          return {
            message: 'Unable to delete resource!',
            status: 500,
          };
        }
      })
  ));
