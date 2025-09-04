import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cursorPos, setCursorPos] = useState({x: 0, y: 0});
  const [hovering, setHovering] = useState({x: 0, y: 0});

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-12">Loading product...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center mt-12">Product not found</p>;

  const handleMouseMove = (e)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x,y});
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-[40px] mb-[40px]">
      <Helmet>
        <title>{product.name} - Socks E-commerce</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative overflow-hidden rounded-xl shadow-md"
            onMouseMove={handleMouseMove}
            onMouseEnter={()=> setHovering(true)}
            onMouseLeave={()=> setHovering(false)}
          >
            <img
              src={`${API_URL}${product.image}`}
              alt={product.name}
              className="w-full max-w-md md:max-w-full aspect-square object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              style={{
                transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                transform: hovering ? "scale(2)" : "scale(1)"
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-xl
              hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full md:w-auto text-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
