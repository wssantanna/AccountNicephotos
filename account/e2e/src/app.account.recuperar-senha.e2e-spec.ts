/* tslint:disable:indent */
import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

const AxeBuilder = require('axe-webdriverjs');
const AnalyzeThePage = require('./app.util.validation').AnalyzeThePage;

describe('aXe - Account Recurar Senha', () => {
    let page: AppPage;

    beforeEach(async () => {
        const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

        page = new AppPage();
        browser.baseUrl = 'http://localhost:4200/account/recuperar-senha';
        await page.navigateTo();

        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should analyze the page for accessibility', function(done) {
        AnalyzeThePage(done);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

});
