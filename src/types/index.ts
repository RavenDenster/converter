export type TCoin = {
    name: string;
    fullName: string;
    imageUrl: string;
    price: number;
    volume24Hour: number;
}

export type TCoinDiff = {[key: string]: string}

export type TSelectedCoin = {
    name: string;
    price: number;
}

export type TRealMoney = {
    flag: string;
    currencies: string[];
    name: string
}


export type TReduceState = {
    value1: string
    value2: string
    selectedCoin: number
    outPrice: any
}

type TDataObjValue = {
  value: string
  name: string
}

type TDataObjPrice = {
  in: number
  out: number | undefined
}

interface TSetValueAction  {
    type: 'SET_VALUE'
    payload: TDataObjValue
}


interface TSetValueDolAction  {
  type: 'SET_VALUE_DOL'
  payload: TDataObjValue
}

interface TSetPricesAction  {
type: 'SET_PRICES'
payload: TDataObjPrice
}

export type TAction =  TSetPricesAction | TSetValueDolAction | TSetValueAction