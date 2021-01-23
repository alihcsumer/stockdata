
import FilterSuggest from 'filter-suggest'
import 'filter-suggest/es/index.css'
import React, { useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {
    selectCompanyList,
    companySelected
} from './reducers/companySlice';


export default function LeftPanel() {
    const companyList = useSelector(selectCompanyList);

    const filterItems = (inputValue) => companyList.filter(it => it.primary.indexOf(inputValue.toUpperCase()) > -1)
    const [inputValue, setInputValue] = useState('')
    const sortedItems = inputValue ?  filterItems(inputValue): []
    const dispatch = useDispatch()
    return (
        <div className="leftcontainer">
       <FilterSuggest
      inputValue={inputValue}
      label='Type to search...'
      onInputValueChange={setInputValue}
      onSelect={item => {
          
          dispatch(companySelected(item))
      }}
      items={sortedItems}
    />
    </div>
    );
}