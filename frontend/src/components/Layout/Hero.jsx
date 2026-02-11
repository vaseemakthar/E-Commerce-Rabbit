import { Link } from "react-router-dom"
import heroImg from "../../assets/rabbit-hero.webp"

const Hero = () => {
  return (
    <section className="ralative">
        <img src={heroImg} 
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        />
        <div className="absolute inset-0 h-[401px] md:h-[601px] lg:h-[751px] bg-black/5 flex items-center justify-center top-27">
            <div className="text-center text-white p-6">
               <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                   vacation <br /> Ready
               </h1>
               <p className="text-sm tracking-tighter md:text-lg mb-6">
                 Explore our vacation-ready outfits with fast worldwide shipping.
               </p>
               <Link
               to="#"
               className="bg-white text-gray-950 px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-2 md:text-lg rounded-sm" 
               >
                Shop Now
               </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero