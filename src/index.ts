import '../.env';

import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('home', '/', async function homeRoute(ctx: Koa.Context, next: () => Promise<any>) {
    ctx.body = 'Got it!!!!';
    console.log(ctx);
    next();
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);