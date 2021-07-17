export default class Loading {
    constructor(app) {
        this.app = app;
        this.spinnerWrapper = document.createElement('div');
        this.spinnerWrapper.className = 'spinner-wrapper';
        this.spinnerWrapper.classList.add('hidden');
    }

    render() {
        const spinnerImage = document.createElement('img');
        spinnerImage.className = 'spinner-image';
        spinnerImage.src = 'src/img/loading.gif'
        this.spinnerWrapper.appendChild(spinnerImage);
        this.app.appendElement(this.spinnerWrapper);
    }
    show() {
        this.spinnerWrapper.classList.remove('hidden')
    }

    hide() {
        this.spinnerWrapper.classList.add('hidden')
    }
}