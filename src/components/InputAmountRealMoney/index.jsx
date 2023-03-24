import React from 'react'
import {Grid, InputAdornment, TextField} from '@mui/material';
import { observer } from 'mobx-react';
import realMoney from '../../stores/realMoney';


const InputAmountRealMoney = observer(() => {

  const {firstAmount, setFirstAmount} = realMoney
 
  return (
    <Grid item xs={12} md>
      <TextField 
        value={firstAmount}
        onChange={e => setFirstAmount(e.target.value)}
        label='Amount'
        fullWidth
        InputProps={{
          type: 'number',
          startAdornment: <InputAdornment position='start'>$</InputAdornment>
        }}
      />
    </Grid>
  )
})

export default InputAmountRealMoney
