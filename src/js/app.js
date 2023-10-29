const bar = document.querySelector('#bar');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const welcome = document.querySelector('.welcome');
const headerIndex = 'header-index';
const header_index = document.querySelector('.header-index');

window.addEventListener('load', () => {
    if(welcome.getBoundingClientRect().bottom < 70){
        header.classList.remove(headerIndex);
    }else{
        header.classList.add(headerIndex);
    }
});

bar.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    if (header.classList.contains(headerIndex)) {
        if(welcome.getBoundingClientRect().bottom > 70){
            header.classList.remove(headerIndex);
        }
    }else{
        if(welcome.getBoundingClientRect().bottom > 70){
            setTimeout(() => {
                    header.classList.add(headerIndex);
            }, 500);
        }
    }
});

window.addEventListener("scroll", function() {
    if(welcome.getBoundingClientRect().bottom < 70){
        header.classList.remove(headerIndex);
    }else{
        header.classList.add(headerIndex);
    }
})

