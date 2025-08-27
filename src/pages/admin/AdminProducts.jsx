import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    if (newProduct.imageFile) formData.append("image", newProduct.imageFile);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setNewProduct({ name: "", price: "", image: "" });
        fetchProducts();
      }
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try{
      const res = await fetch(`${API_URL}/${id}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(!res.ok) {
        throw new Error("Failed to delete product");
      }
      fetchProducts();
    }catch(err){
      console.log("Error deleting prod", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="file"
          placeholder="URL Image"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>


      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="border-t">
              <td className="p-2">{prod.name}</td>
              <td className="p-2">${prod.price}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
