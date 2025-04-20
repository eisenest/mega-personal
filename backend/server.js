import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import { fastifyCors } from '@fastify/cors'
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';
import { Database, Resource } from '@adminjs/mongoose'

const fastify = Fastify({ logger: true });
await fastify.register(fastifyCors);

AdminJS.registerAdapter({
  Database,
  Resource
})

await mongoose.connect(process.env.MONGO_URI);

// Пример модели
const Service = mongoose.model('Service', {
  name: String,
  slug: String,
  description: String,
});

const admin = new AdminJS({
  resources: [Service],
  rootPath: '/admin',
});

await AdminJSFastify.buildRouter(admin, fastify);

fastify.get('/api/ping', async () => {
  return { pong: true };
});

fastify.listen({ port: process.env.PORT || 5050, host: '0.0.0.0' }, (err) => {
  if (err) throw err;
});
