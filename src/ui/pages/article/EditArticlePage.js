import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.updateArticleButton = page.getByRole('button', 
      { name: 'Update Article'});
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async addTagsToArticle(tags) {
    await this.step(`Add tags ${tags} to article`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    })
  }

  async removeArticleTags(tags) {
    await this.step(`Remove tag(s) ${tags} from article`, async () => {
      for (const tag of tags) {
        await this.page
          .locator('span')
          .filter({ hasText: tag})
          .locator('i')
          .click();
      }
    })
  }

  async clickUpdateArticleButton() {
    await this.step(`Click 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    })
  }
}
