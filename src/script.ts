import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { MainPage } from './Pages/MainPage';
import './style.scss';

const body = document.body;

class App {
    constructor(parrent: HTMLElement) {
      const wrap = new Component(body, 'div', ["wrapper"]);
      new Header(wrap.root);
      new MainPage(wrap.root);
      new Footer(wrap.root);
    }
  }
  
  declare global {
    interface Window {
      app: App;
    }
  }
  window.app = new App(document.body);


/*import "./style.scss";*/
/*import { Component } from "./Abstract/Component";*/
/*
const addButton = new Component(body, "button", null, "Отобразить");
const removeButton = new Component(body, "button", null, "Удалить");
const paragraph = new Component(body, "p", null, "Это параграф.");

addButton.root.addEventListener("click", () => {
    paragraph.render();
});

removeButton.root.addEventListener("click", () => {
    paragraph.remove();
});*/