/* eslint-disable max-len */
 
import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.use({ contextsNumber: 3, usersNumber: 3, articlesNumber: 2});


test.beforeEach(async ({ pages, users, articleWithoutTags}) => {
  await signUpUser(pages[0], users[0], 1);
  await signUpUser(pages[1], users[1], 2);
  await signUpUser(pages[2], users[2], 3);
  await createArticle(pages[0], articleWithoutTags[0], 1);
  await createArticle(pages[1], articleWithoutTags[1], 2);
});

test(`View article created by another user in your feed`, async ({
  articleWithoutTags,
  pages,
  users
}) => {

  const viewArticlePages = new ViewArticlePage(pages[2], 3);
  const homePage = new HomePage(pages[2], 3);

  await viewArticlePages.open(articleWithoutTags[0].url);
  await viewArticlePages.assertArticleTitleIsVisible(articleWithoutTags[0].title);
  await viewArticlePages.assertArticleTextIsVisible(articleWithoutTags[0].text);
  await viewArticlePages.followArticleAuthor(users[0].username);
  await viewArticlePages.assertUserFollowingArticleAuthor(users[0].username);

  await viewArticlePages.open(articleWithoutTags[1].url);
  await viewArticlePages.assertArticleTitleIsVisible(articleWithoutTags[1].title);
  await viewArticlePages.assertArticleTextIsVisible(articleWithoutTags[1].text);
  await viewArticlePages.followArticleAuthor(users[1].username);
  await viewArticlePages.assertUserFollowingArticleAuthor(users[1].username);

  await homePage.openMainPage();
  await homePage.assertYourFeedTabIsActive();
  await homePage.assertArticleIsVisible(articleWithoutTags[0].title);
  await homePage.assertArticleIsVisible(articleWithoutTags[1].title);

});



