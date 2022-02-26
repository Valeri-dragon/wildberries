export const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const modalCart = document.getElementById("modal-cart");
  const modalClose = document.querySelector(".modal-close");
  const cartTotal = document.querySelector(".card-table__total");
  //получаем контейнер с карточками товаров, с которым будем работать
  const containerCard = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
        cartTotal.textContent = cart.reduce((sum, goodItem) => {
          return sum + goodItem.price * goodItem.count;
        }, 0);
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };
  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
          cartTotal.textContent = cart.reduce((sum, goodItem) => {
            return sum + goodItem.price * goodItem.count;
          }, 0);
        }
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickeBtnCard = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.some((good) => good.id === clickeBtnCard.id)) {
      cart.map((good) => {
        if (good.id === clickeBtnCard.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickeBtnCard.count = 1;
      cart.push(clickeBtnCard);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
  
   <td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td>${+good.price * good.count}</td>
						<td><button class="cart-btn-delete"">x</button></td>`;
      cartTable.append(tr);

      tr.addEventListener("click", (event) => {
        console.log(event.target);
        if (event.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });
    });
  };

  //отправление

  const sendFormCart = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    //отправляет данные из корзины на тестовый api
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        name: "",
        phone: "",
      }),
    }).then(() => {
      localStorage.removeItem("cart");
      renderCartGoods([]);
      modalCart.style.display = "";
    });
  };

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendFormCart();
  });

  cartBtn.addEventListener("click", () => {
    const arrayCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(arrayCart);

    cartTotal.textContent = arrayCart.reduce((sum, goodItem) => {
      return sum + goodItem.price * goodItem.count;
    }, 0);

    modalCart.style.display = "flex";
  });
  modalCart.addEventListener("click", (event) => {
    if (event.target === modalClose || event.target === modalCart) {
      modalCart.style.display = "";
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalCart.style.display = "";
    }
  });

  if (containerCard) {
    containerCard.addEventListener("click", (event) => {
      //метод  closest ищет по любому селектору
      if (event.target.closest(".add-to-cart")) {
        const btnAddToCart = event.target.closest(".add-to-cart");
        //ниже получаем идентификатор товара при клике на кнопку
        //(id на кнопке), идентификатор лежит в LocalStorage
        const productPriceBtn = btnAddToCart.dataset.id;

        addToCart(productPriceBtn);
      }
    });
  }
};
