-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "UserStatus";
