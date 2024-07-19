

    const baseURL = 'https://dummyjson.com/products'
    let products = []
    
    const fetchData = async () => { 
        try {
            const response = await fetch( baseURL );
            if (!response.ok) {
                throw new Error(`Error fetching Data: ${response.status}`);
            };
            const result = await response.json();
            generateView(result.products)
            
        } catch (error) {
            console.error("Error fetching data :", error)
        };
    };
    
    fetchData();
    
    function getCards(item) {
        const card = document.createElement('div');
        card.classList.add('card')
    
            card.innerHTML = `
                <div class="image-container">
                    <img src=${item.images[0]} loading="lazy" alt="card-img" class="card-img">
                </div>
                <div>
                    <p>${item.title}</p>
                    <small>${item.brand}</small>
                    <p>$${item.price}</p>
                </div>
            `
        return card
    };

    const searchProduct = async function() {     
        const input = document.querySelector('#search');
            try {
                const response = await fetch(baseURL + `/search?q=${input.value}`)
                if (!response.ok) {
                    throw new Error(`Search not working : ${response.status}`)
                }
                const searchResults = await response.json();
                generateView(searchResults.products);

            } catch (error) {
                console.error("search query got error :", error)
            };
    };

    
    const sortByPrice = function(){
        products.sort((a, b) => a.price - b.price);
        generateView(products);
    }


    const generateView = async (productList) => {


        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = '';
        products.push(productList)

            productList.map((item) => {
                const cards = getCards(item)
                cardsContainer.appendChild(cards);
            });


    };

