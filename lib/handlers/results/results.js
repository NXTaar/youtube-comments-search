'use strict';

exports.post = function* () {
    let {videoId, searchFrase} = this.request.body;
    this.body = 'ok';
}