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
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-06-10';

    function getTimeRemading (endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) %24),
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
        }
            
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minuts' : minutes,
            'seconds' : seconds,
        };
    }

    function setClock (id, endtime) {
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
                clearInterval(timeInterval)
            }
        }
    }

    setClock('timer', deadline);
});