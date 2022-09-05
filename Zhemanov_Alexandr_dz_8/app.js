//'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


const basket = getBasketApi();
const featuredItems = document.querySelector(".featuredItems");


















// add jdoc
function getBasketApi() {
  let productMap = new Map();
  let productAddEvent = () => {};
  
  /**
   * @return {Array}
   */
  function getProducts() {
    return Array.from(productMap);
  }

  function getResultOneTypeProduct(name) {
    if (!productMap.has(name)) {
      return NaN;
    }

    let [count, price] = productMap.get(name);
    return price * count;
  }

  function getResultAllProduct() {
    let all = 0;
    
    Array.from(productMap.keys()).forEach((key) => {
      all += getResultOneTypeProduct(key)
    });

    return all;
  }

  function getProductCount() {
    let all = 0;
    
    productMap.forEach(([count, ]) => {
      all += count;
    })
    return all;
  }

  function addProduct(name, price) {
    if (productMap.has(name)) {
      const [count, cPrice] = productMap.get(name);
      productMap.set(name, [count + 1, cPrice]);
    } else {
      productMap.set(name, [1, price])
    }

    productAddEvent(getProductCount()); 
  }
  
  function onProductAddEvent(fn) {
    productAddEvent = fn;
  }
  return {
    getProducts,
    getProductCount,
    getResultOneTypeProduct,
    getResultAllProduct,
    addProduct,
    onProductAddEvent
  }; 
}
