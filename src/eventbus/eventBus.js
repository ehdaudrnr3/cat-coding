const subscriptions = {}
const getNextUniqueId = getIdGenerator()

function on(event, callback) {
    const id = getNextUniqueId();

    if(!subscriptions[event]) {
        subscriptions[event] = {}
    }

    subscriptions[event][id] = callback;

    return {
        unsubscribe : () => {
            delete subscriptions[event][id];
            if(Object.keys(subscriptions[event]).length == 0) {
                delete subscriptions[event]
            }
        }
    }
}

function emit(event, arg) {
    if(!subscriptions[event]) return

    Object.keys(subscriptions[event]).forEach(key => subscriptions[event][key](arg))
}

function getIdGenerator() {
    let lastId = 0;
    return function getNextUniqueId() {
        lastId += 1
        return lastId;
    }
}
export default { emit, on };