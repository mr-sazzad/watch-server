-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others', 'NotSet');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'NotSet';
