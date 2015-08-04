/**
 * Created by tad on 3/11/15.
 */

'use strict';

var tool = require('./util/tool');
var config = require('../config');

/*****************
 *  pxe files
 */

exports.getPxeScript = function (req, res, next) {

	var type = req.params.type;
	var requestIP = tool.getRemoteAddress(req);
	var data = {
		requestIP: requestIP,
		httpHost: config.httpHost,
		type: type,
		layout: false
		
	};
	console.log(data);
	res.set('Content-Type', 'text/plain');
	res.render('script/pxe', data);
}

exports.getPxeYml = function (req, res, next) {

	var type = req.params.type;
	var requestIP = tool.getRemoteAddress(req);
	var data = {
		requestIP: requestIP,
		httpHost: config.httpHost,
		type: type,
		sshAuthorizedKeys: config.sshAuthorizedKeys,
		hostname: 'pxe-install-' + requestIP.replace(/\./gm, '-'),
		layout: false
	};
	console.log(data);
	res.set('Content-Type', 'text/plain');
	res.render('yml/pxe', data);
}

/*****************
 * cloud config files
 */

exports.getCloudConfig = function (req, res, next) {

	var type = req.params.type;
	var requestIP = tool.getRemoteAddress(req);
	var data = {
		requestIP: requestIP,
		hostname: type + '-' + requestIP.replace(/\./gm, '-'),
		type: type,
		sshAuthorizedKeys: config.sshAuthorizedKeys,
		discoveryURL: config.discoveryURL,
		layout: false
	};
	console.log(data);
	renderConfigByType(res, type, data);
}


function renderConfigByType(res, type, data) {
	switch (type) {
		case 'simple':

			break;
		case 'small-cluster':

			break;
		case 'develop-etcd':
			data.developEtcdHost = config.developEtcdHost;
			data.developEtcdGateway = config.developEtcdGateway;
			data.hostname = 'etcd-host-' + config.developEtcdHost.replace(/\./gm, '-');
			break;
		case 'develop-worker':
			data.developEtcdHost = config.developEtcdHost;
			break;
		case 'production-central':
			data.developEtcdHost = config.developEtcdHost;
			data.productionEtcdGateway = config.productionEtcdGateway;
			data.productionDns = config.productionDns;
			data.hostname = 'central-' + data.requestIP.replace(/\./gm, '-');
			break;
		case 'production-worker':
			data.productionEtcdServices2379 = config.productionEtcdServices2379;
			data.productionEtcdServices2380 = config.productionEtcdServices2380;
			data.productionEtcdGateway = config.productionEtcdGateway;
			data.productionK8sMasterIP = config.productionK8sMasterIP;
			data.productionDns = config.productionDns;
			data.hostname = 'worker-' + data.requestIP.replace(/\./gm, '-');
			break;
		default :
			res.end('No such type:', type);
			return;
	}
	res.set('Content-Type', 'text/plain');
	data.layout = false
	res.render('yml/' + type, data);
}
