jasmine2-junit
==============


By default, Jasmine only provides a ConsoleReporter and HtmlReporter. Neither are suitable for reporting in a CI build. This project adds an JUnitXmlReporter which outputs JUnit compliant testreports. The reporter currently  only works when running specs with [PhantomJS](http://phantomjs.org).

Usage
-----
See the [example](https://github.com/sandermak/jasmine2-junit) for a working setup of jasmine2-junit with Jasmine 2.0. Install the PhantomJS node package:
```
npm install -g phantomjs
```

in the ```example``` directory, run ```phantomjs jasmine-runner.js specrunner.html```. JUnit XML output files are  written with a ```TEST-*``` prefix for each top-level ```describe()``` (suite) in the testsuites that are run by specrunner.html.

Acknowledgments
---------------
The code and setup for this project are heavily based on the JUnitXmlReporter at https://github.com/larrymyers/jasmine-reporters which only works for Jasmine 1.x.
