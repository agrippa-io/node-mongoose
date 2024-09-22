import { Logger } from '@agrippa-io/node-utils';
import mongoose from 'mongoose';
import { status, MONGO_STATUS } from './status';
export async function connect(props) {
    if (status() === MONGO_STATUS.CONNECTED) {
        return mongoose;
    }
    const { uri, options } = props;
    await mongoose.connect(uri, options);
    // Handle Connection Events
    mongoose.connection.on('error', (err) => {
        Logger.error('MongoDB Error', err);
    });
    mongoose.connection.on('connection', (data) => {
        Logger.info('MongoDB - Connected', data);
    });
    mongoose.connection.on('fullsetup', (data) => {
        Logger.info('MongoDB - Connected to Primary and at least one secondary Replica', data);
    });
    mongoose.connection.on('all', (data) => {
        Logger.info('MongoDB - Connected to Primary and all secondary Replica', data);
    });
    mongoose.connection.on('disconnected', () => {
        Logger.info('MongoDB - Disconnected');
    });
    mongoose.connection.on('reconnected', () => {
        Logger.info('MongoDB - Reconnected');
    });
    mongoose.connection.on('reconnectFailed', (err) => {
        Logger.error('MongoDB - Reconnection Failed - Maximum reconnectionTries reach', err);
    });
    return mongoose;
}
