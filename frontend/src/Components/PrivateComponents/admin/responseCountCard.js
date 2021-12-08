import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GetRequestList } from '../../../Redux/adminRequest/action'
import { Card } from 'react-bootstrap'
import { FaPeopleCarry } from 'react-icons/fa'


export function ResponseRateCard(){
    const dispatch=useDispatch()
    const {stat}= useSelector(state =>state.adminRequestStore)
    const {reqMatched}=stat
    useEffect(()=>{
        dispatch(GetRequestList())
    },[dispatch])
    let rate
    if(reqMatched&&reqMatched.length>0)
    {
     rate=reqMatched.map(item=>item.matched/item.requiredPpl*100)
     rate=rate.reduce((a,b)=>a+b/rate.length,0)
     rate=rate.toFixed(1)
    }
    
    return(
        <>
            <Card>
              <p className="ms-2 mt-2 text-end text-wrap">Matched Response</p>
              {rate?<p className="me-2 mt-2 text-end">{rate}%</p>:<p className="me-2 mt-2 text-end">0%</p>}
              
              <FaPeopleCarry className="dashboard-icon" />

            </Card>
        </>
    )
}