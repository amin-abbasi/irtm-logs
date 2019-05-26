# irtm-logs

irtm-Logs saves all related data from each endpoint (request &amp; response) in all micro-services 

## Installation

Using npm:
```shell
$ npm install irtm-logs
```
Note: add `--save` if you are using npm < 5.0.0

In Node.js:
```js
const express = require('express')
const app     = express()

// Load irtm-logs
const Logs = require('irtm-logs')

// Create a new model and save in database
app.post('/v1/your/route', /* your validation... */, (req, res, next) => {
  return YourModel.create(req.body)
    .then((result) => {
      
      // save this endpoint action
      Logs.send(req, { ...res, result: result })

      res.send({ success: true, result: result })
    })
    .catch(/* error handling... */)
})
```

