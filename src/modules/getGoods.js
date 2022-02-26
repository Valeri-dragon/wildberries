export const getGoods = () => {
  const cl = console.log;
  const navigationLinks = document.querySelectorAll(".navigation-link");
  const btnIsMainAll = document.querySelector(".more");
  const renderGoods = (goods) => {
    const containerCard = document.querySelector(".long-goods-list");
    containerCard.innerHTML = "";
    goods.forEach((good) => {
      //получаем список полученных товаров и создаем элемент

      const { description, id, img, label, name, price } = good;
      const goodBlock = document.createElement("div");
      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");
      //в label в классе проверяем условием если есть label ничего не добавляем
      //иначе добавляем класс d-none из bootstrap
      goodBlock.innerHTML = `

      <div class="goods-card">
      
              <span class="label ${label ? null : "d-none"}">${label}</span>
              <img src="db/${img}"  alt="${name}" class="goods-image"/>
              <h3 class="goods-title">${name}</h3>
              <p class="goods-description">${description}</p>
             <button class="button goods-card-btn add-to-cart" data-id="${id}">
              <span class="button-price">$${price}</span>
              </button>
            </div>

      `;
      containerCard.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    fetch("/wildberries/db/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const array = category
          ? data.filter((item) => item[category] === value)
          : data;
        localStorage.setItem("goods", JSON.stringify(array));
        // const goods = JSON.parse(localStorage.getItem("goods"));
        if (window.location.pathname !== "/wildberries/goods.html") {
          window.location.href = "/wildberries/goods.html";
        } else {
          renderGoods(array);
        }
      });
  };

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (eventlink) => {
      eventlink.preventDefault();
      const linkValue = link.textContent;
      //получение названия дата-атрибута ссылки
      const dataAtrLink = link.dataset.field;
      getData(linkValue, dataAtrLink);
    });
  });

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/wildberries/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }
  //здесь делаем проверку, чтобы не вызвать ошибку при нажатии кнопки все на главной странице
  if (btnIsMainAll) {
    btnIsMainAll.addEventListener("click", (event) => {
      event.preventDefault();

      getData();
    });
  }
};
