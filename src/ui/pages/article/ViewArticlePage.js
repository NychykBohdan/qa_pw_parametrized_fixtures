import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', 
      { name: 'Edit Article' }).first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await this.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url, {waitUntil: 'domcontentloaded'});
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeVisible();
      }
    });
  }

  async assertTagsAreHidden(tags) {
    await this.step(`Assert tags ${tags} are hidden`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeHidden();
      }
    })
  }

  async clickEditArticleButton() {
    await this.step(`Click 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    })
  }

  async waitAndReloadArticlePage() {
    await this.step('Wait and reload article page', async () => {
      await this.page.waitForURL(/\/article\//);
      await this.page.reload({waitUntil: 'domcontentloaded'});
    })
  }

  async followArticleAuthor(username) {
    await this.step(`Follow article author ${username}`, async() => {
      await this.page.getByRole('button', {name: 
        `Follow ${username}`
      }).first().click();
    })
  }

  async assertUserFollowingArticleAuthor(username) {
    await this.step(`Assert user following article author ${username}`, 
      async() => {
        await expect(this.page.getByRole('button', {name: 
          `Unfollow ${username}`
        }).first()).toBeVisible();
      })
  }
}
