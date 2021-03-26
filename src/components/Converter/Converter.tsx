import React from 'react';
import {FormControl, InputLabel, Select} from "@material-ui/core";
import styled from "styled-components";
import {CurrencyList} from "../../../utils/types/types";


export function Converter({currencyList}: { currencyList: CurrencyList }) {
  const [rubValue, setRubValue] = React.useState<number>(0)
  const [currencyValue, setCurrencyValue] = React.useState<number>(0)
  const [currencyName, setCurrencyName] = React.useState<string>(currencyList ? Object.keys(currencyList)[0] : '')

  if (!currencyList) return null

  function changeValues(rubValue: number, currencyValue: number, currency: string) {
    setRubValue(rubValue)
    setCurrencyValue(currencyValue)
    setCurrencyName(currency)
  }

  return (
    <ConverterStyle>
      <FormControl>
        <Label htmlFor="demo-customized-textbox">Сумма в рублях</Label>
        <Input
          type="text"
          id="demo-customized-textbox"
          value={rubValue}
          onChange={(e) => {
            if (e.target.value && !isNaN(Number(e.target.value))) {
              const val = parseInt(e.target.value)
              // прикольная странность toFixed возвращает string. Почему?
              let currencyVal = val * (currencyName ? currencyList[currencyName] : 1)
              changeValues(val, Number(currencyVal.toFixed(2)), currencyName)
            } else {
              return changeValues(0, 0, currencyName)
            }
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel id="ff">Age</InputLabel>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          native
          value={currencyName}
          onChange={(e: any) => {
            const diff = currencyList[e.target.value] / currencyList[currencyName]
            const currencyVal = currencyValue * diff
            changeValues(rubValue, Number(currencyVal.toFixed(2)), e.target.value)
          }}
        >
          {Object.keys(currencyList).map(currency => {
            return <option key={currency} value={currency}>{currency}</option>
          })}
        </CustomSelect>
      </FormControl>

      <FormControl>
        <Label htmlFor="demo-customized-textbox">Сумма валюты</Label>
        <Input
          type="text"
          id="demo-customized-textbox"
          value={currencyValue}
          onChange={(e) => {
            if (e.target.value && !isNaN(Number(e.target.value))) {
              const val = parseInt(e.target.value)
              let rubVal = val / (currencyName ? currencyList[currencyName] : 1)
              changeValues(Number(rubVal.toFixed(2)), val, currencyName)
            } else {
              return changeValues(0, 0, currencyName)
            }
          }}
        />
      </FormControl>
    </ConverterStyle>
  );
}

const CustomSelect = styled(Select)`
  transform: none;
`

const ConverterStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Label = styled(InputLabel)`
  position: static;
  transform: none;
`

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 10px 26px 10px 12px;
  appearance: none;
  margin-top: 5px;

  &:focus {
    border-color: #80bdff;
  }
`

