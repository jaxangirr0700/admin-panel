import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

function ProductPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        massage.error("Xatolik");
      });
  }, []);
  if (!products) {
    return (
      <div className="ml-2 mt-2">
        <h1 className="font-bold text-2xl">Product Page</h1> <Loader />
      </div>
    );
  }

  return (
    <div className="ml-2 mt-2">
      <h1 className="font-bold text-2xl">Product Page</h1>{" "}
      <Table
        bordered
        size="small"
        columns={[
          {
            title: "Id",
            dataIndex: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Createdat",
            dataIndex: "createdAt",
          },
          {
            title: "Image",
            dataIndex: "image",
            render: (_, { image, name }) => {
              return <img className="w-20 rounded-md" src={image} alt={name} />;
            },
          },
        ]}
        dataSource={products.map((item) => {
          return { ...item, key: item.id };
        })}
      />
      {/* <ul>
        {products.map((product) => {
          if (!products) {
            return <div>Loading...</div>;
          }
          return (
            <li key={product.id}>
              <span>{product.name}</span>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}
export default ProductPage;
