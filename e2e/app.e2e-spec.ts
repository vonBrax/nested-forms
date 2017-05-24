import { NestedFormPage } from './app.po';

describe('nested-form App', () => {
  let page: NestedFormPage;

  beforeEach(() => {
    page = new NestedFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
