import React from 'react'
import { CarousalCardTypes } from '../organisms/CustomCarousal';
import Text from '../atoms/Text';

const FullImgCard: React.FC<CarousalCardTypes> = ({imageUrl, title}) => {
  return (
      <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden">
          <img src={imageUrl} alt="image" className="w-full h-50 object-cover" />

          <div className="absolute bottom-0 left-0 w-full bg-opacity-20 text-white text-center py-3 px-4 mb-2">
              <Text variant='h2' className="text-4xl font-bold tracking-[10px]">{title}</Text>
          </div>
      </div>
  )
}

export default FullImgCard;