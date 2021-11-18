'use strict'

//var civilServer = require('civil-server').default
const path = require('path')
import { theCivilServer, Iota, serverReactRender } from 'civil-server'
import iotas from '../iotas.json'
import App from './components/app'

if (serverReactRender.head) serverReactRender.head.shift() // the first on in the head didles the font size and we don't want that

Iota.load(iotas)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function start() {
  try {
    const server = new theCivilServer()
    server.App = App
    await server.earlyStart()
    server.routesDirPaths.push(path.resolve(__dirname, './routes'))
    server.socketAPIsDirPaths.push(path.resolve(__dirname, './socket-apis'))
    server.serverEventsDirPaths.push(path.resolve(__dirname, './events'))
    await server.start()
    logger.info('started')
  } catch (error) {
    logger.error('error on start', error)
  }
}

start()
