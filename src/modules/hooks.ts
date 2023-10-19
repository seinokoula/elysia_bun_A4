import { Elysia } from 'elysia';

// This function sets up hooks for the Elysia app
export const hooksSetup = (app: Elysia) =>
  app
    // This hook logs the response of each request
    .onResponse((handler: Elysia.Handler) => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`Global Handler - Method: ${handler.request.method} | URL: ${handler.request.url} | Status Code: ${handler.set.status ||= 500}`)
      }

    })

    // This hook handles errors
    .onError((handler: Elysia.Handler) => {
      // If the error is a 404, return a message and status code 404
      if (handler.code === 'NOT_FOUND') {
        handler.set.status = 404
        return {
          message: 'Page Not Found!',
          status: 404
        };

      // If the error is not a 404, set the status code to 500
      } else {
        handler.set.status ||= 500;

        // If the status code is 400, return a message and status code 400
        if (handler.set.status === 400) {
          return {
            message: 'Unable to process the data!',
            status: 400
          };
        }
        // Otherwise, return a generic error message
        return 'Service unavailable. Please come back later.'
      }
    })
