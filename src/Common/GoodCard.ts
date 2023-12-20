import { Component } from "../Abstract/Component";
import { TGood, TServices } from "../Abstract/Type";

export class GoodCard extends Component {
  btnBasket: Component;
  constructor(parrent: HTMLElement, private services: TServices, private data: TGood) {
    super(parrent, 'div', ['goodcard']);
    new Component(this.root, 'img', ['goodcard__img'], null, ['src', 'alt'], [data.url, data.name]);
    new Component(this.root, 'span', ['goodcard__price'], `${data.price} руб.`);
    new Component(this.root, 'span', ['goodcard__name'], `${data.name}`);
    new Component(this.root, 'span', ['goodcard__weight'], `${data.weight} г.`);
    this.btnBasket = new Component(this.root, 'input', ['goodcard__btn'], null, ['type', 'value'], ['button', 'Добавить']);
    if (services.dbService.dataUser) {
      const index = services.dbService.dataUser.basket.findIndex((el) => el.good.id === data.id);
      if (index >= 0) {
        (this.btnBasket.root as HTMLElement).classList.add('active')
      }
    }
    this.btnBasket.root.onclick = () => {
      const user = services.authService.user;
      if (user) {
        this.addGoodInBasket();
        (this.btnBasket.root as HTMLElement).classList.add('active');
      } else {
        window.location.hash = '#account';
      }
    }

    services.dbService.addListener('delGoodFromBasket', (idGood) => {
      if (idGood === data.id) {
        (this.btnBasket.root as HTMLElement).classList.remove('active');
      }
    })
  }

  addGoodInBasket() {
    const user = this.services.authService.user;
    this.services.dbService.addGoodInBasket(user, this.data)
      .catch(() => {
        (this.btnBasket.root as HTMLElement).classList.remove('active');
      })
  }
}