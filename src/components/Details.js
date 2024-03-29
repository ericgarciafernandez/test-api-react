import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Component() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  async function getProduct() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/products/${id}`);
      const value = await response.json();
      setProduct(value);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <div className="w-5/6 mx-auto my-12 flex flex-wrap justify-center gap-6">
          {product
            ? product.map((el, index) => (
              <div className="w-full flex flex-wrap justify-center gap-x-24" key={el.id}>
                <img src={el.image} className="w-1/3 h-full" />
                <div className="flex flex-wrap flex-col">
                  <h2 className="text-2xl font-bold">{el.name}</h2>
                  <p className="grow">{el.description}</p>
                  <div className="flex items-center gap-x-12">
                    <span className="text-2xl font-bold">{el.price}€</span>
                    <button className="text-sm rounded-lg bg-accent px-5 py-2.5 text-center text-text ">
                      Add to cart
                    </button>
                  </div>

                </div>
              </div>
            ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Component;
