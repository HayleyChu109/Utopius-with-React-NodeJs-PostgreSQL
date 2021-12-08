import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {GetRequestStat} from '../../../Redux/adminRequest/action'

ChartJS.register(ArcElement, Tooltip, Legend);


export const RequestTypeCard=()=>{
    const dispatch=useDispatch()
    const {stat}=useSelector((state)=>state.adminRequestStore)
    const {reqStat}=stat
    useEffect(()=>{
        dispatch(GetRequestStat())
    },[dispatch])
    var label
    var dataset
    const options={
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Request type'
          }
        }
      }
    
    if(reqStat&&reqStat.length>0)
    {
        label=reqStat.map(item=>item.status)
        dataset = {
            labels: label,
            datasets: [
              {
                label: 'percentage',
                data: reqStat.map(item=>item.count),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
               
                ],
                borderWidth: 1,
              },]
            }
    }
    return(
        <>
       {reqStat&&reqStat.length>0?<Doughnut options={options} data={dataset} />:null}

        </>
    )
}