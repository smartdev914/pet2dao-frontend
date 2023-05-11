import configDev from './config.dev.json'
import configProd from './config.pro.json'

const NODE_ENV = 'production'

const config = NODE_ENV === 'development' ? configDev : configProd

export default config
