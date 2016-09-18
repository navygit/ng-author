import { AuthorPage } from './app.po';

describe('author App', function() {
  let page: AuthorPage;

  beforeEach(() => {
    page = new AuthorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
