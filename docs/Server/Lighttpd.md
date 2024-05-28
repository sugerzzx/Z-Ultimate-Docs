# lighttpd

[lighttpd (pronounced /lighty/) is a secure, fast, standards compliant, and very flexible web server that has been optimized for high-performance environments. lighttpd supports a wide variety of features while using memory and CPU efficiently, making lighttpd an ideal web server for all systems, small and large.](https://redmine.lighttpd.net/projects/lighttpd/wiki)

# Documentation Overview

[Documentation Overview](https://redmine.lighttpd.net/projects/lighttpd/wiki/Docs)

## Configuration

[Quick Start](https://redmine.lighttpd.net/projects/lighttpd/wiki/TutorialConfiguration)

## Modules

### Module: mod_setenv

[mod_setenv modifies request headers (from clients), response headers (to clients), and the environment (for CGI).](https://redmine.lighttpd.net/projects/lighttpd/wiki/Mod_setenv)

#### 设置跨域

```shell
setenv.add-response-header = ( "Access-Control-Allow-Origin" => "*" )

setenv.add-response-header += ( "Access-Control-Allow-Methods" => "GET, POST, OPTIONS, PUT, DELETE" )
```
