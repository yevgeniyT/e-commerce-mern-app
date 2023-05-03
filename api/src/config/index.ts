// import dependencies
import * as dotenv from 'dotenv'

//use dependencie
dotenv.config()

//create an abject with routes
const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 8081,
    jwtKey: process.env.JWT_SECURE_KEY || '',
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    clientUrl: process.env.CLIENT_URL,
  },
  //Use || "", or "localhost..."  ensures that the url property of the db object will always have a value of type string. If process.env.DB_URL is not undefined, it will use the value of process.env.DB_URL. If it is undefined, it will use an empty string "" as the default value.
  db: { url: process.env.DB_URL || '' },
}

//export to use in app.ts to run serverport and db.ts to run DB
export default dev
