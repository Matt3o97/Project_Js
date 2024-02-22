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


//  Counter
document.querySelector('#number1');
document.querySelector('#number2');
document.querySelector('#number3');

function createInterval(finalN, element, frequency) {
    let counter = 0;
    
    let interval = setInterval(()=>{
        if(counter<finalN){
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, frequency)
}

let confirm = false;
let observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm == false){
            createInterval(900, number1, 1);
            createInterval(1200, number2, 1);
            createInterval(1000, number3, 1);

            confirm = true;

            setTimeout(()=>{
                confirm = false;

            },8000)
        }
    })
})

observer.observe(number1);

//annunci
 
const cardsWrapper = document.querySelector('#cardsWrapper');


let announcements = [
    { 'title' : 'Kingston SSD', 'category' : 'Hard Disk', 'price' : 30, 'url' : './media/' ,},
    { 'title' : 'Asus am5 rog', 'category' : 'Processori', 'price' : 445, 'url' : './media/',},
    { 'title' : 'Razer Basilisk V3', 'category' : 'Accessori', 'price' : 60, 'url' : './media/mouse-razer.jpeg',},
    { 'title' : 'Corsair tastiera', 'category' : 'Accessori', 'price' : 130, 'url' : './media/tastiera-corsair.jpeg',},
    { 'title' : 'Cuffie Fnatic', 'category' : 'Accessori', 'price' : 113, 'url' : './media/cuffie-fnatic.jpg',},
]

announcements.forEach((annuncio, index) => {
    if(index >= announcements.length - 3){
    let div = document.createElement('div');
    div.classList.add('col-12','col-md-4', 'd-flex', 'justify-content-center');
    div.innerHTML = `
    <div class="product-card-custom shadow p-3 mb-5 bg-white rounded">
    <div class="icon-container">
    <i class="fa-regular fa-heart fs-3"></i>
    </div>
    <img src="${annuncio.url}" alt="" class="img-fluid mb-3 card-img">
    <div class="d-flex justify-content-between align-items-start">
    <div>
    <p class="fw-bold fs-4 mb-0">${annuncio.title}</p>
    <p class="fst-italic">${annuncio.category}</p>
    </div>
    <p class="price-tag">$ ${annuncio.price}</p>
    </div>
    </div>
    `
    cardsWrapper.appendChild(div)
    }
})

const iconHearts = document.querySelectorAll('.fa-heart');
const cardImgs = document.querySelectorAll('.card-img');

iconHearts.forEach((icon) => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('text-danger');  
    })
})

cardImgs.forEach((cardImg, i) => {
    cardImg.addEventListener('dblclick', () => {
        iconHearts[i].classList.add('fa-solid');
        iconHearts[i].classList.add('text-danger');
    })
})

/* Reviews */
const reviewsWrapper = document.querySelector('#reviewsWrapper');


let reviews = [
    {'name' : 'Matteo', 'review' : 'Mi sono trovato benissimo con presto', 'rank' : 4.5, 'url' : '/media/gamer (2).png'},
    {'name' : 'Federico', 'review' : 'Ottimi prodotti, il servizio di spedizione veloce', 'rank' : 5, 'url' : '/media/gamer (3).png'},
    {'name' :'Alessandro', 'review' :'Assistenza clienti eccellente', 'rank' : 4, 'url' : '/media/gamer.png'},
    {'name' : 'Chiara', 'review' :'Non mi è stato accettato il reso', 'rank' : 2, 'url' : '/media/gamer (1).png'},
]

reviews.forEach((review) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="review-card">
                        <div class="star-container d-flex justify-content-center mb-4">
                            ${generateStar(review.rank)}
                        </div>
                        <p>${review.review}</p>
                            <div class="d-flex">
                                <img src="${review.url}" alt="">
                                <p class="ms-3 fw-bold">${review.name}</p>
                            </div>
                        </div>
    `

    reviewsWrapper.appendChild(div)
})

let starContainer = document.querySelectorAll('.star-container')



    function generateStar(rank){
    let result = ''
    
        for (let i = 1; i <= 5; i++) {
            if(rank == 0.5){
            result += '<i class="fa-regular fa-star-half-stroke"></i>'
            rank = 0
        } else if (rank > 0){
            result += '<i class="fa-solid fa-star"></i>'
            rank--
        } else {
            result += '<i class="fa-regular fa-star"></i>'
        }
    }
    return result
}




/* swiper js */

let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
    rotate: 50,
    
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
    },
    pagination: {
    el: ".swiper-pagination",
    },
});




AOS.init();