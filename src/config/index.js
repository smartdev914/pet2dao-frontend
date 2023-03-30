import configDev from './config.dev.json'
import configProd from './config.pro.json'

<<<<<<< HEAD
const NODE_ENV = 'production'
=======
const NODE_ENV = 'development'
>>>>>>> proposal

const config = NODE_ENV === 'development' ? configDev : configProd

export default config
