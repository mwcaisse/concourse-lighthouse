const lighthouse = require("lighthouse")
const chromeLauncher = require("chrome-launcher")

function launchChromeAndRunLighthouse(url, opts, config) {
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr);
        });
    });
}

const opts = {
    lightHouseOpts: {
        chromeFlags: [],
        emulatedFormFactor: process.env.CLH_FORM_FACTOR || "desktop"
    },
    printCategories: [
        "performance",
        "accessibility",
        "best-practices",
        "seo",
        "pwa"
    ]
};

const url = process.env.CLH_URL;

if (!url) {
    console.log("ERROR! No url specified!")
    process.exit(1);
}

launchChromeAndRunLighthouse(url, opts.lightHouseOpts).then(results => {
    console.log(`Lighthouse results for ${url}`)
    opts.printCategories.forEach(categoryKey => {
        let category = results.categories[categoryKey];
        console.log(`\t${category.title}: ${(category.score * 100).toFixed(0)}`)
    })
});