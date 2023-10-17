import { Elysia, t } from 'elysia';
import User, { IUser } from '../entities/user';
import { jwt } from '@elysiajs/jwt';
import liveReload from 'bun-livereload';

export const usersController = liveReload((app: Elysia) =>
  app.group('/users', (app: Elysia) =>
    app

      .use(
        jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string,
        })
      )

      .guard({
        body: t.Object({
          username: t.String(),
          email: t.String(),
          password: t.String()
        })
      }, (app: Elysia) => app
      .post('/', async (handler: Elysia.Handler) => {
        try {
          console.log('handler.body', handler.body);
      
          const newUser = new User();
          newUser.username = handler.body.username;
          newUser.email = handler.body.email;
          newUser.password = await Bun.password.hash(handler.body.password);
      
          const savedUser = await newUser.save();
      
          const accessToken = await handler.jwt.sign({
            userId: savedUser._id
          });
      
          handler.set.headers = {
            'Authorisation': accessToken,
          };
          handler.set.status = 201;
            return newUser;
          } catch (e: any) {
            if (e.name === 'MongoServerError' && e.code === 11000) {
              handler.set.status = 422;
              return {
                message: 'Resource already exists!',
                status: 422,
              };
            }

            handler.set.status = 500;
            return {
              message: e.message,
              status: 500,
            };
          }
        }, {
          onError(handler: Elysia.Handler) {
            console.log(`wwwwwww  Handler - Status Code: ${handler.set.status}`);
          }
        })

      )

      .get('/', async ({ set }: Elysia.Set) => {
        try {
          const users = await User.find({});
          return users;
        } catch (e: unknown) {
          set.status = 500;
          return {
            message: 'Unable to retrieve items from the database!',
            status: 500,
          };
        }
      })

      .get('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const existingUser = await User.findById(id);

          if (!existingUser) {
            handler.set.status = 404;
            return {
              message: 'Requested resource was not found!',
              status: 404,
            };
          }

          return existingUser;
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          };
        }
      })

      .patch('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const changes: Partial<IUser> = handler.body;

          const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { ...changes } },
            { new: true }
          );

          if (!updatedUser) {
            handler.set.status = 404;
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            };
          }

          return updatedUser;
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to update resource!',
            status: 500,
          };
        }
      })

      .delete('/:id', async (handler: Elysia.Handler) => {
        try {
          const { id } = handler.params;

          const existingUser = await User.findById(id);

          if (!existingUser) {
            handler.set.status = 404;
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            };
          }

          await User.findOneAndRemove({ _id: id });

          return {
            message: `Resource deleted successfully!`,
            status: 200,
          };
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to delete resource!',
            status: 500,
          };
        }
      })
  ));
