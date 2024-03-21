// Home.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Call the function to fetch all products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://artbackend-dvbc.onrender.com/api/users/showProducts"
      );
      console.log("Response from API:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("Rendered products:", products);

  return (
    <div>
      <div className="hero relative w-screen">
        <img src="public\hero2.jpg" className="w-screen" />
        <div className="overlay bg-black/35 w-screen absolute left-0 top-0 right-0 bottom-0"></div>
        {/* <div className="explore absolute right-36 bottom-1/3 border-4 border-white text-white font-medium px-20 py-7 text-3xl"><Link>Explore</Link></div> */}
      </div>

      <div className="container justify-between align-middle flex mt-20 m-auto">
        <div className="card relative overflow-hidden flex-column justify-between align-middle w-[500px] mx-10">
          <Link>
            <div className="image">
              <img src="public\1.jpg" className=" w-[500px]" />
            </div>
            <div className="title text-2xl font-thin text-center left-10 right-10 bottom-10 p-3 absolute bg-white">
              <Link>Title</Link>
            </div>
          </Link>
        </div>

        <div className="card relative overflow-hidden flex-column justify-between align-middle w-[500px] mx-10">
          <div className="image">
            <img src="public\2.jpg" className=" w-[500px]" />
          </div>
          <div className="title text-2xl font-thin text-center left-10 right-10 bottom-10 p-3 absolute bg-white">
            <Link>Title</Link>
          </div>
        </div>

        <div className="card relative overflow-hidden  flex-column justify-between align-middle w-[500px] mx-10 ">
          <div className="image">
            <img src="public\3.jpg" className=" w-[500px]" />
          </div>
          <div className="title text-2xl font-thin text-center left-10 right-10 bottom-10 p-3 absolute bg-white">
            <Link>Title</Link>
          </div>
        </div>
      </div>

      <div className="intro relative overflow-hidden flex justify-center align-middle w-screen my-20 mx-10 ">
        <div className="image">
          <img src="public\intro.jpg" className=" w-[700px]" />
        </div>

        <div className="flex-column justify-between align-middle w-[40%] ml-10 ">
          <div className="title text-center">Full Name</div>
          <div className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            ducimus cum aspernatur. Odio illo ratione consectetur suscipit
            dolore libero, doloremque amet animi omnis. Eos ipsum distinctio
            magni provident maiores tempore. Similique, vero nobis dolores atque
            magni eveniet culpa ipsum distinctio nisi molestiae dolor dolore at
            non harum voluptatibus, ex ad minima, doloremque consectetur.
            Aliquam, doloribus animi obcaecati aperiam nobis reiciendis?
          </div>
        </div>
      </div>

      <Link
        to="/products"
        className="Link border-2 border-black w-60 text-center py-3 m-auto my-20"
      >
        View More
      </Link>

      <div className="footer bg-purple-100 flex-column justify-between align-middle">
        <div className="handles flex align-middle justify-between p-10 w-80 m-auto">
          <div className="insta">
            <Link>
              <FaInstagram size={50} color="black" />
            </Link>
          </div>
          <div className="mail">
            <Link>
              <IoMdMail size={50} color="black" />
            </Link>
          </div>
        </div>
        <div className="copyright text-center p-5 text-xl text-gray-500">
          @MusingArtistry
        </div>
      </div>

      {/* <div className="products">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="product"
          >
            {product.image && (
              <img
                src={`https://artbackend-dvbc.onrender.com/uploads/${product.image}`}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <p>{product.name}</p>
            <p>${product.price}</p>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
