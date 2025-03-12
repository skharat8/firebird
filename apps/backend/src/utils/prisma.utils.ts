import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/customClient.js";

type fetchNextPageParams = {
  cursor?: string;
  filterQuery: Prisma.PostWhereInput;
  selectQuery?: Prisma.PostSelect;
  includeQuery?: Prisma.PostInclude;
  pageSize: number;
  orderBy?: "id" | "createdAt";
};

async function fetchNextPage({
  cursor,
  filterQuery,
  selectQuery,
  includeQuery,
  pageSize,
  orderBy = "id",
}: fetchNextPageParams) {
  let posts;

  // Cursor can only take unique fields like ID. Ensure that posts are
  // always sorted by ID second, even if primary sorted field is different.
  if (!cursor) {
    posts = await prisma.post.findMany({
      where: filterQuery,
      select: selectQuery,
      include: includeQuery,
      orderBy: [{ [orderBy]: "desc" }, { id: "desc" }],
      take: pageSize,
    });
  } else {
    posts = await prisma.post.findMany({
      where: filterQuery,
      select: selectQuery,
      include: includeQuery,
      orderBy: [{ [orderBy]: "desc" }, { id: "desc" }],
      take: pageSize,
      skip: 1, // skip the cursor
      cursor: { id: cursor }, // Take items starting from this post ID
    });
  }

  let nextCursor;
  if (posts?.length === pageSize) {
    const lastPostInFeed = posts.at(-1);
    nextCursor = lastPostInFeed?.id ?? null;
  } else {
    // Could not fetch requested number of entries. This means there
    // is no more data left to return.
    nextCursor = null;
  }

  return { posts, nextCursor };
}

export { fetchNextPage };
