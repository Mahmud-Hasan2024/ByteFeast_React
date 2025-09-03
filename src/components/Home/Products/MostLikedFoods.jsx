import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import apiClient from "../../../services/api-client";
import ErroAlert from "../../ErroAlert";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const MostLikedFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/foods/most-liked/")
      .then((res) => setFoods(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );

  if (error) return <ErroAlert error={error} />;

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-content mb-7">
          ⭐ Most Liked Foods
        </h2>

        {foods.length === 0 && (
          <p className="text-center text-gray-500">
            No Most Liked Foods Available
          </p>
        )}

        {foods.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {foods.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default MostLikedFoods;
