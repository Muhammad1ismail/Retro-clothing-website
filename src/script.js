const shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("retrodata")) || [];

const createShop = () => {
  return (shop.innerHTML = data
    .map((x) => {
      const { id, title, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];

      return `

    <div id="product-id-${id}" class="item">
    <img class="img" src=${img} alt="" />
    <div class="details">
      <h4>${title}</h4>
      <p>${desc}</p>
      <div class="price">
        <h4>${price} $</h4>
        <div class="btn">
          <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
          <div id="${id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
          <i onclick="decreament(${id})" class="bi bi-dash-lg"></i>
        </div>
      </div>
    </div>
  </div>
  
    
    `;
    })
    .join(""));
};

createShop();

const increament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 0,
    });
  } else {
    search.item += 1;
  }

  //console.log(basket);

  update(selectedItem.id);

  localStorage.setItem("retrodata", JSON.stringify(basket));
};

const decreament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  //console.log(basket)

  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("retrodata", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  calculation();
};

const calculation = () => {
  let cartAmount = document.getElementById("cart-amount");
  cartAmount.innerHTML = basket
    .map((x) => x.item)
    .reduce((total, curr) => {
      total += curr;
      return total;
    }, 0);
};

calculation();
