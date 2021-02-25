import 'keen-slider/keen-slider.min.css';
import {useKeenSlider} from 'keen-slider/react';
import Image from "next/image";

export default function News() {
    const [sliderRef, slider] = useKeenSlider({
        loop: true,
    });


    return <div ref={sliderRef} className="keen-slider news-slider">
        <div className="keen-slider__slide">
            <div className="keen-slider__slide__wrapper">
                <Image src="/news/bg.jpg" objectFit="cover" layout="fill" alt="Новости"/>
            </div>
        </div>
        <div className="keen-slider__slide">
            <div className="keen-slider__slide__wrapper">
                <Image src="/news/bg.jpg" objectFit="cover" layout="fill" alt="Новости"/>
            </div>
        </div>
        <div className="keen-slider__slide">
            <div className="keen-slider__slide__wrapper">
                <Image src="/news/bg.jpg" objectFit="cover" layout="fill" alt="Новости"/>
            </div>
        </div>
    </div>
}
