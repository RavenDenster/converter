import { makeAutoObservable } from "mobx"
import { TCoin, TSelectedCoin } from "../types";


class Converter {
    selectedCoin: TSelectedCoin = {
        name: '',
        price: 0
    }
    selectInCoin = ''
    selectOutCoin = 'USD'

    constructor() {
        makeAutoObservable(this)
    }

    setSelectedCoin = (coin: TCoin) => {
        this.selectedCoin = {
            name: coin.name,
            price: coin.price
        }
    }

    setSelectOutCoin = (value: string) => {
        this.selectOutCoin = value
    }

    setNewsetSelectInCoin = () => {
        this.selectInCoin = this.selectedCoin.name
    } 

    setSelectInCoin = (value: string) => {
        this.selectInCoin = value
    }

}

export default new Converter()