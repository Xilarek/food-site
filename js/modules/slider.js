function slider({container, slides, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const prev = document.querySelector(prevArrow),
        slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        current = document.getElementById(currentCounter),
        total = document.getElementById(totalCounter),
        slide = document.querySelectorAll(slides),
        slidesWrapper = document.querySelector(wrapper),
        slidesFild = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;


    let currentSlide = 1;
    let offset = 0;

    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${currentSlide}`;
    } else {
        total.textContent = slide.length;
        current.textContent = currentSlide;
    }

    //Контейнер для всех слайдов 
    slidesFild.style.width = 100 * slide.length + '%';
    slidesFild.style.display = 'flex';
    slidesFild.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    //Делаем слайды одной высоты
    slide.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    const slideIndex = () => {
        if (slide.length < 10) {
            current.textContent = `0${currentSlide}`;
        } else {
            current.textContent = currentSlide;
        }
    };

    const dotActive = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlide - 1].style.opacity = 1;
    };

    const slideMove = () => {
        slidesFild.style.transform = `translateX(-${offset}px)`;
    };

    const widthSlide = (parameter) => {
        return +parameter.replace(/\D/g, '');
    };


    next.addEventListener('click', () => {
        if (offset === widthSlide(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += widthSlide(width);
        }
        slideMove();

        if (currentSlide === slide.length) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }

        slideIndex();
        dotActive();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = widthSlide(width) * (slide.length - 1);
        } else {
            offset -= widthSlide(width);
        }
        slideMove();

        if (currentSlide === 1) {
            currentSlide = slide.length;
        } else {
            currentSlide--;
        }

        slideIndex();
        dotActive();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlide = slideTo;
            offset = widthSlide(width) * (slideTo - 1);

            slideMove();
            slideIndex();
            dotActive();
        });
    });

    /*showSlides(currentSlide);

    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
    } else {
        total.textContent = slide.length;
    }

    function showSlides(n) {
        if (n > slide.length) {
            currentSlide = 1;
        }

        if (n < 1) {
            currentSlide = slide.length;
        }

        slide.forEach(item => {
            item.style.display = 'none';
        });

        slide[currentSlide -1].style.display = 'block';

        if (slide.length < 10) {
            current.textContent = `0${currentSlide}`;
        } else {
            current.textContent = currentSlide;
        }
    }

    function plusSlides(n) {
        showSlides(currentSlide += n);
    }

    prev.addEventListener('click', ()=> {
        plusSlides(-1);
    })

    next.addEventListener('click', ()=> {
        plusSlides(1);
    })*/
}
export default slider;