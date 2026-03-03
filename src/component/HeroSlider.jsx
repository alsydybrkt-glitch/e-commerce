import { Link, useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

function HeroSlider() {
  const navigate = useNavigate();
  const handleShopNowClick = () => {
    navigate("/shop");
  };
  return (
    <div className="heroSlider">
      <div className="container">
        <Swiper
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>
              <h3>
                Microsoft XBox <br /> 360 Controller
              </h3>
              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>
              <Link to="/shop" onClick={handleShopNowClick} className="btn">
                Shop Now
              </Link>
            </div>
            <img
              src="/src/React Ecommerce Reda Tech/img/banner_Hero1.jpg"
              alt="hero1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>
              <h3>
                Microsoft XBox <br /> 360 Controller
              </h3>
              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>
              <Link onClick={handleShopNowClick} to="/" className="btn">
                Shop Now
              </Link>
            </div>
            <img
              src="/src/React Ecommerce Reda Tech/img/banner_Hero2.jpg"
              alt="hero1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>
              <h3>
                Microsoft XBox <br /> 360 Controller
              </h3>
              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>
              <Link onClick={handleShopNowClick} to="/" className="btn">
                Shop Now
              </Link>
            </div>
            <img
              src="/src/React Ecommerce Reda Tech/img/banner_Hero3.jpg"
              alt="hero1"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default HeroSlider;
