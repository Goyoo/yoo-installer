/**
 * Created by tad on 3/12/15.
 */

'use strict';

module.exports = {
	sshAuthorizedKeys: ["ssh-rsa AtiaLegIjvQgfnWDOGIGeE+vxG3 wptad@tom.com"],
	httpHost: "192.168.0.1",
	discoveryURL: "https://discovery.etcd.io/e055d84e0207475ad941e087da1c88ce",
	developEtcdHost: "192.168.0.200",
	developEtcdGateway: "192.168.0.1",
	productionEtcdGateway: "10.11.1.254",
	productionEtcdServices2379: "http://192.168.0.63:4001,http://192.168.0.62:4001,http://192.168.0.65:4001",
	productionEtcdServices2380: "http://192.168.0.63:4001,http://192.168.0.62:4001,http://192.168.0.65:4001",
	productionK8sMasterIP: "10.12.1.55",
	productionDns: "10.11.1.1"
}