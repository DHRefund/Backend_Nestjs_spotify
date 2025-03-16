/*
  Warnings:

  - You are about to drop the `_LikedSongs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikedSongs" DROP CONSTRAINT "_LikedSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedSongs" DROP CONSTRAINT "_LikedSongs_B_fkey";

-- DropTable
DROP TABLE "_LikedSongs";

-- CreateTable
CREATE TABLE "liked_songs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liked_songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "liked_songs_userId_songId_key" ON "liked_songs"("userId", "songId");

-- AddForeignKey
ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
