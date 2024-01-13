import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello World!"
   })

  .get("/room/e319", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>數位系統應用實驗室</h1>
            </body>
        </html>
        `
   })

  .get("/room/e320", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>多媒體實驗室</h1>
            </body>
        </html>
        `
   })

  .get("/room/e321", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>電腦網路實驗室</h1>
            </body>
        </html>
        `
   })

  .get("/room/e322", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>嵌入式實驗室</h1>
            </body>
        </html>
        `
   })

  .get("/nqu", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>金門大學</h1>
            <a href="https://www.nqu.edu.tw/">NGU</a>
            </body>
        </html>`
   })

  .get("/nqu/csie", (context) => {
    context.response.body = `
        <html>
            <body>
            <h1>金門大學資工學系</h1>
            <a href="https://csie.nqu.edu.tw/">金門大學資工學系</a>
            </body>
        </html>`
   })

  .get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/');
   })

  .get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/');
   });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });