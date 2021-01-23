import axios from 'axios';

const apiKey =  "E-63kJ9NsbQs4a4zhLLu";
async function getCompanyTimeSeries(comp)
{

    try {
        
        let result = await axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${comp}/data.json?api_key=${apiKey}`); 

          if(result.data )
          { 
        
              return  result.data.dataset_data.data.map(item => {return {date:Date.parse(item[0]),closing:item[1]}}).reverse();
            
          }
          else
          {
              throw("Not found");
          }

    } catch (e) {
        throw(e);
    } 



   


 
}

export {  getCompanyTimeSeries }