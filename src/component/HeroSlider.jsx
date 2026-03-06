import { Link, useNavigate } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
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
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>

              <h3>
                Microsoft XBox <br />
                360 Controller
              </h3>

              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>

              <Link to="/shop" onClick={handleShopNowClick} className="btn">
                Shop Now
              </Link>
            </div>

            <img src="/images/img/banner_Hero2.jpg" alt="hero2" />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>

              <h3>
                Microsoft XBox <br />
                360 Controller
              </h3>

              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>

              <Link to="/shop" onClick={handleShopNowClick} className="btn">
                Shop Now
              </Link>
            </div>
            <img src="/images/img/banner_Hero1.jpg" alt="hero1" />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="content">
              <h4>introducing the new</h4>

              <h3>
                Microsoft XBox <br />
                360 Controller
              </h3>

              <p>Windows Xb 10/7/8/ ps3 / TV Box</p>

              <Link to="/shop" onClick={handleShopNowClick} className="btn">
                Shop Now
              </Link>
            </div>

            <img src="/images/img/banner_Hero3.jpg" alt="hero3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSlider;
