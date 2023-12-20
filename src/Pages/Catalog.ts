import { Component } from "../Abstract/Component";
import { TCriteria, TDataBasket, TGood, TGoodBasket, TServices } from "../Abstract/Type";
import { CardBasket } from "../Common/CardBasket";
import { GoodCard } from "../Common/GoodCard";

export class Catalog extends Component {
  divBasket: Component;
  spanSumma: Component;
  criteria: TCriteria = {
    weight: 'up',
    price: 'up'
  }
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', ['catalog']);
    new Component(this.root, 'p', ['page__title'], 'Меню');
    const divButton = new Component(this.root, 'div', ['catalog__buttons']);
    const btnSort = new Component(divButton.root, 'input', ['catalog__btn'], null, ['type', 'value', 'data-price'], ['button', 'Сортировать по цене', 'up']);
    btnSort.root.onclick = (event) => {
      const param = (event.target as HTMLElement).dataset;
      if (!param.price) return;
      if (param.price) this.criteria.price = param.price;


      services.dbService.getAllGoods(this.criteria).then((goods) => {
        divPizzas.root.innerHTML = '';
        this.putGoodOnPage(divPizzas, goods);
      });

      if (param.price === 'up') {
        param.price = 'down';
      } else {
        param.price = 'up';
      }
    }
    // const btnWeight = new Component(divButton.root, 'input', ['catalog__btn'], null, ['type', 'value', 'data-weight'], ['button', 'Сортировать по весу', 'up']);
    // btnWeight.root.onclick = (event) => {
    //   const param = (event.target as HTMLElement).dataset;
    //   if (!param.weight) return;
    //   if (param.weight) this.criteria.weight = param.weight;


    //   services.dbService.getAllGoods(this.criteria).then((goods) => {
    //     divPizzas.root.innerHTML = '';
    //     this.putGoodOnPage(divPizzas, goods);
    //   });

    //   if (param.weight === 'up') {
    //     param.weight = 'down';
    //   } else {
    //     param.weight = 'up';
    //   }
    // }
    const divContent = new Component(this.root, 'div', ['catalog__content']);
    services.dbService.calcDataBasket();
    const column = new Component(divContent.root, 'div', ['basket__column']);
    services.dbService.calcDataBasket();
    const basketTitle = new Component(column.root, 'div', ['basket__title'])
    new Component(basketTitle.root, 'span', [], 'Корзина');
    const lenght = new Component(basketTitle.root, 'span', ['basket__lenght'], `${services.dbService.dataUser?.basket.length}`);
    this.divBasket = new Component(column.root, 'div', ['basket']);
    if (services.dbService.dataUser) {
      services.dbService.dataUser.basket.forEach(el => {
        this.putGoodsInBasket(this.divBasket, el);
      });
    };
    const total = new Component(column.root, 'div', ["total__basket-inner"]);
    new Component(total.root, 'span', ["basket-sum-text"], `Итого:`);
    this.spanSumma = new Component(total.root, 'span', ["basket-sum"], `${services.dbService.dataBasket.summa.toFixed(2)} руб.`);
    const btnOplata = new Component(column.root, 'input', ["basket__oplata"], null, ["type", "value"], ["button", "Оплатить"]);
    btnOplata.root.onclick = () => {
      const user = services.authService.user;
      services.dbService.addBasketInHistory(user);
    };
    const divPizzas = new Component(divContent.root, 'div', ['catalog__pizzas']);
    services.dbService.getAllGoods(this.criteria).then((goods) => {
      divPizzas.root.innerHTML = '';
      this.putGoodOnPage(divPizzas, goods);
    });

    services.dbService.addListener('goodInBasket', (tovar) => {//при команде "bookInBasket"
      this.putGoodsInBasket(this.divBasket, tovar as TGoodBasket);
      lenght.root.innerHTML = `${services.dbService.dataUser?.basket.length}`;
      // this.toggleBasket(true);
    });
    services.dbService.addListener('delGoodFromBasket', () => {
      lenght.root.innerHTML = `${services.dbService.dataUser?.basket.length}`;
    })
    services.dbService.addListener('changeDataBasket', (dataBasket) => {//при изменении в корзине
      this.spanSumma.root.innerHTML = `${(dataBasket as TDataBasket).summa.toFixed(2)} руб.`;
      let isBasketClear = false;
      if (services.dbService.dataUser) {
        if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
      }
      // this.toggleBasket(isBasketClear);
    });
    services.dbService.addListener("clearBasket", () => {//очистить корзину
      this.divBasket.root.innerHTML = '';
      // this.toggleBasket(false);
    });
  }
  putGoodOnPage(teg: Component, goods: TGood[]) {
    goods.forEach((product) => {
      new GoodCard(teg.root, this.services, product);
    })
  }

  putGoodsInBasket(teg: Component, tovar: TGoodBasket) {
    new CardBasket(teg.root, this.services, tovar);
  }
}