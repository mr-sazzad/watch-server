/*
  Warnings:

  - You are about to drop the column `image` on the `Review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('available', 'unavailable');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "image",
ADD COLUMN     "pImage" TEXT;

-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'available';
