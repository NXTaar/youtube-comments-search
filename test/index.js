'use strict';
require('co-mocha');
require('should');
const app = require('../index');
const seqGenerator = require('sequence-based/seqGenerator');

let videoId = 'kzsONuX-Gq8';
let parentId = "z12qjfao0vnizpem4220tpehcnbuin3uy";

let clientId = 'kjno4309nf92r';
let searchFrase = "карина";

const mongoose = require('modules/mongoose');

mongoose.connection.on('connected', function () {
    seqGenerator.apiRequests.add({
        apiType: 'thread',
        requestData: {videoId},
        clientInfo: {clientId, searchFrase, videoId}
    });
});



//
// setInterval(function() {
// 	console.log("i'm alive")
// }, 10000);