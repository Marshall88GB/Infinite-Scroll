const imageContainer=document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 30;
const apiKey = 'KglvBpsE4WBtIzUbuCZJROhBGvl00h80NaIwQWI89DY';
const apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check loader images
function imageLoaded (){
  imagesLoaded++;
  loader.hidden = true;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}

// Function to hel p set Attributes
function setAttributes (element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Create Element for Photos
function displayPhotos (){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) =>{
// create <a>
const item = document.createElement ('a');
setAttributes(item, {
    href: photo.links.html,
    target:'_blank',
})
// create <img>
const img = document.createElement('img');
setAttributes(img, {
    src: photo.urls.regular,
    alt:photo.alt_description,
    title:photo.alt_description,
})
// Event Listener,loading picture
img.addEventListener ('load', imageLoaded);
// img in a, both in imageContainer
item.appendChild(img);
imageContainer.appendChild(item);
    });
}

// Get photos
async function getPhotos(){
    try {
const response = await fetch (apiUrl);
photosArray = await response.json();
displayPhotos ();
    }catch (err){
console.log (err)
    }
}

// see if Scrolling 
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      ready = false;
      getPhotos ();
  }
})

// On Load
getPhotos ();