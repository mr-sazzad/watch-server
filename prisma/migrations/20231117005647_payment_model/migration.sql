/*
  Warnings:

  - A unique constraint covering the columns `[session]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_session_key" ON "Payment"("session");
