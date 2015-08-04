

'use strict';

var tool = require('./util/tool');
var config = require('../config');

/*****************
 *  pxe files
 */

exports.getNetworking = function (req, res, next) {
	var requestIP = tool.getRemoteAddress(req);
	var data = {
		requestIP: requestIP, 
		layout: false
	};
	console.log(data);
	res.set('Content-Type', 'text/plain');
	res.render('utils/networking', data);
}
