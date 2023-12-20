import { Component } from "../Abstract/Component";
//первоначально было
/*export class Header extends Component {
  constructor(parrent: HTMLElement) {
    super(parrent, "div", ["header"]);
    const header = new Component(this.root, 'header', ["header"]);
    const container = new Component(header.root, 'div', ["container"]);
    const header__inner = new Component(container.root, 'div', ["header__inner"])
    
    new Component(header__inner.root, 'h1', ["h1"], 'Доставка пиццы');
    new Component(header__inner.root, 'h2', ["h2"], '<br><br>11:00 - 23:00');

    const header__nav = new Component(header__inner.root, "nav", ["header__nav"]);
    new Component(header__nav.root, "a", null, "pizzeria", ["href"], ["#"]);
    new Component(header__nav.root, "a", null, "Аккаунт", ["href"], ["#"]);
    new Component(header__nav.root, 'a', null, null, ["src", "alt"], ["./assets/Icons/p.png", 'p']);

    const icons = new Component(header__inner.root, 'div', ["header__icons"]);
    const icon1 = new Component(icons.root, 'a', ["icon1__a"], null, ["href"], ["#"]);
    new Component(icon1.root, 'img', ["icons"], null, ["src", "alt"], ["./assets/Icons/Account.svg", "account"]);
    const icon2 = new Component(icons.root, 'a', ["icon2__a"], null, ["href"], ["#"]);
    new Component(icon2.root, 'img', ["icons"], null, ["src", "alt"], ["./assets/Icons/logo.svg", "logo"]);
    //const icon3 = new Component(icons.root, 'a', ["icon3__a"], null, ["href"], ["#"]);
   // new Component(icon3.root, 'img', ["icons"], null, ["src", "alt"], ["./assets/Icons/p.png", 'p']);
  }
}*/


export class Header extends Component {
  constructor(parrent: HTMLElement) {
    super(parrent, "div", ["header"]);
    const header = new Component(this.root, 'header', ["header"]);
    const container = new Component(header.root, 'div', ["container"]);
    const header__inner = new Component(container.root, 'div', ["header__inner"])


    const header__nav = new Component(header__inner.root, "nav", ["header__nav"]);
    new Component(header__nav.root, "a", null, "pizzeria", ["href"], ["#"]);
    new Component(header__nav.root, 'img', ["icons"], null, ["src", "alt"], ["./assets/Icons/logo.svg", "logo"]);
    new Component(header__nav.root, 'img', ["icons"], null, ["src", "alt"], ["./assets/Icons/Account.svg", "account"]);
    new Component(header__nav.root, "a", null, "Аккаунт", ["href"], ["#"]);
   // new Component(header__nav.root, 'a', null, null, ["src", "alt"], ["./assets/Icons/p.png", 'p']);
    


    new Component(header__inner.root, 'h4', ["h4"], 'Доставка пиццы');
    new Component(header__inner.root, 'h2', ["h2"], '<br>11:00 - 23:00');
    new Component(header__inner.root, 'img', ["iconsp"], null, ["src", "alt"], ["./assets/Icons/pnov.png", 'p']);
 


    new Component(header__inner.root, 'h3', ["h3"], 'У нас предоставляется бесплатная доставка.');
  }
}