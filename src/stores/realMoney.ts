import { makeAutoObservable } from "mobx";
import axios from 'axios';
import { TRealMoney } from "../types";

class RealMoney {
    fromCurrent: TRealMoney = {flag: 'https://flagcdn.com/w320/it.png', currencies: ['EUR'], name: 'Italy'}
    toCurrent: TRealMoney = {flag: 'https://flagcdn.com/w320/us.png', currencies: ['USD'], name: 'United States'}
    firstAmount = ''
    dataCountry= []
    resultCurrency = 0

    constructor() {
        makeAutoObservable(this)
    }

    setFromcurrency = (data: TRealMoney) => {
       this.fromCurrent = data
    }

    setTocurrency = (data: TRealMoney) => {
        this.toCurrent = data
    }

    setFirstAmount = (money: string) => {
        this.firstAmount = money
    }

    setDataCountry = (currencies: any) => {
        this.dataCountry = currencies
    }

    setResultCurrency = (currencies: number) => {
        this.resultCurrency = currencies
    }

    fetchSelectData = async () => {
        const response = await axios('https://restcountries.com/v3.1/all')
        this.dataCountry = response.data
    }

    fetchConvertValue = async () => {
        const codeFromCurrency = this.fromCurrent.currencies[0]
        const codeToCurrency = this.toCurrent.currencies[0]

        if(this.firstAmount) {
            axios.get('https://api.freecurrencyapi.com/v1/latest', {
              params: {
                apikey: 'FU3euSfJ9SreMvXu3Dvm4RIwigCIuyMJGW6Nhj3h',
                base_currency: codeFromCurrency,
                currencies: codeToCurrency
              },
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
            })
            .then(response => this.setResultCurrency(response.data.data[codeToCurrency]))
            .catch(error => console.log(error))
          }
    }

}

export default new RealMoney()