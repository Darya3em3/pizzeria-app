import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";

export class CardHistory extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TDataHistory) {
    super(parrent, 'div', ["cardhistory"]);
    const divTitle = new Component(this.root, 'div', ["cardhistoru__title"]);
    new Component(divTitle.root, 'span', ["cardhistory__text"], 'Ваш заказ: ');
    data.basket.forEach(el => {
      new Component(divTitle.root, 'span', ["cardhistory__name"], el.good.name);
    })
    new Component(this.root, 'span', [], `Сумма: ${data.dataBasket.summa}`);
    new Component(this.root, 'span', [], `Дата: ${data.data.toDate().toLocaleDateString('ru')}`);
  }
}