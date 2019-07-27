import Vue from 'vue'
import uaParser from 'ua-parser-js'
import { BROWSER, OS, DEVICE_TYPE } from '../components/constants'

const { SAFARI, CHROME, EDGE, IE, FIREFOX } = BROWSER
const { MAC, WINDOWS, LINUX, ANDROID, IOS } = OS
const { SMARTPHONE, TABLET } = DEVICE_TYPE

Vue.prototype.$uaParser = uaParser

Vue.prototype.$uaParserConstants = {
  BROWSER: {
    'Mobile Safari': SAFARI,
    'Safari': SAFARI,
    'Chrome Headless': CHROME,
    'Chrome WebView': CHROME,
    'Chrome': CHROME,
    'Chromium': CHROME,
    'Edge': EDGE,
    IE,
    'IEMobile': IE,
    'Firefox': FIREFOX
  },
  OS: {
    'Mac OS': MAC,
    'Windows': WINDOWS,
    'Windows Phone': WINDOWS,
    'Windows Mobile': WINDOWS,
    'Linux': LINUX,
    'PCLinuxOS': LINUX,
    'VectorLinux': LINUX,
    'Arch': LINUX,
    'Ubuntu': LINUX,
    'SUSE': LINUX,
    'Unix': LINUX,
    'RedHat': LINUX,
    'Mint': LINUX,
    'Debian': LINUX,
    'GNU': LINUX,
    'Android': ANDROID,
    'iOS': IOS
  },
  DEVICE_TYPE: {
    'mobile': SMARTPHONE,
    'tablet': TABLET
  }
}
