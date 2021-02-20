import { useKeenSlider } from 'keen-slider/react';
import Image from "next/image";
import 'keen-slider/keen-slider.min.css'
export default function ImageGallery({images}) {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        initial: 1,
    });

    return <>
    <div ref={sliderRef} className="keen-slider">
        {images.map(image => (<div key={image.id} className="keen-slider__slide">  <Image  src={image.src} layout="fill" objectFit="cover" /></div>))}
    </div>
        </>
}
