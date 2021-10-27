import { InterfaceConnectionProps } from '@agrippa-io/node-connection-manager';
import * as mongoose from 'mongoose';
export default function connect(props: InterfaceConnectionProps): Promise<typeof mongoose>;
