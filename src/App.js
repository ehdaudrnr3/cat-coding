import DarkModeButton from "./components/DarkModeButton.js";
import ListArea from "./components/ListArea.js";
import Loading from "./components/Loading.js";
import Modal from "./components/Modal.js";
import SearchArea from './components/SearchArea.js'

export default class App {
    
    constructor({el, eventBus}) {
        this.el = el
        this.components = [
            Loading,
            SearchArea, 
            ListArea,
            DarkModeButton,
            Modal
        ];
        this.instances = {};
        this.eventBus = eventBus;
    }

    build() {
        this.components.forEach(component => {
            const instance = new component(this);
            instance.render();
            this.instances[component] = instance;
        });
    }

    appendElement(child) {
        this.el.appendChild(child)
    }

    getInstance(componentName) {
        return this.instances[componentName];
    }
}