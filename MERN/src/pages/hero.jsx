import "../style/hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">

          <div className="col-lg-8 hero-content" data-aos="fade-up">

            <span className="hero-tag">
              Premium Luxury Collection
            </span>

            <h1 className="hero-title">
              Elevate Your Style
            </h1>

            <p className="hero-text">
              Discover premium watches, handbags, heels and
              designer fashion crafted for modern luxury.
            </p>

            <a href="/products" className="hero-btn">
              Explore Collection
            </a>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;