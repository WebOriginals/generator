if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    let liSecondLevel = document.querySelectorAll('.menuSecondLevel__li');
    let liOneLevel = document.querySelectorAll('.menu__list > li');
    let logo = document.querySelector('.header__logo');


    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {

                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

    //открытие 3 уровня
    if (liSecondLevel.length > 0) {
        for (let index = 0; index < liSecondLevel.length; index++) {
            const menuSecondLevelArrow = liSecondLevel[index].querySelector('.menu__sub-link > svg:last-child');

            menuSecondLevelArrow.addEventListener("click", function (e) {
                liSecondLevel[index].classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//Бурет svg , заголовок с 2 уровня и подставляет в заголовок 3 уровня
const menuSecondLevel = document.querySelector('.menuSecondLevel');

const listElements = menuSecondLevel.querySelectorAll('.menuSecondLevel__li');
const asideListElements = document.querySelectorAll('.wrapper-catalog .menuSecondLevel__li');
const closeThirdLevel = document.querySelectorAll('.ThirdLevel-title');

if (listElements) {
    for (let listElement of listElements) {
        listElement.addEventListener('mouseenter', e => {
            const headerThirdLevel = listElement.querySelector('.menuThirdLevel  .menu__sub-list-title');
            const title = listElement.querySelector('span').cloneNode(true);
            const svg = listElement.querySelector('svg').cloneNode(true);
            headerThirdLevel.innerHTML = '';
            headerThirdLevel.append(svg);
            headerThirdLevel.append(title);
        });
    }
}
if (asideListElements) {
    for (let listElement of asideListElements) {
        listElement.addEventListener('mouseenter', e => {
            const headerThirdLevel = listElement.querySelector('.menuThirdLevel  .menu__sub-list-title');
            const title = listElement.querySelector('span').cloneNode(true);
            const svg = listElement.querySelector('svg').cloneNode(true);
            headerThirdLevel.innerHTML = '';
            headerThirdLevel.append(svg);
            headerThirdLevel.append(title);
        });
    }
}

//расчет высоты элемета
if (!isMobile.any()) {
    const heightMenuSecondLevel = document.querySelector('.menu__sub-list').offsetHeight;
    for (let listElement of listElements) {
        const heightMenuThirdLevel = listElement.querySelector('.menuThirdLevel');
        heightMenuThirdLevel.style.height = heightMenuSecondLevel + 'px';
    }
}
if (!isMobile.any()) {
    const heightMenuSecondLevel = document.querySelector('.list-goods').offsetHeight;
    console.log(heightMenuSecondLevel);
    for (let asideElement of asideListElements) {
        const heightMenuThirdLevel = asideElement.querySelector('.menuThirdLevel');
        console.log(heightMenuThirdLevel);
        heightMenuThirdLevel.style.height = heightMenuSecondLevel + 'px';
    }
}
// в мобильной версии в сайд баре скрываю 2 уровень каталога
if (closeThirdLevel) {
    for (let el of closeThirdLevel) {
        el.addEventListener('click', () => {
            let perent = el.parentNode.parentNode.parentNode;
            perent.classList.remove('_active')
        })
    }
}