import { Component } from "../Abstract/Component";

export class Footer extends Component {
  constructor(parrent: HTMLElement) {
    super(parrent, "div", ["footer"]);
    const footer = new Component(this.root, 'footer', ["footer"]);
    const container = new Component(footer.root, 'div', ["container"]);
    const footer__inner = new Component(container.root, 'div', ["footer__inner"]);

    const logo = new Component(footer__inner.root, 'div', ['footer__logo']);
    new Component(logo.root, 'p', [], 'pizzeria');
    // const icon4 = new Component(contacts.root, 'a', ["icon4__a"], null, ["href"], ["#"]);
    new Component(logo.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/logop.svg", "logop"]);

    const contacts = new Component(footer__inner.root, 'div', ['footer__contacts']);
    new Component(contacts.root, 'p', [], 'Наш номер');
    new Component(contacts.root, 'p', [], "+375(29)815-25-52");
    //new Component(contacts.root, 'p', ['contacts__inner'], "e-mail: bookstore@mail.ru");
    // const icon3 = new Component(contacts.root, 'a', ["icon3__a"], null, ["href"], ["#"]);
    // new Component(icon3.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/Call.svg", "call"]);


    const account = new Component(footer__inner.root, 'div', ['contacts__inner']);
    new Component(account.root, 'p', null, 'Наши соц сети');
    // const account__ul = new Component(account.root, 'ul');
    // const account__li = new Component(account__ul.root, 'div', ["footer__li"]);
    const icon1 = new Component(account.root, 'a', ["icon1__a"], null, ["href"], ["#"]);
    new Component(icon1.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/vk.svg", "vk"]);
    const icon2 = new Component(account.root, 'a', ["icon2__a"], null, ["href"], ["#"]);
    new Component(icon2.root, 'img', ["icons__footer"], null, ["src", "alt"], ["./assets/Icons/tg.svg", "tg"]);



    const ssik = new Component(container.root, 'div', ['ssik__inner']);;
    // new Component(ssik__li.root, 'a', null, "GitHub", ["href"], ["https://github.com/Darya3em3/pizzeria-app"]);
    new Component(ssik.root, 'p', null, "© pizzeria, 2023");
    new Component(ssik.root, 'p', null, "Бессилко Дарья, ЭМ-3");
  }
}