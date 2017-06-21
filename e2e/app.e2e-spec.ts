import { TranslateAppPage } from './app.po';

describe('translate-app App', () => {
  let page: TranslateAppPage;

  beforeEach(() => {
    page = new TranslateAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
