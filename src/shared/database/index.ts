import { PrismaClient } from '@prisma/client';

export const document = new PrismaClient();

async function main() {
  //Connect the mongodb client
  await document.$connect();

  // Get all users
  const users = await document.user.findMany();

  // Get all posts
  // const contents = await document.content.findMany();
  console.log(users);
}

main()
  .then(async () => {
    console.log('Done');
  })
  .catch(async (error) => {
    console.log(error);
    await document.$disconnect();
    process.exit(1);
  });
