import { InterfaceConnectionProps } from '@agrippa-io/node-connection-manager';
import mongoose from 'mongoose';
export declare function connect(props: InterfaceConnectionProps): Promise<typeof mongoose>;
