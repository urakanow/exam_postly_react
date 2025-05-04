import React, { useEffect, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import '../App.css';
import { Link } from 'react-router-dom';
import  { useParams } from 'react-router-dom';
import { Grid, Grow, ListItem } from '@mui/material';


function OfferElement({ offerData, linkUrl }) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dxvwnanu4' } });
    const [showDefaultImage, setShowDefaultImage] = useState(true);
    
    async function isImageLegit(){
        try {
            const response = await fetch(`https://res.cloudinary.com/dxvwnanu4/image/upload/${offerData.imageUrl}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'get',
            });

            if (response.status === 200) {
                console.log("image url is legit");
                setShowDefaultImage(false);
            }
            else{
                console.log("image url is shit")
            }
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        }
    }

    useEffect(() => {
        isImageLegit();
    }, [])
    
    
    const img = cld
    .image(offerData.imageUrl)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(250).height(250)); // Transform the image: auto-crop to square aspect_ratio
    
    return (
        <Grid size={Grow}>
            <ListItem >
                <Link className="offer-block" to={`${linkUrl}/${offerData.id}`}>
                    <p className='offer-text'>{offerData.title}</p><br />
                    {showDefaultImage ? <img src='default_image.jpg' style={{width: '250px', height: '250px', objectFit: 'cover', objectPosition: 'center'}}/>
                    : <AdvancedImage cldImg={img}/> }
                    <span className='offer-text'>{offerData.price}</span>
                </Link>
            </ListItem>
        </Grid>
    );
}

export default OfferElement;