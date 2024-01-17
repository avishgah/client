import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import './page.css'
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../store/actions/actionType";
import { useNavigate } from "react-router-dom";

const ChooseStation = () => {
    const [selectPoin, setSlectedPoint] = useState(null)
    const nav = useNavigate();
    const [mapers, setMapers] = React.useState([])
    const [currentstation, setCurrents] = React.useState(null)
    const dispatch = useDispatch();

    //נותן לי את כל התחנות הפעילות ומסדר אותם לפי מרחק
    useEffect(() => {
        axios.get('https://localhost:7207/api/Station/GetStationListWhereTrue')
            .then(res => {
                console.log(res)
                setMapers(res.data)
                setCurrents(res.data[0]); dispatch({
                    type: type.CURRENT_STATION,
                    payload: res.data[0]
                })
                let homePos = {}
                res.data.filter(x => x.count > 0).forEach((element, i) => {
                    const google = window.google;
                    console.log(element)
                    const markerPos = { lat: element.lat, lng: element.lng };
                    console.log(markerPos)
                    if (i == 0) {

                        homePos = markerPos;
                    }
                    else {
                        if (homePos && markerPos) {
                            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(homePos, markerPos);
                            console.log(distanceInMeters, "distanceInMeters");
                        }
                    }
                });
            }).catch(err => console.log(err))
    }, [])



    const submit = () => {
        console.log("kk")
        for (var i = 0; i < mapers.length; i++) {
            if (mapers[i].id == selectPoin) {
                setCurrents(mapers[i])
                console.log("llolkk")
                dispatch({
                    type: type.CURRENT_STATION,
                    payload: mapers[i]
                })
            }
        }


        nav('/introduc');

    }
 
    return (<>
        <div style={{ marginTop: "90px" }}>
            <h1 id="h1" >בחירת תחנה</h1>
            <select id="select"
                onChange={({ target }) => setSlectedPoint(target.value)}>
                {mapers.map(marker => <option id="option" selected={selectPoin === marker.id} value={marker.id}>{marker.name} {marker.location}</option>)}
            </select>
            <br></br><br></br><br></br>

            <Button type="submit" id="con" onClick={() => submit()}>המשך</Button>
        </div>
    </>)
}

export default ChooseStation;