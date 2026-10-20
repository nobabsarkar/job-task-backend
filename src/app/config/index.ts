import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  frontend_url: process.env.FRONTEND_URL,

  database_url: process.env.DATABASE_URL,

  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
