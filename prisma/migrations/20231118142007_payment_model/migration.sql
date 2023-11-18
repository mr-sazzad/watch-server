-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
