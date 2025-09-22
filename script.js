let sweets = {
  waffle: 0, brulee: 0, macaron: 0, tiramisu: 0,
  pistachio: 0, meringue: 0, velvet: 0, brownie: 0, pannacotta: 0
};

const prices = [6.50, 7.00, 8.00, 5.50, 4.00, 5.00, 4.50, 5.50, 6.50]

let purchased = [false, false, false, false, false, false, false, false, false]

const keys = Object.keys(sweets);
const buttons = document.querySelectorAll('.add');
let purchases = 0;
let confirmbutton = document.querySelector('.neworder');

function nopurchases() {
  document.getElementsByClassName("totalprice")[0].style.cssText = "display: none;"
  document.getElementsByClassName("carbon-neutral")[0].style.cssText = "display: none;"
  document.getElementsByClassName("confirmationbtn")[0].style.cssText = "display: none;"
  document.getElementsByClassName("noitemfound")[0].style.cssText = "display: flex; text-align: center; align-self: center;"
  document.getElementsByClassName("noitemfoundtext")[0].style.cssText = "display: flex; text-align: center; align-self: center;"
}

function purchasesfunction() {
  document.getElementsByClassName("totalprice")[0].style.cssText = "display: flex;"
  document.getElementsByClassName("carbon-neutral")[0].style.cssText = "display: flex;"
  document.getElementsByClassName("confirmationbtn")[0].style.cssText = "display: flex; justify-content: center;"
  document.getElementsByClassName("noitemfound")[0].style.cssText = "display: none;"
  document.getElementsByClassName("noitemfoundtext")[0].style.cssText = "display: none;"
  // document.getElementsByClassName("confirmationbtn")
}

// main rendering: shows "Add to Cart" (default view)
function renderAddToCart(btn, index) {
  btn.innerHTML = `
    <div class="thetext">
      <img class="cart" src="./assets/images/icon-add-to-cart.svg" alt="">
      Add to Cart
    </div>
  `;
  btn.style.cssText = "color: hsl(14, 65%, 9%); font-size: 8pt;";
  btn.querySelector(".thetext").style.cssText = "display: flex;";
  document.getElementsByClassName("desert")[index].style.cssText = "border: none"
  document.getElementsByClassName("crosscontainer")[index].style.cssText = "display: none;"
  document.getElementsByClassName("line")[index].style.cssText = "display: none;"

  // click → go to quantity mode
  btn.onclick = () => {
    sweets[keys[index]] < 1 ? sweets[keys[index]] = 1 : sweets[keys[index]]
    if (purchased[index] === false) {
      purchases += prices[index];
      purchased[index] = true;
    }
    purchasesfunction();
    renderQuantityUI(btn, index);
  };
}

