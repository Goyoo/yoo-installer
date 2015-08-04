#PXE


## process

* PXE
* DHCP
* TFTP
* MENU
* * append cloud-config-url=http://192.168.0.1/pxe-small-cluster.yml
* * * pxe-small-cluster.yml -> service -> http://192.168.0.1/pxe-small-cluster.setup




==PXE CORE OS==
* cloud-config              (*.yml)
* setup service             (*.service)
* setup script              (*.sh)
* final coreos cloud config (*.yml)


==FINAL CORE OS==
* final coreos cloud-config
* setup service
* setup script
