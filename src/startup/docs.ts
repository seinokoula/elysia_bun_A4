import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

export const docsSetup = (app: Elysia) =>
  app
    .use(
      swagger({
        path: '/v1/swagger',
        documentation: {
          info: {
            title: 'Elysia framework',
            version: '1.0.0',
          },
        },
      })
  );
