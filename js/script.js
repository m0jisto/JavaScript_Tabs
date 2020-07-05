/*jshint esversion: 6 */

window.addEventListener('DOMContentLoaded', function () { // Скрипт начинает работать с Dom, только когда вся HTML структура кода загрузилась

    'use strict';

    let info = document.querySelector('.info-header'), // Добавляем все нужные нам элементы со страницы
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) { // Функция для скрытия всех табов
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1); //Вызов функции для скрытия всех табов кроме первого

    function showTabContent(b) { //Функция для открытия таба
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.add('show');
            tabContent[b].classList.remove('hide');
        }

    }

    info.addEventListener('click', function (event) { //Обработчик события клика мыши на таб, то есть закрытие всех других табов, но открытие таба, по которому кликнули 
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-07-02';

    function getTimeRemading(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

        if ((seconds / 10) < 1) {
            seconds = "0" + seconds;
        }

        if ((minutes / 10) < 1) {
            minutes = "0" + minutes;
        }

        if ((hours / 10) < 1) {
            hours = "0" + hours;
        }

        if ((days / 10) < 1) {
            days = "0" + days;
        }

        if (t <= 0) {
            seconds = "00";
            minutes = "00";
            hours = "00";
            days = "00";
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minuts': minutes,
            'seconds': seconds,
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = document.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemading(endtime);

            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minuts;
            seconds.textContent = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);


     //Создание модального окна на табах и под таймером

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        desBtn = document.querySelectorAll('.description-btn');

    desBtn[0].addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    desBtn[1].addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    desBtn[2].addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    desBtn[3].addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    more.addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = "none";
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    
     // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        formBotton = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData (data) {

                return new Promise (function(resolve, reject) {
                
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if(request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };
                    
                    request.send(data);
                });
            }
        

            function clearInput () {
                for(let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then (()=> statusMessage.innerHTML = message.loading)
                .then(()=> {
                    thanksModal.style.display = 'block';
                    mainModal.style.display = 'none';
                    statusMessage.innerHTML = '';
                })
                .catch (()=> statusMessage.innerHTML = message.failure)
                .then (clearInput);
            });
    }
    sendForm(form);
    sendForm(formBotton); 
    
    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides (n) {
        
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));
 
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    function currentSlides (n) {
        showSlides(slideIndex = n);
    }

    next.addEventListener ('click', function () {
        plusSlides (1);
    });

    prev.addEventListener ('click', function () {
        plusSlides (-1);
    });

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlides(i);
            }
        }
    });

    // Calc
    
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.textContent = 0;
    
    persons.addEventListener('input', function () {
        personsSum = +this.value;
        total = (personsSum + daysSum)*4000;

        if(restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('input', function () {
        daysSum = +this.value;
        total = (personsSum + daysSum)*4000;

        if(persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    
    place.addEventListener('input', function () {
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
    
}); 
//Создание нового блока на странице
/*class Optionals {
constructor(height, width, bg, fontSize, textAlign, text) {
    this.height = height + 'px';
    this.width = width + 'px';
    this.bg = bg;
    this.fontSize = fontSize + 'px';
    this.textAlign = textAlign;
    this.text = text;
}
createDiv() {
    let elem = document.createElement('div');
    elem.textContent = this.text;
    document.body.append(elem);
    elem.style.cssText = `height: ${this.height};
                       width: ${this.width};
                       background-color: ${this.bg};
                       font-size: ${this.fontSize};
                       text-align: ${this.textAlign};
`;
}
}
let block = new Optionals(500, 500, "blue", 50, "center", "Hello World");
block.createDiv();*/
