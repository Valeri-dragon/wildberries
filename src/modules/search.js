export const search = () => {
  const inputSearch = document.querySelector(".search-block > input");
  const btnSearch = document.querySelector(".search-block > button");
  const cl = console.log;
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
    fetch("/db/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const array = data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        localStorage.setItem("goods", JSON.stringify(array));
        // const goods = JSON.parse(localStorage.getItem("goods"));
        if (window.location.pathname !== "/wildberries/goods.html") {
          window.location.href = "/wildberries/goods.html";
        } else {
          renderGoods(array);
        }
      });
  };
  try {
    btnSearch.addEventListener("click", () => {
      console.log();
      getData(inputSearch.value);
    });
    const eventValueInputs = inputSearch.value;
    localStorage.setItem("myText", eventValueInputs);
    inputSearch.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        getData(inputSearch.value);
        inputSearch.innerHTML = localStorage.getItem("myText");
      }
    });
  } catch (e) {
    console.error(e.message);
  }
};
