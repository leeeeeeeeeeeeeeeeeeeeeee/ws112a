import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const peoples = new Map();

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "Please Input in URL Bar /public/";
  })
  .get("/people", (ctx) => {
    ctx.response.body = Array.from(peoples.values());
  })
  .post("/people/add", async (ctx) => {
    const body = ctx.request.body();
    if (body.type === "form") {
      const pairs = await body.value;
      console.log('pairs=', pairs)
      const params = {};
      for (const [key, value] of pairs) {
        params[key] = value;
      }
      console.log('params=', params)

      let account = params["account"];
      let password = params["password"];
      console.log(`account=${account} password=${password}`)

      if (peoples.get(account)) {
        ctx.response.body = { error: `Account=${account} has been existed!` };
      } else {
        peoples.set(account, { account, password });
        ctx.response.type = "text/html";
        ctx.response.body = `<p>Success!</p><p><a href="/public/login.html">Forwarding to Login page</a></p>`;
      }
    }
  })
  .post("/people/login", async (ctx) => {
    const body = ctx.request.body();
    if (body.type === "form") {
      const pairs = await body.value;
      const params = {};
      for (const [key, value] of pairs) {
        params[key] = value;
      }
      const account = params["account"];
      const password = params["password"];

      const storedUser = peoples.get(account);

      if (storedUser && storedUser.password === password) {
        ctx.response.type = "text/html";
        ctx.response.body = `<p>Success</p><br><a href="/public/system.html">Enter the system</a>`;
      } else {
        ctx.response.type = "text/html";
        ctx.response.body = `<p>Failed! Please check!</p><br><p><a href="/public/login.html">Please Log In Again!</a></p>`;
      }
    }
  })
  .get("/public/(.*)", async (ctx) => {
    let wpath = ctx.params[0];
    console.log("wpath=", wpath);
    await send(ctx, wpath, {
      root: Deno.cwd() + "/public/",
      index: "index.html",
    });
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("start at : http://127.0.0.1:8000");

await app.listen({ port: 8000 });