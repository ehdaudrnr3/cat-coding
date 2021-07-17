export const throttling = () => {
    let isThrottle;

    return {
        throttle(callback, milliseconds) {
            if(!isThrottle) {
                isThrottle = setTimeout(() => {
                    callback(...arguments);
                    isThrottle = false;
                }, milliseconds)
            }
        }
    }
}