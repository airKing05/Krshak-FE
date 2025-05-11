import React, { useEffect, useState } from "react";
import NearestMarketList from "../organisms/NearestMarketList";
import ProductCategories from "../organisms/ProductCategories";
import Text from "../atoms/Text";
import LocationIcon from '../../assets/icons/location.svg';
import Image from "../atoms/Image";

const HomePageTemplate: React.FC = () => {
      const [cityName, setCityName] = useState<string>('')

    // Step 2: Get city name 
    function getCity(coordinates) {
        var xhr = new XMLHttpRequest();
        var lat = coordinates[0];
        var lng = coordinates[1];

        const location_token = 'pk.372bc1e88593d5294bb0ebfae6ba67aa';
        // Paste your LocationIQ token below. 
        xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${location_token}&lat=` + 
            lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);

        function processRequest() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var city = response.address.city;
                setCityName(city);
                console.log("city----", city);
                return;
            }
        }
    } 

    function getCoordintes() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            var lat = crd.latitude.toString();
            var lng = crd.longitude.toString();
            var coordinates = [lat, lng];
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            getCity(coordinates);
            return;

        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }


    const fetchMandiData = () => {
        const url = '/resource/9ef84268-d588-465a-a308-a864a43d0070';
        const apiKey = '579b464db66ec23bdd0000019d440267cc2a4b69502c47bb07a153d5';
    }


    useEffect(() => {
        getCoordintes();
    }, [])
    
    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-2 items-center">
                <Image src={LocationIcon} className="w-6 h-6" alt="icon"/>
                <Text variant="h3" className="">
                    {cityName}
                    {/* Kuwarti Mandi, Bundi (Raj.) */}
                    </Text>
            </div>
            
            <Text variant="h3" className="">Available Categories</Text>
            <ProductCategories />

            <Text variant="h3" className="">Nearby Market</Text>
            <NearestMarketList />
        </div>
    );
};

export default HomePageTemplate;
