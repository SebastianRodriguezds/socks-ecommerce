import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { useContext } from "react";
import { CartContext  } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();
    const product = productsData.find((p)=> p.id == parseInt(id));
    const { addToCart } = useContext(CartContext)

    if (!product) {
        return <div className="p-6">Product not found</div>
    }

    return(
        <div className="max-w-4x1 mx-auto p6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-3x1 font-bold mb-4">{product.name}</h1>
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
