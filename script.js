
'use strict';

/**
 * Addition of Nasa APOD API to website
 */

const api_key = 'o6gFhqFdtGHBkq3nzCyC1b1HJ2WUaYErkcEGy4Sj';
const base_url = 'https://api.nasa.gov/planetary/apod?api_key=' + api_key;

const btn = document.querySelector('button');
const dateElement = document.getElementById('date');
const container = document.querySelector('.content');

btn.addEventListener('click', getPod);

async function getPod() {
    let url = base_url;
    if(dateElement.value)
        url += '&date=' + dateElement.value;
    try {
        const response = await fetch(url);
        if(!response.ok)
            throw Error('Error: ${response.url} ${response.statusText}');
        const data = await response.json();
        addPod(data);
    }catch(error) {
        console.log(error.message);
    }
}

function addPod(pod) {
    container.innerHTML = '';

    const header = document.createElement('h3');
    header.textContent = pod.title;

    const subHeader = document.createElement('h4');
    subHeader.textContent = pod.date;

    const description = document.createElement('p');
    description.textContent = pod.explanation;

    container.append(header, subHeader, description);

    if (pod.media_type === 'video') {
        const video = document.createElement('iframe');
        video.src = pod.url;
        video.alt = pod.title;
        container.append(video);
    }

    else if(pod.media_type === 'image') {
        const image = document.createElement('img');
        image.src = pod.url;
        image.alt = pod.title;
        container.append(image);
    }
}


/**
 * Accordion Creation
 * variables created to allow for alteration of style script and button selection respectively
 */

/*variables created to allow for alteration of style script and button selection respectively*/
const root = document.documentElement;
const buttonLabels = document.querySelectorAll('button');

/*Add event listeners for each button*/
buttonLabels.forEach(btn => {
    btn.addEventListener('click', buttonClick)
});

/*Declaration of buttonClick function - this function utilizes toggle to switch between 
open/closed button sections and close all other non opened button sections. Some formatting 
is also handled here in the js as well*/
function buttonClick(e) {
    const btn = e.target;

    btn.classList.toggle('open');
    btn.nextElementSibling.classList.toggle('open');
    root.style.setProperty('--content-height', btn.nextElementSibling.scrollHeight + 'px');

    buttonLabels.forEach(button => {
        if (button != btn && button.classList.contains('open')) {
            button.classList.remove('open');
            button.nextElementSibling.classList.remove('open');
        }
    })

}

/**
 * Carousel Functionality Implementation
 */

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const carouselNavItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);

for (var i = 0; i < carouselNavItems.length; ++i) {
    carouselNavItems[i].addEventListener('click', navBtnSelect)
}

function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');

    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left'))
        nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;
    else
        nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;

    carouselItems[nextIndex].classList.add('active');
    carouselNavItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    carouselNavItems[currentIndex].classList.remove('active');
}

function navBtnSelect(f) {
    const target = f.target;
    const index = carouselNavItems.indexOf(target);
    
    const currentActiveCarouselItem = document.querySelector('.carousel-item.active');
    const currentActiveNavItem = document.querySelector('.nav-item.active');

    if(target.classList.contains('active')) {
        return;
    }
    else {
        currentActiveCarouselItem.classList.remove('active');
        currentActiveNavItem.classList.remove('active');

        target.classList.add('active');
        carouselItems[index].classList.add('active');
    }
}

/**
 * Search Bar Functionality Implementation
 */

const f = document.getElementById('form');
const q = document.getElementById('query');
const google = 'https://www.google.com/search?q=+';

function submitted(event) {
  event.preventDefault();
  const url = google + '+' + q.value;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);