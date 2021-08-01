const Koa = require("koa");
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const userRouter = new Router({
    prefix: "/user"
})
const login = (ctx, next) => {
    // ctx.throw(405)
    console.log('login');
    
    next();
}
router.get("/",login, (ctx, next) => {
    console.log('index ');
    
    ctx.body = `index ctx:`
})
userRouter.get("/", (ctx, next) => {
    ctx.body = "get user"
})
userRouter.post("/", (ctx, next) => {
    ctx.body = "post user"
})
userRouter.get("/:id", (ctx, next) => {
    ctx.body = `get user id:${ctx.params.id}`
})

app
  .use(router.routes())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods()) // 响应options方法；自动相应返回405,501状态码
  .use(router.allowedMethods()); // 响应options方法；自动相应返回405,501状态码
app.listen(3000);
console.log('app listen on 3000');
