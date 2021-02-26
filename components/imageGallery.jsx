import {useKeenSlider} from 'keen-slider/react';
import Image from "next/image";
import 'keen-slider/keen-slider.min.css'

const classNames = require('classnames');

export default function ImageGallery({images, activeGalleryImage, updateActiveGalleryImage}) {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        slidesPerView: 3, spacing: 10
    });

    return <>
        <div ref={sliderRef} className="keen-slider">
            {images.map(image => (<div key={image.id}
                                       onClick={() => updateActiveGalleryImage(image.id)}
                                       className={classNames('keen-slider__slide', {['keen-slider__slide__active']: image.id === activeGalleryImage})}>
                <Image src={image.src} layout="fill" objectFit="cover"/></div>))}
        </div>
    </>
}
