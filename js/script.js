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
    }) ;
});
