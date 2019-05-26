const https  = require('https')
const http   = require('http')
const config = require('./config')

/**
 * Request Function - Save log in DB
 * @param   {String}  protocol  Protocol (http / https)
 * @param   {Object}  bodyData  Data object that will be saved as in MS-Log
 * @return  {Promise}            returns result of saving log
 */
function request(protocol, bodyData) {
  // Create Log Options
  // TODO: this is a local stting - should be changed in the future
  const opt = {
    host: config.host,
    port: config.port,
    path: '/v1/logs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyData) }
  }
  const Protocol = (protocol === 'https') ? https : http
  return new Promise((resolve, reject) => {
    const request = Protocol.request(opt, (response) => {
      response.setEncoding('utf8')
      let body = ''
      response.on('data', (chunk) => { body += chunk })
      response.on('end', () => { resolve(JSON.parse(body)) })
    })
    request.on('error', (err) => {
      console.log('Error Save Log in MS-Logs: ', err)
      reject(err)
    })
    request.write(bodyData)
    request.end()
  })
}


/**
 * Save endpoint request & response in MS-Logs
 * @param   {Object}  err  Endpoint Error Object
 * @param   {Object}  req  Endpoint Request Object
 * @param   {Object}  res  Endpoint Response Object
 * @return  {Promise}      returns a result of saving log in MS-Logs
 */
function send(err, req, res) {
  // --------------------------------- Create Response ---------------------------------
  if(err.isBoom) {
    err.statusCode = err.output.statusCode
    err.message = err.output.payload.message
  }

  const response = res.result ? {
    statusCode: res.statusCode,
    success: (res.result != 'string'),
    result: res.result,
    request: {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      route: req.route
    }
  } : {
    statusCode: err.statusCode || (err.status || (err.code || 500)),
    message: err.message || http.STATUS_CODES[500],
    body: err.data || null
  }
  
  // ----------------------------- Save Response in MS-Logs -----------------------------
  const bodyData = JSON.stringify({
    objectId: req.body.objectId,
    objectType: req.body.objectType,
    method: req.method,
    data: {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      route: req.route,
      cookies: req.cookies,
      protocol: req.protocol,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      ip: req.ip,
      ips: req.ips,
      secure: req.secure,
      subdomains: req.subdomains
    },
    response: response
  })

    // Save log in DB
  request(config.protocol, bodyData)
    .catch(err => console.log('Error Save Log in MS-Logs: ', err) ) 

}

module.exports = { send }
