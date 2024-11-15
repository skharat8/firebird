import { faker } from "@faker-js/faker";
import prisma from "./customClient";

async function populateDatabase() {
  // Seed user data
  const users = await Promise.all(
    Array.from({ length: 100 }).map(async (_, index) => {
      const firstName = faker.person.firstName();

      return prisma.user.create({
        data: {
          username: faker.internet.username({ firstName }),
          email:
            index === 0
              ? "guest@gmail.com"
              : faker.internet.email({ firstName }),
          password:
            index === 0
              ? "guest_password"
              : faker.internet.password({ length: 10 }),
          firstName,
          lastName: faker.person.lastName(),
          profileImage: faker.image.urlLoremFlickr({
            category: "people",
            width: 300,
            height: 300,
          }),
          bio: faker.person.bio(),
          posts: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                content: faker.lorem.paragraph(),
              })),
            },
          },
        },
        select: { id: true },
      });
    }),
  );

  // Seed post data
  const posts = await prisma.post.findMany();
  const postsToUpdate = [];

  for (const currentPost of posts) {
    const likeUserIds = faker.helpers.arrayElements(users);
    const retweetUserIds = faker.helpers
      .arrayElements(users, { min: 0, max: 20 })
      .map((item) => ({ userId: item.id }));

    postsToUpdate.push(
      prisma.post.update({
        where: { id: currentPost.id },
        data: {
          likes: { connect: likeUserIds },
          retweets: { createMany: { data: retweetUserIds } },
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                authorId: faker.helpers.arrayElement(users).id,
                content: faker.lorem.paragraph(),
              })),
            },
          },
        },
      }),
    );
  }

  // Seed followers and following data
  const usersToUpdate = [];

  for (const currentUser of users) {
    const followingIds = faker.helpers
      .arrayElements(users)
      .map((item) => ({ followingId: item.id }));

    usersToUpdate.push(
      prisma.user.update({
        where: { id: currentUser.id },
        data: {
          followers: { createMany: { data: followingIds } },
        },
      }),
    );
  }

  await Promise.all(postsToUpdate);
  await Promise.all(usersToUpdate);
}

populateDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
