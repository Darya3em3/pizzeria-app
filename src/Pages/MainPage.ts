import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";


export class MainPage extends Component {
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, "div", ["main__page"]);
    const main__page = new Component(this.root, 'div', ["main__page"]);
    const container = new Component(main__page.root, 'div', ["container", "container__main-page"]);
    const page__inner = new Component(container.root, 'div', ["container", "main__page-inner"]);
    new Component(page__inner.root, 'p', ["main__page-paragraf"], "Добро пожаловать на наш сайт доставки пиццы!  <br><br>Мы рады предложить Вам самые вкусные и свежие пиццы, <br> которые Вам обязательно понравятся. <br><br>Наша команда профессиональных поваров с большой любовью <br>готовит каждую пиццу из самых качественных ингредиентов. <br>Мы тщательно отбираем свежие овощи, сочное мясо и <br>нежный сыр, чтобы создать идеальное сочетание вкусов. <br><br>Заказывать пиццу у нас легко и удобно.");
    new Component(page__inner.root, 'img', null, null, ["src", "alt"], ["./assets/png/pizza1.png", 'pizza1']);
    const btn = new Component(container.root, 'input', ["main__page-btn"], null, ["type", "value"], ["button", "Перейти в меню"]);
    btn.root.onclick = () => {
      window.location.hash = '#catalog';
    }
  }
}





