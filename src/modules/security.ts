import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';

// This function sets up security-related middleware for the Elysia app
export const securitySetup = (app: Elysia) =>
  app
    .use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
            styleSrc: ["'self'", 'unpkg.com'],
            imgSrc: ['data:'],
          },
        },
      })
    )
