import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const featuredProducts = products.slice(0, 3);

    if (loading) return <p className="text-center mt-12">Loading producto...</p>;
    if (error) return <p className="text-center mt-12 text-red-500">Error: {error}</p>;

    return (
        <div>
            <Helmet>
                <title>Home - Socks E-commerce</title>
                <meta name="description" content="Discover the best socks for every occasion. Featured products on our homepage." />
            </Helmet>
            <section className="bg-yellow-400 text-center py-16 px-4">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Welcome to Socks E-commerce</h1>
                <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto">Find the perfect socks for every occasion</p>
            </section>

            <section className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-xl p-4 shadow hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white"
                        >
                            <img
                                src={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                            <p className="text-gray-600 line-clamp-2">{product.description}</p>
                            <p className="font-bold mt-2">${product.price}</p>
                            <Link
                                to={`/product/${product._id}`}
                                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>);
}

export default Home;
