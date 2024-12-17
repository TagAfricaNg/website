const btns = document.getElementsByClassName("t__faqs__item__btn");
const animatedTexts = document.querySelectorAll('.works__info__animated__text');
const uniqueSection = document.querySelector('.t__unique');
const uniqueTexts = document.querySelectorAll('.t__unique__text');
let currentIndex = 0;

// const meetTheTeamSection = document.querySelector('.t__team');
const meetTheTeamHeader = document.querySelector('.t__team__header');

const carouselTrack = document.querySelector('.t__team__list');
const carouselItems = document.querySelectorAll('.t__team__list__item');
const prevButton = document.querySelector('.t__team__carousel__btns__item__left');
const nextButton = document.querySelector('.t__team__carousel__btns__item__right');

let currentCarouselIndex = 0;
const itemsPerView = 3;

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    this.classList.toggle("active");
    
    const panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + 60 + "px";
    } 
  });
}

function showText(index) {
  animatedTexts.forEach((text, i) => {
    text.classList.toggle('active', i === index);
  });
}

function startAnimation() {
  showText(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % animatedTexts.length;
    showText(currentIndex);
  }, 3000); // 3 seconds per text
}

const uniqueObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      uniqueSection.classList.add('in-view');
      uniqueTexts.forEach((item, index) => {
        item.style.setProperty('--delay', index); // Set individual delays
      });
    }
  },
  { threshold: 0.1 } // Trigger when 10% of the meetTheTeamSection is in view
);

const meetTheTeamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
      }
    });
  },
  { threshold: 0.2 }
);

meetTheTeamObserver.observe(meetTheTeamHeader);
carouselItems.forEach((item) => meetTheTeamObserver.observe(item));

const showCarousel = (direction) => {
  const itemWidth = carouselItems[0].offsetWidth + 15; // item width + gap
  const maxIndex = carouselItems.length - 3; // Show 3 items at a time

  if (direction === "left" && currentCarouselIndex > 0) {
    currentCarouselIndex--;
  } else if (direction === "right" && currentCarouselIndex < maxIndex) {
    currentCarouselIndex++;
  }

  carouselTrack.style.transform = `translateX(-${currentCarouselIndex * itemWidth}px)`;
};

prevButton.addEventListener("click", () => showCarousel("left"));
nextButton.addEventListener("click", () => showCarousel("right"));

uniqueObserver.observe(uniqueSection);
startAnimation();
