import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext  } from "../context/CartContext";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(()=>{
        axios.get(`http://localhost:5000/products/${id}`)
            .then(res=>setProduct(res.data))
            .catch(err=>setError(err.message))
            .finally(()=>setLoading(false))
    }, [id]);

    if (loading) return <p className="p-6">Loading product...</p>
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>
    if (!product) return <div className="p-6">Product not found</div>

    return(
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold mb-4">${product.price}</p>
                    <button onClick={()=> addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;