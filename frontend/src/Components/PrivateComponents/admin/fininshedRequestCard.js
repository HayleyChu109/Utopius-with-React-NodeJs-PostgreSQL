import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GetRequestStat } from '../../../Redux/adminRequest/action'
import { Card } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'


export function FinishedRequestCard(){
    const dispatch=useDispatch()
    const {stat}= useSelector(state =>state.adminRequestStore)
    let finish
    useEffect(() => {
       dispatch(GetRequestStat())
    }, [dispatch]);
    if(stat&&stat.length>0)
    {
        finish=stat.filter(item=>item.status==='completed')
        if(finish.length>0)
        {
            finish=finish[0].count
        }else{
            finish=0
        }
        console.log(stat.filter(item=>item.status==='completed'))
    }
    return(
        <>
            <Card>
              <p className="me-2 mt-2 text-end">Finished request</p>
              {finish&&isNaN(finish)===false?<p className="me-2 mt-2 text-end">{finish}</p>:<p className="me-2 mt-2 text-end">0</p>}
              
              <FaCheck className="icon" />

            </Card>
        </>
    )
}