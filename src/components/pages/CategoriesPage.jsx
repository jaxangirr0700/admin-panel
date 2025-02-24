import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

function CategoriesPage() {
  const [catigories, setCatigories] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/categories")
      .then((res) => {
        // console.log(res.data);
        setCatigories(res.data);
      })
      .catch((err) => {
        console.error(err);
        massage.error("Xatolik");
      });
  }, []);
  if (!catigories) {
    return (
      <div className="ml-2 mt-2">
        <h1 className="font-bold text-2xl">Categories Page</h1> <Loader />
      </div>
    );
  }
  return (
    <div className="ml-2 mt-2">
      <h1 className="font-bold text-2xl">Catigories Page</h1>{" "}
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
            dataIndex: "title",
          },
          {
            title: "Createdat",
            dataIndex: "createdAt",
          },
          {
            title: "Image",
            dataIndex: "image",
            render: (_, { image, title }) => {
              if (!image) {
                return <Loader />;
              }
              return (
                <img className="w-20 rounded-md" src={image} alt={title} />
              );
            },
          },
        ]}
        dataSource={catigories.map((item) => {
          return { ...item, key: item.id };
        })}
      />
    </div>
  );
}
export default CategoriesPage;
