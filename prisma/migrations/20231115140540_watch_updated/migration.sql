/*
  Warnings:

  - Added the required column `desc` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "desc" TEXT NOT NULL;
