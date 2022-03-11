import  {useEffect} from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

import HeaderDebate from '../../components/templates/HeaderDebate'
import Header from '../../components/templates/Header'

import * as DebateActions from '../../store/ducks/debate/actions'
import BodyDebate from '../../components/templates/BodyDebate';

export const getStaticProps: GetStaticProps = (context) => {
    const id = context.params?.id as string

    return {
        props: {id}
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
       paths: [{
           params: {
               id: '1'
           }
       }]        ,
       fallback: 'blocking'
    }
}

interface Props {
    id: string
}

const DebatePage: NextPage<Props> = ({id}) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.userReducer.user)

    useEffect(() => {
        if(user)
            dispatch(DebateActions.loadOneRequest(id, String(user.idUser)))
    }, [user]);        
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',            
            overflowY: 'scroll',
            height: 625
        }}>
            <Header />
            <HeaderDebate />
            <BodyDebate />
        </div>
    )
}

export default DebatePage