import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { Observer } from "../Abstract/Observer";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { TCriteria, TDataBasket, TDataGraph, TDataHistory, TDataUser, TGood, TGoodBasket } from "../Abstract/Type";

export class DBService extends Observer {
  public db: Firestore = getFirestore(this.DBFirestore);

  dataUser: TDataUser | null = null;

  dataBasket: TDataBasket = {
    summa: 0,
    count: 0
  };

  constructor(private DBFirestore: FirebaseApp) {
    super();
  }

  async getDataUser(user: User | null): Promise<void> {
    if (user === null) return;

    const docRef = doc(this.db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.dataUser = docSnap.data() as TDataUser;
      // console.log(docSnap.data());
    } else {
      const data = {
        email: user.email,
        name: user.displayName,
        fotoUrl: user.photoURL,
        basket: [],
      };
      await setDoc(doc(this.db, "users", user.uid), data);
      const docSetSnap = await getDoc(docRef);
      this.dataUser = docSetSnap.data() as TDataUser || null;
      console.log("create documemt");
    }
  }
  async getAllGoods(criteria: TCriteria): Promise<TGood[]> {
    const crit = [];
    // if (criteria.category != 'all') crit.push(where('category', '==', criteria.category));
    if (criteria.price == 'up') {
      crit.push(orderBy('price', "asc"));
    } else {
      crit.push(orderBy("price", 'desc'));
    }
    if (criteria.weight == 'up') {
      crit.push(orderBy('weight', "asc"));
    } else {
      crit.push(orderBy("weight", 'desc'));
    }
    const q = query(collection(this.db, 'pizzas'), ...crit);
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    const flowers = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const flower = {
        name: data.name as string,
        price: data.price as number,
        weight: data.weight as number,
        url: url,
        id: doc.id
      };
      return flower;
    });
    return Promise.all(flowers);
  }
  async addGoodInBasket(user: User | null, good: TGood): Promise<void> {
    if (!user || !this.dataUser) return;

    const index = this.dataUser.basket.findIndex(el => el.good.id === good.id);
    if (index >= 0) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);

    const goodBasket = {
      good: good,
      count: 1
    } as TGoodBasket;

    newUser.basket.push(goodBasket);

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.calcDataBasket();
        this.dispatch('goodInBasket', goodBasket);
        this.dispatch('changeDataBasket', this.dataBasket);
      })
      .catch(() => { });
  }

  async changeGoodInBasket(user: User | null, goodBasket: TGoodBasket): Promise<void> {
    if (!user || !this.dataUser) return;

    const index = this.dataUser.basket.findIndex((el) => el.good.id === goodBasket.good.id);

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);
    newUser.basket[index] = goodBasket;

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.calcDataBasket();
        this.dispatch("changeDataBasket", this.dataBasket);
      })
      .catch(() => { });
  }

  async delGoodFromBasket(user: User | null, good: TGoodBasket): Promise<void> {
    if (!user || !this.dataUser) return;

    const newBasket = this.dataUser.basket.filter((el) => el.good.id !== good.good.id);

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);
    newUser.basket = newBasket;

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.calcDataBasket();
        this.dispatch('delGoodFromBasket', good.good.id);
        this.dispatch('changeDataBasket', this.dataBasket);
      })
      .catch(() => {

      })
  }
  calcCostGood(count: number, price: number): number {
    const cost = count * price
    return cost;
  }

  calcDataBasket() {
    if (!this.dataUser) return;
    let summa = 0;
    let count = 0;
    this.dataUser.basket.forEach(el => {//берем каждый элемент корзины
      summa += el.count * el.good.price;//находим сумму товара перемножив количество на цену
      count += el.count;
    });
    this.dataBasket.count = count;
    this.dataBasket.summa = summa;
  }
  async addBasketInHistory(user: User | null): Promise<void> {
    if (!user || !this.dataUser) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser)
    newUser.basket = [];

    const dataHistory = {
      basket: this.dataUser.basket,
      dataBasket: this.dataBasket,
      data: Timestamp.now()
    };

    await addDoc(collection(this.db, 'users', user.uid, 'history'), dataHistory)
      .then(async () => {
        await setDoc(doc(this.db, 'users', user.uid), newUser)
          .then(() => {
            if (!this.dataUser) throw "БД отсутствует";
            this.dataUser.basket.forEach((el) => {
              this.dispatch('delBookFromBasket', el.good.id);
            })
            this.dispatch('addInHistory', dataHistory)
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch('clearBasket');
            this.dispatch('changeDataBasket', this.dataBasket);
            this.calcCountDocsHistory(user);
          })
          .catch(() => { });
      })
      .catch(() => { });
  }
  async calcCountDocsHistory(user: User | null): Promise<void> {
    if (!user || !this.dataUser) return;

    const querySnapshot = await getDocs(collection(this.db, "users", user.uid, "history"));
    const count = querySnapshot.docs.length;
    let summa = 0;
    querySnapshot.docs.forEach(el => {
      summa += el.data().dataBasket.count;
    })
    this.dispatch('changeStat', count, summa);
  }
  async getAllHistory(user: User | null): Promise<TDataHistory[]> {
    if (!user || !this.dataUser) return [];
    const querySnapshot = await getDocs(collection(this.db, 'users', user.uid, 'history'));
    const rez = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TDataHistory;
      data.id = doc.id;
      return data;
    })
    return rez;
  }
  updateDataGraph(histories: TDataHistory[]): TDataGraph[] {
    const data = {} as Record<string, number>;
    histories.forEach((el) => {
      const dataString = el.data.toDate().toDateString();
      if (data[dataString]) {
        data[dataString] += el.dataBasket.count;
      } else {
        data[dataString] = el.dataBasket.count;
      }
    });
    const sortData = [];
    for (const day in data) {
      sortData.push({
        x: new Date(day),
        y: data[day]
      });
    }
    return sortData.sort(
      (a, b) => a.x.getMilliseconds() - b.x.getMilliseconds()
    );
  }
  async getUserHistoryData(): Promise<TDataHistory[]> {
    const usersQuerySnapshot = await getDocs(collection(this.db, 'users'));
    const result: TDataHistory[] = [];

    for (const userDoc of usersQuerySnapshot.docs) {
      const historyCollectionRef = collection(userDoc.ref, 'history');
      const historyQuerySnapshot = await getDocs(historyCollectionRef);

      console.log(`Данные пользователя с ID ${userDoc.id}:`);
      historyQuerySnapshot.forEach((historyDoc) => {
        const historyData = historyDoc.data() as TDataHistory;
        result.push(historyData);
      });
    }

    return result;
  }
}