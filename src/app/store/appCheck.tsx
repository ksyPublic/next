import { app } from './firebase'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

// 6LdWHxgnAAAAALqOo7wi8pfQYCucIvcSl3tpqgiM

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdWHxgnAAAAAGucVJXGygrcas7zgh_AGXHNCFrX'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
})

export default appCheck
