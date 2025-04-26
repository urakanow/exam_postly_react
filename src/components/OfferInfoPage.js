import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import '../App.css';
import { Link } from 'react-router-dom';


function OfferInfoPage({ offerData }) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    
    const img = cld
          .image('cld-sample-5')
          .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
    
    return ( 
        <div className="offer-block">
            <Link to={""}>
                {offerData.title}
                {offerData.price}
                <AdvancedImage cldImg={img}/>
            </Link>
        </div>
    );
}

export default OfferInfoPage;