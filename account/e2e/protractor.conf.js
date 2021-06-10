// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

const HtmlReporter = require('protractor-beautiful-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
    jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'reports',
        clientDefaults: {
            preserveDirectory: false,
            takeScreenShotsOnlyForFailedSpecs: true,
            gatherBrowserLogs: true,
            jsonsSubfolder: 'jsons',
            screenshotsSubfolder: 'images',
            searchSettings: {
                allselected: false,
                passed: false,
                failed: true,
                pending: false,
                withLog: false
            },
            columnSettings:{
                displayTime:true,
                displayBrowser:false,
                displaySessionId:false,
                displayOS:true,
                inlineScreenshots:true
            }
        }
    }).getJasmine2Reporter());
  }
};