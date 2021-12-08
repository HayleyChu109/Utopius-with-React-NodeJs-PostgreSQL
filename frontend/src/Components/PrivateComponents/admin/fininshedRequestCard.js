import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GetRequestStat } from '../../../Redux/adminRequest/action'
import { Card } from 'react-bootstrap'
import { FaCheck,FaHandsHelping } from 'react-icons/fa'
import {GiMagnifyingGlass} from 'react-icons/gi'
import {RiUserSearchLine} from 'react-icons/ri'

export function FinishedRequestCard(){
    const dispatch=useDispatch()
    const {stat}= useSelector(state =>state.adminRequestStore)
    const{reqStat}=stat
    let finish
    useEffect(() => {
       dispatch(GetRequestStat())
    }, [dispatch]);
    if(reqStat&&reqStat.length>0)
    {
        finish=reqStat.filter(item=>item.status==='completed')
        if(finish.length>0)
        {
            finish=finish[0].count
        }else{
            finish=0
        }
    }
    return(
        <>
            <Card>
              <p className="me-2 mt-2 text-end">Finished request</p>
              {finish&&isNaN(finish)===false?<p className="me-2 mt-2 text-end">{finish}</p>:<p className="me-2 mt-2 text-end">0</p>}
              
              <FaCheck className="dashboard-icon" />

            </Card>
        </>
    )
}
export function MatchedRequestCard(){
    const dispatch=useDispatch()
    const {stat}= useSelector(state =>state.adminRequestStore)
    const{reqStat}=stat
    let finish
    useEffect(() => {
       dispatch(GetRequestStat())
    }, [dispatch]);
    if(reqStat&&reqStat.length>0)
    {
        finish=reqStat.filter(item=>item.status==='matched')
        if(finish.length>0)
        {
            finish=finish[0].count
        }else{
            finish=0
        }
    }
    return(
        <>
            <Card>
              <p className="me-2 mt-2 text-end">Matched request</p>
              {finish&&isNaN(finish)===false?<p className="me-2 mt-2 text-end">{finish}</p>:<p className="me-2 mt-2 text-end">0</p>}
              
              <FaHandsHelping className="dashboard-icon" />

            </Card>
        </>
    )
}
export function OpenRequestCard(){
    const dispatch=useDispatch()
    const {stat}= useSelector(state =>state.adminRequestStore)
    const{reqStat}=stat

    let finish
    useEffect(() => {
       dispatch(GetRequestStat())
    }, [dispatch]);
    if(reqStat&&reqStat.length>0)
    {
        finish=reqStat.filter(item=>item.status==='open')
        if(finish.length>0)
        {
            finish=finish[0].count
        }else{
            finish=0
        }
    }
    return(
        <>
            <Card>
              <p className="me-2 mt-2 text-end">Open request</p>
              {finish&&isNaN(finish)===false?<p className="me-2 mt-2 text-end">{finish}</p>:<p className="me-2 mt-2 text-end">0</p>}
              
              <RiUserSearchLine className="dashboard-icon" />

            </Card>
        </>
    )
}