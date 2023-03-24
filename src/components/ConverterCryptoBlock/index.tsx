import React, { FC, useReducer, useEffect, } from 'react'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import currencies from '../../stores/currencies';
import { Item } from '../../styles';
import converter from '../../stores/converter';
import { TAction, TReduceState } from '../../types';


const ConverterBlock:FC = observer(() => {

    const {selectInCoin, setSelectInCoin, setSelectedCoin, selectOutCoin, setSelectOutCoin} = converter
    const coins: string[] = currencies.items.map(coin => coin.name)
    const selectedCoin = converter.selectedCoin.price // крипта выбранная в певом инпуте
    const outPrice = currencies.items.find(obj => obj.name === selectOutCoin)?.price || currencies.items.find(obj => obj.name === selectInCoin)?.price // находим прайс крипты второго инпута
    
    const handleChange = (event: SelectChangeEvent) => {
      const TwoOptionSelectIntup =  currencies.items.find(obj => obj.name === event.target.value)!
      setSelectInCoin(event.target.value as string)
      setSelectedCoin(TwoOptionSelectIntup)
      state.value2 = ''
    };

    function reducer(state: TReduceState, action: TAction): TReduceState {
        switch (action.type) {
            case 'SET_VALUE':
                return {
                    ...state, 
                    [action.payload.name]: action.payload.value,
                    value2: String((Number(action.payload.value) * Number(state.selectedCoin) / state.outPrice).toFixed(3))
            }
            case 'SET_VALUE_DOL':
                return {
                    ...state, 
                    [action.payload.name]: action.payload.value,
                    value2: String((Number(action.payload.value) * state.outPrice).toFixed(3))
            }
            case 'SET_PRICES':
                return {
                    ...state, 
                    selectedCoin: action.payload.in,
                    outPrice: action.payload.out
            }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer<(arg1: TReduceState, actions: TAction) => any>(reducer, {
        value1: '',
        value2: '',
        selectedCoin,
        outPrice,
    })
    
    useEffect(() => {
        dispatch({
            type: 'SET_PRICES',
            payload: {
                in: selectedCoin,
                out: outPrice
            }
        })
    }, [selectedCoin, outPrice])

    useEffect(() => {
      state.value2 = ''
    }, [selectOutCoin])

    const onUpdateField = (name: string, value: string) => {
      if (selectOutCoin == 'USD') {
        dispatch({
          type: 'SET_VALUE_DOL',
          payload: {
              name, value
          }
        })
      } else {
        dispatch({
          type: 'SET_VALUE',
          payload: {
              name, value
          }
        })
      }
    }

  return (
    <> 
     <Item>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center'}}>
              <TextField
                value={state.value1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateField('value1', e.target.value)}
                label="Сумма"
                type='number'
                fullWidth
              />
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectInCoin}
                    label="Age"
                    onChange={handleChange}
                  >
                    {coins.map(coin =>
                        <MenuItem key={coin} value={coin}>{coin}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </Item>
          <Item sx={{marginBottom: '40px'}}>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center'}}>
              <TextField
                label="Сумма"
                value={state.value2}
                fullWidth
                type='number'
              />
              <Box sx={{ minWidth: 100 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectOutCoin}
                    defaultValue={'USD'}
                    label="Age"
                    onChange={e => setSelectOutCoin(e.target.value)}
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    {coins.map((coin, i) =>
                        <MenuItem key={coin} value={coin}>{coin}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </Item> 
    </>
  )
})

export default ConverterBlock
