const slides = document.querySelectorAll(".slider-image");
const dots = document.querySelectorAll(".dot");
let counter = 0;

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

const goToSlide = (slideIndex) => {
  counter = slideIndex;
  slideImage();
  updateDots();
};

const goNext = () => {
  if (counter == slides.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImage();
  updateDots();
};

const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

const updateDots = () => {
  dots.forEach((dot, index) => {
    if (index === counter) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

setInterval(goNext, 3000); // Automatic slideshow

// Initial update of dots
updateDots();


// JavaScript to change navbar background color on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Change the value to control when the color change occurs
    navbar.style.backgroundColor = "#333333";
    navbar.style.borderBottom = "#fff solid 1px"; 
  } else {
    navbar.style.backgroundColor = "transparent"; // Reset to the initial background color
    navbar.style.border = "none"; 
    
}
});


const aside_image = [
  "resource/\image/\aside-facts/\image1.jpg",
  "resource/\image/\aside-facts/\image2.jpg",
  "resource/\image/\aside-facts/\image3.jpg",
];

const funFacts = [
  "A third of ALL households around the world have a dog.",
  "Cats sleep for around 13 to 16 hours a day 70% of their life",
  "Baby rabbits are called 'kittens'.Female rabbits are called 'does' and male rabbits are called 'bucks'"
];


//Aside Slide
let currentIndex = 0; // Index of the currently displayed content
const slideshowContent = document.querySelector(".fun-fact");
const slideshowImage = document.getElementById("card-aside-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const slideNumber = document.getElementById("slide-number"); // Get the slide number element

// Function to change to the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + aside_image.length) % aside_image.length;
  updateSlide();
}

// Function to change to the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % aside_image.length;
  updateSlide();
}

// Function to update the slide content and slide number
function updateSlide() {
  // Update the slide number
  slideNumber.textContent = currentIndex + 1;

  // Fade out the content
  slideshowContent.style.opacity = 0;

  // After a brief delay, update the content and fade in
  setTimeout(() => {
      slideshowImage.src = aside_image[currentIndex];
      slideshowContent.textContent = funFacts[currentIndex];
      slideshowContent.style.opacity = 1; // Fade in
  }, 500); // Wait for the fade-out effect to complete (0.5 seconds)
}

// Initialize with the first content and slide number
updateSlide();


const contentList = document.querySelectorAll('.vetenary-doctors-card-items-name');
const readMoreBtnList = document.querySelectorAll('.read-more');

readMoreBtnList.forEach((readMoreBtn, index) => {

  if (contentList[index].scrollHeight > contentList[index].clientHeight) {
    readMoreBtn.style.display = 'inline-block'; // Show the button
  }
  readMoreBtn.addEventListener('click', () => {
    if (contentList[index].classList.contains('show-more')) {
      contentList[index].classList.remove('show-more');
      readMoreBtn.textContent = 'Read More';
    } else {
      contentList[index].classList.add('show-more');
      readMoreBtn.textContent = 'Read Less';
    }
  });
});