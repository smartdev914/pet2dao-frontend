import configDev from './config.dev.json'
import configProd from './config.real.json'

const NODE_ENVS = {
  DEV: 'development',
  PROD: 'production',
}
const config = process.env.NODE_ENV === NODE_ENVS.DEV ? configDev : configProd

export default config
