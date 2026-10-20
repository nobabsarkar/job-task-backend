
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url); 
   
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    app = express();
    app.use(
      cors({
        origin: "",
        credentials: true
      })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
      res.send("Hello World");
    });
    app_default = app;
  }
});

// src/app/config/index.ts
import dotenv from "dotenv";
import path from "path";
var config_default;
var init_config = __esm({
  "src/app/config/index.ts"() {
    dotenv.config({ path: path.join(process.cwd(), ".env") });
    config_default = {
      node_env: process.env.NODE_ENV,
      port: process.env.PORT,
      frontend_url: process.env.FRONTEND_URL
    };
  }
});

// src/server.ts
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    init_config();
    var PORT = config_default.port;
    async function main() {
      try {
        app_default.listen(PORT, () => {
          console.log(`Server is running on port: ${PORT}`);
        });
      } catch (error) {
        console.log(`Error Starting the server:`, error);
      }
    }
    main();
  }
});
export default require_server();
//# sourceMappingURL=server.mjs.map