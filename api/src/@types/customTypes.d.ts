import { ParamsDictionary, Request } from 'express'

declare module 'express' {
  export interface Request extends Request<ParamsDictionary> {
    customer?: {
      customerId: string
    }
  }
}
