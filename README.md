# ms-logs

MS-Logs saves all related data from each endpoint (request &amp; response) in all micro-services 

## Installation

Using npm:
```shell
$ npm i ms-logs
```
Note: add --save if you are using npm < 5.0.0

In Node.js:
```js
const express = require('express')
const app     = express()

// Load ms-logs
const MSLogs = require('ms-logs')

// Use MSLogs as a middleware in express
app.use(MSLogs)
```

