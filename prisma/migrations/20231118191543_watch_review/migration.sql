/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_watchId_fkey";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "WatchReview" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "watchId" TEXT NOT NULL,

    CONSTRAINT "WatchReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchReview" ADD CONSTRAINT "WatchReview_watchId_fkey" FOREIGN KEY ("watchId") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
