import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";

export class CardRecord extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TDataHistory) {
    super(parrent, 'div', ['cardrecord']);
    data.basket.forEach(carBasket => {
      new Component(this.root, 'span', [], carBasket.good.name);
      // new Component(this.root, 'span', [], carBasket);
    })
    new Component(this.root, 'span', [], `Количество: ${data.dataBasket.count}`);
    new Component(this.root, 'span', [], `Сумма: ${data.dataBasket.summa}`);
    new Component(this.root, 'span', [], `Дата заказа: ${data.data.toDate().toLocaleDateString('ru')}`);
  }
}