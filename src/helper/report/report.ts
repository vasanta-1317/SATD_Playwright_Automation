const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "SATD_PSM Automation Report",
    pageTitle: "SATD PSM test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Vasanta - PC",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "SATD_PSM Application" },
            { label: "Release", value: "4.2.1" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});