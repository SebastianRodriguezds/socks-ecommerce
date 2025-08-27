import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

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

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      fetchProducts();
    } catch (err) {
      console.log("Error deleting prod", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: editProduct.name,
          price: editProduct.price,
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.log("Error updating!", error);
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
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="border-t">
              {/* Name */}
              <td className="p-2 text-left align-middle">
                {editProduct?._id === prod._id ? (
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  prod.name
                )}
              </td>

              {/* Price */}
              <td className="p-2 text-right align-middle">
                {editProduct?._id === prod._id ? (
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    className="border p-1 rounded w-full text-right"
                  />
                ) : (
                  `$${prod.price}`
                )}
              </td>

              {/* Actions */}
              <td className="p-2 text-center align-middle">
                <div className="flex justify-center space-x-2">
                  {editProduct?._id === prod._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(prod._id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditProduct(null)}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditProduct(prod)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AdminProducts;
