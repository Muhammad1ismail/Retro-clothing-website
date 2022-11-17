const textBox = document.getElementById("text-box");
const shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("retrodata")) || [];

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

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x;
        let search = data.find((y) => y.id === id);
        console.log(search);
        return `

               <div class="cart-box">
                <img class="cart-img" src="${search.img}"  />
                <div class="details">
                   <div class="title-price-x">
                      <h4 class="title-price">
                         <p>${search.title}</p>
                         <p>$${search.price}</p>
                      </h4>

                      <i onclick="(removeItem(${id}))" class="bi bi-x"></i>
                   
                   </div>
                   <div class="plus-minus-btn">

                   <div class="btn">
                        <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="decreament(${id})" class="bi bi-dash-lg"></i>
                   </div>
                   
                   </div>
                   <h3>$${item * search.price}</h3>
                
                </div>
               </div>
            
            `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    textBox.innerHTML = `
            <h3>No items in the carts</h3>
            <a href="index.html">
              <button class="home-btn">back to home page</button>
            
            </a>
        `;
  }
};

generateCartItems();

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

  generateCartItems();

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
  generateCartItems();

  localStorage.setItem("retrodata", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  calculation();
  totalAmount();
};


const removeItem = (id) =>{
    let selectedItem = id;

    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();



    localStorage.setItem("retrodata",JSON.stringify(basket));
   

    

}


const totalAmount = () =>{

    if(basket.length !== 0){

        let amount = basket.map((x) => {
            const {id,item} = x;
            let search = data.find((y) => y.id === id );
            return item * search.price;
        }).reduce((x,y) => (x + y), 0);

        textBox.innerHTML = `
           <h2 class="total-purchase">Total purchase : $${amount}</h2>
           <button class="checkout">checkout</button>
           <button onclick="clearCart()" class="remove">remove ietms</button>
           
        
        `

    }else return;

}




const clearCart = () =>{

    basket = [];
    generateCartItems();
    calculation();

    localStorage.setItem("retrodata", JSON.stringify(basket));
    

}

totalAmount();

