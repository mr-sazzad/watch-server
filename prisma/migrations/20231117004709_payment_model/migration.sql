/*
  Warnings:

  - The values [Cencelled] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `session` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('Paid', 'Unpaid');
ALTER TABLE "Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'Unpaid';
COMMIT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "session" TEXT NOT NULL;
