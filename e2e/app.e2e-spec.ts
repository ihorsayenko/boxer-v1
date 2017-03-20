import { BoxerV1Page } from './app.po';

describe('boxer-v1 App', () => {
  let page: BoxerV1Page;

  beforeEach(() => {
    page = new BoxerV1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
