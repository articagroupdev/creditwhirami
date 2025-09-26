const { networkInterfaces } = require('os')

function getLocalIP() {
  const nets = networkInterfaces()
  const results = {}

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
      }
    }
  }

  return results
}

function displayNetworkInfo() {
  const interfaces = getLocalIP()
  const port = process.env.PORT || 3000
  
  console.log('\n🌐 INFORMACIÓN DE RED - CREDIT WITH RAMI')
  console.log('=' .repeat(50))
  
  console.log('\n📱 ACCESO LOCAL:')
  console.log(`   http://localhost:${port}`)
  
  console.log('\n🔗 ACCESO DESDE OTROS DISPOSITIVOS:')
  
  Object.keys(interfaces).forEach(name => {
    interfaces[name].forEach(ip => {
      console.log(`   http://${ip}:${port}`)
    })
  })
  
  console.log('\n💡 INSTRUCCIONES:')
  console.log('   1. Asegúrate de que todos los dispositivos estén en la misma red WiFi')
  console.log('   2. En tu teléfono/tablet, abre el navegador y usa una de las IPs de arriba')
  console.log('   3. Si tienes firewall, asegúrate de permitir conexiones en el puerto', port)
  
  console.log('\n🚀 COMANDOS DISPONIBLES:')
  console.log('   npm run dev         - Servidor con acceso de red')
  console.log('   npm run dev:local   - Solo acceso local')
  console.log('   npm run dev:network - Forzar acceso de red')
  
  console.log('\n' + '='.repeat(50))
}

if (require.main === module) {
  displayNetworkInfo()
}

module.exports = { getLocalIP, displayNetworkInfo }

