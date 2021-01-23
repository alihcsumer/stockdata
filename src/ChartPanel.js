import React, { useEffect,useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import {
    selectCurrentCompany,getTimeSeries,
    selectTimeSeries,selectDataStatus
} from './reducers/companySlice';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';
import * as d3 from 'd3';

import 'rc-slider/assets/index.css';
import { Range, createSliderWithTooltip } from 'rc-slider'
const Ranger = createSliderWithTooltip(Range);

export default function ChartPanel() {

    const currentCompany = useSelector(selectCurrentCompany);
    const timeSeries = useSelector(selectTimeSeries);
    const dataStatus = useSelector(selectDataStatus);

    const [company,setCompany] = useState();
    const [timeSeriesData,setTimeSeriesData] = useState();
    const [minmax,setMinMax] = useState();

    const dispatch = useDispatch();

    useEffect(()=>{
      
        setCompany(currentCompany);
       
        if(currentCompany && currentCompany.id)
        {
        dispatch(getTimeSeries(currentCompany.id));
        }
     
    },[currentCompany])

    useEffect(()=>{
      if(timeSeries)
    {  
      setMinMax({min: timeSeries[0].date,max: timeSeries[timeSeries.length-1].date})
   
    }
    
      setTimeSeriesData(timeSeries)
     
    },[timeSeries])

    const buildChart = () => {
   
if( dataStatus!=="loading" && timeSeriesData  )
{

    return (  <ResponsiveContainer  width="95%" height="80%">
      <LineChart
      width={100}
      hieght={100}
        data={timeSeriesData}
        margin={{
          top: 10, right: 10, left: 10, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  tickMargin ="10"   scale="time" dataKey="date"  tickFormatter={d3.timeFormat('%B %Y')}   />
        <YAxis />
        <Tooltip  labelFormatter={d3.timeFormat('%b %d %Y')}  />
        <Legend />
        <Line type="monotone" name="Close Price"  stroke="#18A657"  dataKey="closing" dot={false}    />
      </LineChart>
      </ResponsiveContainer>
    );
      }
    }


    const handleOnAfterChange =(val) => {
     
    setTimeSeriesData(timeSeries.filter(item => item.date >= val[0] && item.date <= val[1]));
    }

    const buildSlider = () => {
   
      if( dataStatus!=="loading" && timeSeriesData  )
      { 
      
          return (  
            <Ranger className="range" defaultValue={[minmax.min,minmax.max]} min={minmax.min} 
            onAfterChange = {handleOnAfterChange}
            max={minmax.max} 
            tipFormatter={value =>
           { var formatTime = d3.timeFormat('%B %Y');
              return  formatTime(value); 
           }
          }
            tipProps={
              {
                visible: true
              }
            }
            />
     
          );
            }
          }
    

    return (
        <div className="chartcontainer">
          {company && dataStatus!=="loading"?<h1>{company.id}</h1>:""}
        {dataStatus==="loading"? <div className="loading"><h2>Loading...</h2></div>  :""}
        {buildChart()}
        {buildSlider()}
       </div>
    );
}