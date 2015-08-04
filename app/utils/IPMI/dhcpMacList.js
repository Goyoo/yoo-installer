/* global Ajax */
/* global GetResponseXML */
var result = "";
function UserPrivilegeHandler(originalRequest) {
	if (originalRequest.readyState == 4 && originalRequest.status == 200) {
		var response = originalRequest.responseText.replace(/^\s+|\s+$/g, "");
		var xmldoc = GetResponseXML(response);
		var IPMIRoot = xmldoc.documentElement;//point to IPMI
		var StatusCode = IPMIRoot.getElementsByTagName("MBInfo");
		var ip = StatusCode[0].getAttribute("BMCIP");
		var mac1 = StatusCode[0].getAttribute("mac1");
		var mac2 = StatusCode[0].getAttribute("mac2");

		var ip4 = +ip.split('.')[3];
		var ip3 = +ip.split('.')[2] - 202;
		var ipIndex = ip3 * 28 + ip4;
		console.log(ipIndex, ip);
		//var str = '  host core-1-' + ipIndex + ' { hardware ethernet ' + mac1 + '; fixed-address 10.12.1.' + ipIndex + '; filename "coreos/pxelinux.0";}\n';
		var str = '  host core-1-' + ipIndex + ' { hardware ethernet ' + mac2 + '; fixed-address 10.12.1.' + ipIndex + ';}\n';
		result += str;
		console.log(str);
//			console.log(ip+' '+mac1 +' '+mac2 );
	}
}

var url = '/cgi/ipmi.cgi';

var myAjax = new Ajax.Request(
	url,
	{method: 'get', parameters: pars, onComplete: UserPrivilegeHandler}//reigister callback function
)
for (var i = 0; i < 30; i++) {
	var pars = 'GET_NODE_MB_INFO.XML=(' + i + ',0)&time_stamp=' + (new Date());
	;
	var myAjax = new Ajax.Request(
		url,
		{method: 'get', parameters: pars, onComplete: UserPrivilegeHandler}//reigister callback function
	);
}