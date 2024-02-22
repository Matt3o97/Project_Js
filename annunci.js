const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('.nav-link')
const navBrand = document.querySelector('#logo');
const navIcon = document.querySelector('#icon-nav');
const btnPrimary = document.querySelector('#btnPrimary');

window.addEventListener('scroll',() => {
    if(window.scrollY > 30){
        navbar.style.backgroundColor = '#2a2a2a';
        navLinks.forEach((link) => {
            link.style.color = 'white';
            navIcon.style.color='white';
        })
        navBrand.style.color = 'white';
        btnPrimary.style.backgroundColor = 'white';
        btnPrimary.style.color= 'black';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navLinks.forEach((link) => {
            link.style.color = 'black';
        })
        navBrand.style.color = 'black';
        btnPrimary.style.backgroundColor = '#2a2a2a';
        btnPrimary.style.color= 'white';
        navIcon.style.color='black';
    }
})




fetch('./annunci2.json')
.then((response) => response.json())
.then((data) => {

    let categoriesWrapper = document.querySelector('#categoriesWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');

    function setCategoryRadios(){
        let categories = data.map((el) => el.category)

        let uniqueCategories = [];
        categories.forEach((category) =>{
            if(!uniqueCategories.includes(category)) {
                uniqueCategories.push(category)
            }
        })
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>   
            `
            categoriesWrapper.appendChild(div)
        })
    }

    setCategoryRadios()
    
    function showCards(array){
        cardsWrapper.innerHTML=''
        array.forEach((element) => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center');
            div.innerHTML = `
            <div class="product-card-custom shadow p-3 mb-5 bg-white rounded">
                <div class="icon-container">
                    <i class="fa-regular fa-heart fs-3"></i>
                </div>
                <img src="${(element.url)}" alt="" class="img-fluid mb-3 card-img">
                <div class="d-flex justify-content-between align-items-start">
                <div>
                    <p class="fw-bold mb-0">${element.name}</p>
                    <p class="fst-italic">${element.category}</p>
                </div>
                <p class="price-tag">$ ${element.price}</p>
                </div>
            </div>
            `
            cardsWrapper.appendChild(div)

        })
    }
    

    showCards(data)

    let radioInputs = document.querySelectorAll('.form-check-input');
    let radioButtons = Array.from(radioInputs);

    function filterBycategory() {
        let checked = radioButtons.find((radio)=>radio.checked)
        let categoria = checked.id 
        if(categoria!='All'){
            let filtered = data.filter((el)=>el.category == categoria)
            showCards(filtered)
        } else {
            showCards(data)
        }

    }

    radioInputs.forEach((input) => {
        input.addEventListener('click', () =>{
            filterBycategory()

        })
        
    })

    let inputRange = document.querySelector('.form-range')
    let priceLabel = document.querySelector('#priceLabel')
    

    function findMaxPrice (){
        let maxPrice = data.map((el) => Number(el.price)).sort((a, b)=>b-a)[0]

        inputRange.max = maxPrice;
        inputRange.value = maxPrice;

    }

    findMaxPrice()

    function filterByPrice() {
        let filtered = data.filter((el)=> +el.price <= + inputRange.value)
        showCards(filtered)

    }

    inputRange.addEventListener('input', () =>{
        priceLabel.innerHTML = inputRange.value
        filterByPrice()
    })
   
    let wordInpunt = document.querySelector('#wordInpunt')

    function filterByword(){
        let value =wordInpunt.value
        let filtered = data.filter((el)=> el.name.toLowerCase().includes(value.toLowerCase()))
        showCards(filtered);
    }
    
    wordInpunt.addEventListener('input',() => {
        filterByword()
    })

})