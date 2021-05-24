import {createConnection, getConnectionManager} from 'typeorm';


const promise = (async function () {
    const manager = getConnectionManager();
    if (!manager.has('default')) {
        return createConnection();
    } else {
        const current = manager.get('default');
        if(!current.isConnected){
            return createConnection();
        }
        return current
    }
})();

export const getDatabaseConnection = async () => {
    return promise;
};
