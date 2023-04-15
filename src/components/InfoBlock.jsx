import {memo, useEffect, useState} from "react";
import {SimpleModal} from "./Helpers/Modal";
import {useSelector} from "react-redux";
import {STATUS} from "../redux/dotaSlice";
import {useNavigate} from "react-router-dom";
import copy from 'copy-to-clipboard'


const InfoBlock = memo(({nickname, hero, responseData, patch, url}) => {
    const [modalActive, setModalActive] = useState(false)
    const loading = useSelector(state => state.dota.loading)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading === STATUS.FAILED) {
            setModalActive(true)
        }
    }, [loading])
    useEffect(() => {
        if (hero.id === '') navigate('/')
    }, [])

    const ptch = patch.replace(/[^.\d]/g, '').split('')

    if (ptch.length > 4) ptch.splice(4, 0, '__')
    if (ptch.length > 9) ptch.splice(9, 0, '__')

    const handleCopyClick = () => {
        copy(url)
    }
    return (
        loading === STATUS.FAILED ? <SimpleModal
                active={modalActive}
                onConfirmCLick={() => {
                    navigate('/')
                }}
                value={'Info not found =('}
                onActiveModalClick={() => {
                    navigate('/')
                }}
            /> :
            <div className="container">
                <div className="info-block">
                    <h3>{nickname} {hero} {ptch}</h3>
                    <div className="url-block">
                        <p>{url}</p>
                        <button className="button" onClick={handleCopyClick}>Copy Link
                        </button>
                    </div>
                    {
                        <textarea autoFocus defaultValue={`${responseData.nickname}
wins: ${responseData.wins}
losses: ${responseData.losses}
total: ${responseData.total}
win rate: ${responseData.winrate.toFixed(2)}
kills: ${responseData.kills.toFixed(2)}`} name="info" id="" cols="48" rows="20"/>
                    }
                </div>
            </div>
    )
})

export default InfoBlock