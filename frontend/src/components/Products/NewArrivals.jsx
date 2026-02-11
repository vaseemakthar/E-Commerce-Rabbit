import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getImageUrl } from '../../utils/imageHelper'

const NewArrivals = () => {

    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollLeft, setCanScrollLeft] =useState(true)
    const [canScrollRight, setCanScrollRight] =useState(true)
   
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(()=>{
       const fetchNewArrivals = async ()=>{
          try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
            )
            setNewArrivals(response.data)
          }
          catch(error)
          {
             console.log(error)
          }
       }

       fetchNewArrivals()
    },[])
    

  
  const handleMouseDown = (e)=>{
    setIsDragging(true)
    setStartX(e.pageX-scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove =(e)=>{
    if(!isDragging) return
    const x = e.pageX-scrollRef.current.offsetLeft
    const walk= x-startX
    scrollRef.current.scrollLeft=scrollLeft -walk
  }

  const handleMouseUpOrLeave = ()=>{
    setIsDragging(false)
  }

  const scroll =(direction)=>{
    const scrollAmount = direction === "left" ? -300 : 300
    scrollRef.current.scrollBy({left: scrollAmount, behavior : "smooth"})
  }

  const updateScrollButtons =()=>{
    const container = scrollRef.current

    if(container)
    {
        const leftScroll =container.scrollLeft
        const rightScroll =container.scrollWidth >leftScroll+container.clientWidth
        
        setCanScrollLeft(leftScroll > 0)
        setCanScrollRight(rightScroll)
    }
  }

  useEffect(()=>{
    const container = scrollRef.current
    if(container)
    {
        container.addEventListener("scroll", updateScrollButtons)
        updateScrollButtons()
        return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  },[newArrivals])

  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl  font-bold mb-4'>Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8'>
                Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.  
            </p>

            <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                <button
                 onClick={()=> scroll("left")}
                 disabled={!canScrollLeft} 
                 className = {`p-2 rounded-full ${
                    canScrollLeft 
                       ? "bg-white text-black"
                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
                 }`}>
                   <FiChevronLeft className='text-2xl'/>
                   
                </button>
                <button 
                   onClick={()=> scroll("right")}
                   className = {`p-2 rounded-full ${
                    canScrollRight 
                       ? "bg-white text-black transition"
                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
                 }`}>
                   <FiChevronRight className='text-2xl'/>
                </button>
            </div>
        </div>
        
        <div
         ref={scrollRef} 
         className={`container mx-auto overflow-x-auto scrollbar-hide flex space-x-6 relative
            ${isDragging ? 
                "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}>
            {newArrivals.map((product)=>(
                <div 
                 key={product._id}
                 className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative overflow-hidden rounded-lg'
                >
                    <div className='aspect-square overflow-hidden rounded-lg'>
                        <img src={getImageUrl(product.images[0]?.url)}
                          alt={product.images[0]?.altText || product.name}
                          className='w-full h-full object-cover'
                          draggable='false'
                        />
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-4'>
                       <Link to={`/product/${product._id}`}
                         className='block hover:text-gray-200 transition'
                        >
                            <h4 className='font-semibold text-sm line-clamp-2'>{product.name}</h4>
                            <p className='mt-2 text-lg font-bold'>${product.price.toFixed(2)}</p>
                        </Link>
                    </div>  
                </div>
            ))}
        </div>

    </section>
  )
}

export default NewArrivals