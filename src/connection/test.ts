import { status, MONGO_STATUS } from 'src/connection/status'

export function test() {
  return status() === MONGO_STATUS.CONNECTED
}
