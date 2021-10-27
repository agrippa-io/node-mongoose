import { status, MONGO_STATUS } from './status'

export function test() {
  return status() === MONGO_STATUS.CONNECTED
}
