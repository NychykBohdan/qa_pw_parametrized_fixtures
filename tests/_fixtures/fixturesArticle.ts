import { test as base } from '@playwright/test';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
  articleWithoutTags;
  articlesNumber;
  articleWithOneTag;
  createArticlePage;
  viewArticlePage;
  editArticlePage;
}>({
  articleWithoutTags: async ({ logger, articlesNumber }, use) => {
    const articles = Array(articlesNumber);

    for (let i = 0; i < articlesNumber; i++) {
      articles[i] = generateNewArticleData(logger);
    }

    await use(articles);
  }, articlesNumber: [1, {option: true}],
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);

    await use(article);
  },
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  }
});
