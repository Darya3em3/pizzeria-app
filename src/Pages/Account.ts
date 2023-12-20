import compareAsc from "date-fns/compareAsc";
import { collection, CollectionReference, DocumentReference, getDocs } from "firebase/firestore";
import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";
import { CardHistory } from "../Common/CardHistory";
import { CardRecord } from "../Common/CardRecord";
import { Graph } from "../Common/Graph";

export class Account extends Component {
  divAuthorization: Component;
  divAccount: Component;
  divHistory: Component;
  divUser: Component;
  divAdmin: Component;
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
    this.divUser = new Component(this.divAccount.root, 'div', ['account__user']);
    new Component(this.divUser.root, 'p', ['page__title'], 'Ваши заказы');
    const authFrom = new Component(this.divUser.root, 'input', ['auth__btn'], null, ['type', 'value'], ['button', 'Выйти из аккаунта']);
    authFrom.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
    this.divHistory = new Component(this.divUser.root, 'div', ["account__history"])
    new Component(this.divHistory.root, 'p', ["account__title"], "История заказов");
    const user = services.authService.user;
    const divRecord = new Component(this.divHistory.root, 'div', [])
    services.dbService.getAllHistory(user).then((historys) => {
      this.putHistoryOnPage(divRecord, historys);
    });
    const divGraph = new Component(this.divUser.root, "div", ["stat__graph"]);
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

    this.divAdmin = new Component(this.divAccount.root, 'div', ['account__admin']);
    this.userAdmin();
    new Component(this.divAdmin.root, 'p', ['page__title'], 'Ваши заказы');
    const authFrom1 = new Component(this.divUser.root, 'input', ['auth__btn'], null, ['type', 'value'], ['button', 'Выйти из аккаунта']);
    authFrom1.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
    this.loadUserHistoryData();
    const divGraph1 = new Component(this.divAdmin.root, "div", ["stat__graph"]);
    const graph1 = new Graph(divGraph1.root);

    services.dbService.getAllHistory(user).then((historys) => {
      graph1.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
      graph1.graphik.update();
    });
    services.dbService.addListener('addInHistory', (history) => {
      const user = services.authService.user;
      services.dbService.getAllHistory(user).then((historys) => {
        graph1.graphik.data.datasets[0].data = services.dbService.updateDataGraph(historys);
        graph1.graphik.update();
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
  userAdmin() {
    const user = this.services.authService.user;
    const admin = this.services.logicService.emailAdmin;
    if (user && user.email === admin) {
      this.divAdmin.render();
      this.divUser.remove();
    } else {
      this.divAdmin.remove();
      this.divUser.render();
    }
  }
  async loadUserHistoryData() {
    const usersQuerySnapshot = await getDocs(collection(this.services.dbService.db, 'users'));

    for (const userDoc of usersQuerySnapshot.docs) {
      const historyCollectionRef = collection(userDoc.ref, 'history');
      const historyQuerySnapshot = await getDocs(historyCollectionRef);

      // console.log(`Данные пользователя с ID ${userDoc.id}:`);
      const historys: TDataHistory[] = [];
      historyQuerySnapshot.forEach((historyDoc) => {
        const historyData = historyDoc.data() as TDataHistory;
        // console.log(historyData);
        historys.push(historyData);
      });

      const userDiv = new Component(this.divAdmin.root, 'div', ['admin__user']);

      new Component(userDiv.root, 'span', ['admin__name'], `${userDoc.data().name}`);
      this.putHistorysOnPage(userDiv, historys, userDoc.ref, historyCollectionRef);
    }
  }
  async putHistorysOnPage(teg: Component, historys: TDataHistory[], userDocRef: DocumentReference, historyCollectionRef: CollectionReference) {
    historys.forEach((history) => {
      const cardRecord = new CardRecord(teg.root, this.services, history);

    });
  }
}