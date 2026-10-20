import app from "./app.js";
import config from "./app/config/index.js";
import { prisma } from "./app/lib/prisma.js";
import { seedSuperAdmin } from "./app/utils/seed.js";

const PORT = config.port;

async function main() {
  try {
    await prisma.$connect();
    console.log("connected to the database successfully");

    await seedSuperAdmin();
    console.log("super admin seeding successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error Starting the server:`, error);
  }
}

main();

export default app;
