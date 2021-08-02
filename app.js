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
// 获取用户，返回数组
userRouter.get("/", (ctx, next) => {
    ctx.body = [{name: '李雷'},{name: '韩梅梅'}];
})
// 新建用户，返回新建的用户
userRouter.post("/", (ctx, next) => {
    ctx.body = {name: '李雷'}
})
// 获取特定用户，返回特定的用户
userRouter.get("/:id", (ctx, next) => {
    ctx.body = {name: '李雷'}
})
// 修改返回修改后的项
userRouter.put("/:id", (ctx, next) => {
    ctx.body = {name: '李雷2'}
})
// 删除，返回状态码204，代表成功了，但是没有返回值
userRouter.delete("/:id", (ctx, next) => {
    ctx.status = 204
})
app
  .use(router.routes())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods()) // 响应options方法；自动相应返回405,501状态码
  .use(router.allowedMethods()); // 响应options方法；自动相应返回405,501状态码
app.listen(3000);
console.log('app listen on 3000');
