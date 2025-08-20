import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Catalog() {

  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(()=> {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

  if (loading) {
    return <p className="text-center mt-12">Cargando productos...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-12 text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">All Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
            <Link
              to={`/product/${product._id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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