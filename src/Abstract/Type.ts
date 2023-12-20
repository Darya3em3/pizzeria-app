import { Timestamp } from "firebase/firestore";
import { AuthService } from "../Services/AuthService";
import { DBService } from "../Services/DBService";
import { LogicService } from "../Services/LogicService";

export type TServices = {
  authService: AuthService;
  logicService: LogicService;
  dbService: DBService;
}
export type TCriteria = {
  price: string,
  weight: string
}
export type TGood = {
  name: string,
  price: number,
  weight: number,
  url: string,
  id: string
}
export type TGoodBasket = {
  good: TGood,
  count: number
}

export type TDataUser = {
  name: string,
  fotoUrl: string,
  email: string,
  // basket: ;
  basket: TGoodBasket[];
}
export type TDataBasket = {
  summa: number,
  count: number
}
export type TDataHistory = {
  basket: TGoodBasket[],
  dataBasket: TDataBasket,
  data: Timestamp,
  id: string
}
export type TDataGraph = {
  x: Date,
  y: number,
}