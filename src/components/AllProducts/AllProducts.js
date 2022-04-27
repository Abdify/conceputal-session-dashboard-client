import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [updated, setUpdated] = useState(false);

  // localhost:3000/update?limit=10

  const navigate = useNavigate();

  const handleRouteChange = () => {
    navigate({
      pathname: "/update",
      search: `?limit=${limit}&pageNumber=${pageNumber}`
    })
  }

  useEffect(() => {
    //IIFE
    // query parameter
    (async () =>{
      const { data } = await axios.get(`http://localhost:5000/products?limit=${limit}&pageNumber=${pageNumber}`);
      
      if(!data?.success) {
        setProducts([])
        return toast.error(data.error);

      }
      setProducts(data.data);
      setTotalPage(Math.ceil(data.count/limit))
      

    })()
    
  }, [limit, pageNumber, updated])

  const handleDelete = (id) => {
    (async () => {
      const { data } = await axios.delete(`http://localhost:5000/products/${id}`);
      
      if(!data.success) return toast.error(data.error)

      toast(data.message)
      setUpdated(!updated)
    })()
  }

  
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-screen mx-5">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Image
            </th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.length ? (
            products.map((product) => {
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {product.name}
                  </th>
                  <td class="px-6 py-4">{product.price}</td>
                  <td class="px-6 py-4">
                    <img className="w-20" src={product.image} alt="" />
                  </td>

                  <td class="px-6 py-4 text-right">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>No data found</div>
          )}
        </tbody>
      </table>
      <div className="flex my-3 justify-end">
        {[...Array(totalPage).keys()].map((number) =>
          number >= 1 && number < totalPage-1 ? (
            "..."
          ) : (
            <div
              onClick={() => setPageNumber(number)}
              className={`mx-3 cursor-pointer border border-black px-3 py-1 ${
                pageNumber === number ? "bg-black text-white" : ""
              }`}
            >
              {number + 1}
            </div>
          )
        )}
        <select defaultValue={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default AllProducts;