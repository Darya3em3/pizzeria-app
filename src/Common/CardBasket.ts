import { da, th } from "date-fns/locale";
import { Component } from "../Abstract/Component";
import { TGoodBasket, TServices } from "../Abstract/Type";

export class CardBasket extends Component {
  spanCount: Component;
  btnDel: Component;
  constructor(parrent: HTMLElement, private services: TServices, private data: TGoodBasket) {
    super(parrent, 'div', ['cardbasket']);
    new Component(this.root, 'img', ['cardbasket__img'], null, ['src', 'alt'], [data.good.url, data.good.name]);
    const divDescription = new Component(this.root, 'div', ['cardbasket__discription']);
    new Component(divDescription.root, 'span', [], `${data.good.name}`);
    new Component(divDescription.root, 'span', ['cardbasket__weight'], `${data.good.weight} г.`);
    new Component(divDescription.root, 'span', [], `${data.good.price} руб.`);
    const countCard = new Component(this.root, 'div', ["cardbasket__countcard"]);
    const btnDec = new Component(countCard.root, 'input', ["cardbasket__btn"], null, ["value", "type"], ["-", "button"]);
    btnDec.root.onclick = () => {
      this.changeCountBook(-1);
    }
    this.spanCount = new Component(countCard.root, 'span', [], `${data.count}`);
    const btnInk = new Component(countCard.root, 'input', ["cardbasket__btn"], null, ["value", "type"], ["+", "button"]);
    btnInk.root.onclick = () => {
      this.changeCountBook(1);
    }
    this.btnDel = new Component(this.root, 'input', ["cartbasket__del"], null, ["value", "type"], ["+", "button"]);
    this.btnDel.root.onclick = () => {
      this.delGoodFromBasket();
    }
  }
  changeCountBook(grad: number) {
    const newCount = this.data.count + grad;
    if (newCount <= 0) return;

    const newData = {} as TGoodBasket;
    Object.assign(newData, this.data);
    newData.count = newCount;

    const user = this.services.authService.user;
    this.services.dbService.changeGoodInBasket(user, newData).then(() => {
      Object.assign(this.data, newData);
      this.spanCount.root.innerHTML = `${this.data.count}`;
    });
  }

  delGoodFromBasket() {
    const user = this.services.authService.user;
    this.services.dbService.
      delGoodFromBasket(user, this.data)
      .then(() => {
        this.remove();
      })
      .catch(() => { });
  }
}