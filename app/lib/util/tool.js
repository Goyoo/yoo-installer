/**
 * Created by tad on 3/11/15.
 */

'use strict';

exports.getRemoteAddress = function (req) {
	var str = req.connection.remoteAddress || req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
	var arr = str.split(":");
	return arr[arr.length-1];
}