import React, {FC} from 'react'
import {Grid, Autocomplete, TextField, Box } from '@mui/material';
import { observer } from 'mobx-react';
import realMoney from '../../stores/realMoney';

type SelectCountry = {
  value: object;
  setValue: (data: any) => void;
  label: string;
}

type flag = {
  png: string
}

type name = {
  common: string
}

type TOption = {
  flags: flag;
  currencies: string[];
  name: name;
}

const SelectCountry:FC<SelectCountry> = observer( ({ value, setValue, label}) => {

  const {dataCountry} = realMoney
  const dataFilter: TOption[] = dataCountry.filter(item => 'currencies' in item)
  const dataCountries = dataFilter.map(item => {
      const countries = {
        flag: item.flags.png,
        currencies: Object.keys(item.currencies),
        name: item.name.common
      }
      return countries
  })

return (
  <Grid item xs={12} md={3}>
      <Autocomplete
          value={value}
          onChange={(e, newValue) => {  
            setValue(newValue)
          }}
          disableClearable
          options={dataCountries}
          getOptionLabel={(option: any ) => `${option.currencies[0]} - ${option.name}` }
          renderOption={(props, option: any) => (
              <Box component="li" {...props}>
                <img
                  width="20"
                  src={`${option.flag}`}
                  alt=""
                  style={{marginRight: '13px'}}
                />
                <span>{option.currencies[0]} - {option.name} </span>
              </Box>
            )}
          isOptionEqualToValue={(option: any, value: any) => option.name == value.name}
          renderInput={(params) => (
              <TextField
                {...params}
                label={label}

              />
            )}
      />
  </Grid>
)
})

export default SelectCountry