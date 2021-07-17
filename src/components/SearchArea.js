import Loading from "./Loading.js";
import Modal from "./Modal.js";
import { api } from '../api/CatApi.js';
import {scrollFetch } from '../util/scrollFetch.js'

export default class SearchArea {
    constructor(app) {
        this.app = app;
        this.searchList = [];
        this.searchArea = document.createElement('section');
        this.searchArea.className = "search-section"
    }
    render() {
        this.addRandomCat(this.searchArea);
        
        const wrapper = document.createElement('div');
        wrapper.className = "search-wrapper";
        this.addSearchBox(wrapper);
        this.addSearchList(wrapper);

        this.searchArea.appendChild(wrapper);
        this.app.appendElement(this.searchArea);
        scrollFetch(() => this.searchRandom())
    }   

    addRandomCat(searchArea) {
        const randomButton = document.createElement("span");
        randomButton.innerText = '🐱';
        randomButton.className = 'search-random-btn'
        randomButton.addEventListener('click', (e) => {
            this.searchRandom()
        })
        randomButton.addEventListener('mouseover', e => {
            randomButton.innerText = '😸'
        })
        randomButton.addEventListener('mouseleave', e => {
            randomButton.innerText = '🐱'
        })
        searchArea.appendChild(randomButton);
    }

    addSearchBox(searchWrapper) {
        const searchBox = document.createElement('input');
        searchBox.className = 'search-box';
        searchBox.placeholder = '고양이를 검색하세요.';
        searchBox.addEventListener('keyup', (e) => {
            if(e.key == 'Enter') {
                this.searchKeyword(e.target.value || '');
            }
        })
        searchWrapper.appendChild(searchBox);
    }

    addSearchList(searchWrapper) {
        const searchList = document.createElement('div');
        searchList.className = 'search-list';
        searchWrapper.appendChild(searchList);
    }

    async searchKeyword(keyword) {
        if(keyword.trim().length == 0) return
        const loading = this.app.getInstance(Loading);
        loading.show();
        this.appendSearchList(keyword);
        const cats = await api.fetchCats(keyword);
        this.app.eventBus.emit("fetchCats", cats);
    }

    async searchRandom() {
        const loading = this.app.getInstance(Loading);
        loading.show();
        const cats = await api.fetchRandom();
        this.app.eventBus.emit("fetchRandom", cats);
    }

    appendSearchList(keyword) {
        const searchList = document.querySelector('.search-list');
        if(this.searchList.includes(keyword)) return;
        if(this.searchList.length == 5) {
            this.searchList.shift();
            searchList.removeChild(searchList.children[0]);
        }

        const link = document.createElement('span');
        link.className = 'keyword';
        link.innerText = keyword;
        link.addEventListener('click', (e)=>this.searchKeyword(keyword));

        searchList.appendChild(link);
        this.searchList.push(keyword);
    }
}