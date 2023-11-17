/*
  Warnings:

  - Added the required column `paymentId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Cencelled', 'Unpaid');

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'Upcoming';

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_cartId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'Unpaid';

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
