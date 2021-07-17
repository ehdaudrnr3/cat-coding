import Card from './Card.js'
import Loading from "./Loading.js";
import Modal from "./Modal.js";
import { lazyLoad } from '../util/lazyLoad.js';

export default class ListArea {
    constructor(app) {
        this.app = app;
        this.data = [];
        this.listArea = document.createElement('section');
        this.listArea.className = "list-area"
        this.stateRandom = false;
    }
    render() {
        this.app.eventBus.on("fetchCats", async (cats) => {
            this.listArea.innerHTML =''
            this.createCard(cats);
            this.stateRandom = false;
        });
        this.app.eventBus.on("fetchRandom", async (cats) => {
            if(!this.stateRandom) {
                this.listArea.innerHTML =''
            }
            this.createCard(cats)
            this.stateRandom = true;
        });
        this.app.appendElement(this.listArea);
    } 
    
    createCardContainer(area) {
        const container = document.createElement('div');
        container.className = 'card-container';
        container.addEventListener("click", e => {
            const card = e.path.find(item=>item.className === 'cat-card');
            if(card) {
                const modal = this.app.getInstance(Modal);
                const cat = this.findById(card.dataset.id);
                modal.open({
                    data : cat
                });
            }
        })

        area.appendChild(container);
        return container;
    }

    createEmptyContainer(area) {
        const emptyContainer = document.createElement('section');
        emptyContainer.classList = 'empty-section';

        const emptyMessage = document.createElement('h2');
        emptyMessage.className = 'empty-message';
        emptyMessage.innerText = '검색 결과가 없습니다.';

        const emptyImage = document.createElement('img');
        emptyImage.className = 'empty-image';
        emptyImage.src = 'src/img/emptybox.png';

        emptyContainer.appendChild(emptyMessage)
        emptyContainer.appendChild(emptyImage);
        area.appendChild(emptyContainer);
        return emptyContainer;
    }

    createCard(cats) {
        const loading = this.app.getInstance(Loading);
        if(cats.data.length > 0) {
            this.data = this.data.concat(cats.data);
            const container = this.createCardContainer(this.listArea);
            cats.data.forEach(cat => new Card({ container, data: cat }).render());   
            lazyLoad();
        } else {
            this.setState([])
            this.createEmptyContainer(this.listArea);
        }
        loading.hide();
    }

    setState(data) {
        this.data = data;
    }

    findById(id) {
        return this.data.find(cat => cat.id === id);
    }
}