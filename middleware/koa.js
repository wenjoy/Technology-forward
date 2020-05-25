const Koa = require('koa');
const app = new Koa();

// logger

let body = 'I go through '
app.use(async (ctx, next) => {
  console.log('middleware 1 start')
  body += 'middleware 1 start '
  await next();
  body += 'middleware 1 end '
  console.log('middleware 1 end')
});

// logger
app.use(async (ctx, next) => {
  console.log('middleware 2 start')
  body += 'middleware 2 start '
  await next();
  body += 'middleware 2 end '
  console.log('middleware 2 end')
});

app.use(async ctx => {
  console.log('set response')
  body += 'set response'
  ctx.body = body;
});

app.listen(3000);
