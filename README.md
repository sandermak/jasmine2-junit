jasmine2-junit
==============


By default, Jasmine 2.0 only provides a ConsoleReporter and HtmlReporter. Neither are suitable for reporting in a CI build. This project adds a JUnitXmlReporter which outputs JUnit compliant testreports. The reporter currently only works when running specs with [PhantomJS](http://phantomjs.org).

Usage
-----
In order to setup jasmine2-junit, you need to add the following scripts to your spec runner html file:

```
<!-- Include Jasmine 2.0's assets -->
<link href="lib/jasmine.css" rel="stylesheet" type="text/css">
<script src="lib/jasmine.js"></script>
<script src="lib/jasmine-html.js"></script>

<!-- The JUnit reporter should go before the boot script -->
<script src="../src/jasmine2-junit.js"></script>
<!-- This boot.js is a modified version of Jasmine's default boot.js! -->
<script src="../src/boot.js"></script>

<!-- Include your spec files here -->>
<script src="spec.js"></script>
```

Note that the ```boot.js``` file is a modified version of the file with same name that is provided by the default Jasmine 2.0 distribution. The only modification is that the JUnitXmlReporter is added as reporter. Currently, it seems impossible to add a reporter while still using the stock ```boot.js```.

After you setup your spec html, you can use the ```jasmine2-runner.js``` script with PhantomJS to execute your spec:

```
phantomjs jasmine2-runner.js yourspec.html
```

After running this script, JUnit XML files with testresults are written to the current directory. They all start with a ```TEST-``` prefix and end with ```.xml```.

Example
-------
See the [example](https://github.com/sandermak/jasmine2-junit) for a working setup of jasmine2-junit with Jasmine 2.0. Install the PhantomJS node package:
```
npm install -g phantomjs
```

in the ```example``` directory, run ```phantomjs ../src/jasmine2-runner.js specrunner.html```. JUnit XML output files are written with a ```TEST-*``` prefix for each top-level ```describe()``` (suite) in the testsuites that are run by specrunner.html.

Acknowledgments
---------------
The code and setup for this project are heavily based on the JUnitXmlReporter at https://github.com/larrymyers/jasmine-reporters which only works for Jasmine 1.x.
