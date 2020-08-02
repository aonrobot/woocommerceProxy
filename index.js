const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const HttpStatus = require("http-status");
const IO = require('koa-socket-2');

const wooCommerceRestAPI = require('@woocommerce/woocommerce-rest-api').default;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const api_id = 'ck_6e8aa2b04b12d50ff4e1f0a673883da740e20acf'
const api_secret = 'cs_6196d606e707acc0d6c767208edce5ec281d7160'
const api_base_uri = 'https://13.212.25.13'
const api_version = 'wc/v3'

const wc = new wooCommerceRestAPI({
    url: api_base_uri,
    consumerKey: api_id,
    consumerSecret: api_secret,
    version: api_version,
    queryStringAuth: true,
    axiosConfig: {
        rejectUnauthorized: false
    }
})

const app = new Koa();

const PORT = process.env.PORT || 4000;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body('ควยเจกโครตกาก มึงสามารถไปดูได้ว่ามี enpoint อะไรบ้างที่นี่ไิ่กร๊วก : <a href="https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#">https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#</a>')
  await next()
})

router.get("/:path", async (ctx, next) => {
  ctx.status = HttpStatus.OK;
  try {
    const products = await wc.get(ctx.params.path)
    ctx.body = products.data;
  } catch(err) {
    ctx.body = err;
  }
  await next();
});

router.get("/:path/:path2", async (ctx, next) => {
  ctx.status = HttpStatus.OK;
  try {
    const products = await wc.get(ctx.params.path + '/' + ctx.params.path2)
    ctx.body = products.data;
  } catch(err) {
    ctx.body = err;
  }
  await next();
});

router.get("/:path/:path2/:path3", async (ctx, next) => {
  ctx.status = HttpStatus.OK;
  try {
    const products = await wc.get(ctx.params.path + '/' + ctx.params.path2 + '/' + ctx.params.path3)
    ctx.body = products.data;
  } catch(err) {
    ctx.body = err;
  }
  await next();
});


router.post("/:path", async (ctx, next) => {
  const path = ctx.params.path
  let data = ctx.request.body

  try {
    const response = await wc.post(path, data)
    ctx.body = response.data;
  } catch(err) {
    ctx.body = err.response.data;
  }

})

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});


