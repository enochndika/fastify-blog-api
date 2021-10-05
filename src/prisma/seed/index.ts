import seedCategory from './seed.category';
import seedUser from './seed.user';
import seedPosts from './seed.post';
import seedComment from './seed.comment';

async function seed() {
  await seedUser().then(() =>
    seedCategory().then(() => seedPosts().then(() => seedComment())),
  );
}

seed();
