import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import CompanyList from "../files/WIKI_PRICES.json";
import {getCompanyTimeSeries} from "../services/companyservice";

const formatCompanies = (companyList) => companyList.map(comp => { return { id: comp, primary: comp }});

export const getTimeSeries = createAsyncThunk('getTimeSeries', async (company) => {
 
  const response = await getCompanyTimeSeries(company);

    return response;
  }) 
  

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    value: {
       timeSeries : null,
       companyList : formatCompanies(CompanyList),
       selectedCompany : null,
       status : "idle"
    }
  },
  reducers: {
    companySelected: (state, action) => {
    
                 state.value.selectedCompany = action.payload;
        }
  },
  extraReducers:  { 
    [getTimeSeries.fulfilled] :(state, action) => {
  
      state.value.timeSeries = action.payload;
      state.value.status = 'idle'
      },
      [getTimeSeries.pending] :(state, action) => {
       
        state.value.status = 'loading'
        },
      }  

})
export const { companySelected } = companySlice.actions
export const selectTimeSeries = state => state.companies.value.timeSeries;
export const selectCompanyList= state => state.companies.value.companyList;
export const selectCurrentCompany = state => state.companies.value.selectedCompany;
export const selectDataStatus = state => state.companies.value.status;
export default companySlice.reducer

