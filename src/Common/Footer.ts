import { Component } from "../Abstract/Component";

export class Footer extends Component {
  constructor(parrent: HTMLElement) {
    super(parrent, "div", ["footer"]);
    const footer = new Component(this.root, 'footer', ["footer"]);
    const container = new Component(footer.root, 'div', ["container"]);
    const footer__inner = new Component(container.root, 'div', ["footer__inner"]);

    new Component(footer__inner.root, 'h1', ["h1"], 'pizzeria');
   // const icon4 = new Component(contacts.root, 'a', ["icon4__a"], null, ["href"], ["#"]);
   // new Component(icon4.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/logop.svg", "logop"]);

    const contacts = new Component(footer__inner.root, 'div');
    new Component(contacts.root, 'h3', ['contacts__inner'], 'Наш номер');
    new Component(contacts.root, 'p', ['contacts__inner'], "+375(29)815-25-52");
    //new Component(contacts.root, 'p', ['contacts__inner'], "e-mail: bookstore@mail.ru");
   // const icon3 = new Component(contacts.root, 'a', ["icon3__a"], null, ["href"], ["#"]);
   // new Component(icon3.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/Call.svg", "call"]);
  

    const account = new Component(footer__inner.root, 'div', ['contacts__inner']);
    new Component(account.root, 'h3', null, 'Наши соц сети');
    const account__ul = new Component(account.root, 'ul');
    const account__li = new Component(account__ul.root, 'li', ["footer__li"]);
    const icon1 = new Component(account.root, 'a', ["icon1__a"], null, ["href"], ["#"]);
    new Component(icon1.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/vk.svg", "vk"]);
    const icon2 = new Component(account.root, 'a', ["icon2__a"], null, ["href"], ["#"]);
    new Component(icon2.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/tg.svg", "tg"]);



    const ssik = new Component(container.root, 'div', ['ssik__inner']);
    const ssik__ul = new Component(ssik.root, 'ul');
    const ssik__li = new Component(ssik__ul.root, 'li', ["ssik__li"]);
   // new Component(ssik__li.root, 'a', null, "GitHub", ["href"], ["https://github.com/Darya3em3/pizzeria-app"]);
    new Component(ssik__li.root, 'p', null, "© pizzeria, 2023");
    new Component(ssik__li.root, 'p', null, "Бессилко Дарья, ЭМ-3");
  }
}