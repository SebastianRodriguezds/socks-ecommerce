import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:5000/products")
            .then(res => setProducts(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const featuredProducts = products.slice(0, 3)

    if (loading) return <p className="text-center mt-12">Cargando productos...</p>;
    if (error) return <p className="text-center mt-12 text-red-500">Error: {error}</p>;
    
    return(
        <div>
            {/*Banner*/}
            <section className="bg-yellow-400 text-center py-12">
                <h1 className="text-4x1 font-bold mb-4">Welcome to Socks E-commerce</h1>
                <p className="text-lg">Find the perfect socks for every occasion</p>
            </section>

            {/* Featured products */}

            <section className="max-w-6x1 mx-auto py-12 px-4">
                <h2 className="text-2x1 font-bold mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product)=>(
                        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded"/>
                            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="font-bold mt-2">${product.price}</p>
                            <Link to={`/product/${product.id}`} className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;