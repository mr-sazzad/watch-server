/*
  Warnings:

  - Added the required column `cartId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "cartId" TEXT NOT NULL;
