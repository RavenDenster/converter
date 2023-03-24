import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import {InputAmountRealMoney, SelectCountry, SwitchCurrencyRealMoney}  from '../index';
import realMoney from '../../stores/realMoney';
import { observer } from 'mobx-react';
import { Item } from '../../styles';


const ConverterRealMoney = observer(() => {

  const {setFromcurrency, setTocurrency, fromCurrent, toCurrent, firstAmount, fetchSelectData, resultCurrency, fetchConvertValue} = realMoney

  useEffect(() => {
    fetchSelectData()
  }, [])

  useEffect(() => {
    fetchConvertValue()
  }, [firstAmount, fromCurrent, toCurrent])

  return (
    <Item>
      <Typography variant='h5' sx={{margin: '20px 0px 30px', textAlign: 'center'}}>Currency converter</Typography>
      <Grid container spacing={2}>
        <InputAmountRealMoney/>
        <SelectCountry value={fromCurrent} setValue={setFromcurrency} label='From'/>
        <SwitchCurrencyRealMoney/>
        <SelectCountry value={toCurrent} setValue={setTocurrency} label='To'/>
      </Grid>

      {firstAmount ? (
        <Box sx={{textAlign: 'left', marginTop: '1rem'}}>
          <Typography>{firstAmount} {fromCurrent.currencies} =</Typography>
          <Typography variant='h5' sx={{marginTop: '5px', fontWeight: 'bold'}}>
            {(resultCurrency * Number(firstAmount)).toFixed(2)} {toCurrent.currencies}
          </Typography>
        </Box>
      ) : ''}
    </Item>
  )
})

export default ConverterRealMoney
