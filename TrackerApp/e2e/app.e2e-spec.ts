import { TrackerAppPage } from './app.po';

describe('tracker-app App', () => {
  let page: TrackerAppPage;

  beforeEach(() => {
    page = new TrackerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
