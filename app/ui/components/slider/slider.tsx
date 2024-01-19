import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import { Image } from "@crystallize/reactjs-components";
import { ChevronLeft, ChevronRight, Divide } from "react-feather";

export const Carousel = ({ images }: { images: any }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={130}
      naturalSlideHeight={125}
      totalSlides={images.length}
      step={1}
    >
      {/* <Slider style={{ "maxHeight": "420px" }}> */}
      <Slider className="max-h-72 sm:max-h-80 md:max-h-96">
        {images.map((image: any, index: number) => {
          return (
            <Slide index={index} key={image.url}>
              <div className="flex justify-center">
                <img src={image.url} alt="" className="max-w-xs sm:max-w-sm md:max-w-md" />
              </div>
              {/* <Image key={image.url} {...image} sizes="(max-width: 500px) 300px, 700px" className="w-full" /> */}
            </Slide>
          )
        })}
      </Slider>
      <div className="flex items-center justify-center">
        <ButtonBack className="btn-arrow reverse-arrow">
          <ChevronLeft size={16} />
        </ButtonBack>

        <div className="flex items-center justify-center">
          {images.map((image: any) => {
            return (
              <div key={image.url} className="w-1/4">
                <Image {...image} sizes="(max-width: 500px) 80px, 130px" className="w-full" />
              </div>
            )
          })}
        </div>

        <ButtonNext className="btn-arrow">
          <ChevronRight size={16} />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
}