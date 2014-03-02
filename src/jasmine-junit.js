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
            var suiteStartTime;
            var specStartTime;
            var totalNumberOfSpecs;
            var totalNumberOfFailures = 0;

            this.jasmineStarted = function(started) {
                console.log('jasmineStarted', started)
                totalNumberOfSpecs = started.totalSpecsDefined;
                runStartTime = new Date();
            };

            this.jasmineDone = function() {
                console.log('jasmineDone')
                console.log('runtime: ', elapsed(runStartTime, new Date()))
                console.log('failures: ', totalNumberOfFailures)
            };

            this.suiteStarted = function(result) {
                console.log('suiteStarted', result)
                suiteStartTime = new Date();
            };

            this.suiteDone = function(result) {
                console.log('suiteDone', result)
                console.log('suite time: ', elapsed(suiteStartTime, new Date()))  
            };

            this.specStarted = function(result) {
                specStartTime = new Date();
                console.log('sepcStarted', result)
            };

            this.specDone = function(result) {
                if(result.status === 'failed') {
                    totalNumberOfFailures++;
                }

                console.log('specDone', result)
                console.log(specToJUnitXml(result))
                console.log('spec time: ', elapsed(specStartTime, new Date()))  
            };

            return this;

        }

        return JUnitXmlReporter;
    };

    function specToJUnitXml(result) {

    }

    function elapsed(startTime, endTime) {
        return (endTime - startTime) / 1000;
    }

    function ISODateString(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        return d.getFullYear() + '-' +
            pad(d.getMonth() + 1) + '-' +
            pad(d.getDate()) + 'T' +
            pad(d.getHours()) + ':' +
            pad(d.getMinutes()) + ':' +
            pad(d.getSeconds());
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

})()