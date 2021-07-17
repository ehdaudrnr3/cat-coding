const END_POINT = 'https://api.thecatapi.com/v1';

const request = async url => {
    try {
        const response = await fetch(`${END_POINT}${url}`);
        if(!response.ok) {
            throw await response.json();
        }
        return await response.json();    
    } catch (e) {
        throw {
            message : e.message,
            status : e.status
        }
    }
}

const api = {

    fetchCats : async keyword => {
        try {
            const breeds = await request(`/breeds/search?q=${keyword}`);
            const catImages = await Promise.all(breeds.map(async breed => await request(`/images/search?limit=20&breed_ids=${breed.id}`)))
            return {
                error: false,
                data : catImages.flat()
            }
        } catch (e) {
            return {
                error: true,
                data : e
            }
        }
    },

    fetchRandom : async () => {
        try {
            const result = await request(`/images/search?limit=20`);
            return {
                error: false,
                data : result
            }
        } catch (e) {
            return {
                error: true,
                data : e
            }
        }
    }
}

export { request, api }