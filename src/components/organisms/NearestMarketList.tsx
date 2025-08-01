import React from "react";
import Card from "../molecules/Card";

const NearestMarketList: React.FC = () => {
    const markets = [
        { 
            imageUrl: "https://cms.patrika.com/wp-content/uploads/2018/03/30/bhamashah_mandi_gate_1.jpg", 
            title: "Bhamasha mandi", 
            distance: "20 km",
            id: 1, 
        },
        {
            imageUrl: "https://chaloghumane.com/wp-content/uploads/2021/09/Bundi.jpg",
            title: "Kuwarti mandi",
            distance: "18 km",
            id: 2, 
        }, ,
    ];

    return (
        <div className="max-w-4xl mx-auto sm:px-6 md:px-8 space-y-4">
            {markets.map((market, index) => (
                <Card key={index} {...market}/>
            ))}
        </div>
    );
};

export default NearestMarketList;
