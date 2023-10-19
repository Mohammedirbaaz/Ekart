import React from 'react';
import '../../Styles/CardView.css'
import { useNavigate } from "react-router-dom";

function CardView(props){
    const navigate = useNavigate();
    return(
        <div className='card-view' onClick={()=>{
            var tem=props.links.toLowerCase();
            tem=tem.replace(/ +/g, "");;
            navigate(tem);
            window.location.href=window.location.href;
            }}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiE-pBEpbTI5XQKqa845zQ2sQEV-CeED1vuA&usqp=CAU'/>
            <p>{props.name}</p>
        </div>
    )
}

export default CardView;