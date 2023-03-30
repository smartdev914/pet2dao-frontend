import configDev from './config.dev.json'
import configProd from './config.pro.json'

const NODE_ENV = 'development'

const config = NODE_ENV === 'development' ? configDev : configProd

export default config
