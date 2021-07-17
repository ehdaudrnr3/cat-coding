export default class DarkModeButton {
    COLOR_MODE_KEY = 'colorMode'
    DEFAULT_MODE = 'light'

    constructor(app) {
        this.app = app;
        this.button = document.createElement('span');
        this.button.className = 'darkmode-btn'
        
        let mode = this.getStorageMode();
        this.apply(mode)
    }

    setButtonLabel(mode) {
        this.button.innerText = mode === 'light' ? '🌕' : '🌑';
    }

    getStorageMode() {
        let mode = localStorage.getItem(this.COLOR_MODE_KEY);
        if(mode) {
            return mode;
        }
        return this.DEFAULT_MODE;
    }
    getToggleMode() {
        let mode = this.getStorageMode();
        if(mode == 'light') {
            mode = 'dark'
        } else {
            mode = 'light'
        }
        return mode;
    }
    toggleSet() {
        let mode = this.getToggleMode();
        localStorage.setItem(this.COLOR_MODE_KEY, mode);
        this.apply(mode);
    }
    apply(mode) {
        this.setButtonLabel(mode);
        document.documentElement.setAttribute('data-user-color-scheme', mode);
    }

    render() {
        this.app.appendElement(this.button)
        this.button.addEventListener("click", e => {
            e.preventDefault();
            this.toggleSet();
        })
        this.button.addEventListener('mouseover', e => {
            let mode = this.getToggleMode();
            this.apply(mode)
        })
        this.button.addEventListener('mouseleave', e => {
            let mode = this.getStorageMode();
            this.apply(mode)
        })
    }
}