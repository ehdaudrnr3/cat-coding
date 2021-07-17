import { throttling } from "./throttler.js";

const throttler = throttling();
function scrollFetch(fetch) {
    window.addEventListener('scroll', () => {
        throttler.throttle(() => {
            console.log("activate scroll event");
            const scrollTop = getScrollTop()
            const documentHeight = getDocumentHeight()
            if(scrollTop < documentHeight - window.innerHeight) return
            fetch()
        }, 700)
    })
}

function getScrollTop() {
    return (window.pageYOffset !== undefined) 
        ? window.pageYOffset 
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

export { scrollFetch }