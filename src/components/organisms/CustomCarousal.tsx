import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FullImgCard from '../molecules/FullImgCard';

export interface CarousalCardTypes {
   imageUrl: string;
   title: string;
}

interface CustomCarouselProps {
    data: CarousalCardTypes[]
}
const CustomCarousel: React.FC<CustomCarouselProps> = ({ data }) => {
        return (
            <Carousel>
                {
                    data.map((_item: CarousalCardTypes, index:number ) => {
                        return <FullImgCard key={index} {..._item}/>
                    })
                }
            </Carousel>
        );
    
};

export default CustomCarousel;