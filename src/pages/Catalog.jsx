import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet-async";

function Catalog() {
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

  if (loading) return <p className="text-center mt-12">Loading products...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <Helmet>
        <title>Catalog - Socks E-commerce</title>
        <meta
          name="description"
          content="Browse all the socks available in our store"
        />
      </Helmet>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">
        All Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white text-center"
          >
            <LazyLoadImage
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              effect="blur"
              className="w-full h-64 object-cover rounded-lg"
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
    </div>
  );
}

export default Catalog;
