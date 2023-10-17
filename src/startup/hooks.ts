import { Elysia } from 'elysia';

export const hooksSetup = (app: Elysia) =>
  app
    .onResponse((handler: Elysia.Handler) => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`Global Handler - Method: ${handler.request.method} | URL: ${handler.request.url} | Status Code: ${handler.set.status ||= 500}`)
      }

    })

    .onError((handler: Elysia.Handler) => {
      if (handler.code === 'NOT_FOUND') {
        handler.set.status = 404
        return {
          message: 'Page Not Found!',
          status: 404
        };

      } else {
        handler.set.status ||= 500;

        if (handler.set.status === 400) {
          return {
            message: 'Unable to process the data!',
            status: 400
          };
        }
        return 'Service unavailable. Please come back later.'
      }
    })
