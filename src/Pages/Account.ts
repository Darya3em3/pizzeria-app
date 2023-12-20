import compareAsc from "date-fns/compareAsc";
import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";
import { CardHistory } from "../Common/CardHistory";
import { Graph } from "../Common/Graph";

export class Account extends Component {
  divAuthorization: Component;
  divAccount: Component;
  divHistory: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', []);
    this.divAuthorization = new Component(this.root, 'div', ['authorization']);
    new Component(this.divAuthorization.root, 'p', ['page__title'], 'Авторизация');
    new Component(this.divAuthorization.root, 'img', ['authorization__img'], null, ['src', 'alt'], ['./assets/google.png', 'google']);
    const authIn = new Component(this.divAuthorization.root, 'input', ['auth__btn'], null, ['type', 'value'], ['button', 'Авторизироваться']);
    authIn.root.onclick = () => {
      this.services.authService.authWidthGoogle();
    }
    this.divAccount = new Component(this.root, 'div', ['account']);
    this.Authorization();
    new Component(this.divAccount.root, 'p', ['page__title'], 'Ваши заказы');
    const authFrom = new Component(this.divAccount.root, 'input', ['auth__btn'], null, ['type', 'value'], ['button', 'Выйти из аккаунта']);
    authFrom.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
    this.divHistory = new Component(this.divAccount.root, 'div', ["account__history"])
    new Component(this.divHistory.root, 'p', ["account__title"], "История заказов");
    const user = services.authService.user;
    const divRecord = new Component(this.divHistory.root, 'div', [])
    services.dbService.getAllHistory(user).then((historys) => {
      this.putHistoryOnPage(divRecord, historys);
    });
    const divGraph = new Component(this.divAccount.root, "div", ["stat__graph"]);
    const graph = new Graph(divGraph.root);

    services.dbService.getAllHistory(user).then((historys) => {
      graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
      graph.graphik.update();
    });
    services.dbService.addListener('addInHistory', (history) => {
      const user = services.authService.user;
      services.dbService.getAllHistory(user).then((historys) => {
        graph.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
        graph.graphik.update();
      });
    });

    services.dbService.addListener('addInHistory', (history) => {
      this.putHistoryOnPage(divRecord, [history as TDataHistory]);
    });
  }
  Authorization() {
    const user = this.services.authService.user;
    if (user) {
      this.divAuthorization.remove();
      this.divAccount.render()
    } else {
      this.divAuthorization.render();
      this.divAccount.remove()
    }
  }
  putHistoryOnPage(teg: Component, historys: TDataHistory[]) {
    historys.forEach((history) => {
      new CardHistory(teg.root, this.services, history);
    });
  }
}