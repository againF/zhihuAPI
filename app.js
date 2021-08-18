const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const hostName = '127.0.0.1'; //IP
const port = 3000; //端口
let publishStatus = ""; // 网站发布状态
// 处理跨域
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    await next()
  })
// 用户
const userRouter = new Router({
    prefix: "/user"
})
// 轮询
const askRouter = new Router({
    prefix: "/ask"
})

askRouter.get("/publish/status",(ctx) => {
    ctx.body = publishStatus
}) 

router.post("/build", (ctx) => {
    publishStatus = "开始发布"
    ctx.body="开始发布"
    setTimeout(() => {
        publishStatus = "进度30%"
    }, 3000);
    setTimeout(() => {
        publishStatus = "进度60%"
    }, 6000);
    setTimeout(() => {
        publishStatus = "进度90%"
    }, 9000);
    setTimeout(() => {
        publishStatus = "进度100%"
    }, 12000);
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
    ctx.body = [{name: '李雷'},{name: '韩梅梅1'}];
})
// 新建用户，返回新建的用户
userRouter.post("/", (ctx, next) => {
    let body = ctx.request.body;
    console.log('body:',body);
    
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
.use(bodyparser())
  .use(router.routes())
  .use(userRouter.routes())
  .use(askRouter.routes())
  .use(userRouter.allowedMethods()) // 响应options方法；自动相应返回405,501状态码
  .use(router.allowedMethods()) // 响应options方法；自动相应返回405,501状态码
  .use(askRouter.allowedMethods()) // 响应options方法；自动相应返回405,501状态码
app.listen(port,hostName,() => {
    console.log(`服务运行在http://${hostName}:${port}`);
});

