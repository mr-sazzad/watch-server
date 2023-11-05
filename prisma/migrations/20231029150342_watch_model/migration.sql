/*
  Warnings:

  - Changed the type of `price` on the `Watch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
