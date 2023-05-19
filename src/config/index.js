import configDev from './config.dev.json'
import configProd from './config.pro.json'

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === 'DEVELOPMENT' ? configDev : configProd

export default config
