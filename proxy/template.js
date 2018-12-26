"use strict";
var { URL } = require("url");

module.exports = class extends Template {

    beforeAdding() {
        return this.askQuestions([
            {
                name: "proxyTarget",
                message: "Where should point this domain?",
                validate: "address"
            },
            {
                name: "certPemFile",
                message: "Where is located your SSL certificate (.pem) file?",
                validate: "path",
                optional: true
            },
            {
                name: "certKeyFile",
                message: "Where is located your SSL certificate key (.key) file?",
                validate: "path",
                optional: true
            }
        ], ({ certPemFile, certKeyFile, proxyTarget }) => {
            if(new URL(proxyTarget).pathname == "/") {
                proxyTarget = proxyTarget.replace(/\/$/, "");
            }

            this.addVariable("PROXY_TARGET", proxyTarget);

            this.addVariable("SSL_CERTIFICATE", certPemFile);
            this.addVariable("SSL_CERTIFICATE_KEY", certKeyFile);
        });
    }

};