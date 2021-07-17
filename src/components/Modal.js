export default class Modal {
    constructor(app) {
        this.app = app;
        this.data = null
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'modal-wrapper'
        this.wrapper.classList.add('hidden')
        this.app.appendElement(this.wrapper);
    }

    render() {
        if(this.data) {
            const { url }= this.data;
            const {name, origin, temperament } = this.data.breeds[0] ?
                this.data.breeds[0] : { name : '정보없음', origin : '정보없음', temperament : '정보없음'};
            const { imperial, metric } = this.data.breeds[0] ?
                this.data.breeds[0].weight : {imperial : '정보없음', metric : '정보없음'};
            
            const overlay = document.createElement('div');
            overlay.className = 'overlay'
            overlay.addEventListener('click', e => this.close());

            const modalContents = document.createElement('section');
            modalContents.className = "modal-contents";

            const modalHeader = document.createElement('header');
            modalHeader.className = 'modal-header';

            const modalTitle = document.createElement('p');
            modalTitle.className = 'modal-title'
            modalTitle.innerText = name;

            const closeMark = document.createElement('span')
            closeMark.innerText = 'X'
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn'
            closeBtn.appendChild(closeMark)
            closeBtn.addEventListener('click', e => this.close());
            
            const modalImage = document.createElement('img');
            modalImage.className = 'modal-image'
            modalImage.src = url;
            
            const modalInfo = document.createElement('article')
            modalInfo.className = 'modal-info'

            const modalOrigin = document.createElement('p');
            modalOrigin.innerText = origin

            const modalTemperament = document.createElement('p');
            modalTemperament.innerText = temperament

            const modalWeight = document.createElement('p');
            modalWeight.innerText = `${imperial} (imperial) / ${metric}(metric)`;
            
            modalInfo.appendChild(modalOrigin)
            modalInfo.appendChild(modalTemperament);
            modalInfo.appendChild(modalWeight);

            modalHeader.appendChild(modalTitle)
            modalHeader.appendChild(closeBtn);

            const footer = document.createElement('div');
            footer.className = 'modal-footer'
            const closeButton = document.createElement('button');
            closeButton.classList.add('btn')
            closeButton.classList.add('btn-secondary')
            closeButton.innerText = 'Close'
            closeButton.addEventListener('click', e => this.close());
            footer.appendChild(closeButton);

            modalContents.appendChild(modalHeader);
            modalContents.appendChild(modalImage)
            modalContents.appendChild(modalInfo)
            modalContents.appendChild(footer)

            this.wrapper.appendChild(overlay);
            this.wrapper.appendChild(modalContents);
        }
        
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    open({data}) {
        this.setState(data);
        this.wrapper.classList.remove('hidden')
    }

    close() {
        this.wrapper.classList.add('hidden')
        this.wrapper.innerHTML = ''
    }
}