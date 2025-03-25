-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_toId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parentPostId_fkey";

-- DropForeignKey
ALTER TABLE "Repost" DROP CONSTRAINT "Repost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Repost" DROP CONSTRAINT "Repost_userId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repost" ADD CONSTRAINT "Repost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