// rendering for hover state: shows - qty +
function renderQuantityUI(btn, index) {
  if (sweets[keys[index]] > 0) {
    btn.innerHTML = `
      <img class="minus" src="./assets/images/icon-decrement-quantity.svg" alt="">
      <span class="qty">${sweets[keys[index]]}</span>
      <img class="plus" src="./assets/images/icon-increment-quantity.svg" alt="">
    `;
    btn.style.cssText =
      "justify-content: space-between; color: hsl(20, 50%, 98%); font-size: 9pt; background-color: hsl(14, 86%, 42%);";

    // purchases();
    document.getElementsByClassName("number")[0].innerHTML = `$${purchases.toFixed(2)}`
    document.getElementsByClassName("crosscontainer")[index].style.cssText = "display: flex;"
    document.getElementsByClassName("quantity")[index].innerHTML = `${sweets[keys[index]]}x`
    document.getElementsByClassName("priceofall")[index].innerHTML = `$${(prices[index] * sweets[keys[index]]).toFixed(2)}`
    document.getElementsByClassName("line")[index].style.cssText = "display: flex;"

    const minus = btn.querySelector('.minus');
    const plus = btn.querySelector('.plus');
    const qty  = btn.querySelector('.qty');

    // if (purchases !== 0) {
    //   purchases();
    // }

    document.getElementsByClassName("desert")[index].style.cssText = "border: 0.1rem solid hsl(14, 86%, 42%);"

    document.getElementsByClassName("removeitem")[index].addEventListener("click", (e) => {
      e.stopPropagation();
      purchases -= prices[index] * sweets[keys[index]];
      document.getElementsByClassName("number")[0].innerHTML = `$${purchases.toFixed(2)}`
      sweets[keys[index]] = 0;
      purchased[index] = false;

      if (purchases === 0) {
        nopurchases();
      }
      
      renderAddToCart(btn, index);
    })

    // update qty on plus
    plus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (purchases !== 0) {
        purchasesfunction();
      }
      sweets[keys[index]]++;
      purchases += prices[index];
      qty.textContent = sweets[keys[index]];
      document.getElementsByClassName("number")[0].innerHTML = `$${purchases.toFixed(2)}`
      document.getElementsByClassName("quantity")[index].innerHTML = `${sweets[keys[index]]}x`
      document.getElementsByClassName("priceofall")[index].innerHTML = `$${(prices[index] * sweets[keys[index]]).toFixed(2)}`
    
    });

    // update qty on minus
    minus.addEventListener('click', (e) => {
      e.stopPropagation();
      sweets[keys[index]]--;
      purchases -= prices[index];
      document.getElementsByClassName("number")[0].innerHTML = `$${purchases.toFixed(2)}`
      document.getElementsByClassName("quantity")[index].innerHTML = `${sweets[keys[index]]}x`
      document.getElementsByClassName("priceofall")[index].innerHTML = `$${(prices[index] * sweets[keys[index]]).toFixed(2)}`
      
      if (purchases === 0) {
        nopurchases();
      }
      if (sweets[keys[index]] <= 0) {
        sweets[keys[index]] = 0;
        purchased[index] = false;
        renderAddToCart(btn, index); // ⬅ switch back to "Add to Cart"
      } else {
        qty.textContent = sweets[keys[index]];
      }
    });
  }
}

function showorder() {
  document.querySelector(".card").style.cssText = "display: flex;"

  for (let index = 0; index < purchased.length; index++) {
    document.querySelectorAll(".wholeprice")[index].style.cssText = "display: none;"
    document.querySelectorAll(".line2")[index].style.cssText = "display: none;"
    if (purchased[index]) {
      document.querySelectorAll(".wholeprice")[index].style.cssText = "display: flex;";
      document.querySelectorAll(".quantityconfirmed")[index].innerHTML = `${sweets[keys[index]]}x`;
      document.querySelectorAll(".priceofallconfirmed")[index].innerHTML = `$${(prices[index] * sweets[keys[index]]).toFixed(2)}`;
      document.querySelectorAll(".line2")[index].style.cssText = "display: block;";
    }

    document.querySelector(".confirmationnumber").innerHTML = `$${purchases.toFixed(2)}`
  }
}

// setup all buttons
buttons.forEach((btn, index) => {
  renderAddToCart(btn, index);

  btn.addEventListener('mouseout', () => {
    if (sweets[keys[index]] === 0) {
      renderAddToCart(btn, index);
    }
  });
});

document.querySelector(".confirmationbtn").addEventListener("click", (e) => {
  showorder();
})

confirmbutton.addEventListener('click', () => {
  document.querySelector(".card").style.cssText = "display: none;"

  // reset the existing objects/arrays
  for (let key in sweets) {
    sweets[key] = 0;
  }
  purchased.fill(false);
  purchases = 0;

  document.querySelector(".number").innerHTML = `$${purchases.toFixed(2)}`;
  document.querySelector(".confirmationnumber").innerHTML = `$${purchases.toFixed(2)}`;

  // reset all buttons back to "Add to Cart"
  buttons.forEach((btn, index) => {
    renderAddToCart(btn, index);
  });

  // show the "no items" state again
  nopurchases();
});

function updateImages() {
  if (innerWidth < 1439) {
    document.querySelectorAll(".desert").forEach(img => {
      img.src = img.src.replace("desktop", "mobile");
    });
  } else {
    document.querySelectorAll(".desert").forEach(img => {
      img.src = img.src.replace("mobile", "desktop");
    });
  }
}

// run once on page load
updateImages();

// run again whenever window is resized
window.addEventListener("resize", updateImages);
