var express = require('express');
var router = express.Router();
var cloudConfigPage = require('./cloudConfigPage');
var utilPage = require('./utilPage');
var exec = require('child_process').exec
var fs = require('fs')

/*

 ==PXE CORE OS==
 * cloud-config              (*.yml)
 * setup service             (*.service)
 * setup script              (*.sh)
 * final coreos cloud config (*.yml)

 */

/*
type:
small-cluster
develop-etcd
develop-worker
production-central
production-worker
 */

router.get('/config/:type/pxe.yml', cloudConfigPage.getPxeYml);
router.get('/config/:type/pxe.sh', cloudConfigPage.getPxeScript);
router.get('/config/:type/config.yml', cloudConfigPage.getCloudConfig);
router.get('/utils/networking', utilPage.getNetworking);
//router.get('/config/:type/init.sh', cloudConfigPage.getSmallCloudConfig);


router.get('/', function(req, res){
	res.render('configure', { json: JSON.stringify(require(__dirname + '/../config.json'), null, 4)})
})

router.get('/about', function(req, res){
	res.render('about', {})
})

router.get('/logs', function(req, res){
	res.render('logs', {})
})

router.get('/getLogs', function(req, res){
	
	// var logs = fs.readFileSync('/var/log/system.log').toString()
	
	exec('tail -n 200  /var/log/system.log', function(error, stdout, stderr){
		res.json({ data: stdout })
	})
	
})

router.post('/configure/save', function(req, res)
{
	try{
		var json = JSON.parse(req.body.json)
		console.log(__dirname + '/../config.json', JSON.stringify(json))
		fs.writeFileSync(__dirname + '/../config.json', JSON.stringify(json, null, 4))
		
		delete require.cache[require.resolve(__dirname + '/../config.json')]
		
		res.render('configure', { json: JSON.stringify(require(__dirname + '/../config.json'), null, 4), success: true})
	}
	catch(e){
		res.render('configure', { json: req.body.json, error: 'json format error' })
	}
})


module.exports = router;
