'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var projectName = 'huji reg.pantheon';

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    project: projectName,
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'iphone5': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://dev-huji-reg.pantheon.io';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url('http://gizra:123@dev-huji-reg.pantheon.io')
      .pause(10000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude: [],
        remove:
          [
            'footer'
          ],
        screenWidth: selectedCaps == 'chrome' ? [960,1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the first degree page',function(done) {
    client
      .url('http://dev-huji-reg.pantheon.io/courses/first-degree/faculty/all/grid/all')
      .webdrivercss(testName + '.first-degree', {
        name: '1',
        remove:
          [
            // Content
            '.search-result-col',
            // Sidebar.
            '.sidebar-messages'
          ],
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
