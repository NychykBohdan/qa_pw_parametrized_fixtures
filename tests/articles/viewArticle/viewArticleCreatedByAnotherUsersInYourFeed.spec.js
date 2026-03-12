/* eslint-disable max-len */
import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3});


test.beforeEach(async ({ pages, users, articleWithoutTags}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags, 1);
});

test(`View article created by another user in your feed`, async ({
  articleWithoutTags,
  pages,
  users
}) => {

  const viewArticlePageUser2 = new ViewArticlePage(pages[1], 2);
  const homePageUser2 = new HomePage(pages[1], 2);

  await viewArticlePageUser2.open(articleWithoutTags.url);
  await viewArticlePageUser2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePageUser2.followArticleAuthor(users[0].username);
  await viewArticlePageUser2.assertUserFollowingArticleAuthor(users[0].username);
  await homePageUser2.openMainPage();
  await homePageUser2.assertYourFeedTabIsActive();
  await homePageUser2.assertArticleIsVisible(articleWithoutTags.title);

  const viewArticlePageUser3 = new ViewArticlePage(pages[2], 3);
  const homePageUser3 = new HomePage(pages[2], 3);

  await viewArticlePageUser3.open(articleWithoutTags.url);
  await viewArticlePageUser3.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePageUser3.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePageUser3.followArticleAuthor(users[0].username);
  await viewArticlePageUser3.assertUserFollowingArticleAuthor(users[0].username);
  await homePageUser3.openMainPage();
  await homePageUser3.assertYourFeedTabIsActive();
  await homePageUser3.assertArticleIsVisible(articleWithoutTags.title);

});



