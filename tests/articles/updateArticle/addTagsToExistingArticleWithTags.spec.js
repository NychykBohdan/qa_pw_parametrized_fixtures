import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Create an article with tags and add more of them', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Create an article with ${testNameEnding} and 
      add ${testNameEnding} on editing`, 
    async ({
      homePage,
      createArticlePage,
      viewArticlePage,
      editArticlePage,
      logger,
    }) => {
      const articleWithInitialTags = generateNewArticleData(logger, tagsNumber);

      await homePage.clickNewArticleLink();

      await createArticlePage.fillTitleField(
        articleWithInitialTags.title);
      await createArticlePage.fillDescriptionField(
        articleWithInitialTags.description);
      await createArticlePage.fillTextField(
        articleWithInitialTags.text);
      await createArticlePage.fillTagsField(
        articleWithInitialTags.tags);
      await createArticlePage.clickPublishArticleButton();

      await viewArticlePage.assertArticleTitleIsVisible(
        articleWithInitialTags.title);
      await viewArticlePage.assertArticleTextIsVisible(
        articleWithInitialTags.text);
      await viewArticlePage.assertArticleTagsAreVisible(
        articleWithInitialTags.tags);

      const articleWithNewTags = generateNewArticleData(logger, tagsNumber);
      await viewArticlePage.clickEditArticleButton();
      await editArticlePage.addTagsToArticle(
        articleWithNewTags.tags);
      await editArticlePage.clickUpdateArticleButton();

      await viewArticlePage.waitAndReloadArticlePage();
      await viewArticlePage.assertArticleTagsAreVisible(
        articleWithInitialTags.tags);
      await viewArticlePage.assertArticleTagsAreVisible(
        articleWithNewTags.tags);
    });

  
  });
});
