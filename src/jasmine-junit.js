(function() {
    function getJasmineRequireObj() {
        if (typeof module !== "undefined" && module.exports) {
            return exports;
        } else {
            window.jasmineRequire = window.jasmineRequire || {};
            return window.jasmineRequire;
        }
    }

    if (typeof getJasmineRequireObj() == 'undefined') {
        throw new Error("jasmine 2.0 must be loaded before jasmine-junit");
    }

    getJasmineRequireObj().JUnitXmlReporter = function() {


        function JUnitXmlReporter(options) {
            var runStartTime;
            var specStartTime;
            var totalNumberOfSpecs;
            var totalNumberOfFailures = 0;
            var suiteLevel = -1;
            var suites = []
            var currentSuite;

            this.jasmineStarted = function(started) {
                console.log('jasmineStarted', started)
                totalNumberOfSpecs = started.totalSpecsDefined;
                runStartTime = new Date();
            };

            this.jasmineDone = function() {
                console.log('jasmineDone')
                console.log('runtime: ', elapsed(runStartTime, new Date()))
                console.log('failures: ', totalNumberOfFailures)
                
                window.done = true
            };

            this.suiteStarted = function(result) {
                console.log('suiteStarted', result)
                
                suiteLevel++;
                if (suiteLevel == 0) {
                    suites.push(result);
                    currentSuite = result;
                    currentSuite.suiteStartTime = new Date();
                    currentSuite.specs = [];
                }
            };

            this.suiteDone = function(result) {
                console.log('suiteDone', result)
                if (suiteLevel == 0) {
                    currentSuite.endTime = new Date();
                    writeFile('.', 'TEST-' + result.description, suiteToJUnitXml(currentSuite))
                }
                suiteLevel--;
            };

            this.specStarted = function(result) {
                specStartTime = new Date();
                console.log('specStarted', result)
            };

            this.specDone = function(result) {
                totalNumberOfSpecs++;

                if (isFailed(result)) {
                    totalNumberOfFailures++;
                }
                result.startTime = specStartTime;
                result.endTime = new Date();
                currentSuite.specs.push(result);
                console.log('specDone', result)
                // console.log(specToJUnitXml(result, specStartTime))
                console.log('spec time: ', elapsed(specStartTime, new Date()))
            };

            return this;

        }

        return JUnitXmlReporter;
    };

    function isFailed(result) {
        return result.status === 'failed'
    }

    function isSkipped(result) {
        return result.status === 'pending'
    }

    function suiteToJUnitXml(suite) {
        var resultXml = '<?xml version="1.0" encoding="UTF-8"?>\n'; 
        resultXml += '<testsuites>\n';
        resultXml += '\t<testsuite> ...\n'
        for (var i = 0; i < suite.specs.length; i++) {
            resultXml += specToJUnitXml(suite.specs[i]);
        }
        resultXml += '\t</testsuite>\n</testsuites>\n\n'
        return resultXml;
    }

    function specToJUnitXml(spec) {
        var xml = '\t\t<testcase classname="' + 'foo' +
            '" name="' + escapeInvalidXmlChars(spec.description) + '" time="' + elapsed(spec.startTime, spec.endTime) + '">\n';
        if (isSkipped(spec)) {
            xml += '\t\t\t<skipped />\n';
        }
        if (isFailed(spec)) {
            xml += failedToJUnitXml(spec.failedExpectations)
        }
        xml += '\t\t</testcase>\n'
        return xml;
    }

    function failedToJUnitXml(failedExpectations) {
        var failure;
        var failureXml = ""
        for (var i = 0; i < failedExpectations.length; i++) {
            failure = failedExpectations[i];
            failureXml += '\t\t\t<failure type="' + failure.matcherName + '" message="' + trim(escapeInvalidXmlChars(failure.message)) + '">\n';
            failureXml += escapeInvalidXmlChars(failure.stack || failure.message);
            failureXml += "\t\t\t</failure>\n";
        }

        return failureXml;
    }

    function elapsed(startTime, endTime) {
        return (endTime - startTime) / 1000;
    }

    function trim(str) {
        return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }

    function escapeInvalidXmlChars(str) {
        return str.replace(/</g, "&lt;")
            .replace(/\>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/\'/g, "&apos;")
            .replace(/\&/g, "&amp;");
    }

    function writeFile(path, filename, text) {
                    function getQualifiedFilename(separator) {
                if (path && path.substr(-1) !== separator && filename.substr(0) !== separator) {
                    path += separator;
                }
                return path + filename;
            }

        // PhantomJS
        try {
             // turn filename into a qualified path
             console.log('writeFile called')
                filename = getQualifiedFilename(window.fs_path_separator);
                __phantom_writeFile(filename, text);
                return;
        } catch (f) {
            console.log('error writing file', f)
        }
        // Node.js
        try {
            var fs = require("fs");
            var nodejs_path = require("path");
            var fd = fs.openSync(nodejs_path.join(path, filename), "w");
            fs.writeSync(fd, text, 0);
            fs.closeSync(fd);
            return;
        } catch (g) {}
    }

})()