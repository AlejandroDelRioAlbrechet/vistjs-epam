import { VisjsTestPage } from './app.po';

describe('visjs-test App', function() {
  let page: VisjsTestPage;

  beforeEach(() => {
    page = new VisjsTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
