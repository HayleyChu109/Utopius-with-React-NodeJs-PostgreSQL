import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GetRequestList } from '../../../Redux/adminRequest/action'
import { Card } from 'react-bootstrap'
import { FaPeopleCarry } from 'react-icons/fa'


export function ResponseRateCard(){
    const dispatch=useDispatch()
    const {requestList}= useSelector(state =>state.adminRequestStore)
    useEffect(()=>{
        dispatch(GetRequestList())
    },[dispatch])
    let rate
    if(requestList&&requestList.length>0)
    {
     rate=requestList.map(item=>item.matched/item.requiredPpl*100)
     rate=rate.reduce((a,b)=>a+b/rate.length,0)
     rate=rate.toFixed(1)
    }
    
    return(
        <>
            <Card>
              <p className="me-2 mt-2 text-end">Matched Response Rate</p>
              {rate?<p className="me-2 mt-2 text-end">{rate}%</p>:<p className="me-2 mt-2 text-end">0%</p>}
              
              <FaPeopleCarry className="dashboard-icon" />

            </Card>
        </>
    )
}