import status, { MONGO_STATUS } from './status'

export default function test() {
  return status() === MONGO_STATUS.CONNECTED
}
