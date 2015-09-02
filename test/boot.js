'use strict';

require('jasmine-n-matchers');
if (process.env.RUNNER === 'CI') {
  var KrustyJasmineReporter = require('krusty-jasmine-reporter');
  var junitReporter = new KrustyJasmineReporter.KrustyJasmineJUnitReporter({
      specTimer: new jasmine.Timer(),
      JUnitReportSavePath: process.env.SAVE_PATH || './',
      JUnitReportFilePrefix: process.env.FILE_PREFIX || 'through-results',
      JUnitReportSuiteName: 'Through Reports',
      JUnitReportPackageName: 'Through Reports'
    });

  jasmine.getEnv().addReporter(junitReporter);
}


