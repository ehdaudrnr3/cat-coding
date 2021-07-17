export default class Card {
    constructor({container, data}) {
        this.data = data;
        this.card = document.createElement('article');
        this.card.className = "cat-card"
        this.card.dataset.id = data.id;
        container.appendChild(this.card);
    }
    render() {
        const image = this.createImage();
        const info = this.createInfo();
        this.card.appendChild(image);
        this.card.appendChild(info);
    } 

    createImage() {
        const image = document.createElement('img');
        image.className = 'card-image'
        image.classList.add('lazy')
        image.dataset.src = this.data.url;
        return image;
    }

    createInfo() {
        const { name, origin } = this.getBreed();

        const info = document.createElement('article');
        info.className = 'card-info';

        const catName = document.createElement('p');
        catName.className = "cat-name";
        catName.innerText = name

        const catOrigin = document.createElement('p');
        catOrigin.className = 'cat-origin';
        catOrigin.innerText = origin;
        
        info.appendChild(catName);
        info.appendChild(catOrigin);
        return info;
    }

    getBreed() {
        return this.data.breeds.length > 0 
            ? this.data.breeds[0]
            : {
                name: '정보없음',
                origin: '정보없음'
            }
    }
}