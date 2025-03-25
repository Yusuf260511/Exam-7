const clothes = document.getElementById("clothes");
const loader = document.getElementById("loader");
const sortspace_select = document.getElementById("sortspace_select");
const priceSelect = document.getElementById("price-select");
const search = document.getElementById('search')

async function showClothes() {
    try {
        loader.style.display = "block";
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);

        clothes.innerHTML = '';
        data.forEach(element => {
            const clothe = document.createElement("div");
            clothe.classList.add("clothe");

            const title = element.title.slice(0, 20);
            const description = element.description.slice(0, 50);

            clothe.innerHTML = `
                <img src="${element.image}" alt="" class="clothe_img">
                <h1 class="name">${title}...</h1>
                <p class="category"><b>Category:</b> ${element.category}</p>
                <p class="rating"><b>Rating:</b> ${element.rating.rate}⭐</p>
                <p class="description">${description}...</p>
                <p class="price"><b>Price:</b> $${element.price.toFixed(2)}</p>
            `;

            clothes.appendChild(clothe);
        });
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
    }
}

async function filterAndSort() {
    try {
        loader.style.display = "block";
        const response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();

        const category = sortspace_select.value;
        const sortType = priceSelect.value;

        
        if (category !== "all") {
            data = data.filter(element => element.category === category);
        }

        
        if (sortType === "low") {
            data.sort((a, b) => a.price - b.price);
        } else if (sortType === "high") {
            data.sort((a, b) => b.price - a.price); 
        }

        const searchValue = search.value.toLowerCase().trim();

        if (searchValue) {
            data = data.filter(element => element.title.toLowerCase().trim().includes(searchValue));
        }

        
        clothes.innerHTML = "";
        data.forEach(element => {
            const clothe = document.createElement("div");
            clothe.classList.add("clothe");

            const title = element.title.slice(0, 20);
            const description = element.description.slice(0, 50);

            clothe.innerHTML = `
                <img src="${element.image}" alt="" class="clothe_img">
                <h1 class="name">${title}...</h1>
                <p class="category"><b>Category:</b> ${element.category}</p>
                <p class="rating"><b>Rating:</b> ${element.rating.rate}⭐</p>
                <p class="description">${description}...</p>
                <p class="price"><b>Price:</b> $${element.price.toFixed(2)}</p>
            `;

            clothes.appendChild(clothe);
        });
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = 'none';
    }
}


sortspace_select.addEventListener('change', filterAndSort);
priceSelect.addEventListener('change', filterAndSort);
search.addEventListener('input', filterAndSort)

showClothes();
