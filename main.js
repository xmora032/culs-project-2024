const mainBlocks = document.querySelectorAll('main');
let currentMainIndex = 0;
let currentSlideIndex = 0;

const nextSlideButton = document.getElementById('next-slide');
const prevSlideButton = document.getElementById('previous-slide');
const nextDeckButton = document.getElementById('next-deck');
const prevDeckButton = document.getElementById('previous-deck');
const slideCountDisplay = document.getElementById('slide-count');
const deckCountDisplay = document.getElementById('deck-count');

function getCurrentSlides() {
    return mainBlocks[currentMainIndex].querySelectorAll('section');
}

function updateButtons() {
    const slides = getCurrentSlides();
    const disableButton = (button, isDisabled) => {
        button.disabled = isDisabled;
        button.style.backgroundColor = isDisabled ? '#f0f0f0' : '';
        button.style.color = isDisabled ? '#b0b0b0' : '';
    };

    disableButton(nextSlideButton, currentSlideIndex === slides.length - 1);
    disableButton(prevSlideButton, currentSlideIndex === 0);
    disableButton(nextDeckButton, currentMainIndex === mainBlocks.length - 1);
    disableButton(prevDeckButton, currentMainIndex === 0);

    slideCountDisplay.textContent = `slide ${currentSlideIndex + 1} / ${slides.length}`;
    deckCountDisplay.textContent = `deck ${currentMainIndex + 1} / ${mainBlocks.length}`;
}

function showSlide() {
    const slides = getCurrentSlides();
    slides.forEach(slide => slide.classList.remove('active'));

    setTimeout(() => {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlideIndex ? 'flex' : 'none';
            if (index === currentSlideIndex) setTimeout(() => slide.classList.add('active'), 20);
        });
    }, 700);

    updateButtons();
}

function showMain(initialLoad = false) {
    mainBlocks.forEach(main => main.classList.remove('active'));

    setTimeout(() => {
        mainBlocks.forEach((main, mainIndex) => {
            main.style.display = mainIndex === currentMainIndex ? 'block' : 'none';
            if (mainIndex === currentMainIndex) setTimeout(() => main.classList.add('active'), 20);
        });
        currentSlideIndex = 0;

        if (initialLoad) {
            const slides = getCurrentSlides();
            slides[currentSlideIndex].style.display = 'flex';
            slides[currentSlideIndex].classList.add('active');
        } else {
            showSlide();
        }

        updateButtons();
    }, initialLoad ? 0 : 700);
}

nextSlideButton.addEventListener('click', () => {
    const slides = getCurrentSlides();
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        showSlide();
    }
});

prevSlideButton.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide();
    }
});

nextDeckButton.addEventListener('click', () => {
    if (currentMainIndex < mainBlocks.length - 1) {
        currentMainIndex++;
        showMain();
    }
});

prevDeckButton.addEventListener('click', () => {
    if (currentMainIndex > 0) {
        currentMainIndex--;
        showMain();
    }
});

showMain(true);
updateButtons();