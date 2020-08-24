import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
