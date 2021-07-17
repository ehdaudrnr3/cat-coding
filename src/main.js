import App from "./App.js"
import eventBus from "./eventbus/eventBus.js"

new App({
    el: document.querySelector(".app"),
    eventBus: eventBus
}).build();
