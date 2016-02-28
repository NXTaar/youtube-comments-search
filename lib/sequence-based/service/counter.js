'use strict';
const sequenceGenerator = require('../seqGenerator');

let counter = 0;

sequenceGenerator.service_counter.subscribe(x => {
	counter++
	console.log(counter);
})