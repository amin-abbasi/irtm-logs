# irtm-logs

irtm-Logs saves all related data from each endpoint (request &amp; response) in all micro-services 

## Installation

Using npm:
```shell
$ npm install irtm-logs
```
Note: add `--save` if you are using npm < 5.0.0

In Node.js save any endpoint action by having `objectId`, `objectType`, endpoint request (`req`) & response (`res`):
```js

// Load irtm-logs
const Logs = require('irtm-logs')

// save endpoint action
Logs.send(objectId, objectType, req, res)

```

