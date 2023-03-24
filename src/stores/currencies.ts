
import { TCoin, TCoinDiff } from "../types";
import axios from 'axios' 
import { makeAutoObservable } from "mobx";

class Currencies {
    items: TCoin[] = []
    diffObj: TCoinDiff = {}
    page = 0
    flag = true

    constructor() {
        makeAutoObservable(this)
    }

    setPage = (page: number) => {
        this.page = page
    }

    setItems = (items: TCoin[]): void => {
        if(this.flag) {
            this.diffObj = this.diffCurrencies(this.items, items).reduce((initObj: TCoinDiff, obj: TCoin) => {
                const newObj = items.find(o => o.name === obj.name)! 
                const oldObj: TCoin = this.items.find(itemObj => itemObj.name === newObj.name)!
                const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? 'green' : 'red'
                initObj[newObj.name] = color
                return initObj
            }, {})
        }
        this.items = items
        setTimeout(() => {
            this.diffObj = {}
        }, 15000)
    }

    fetchCoins = async () => {
      const { data } = await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&page=${this.page}`)
      const coins: TCoin[] = data.Data.map((coin: any) => {
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: coin.RAW.USD.PRICE.toFixed(3),
          volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
        }
        return obj
      })
      this.setItems(coins)
    }

    setFlag = (value: boolean) => {
        this.flag = value
    }

    diffCurrencies = (arr1: TCoin[], arr2: TCoin[]) => {
        return arr1.filter((obj, index) => {
            if (obj.price !== arr2[index].price) {
                return true
            }
            return false
        })
    }

}

export default new Currencies()