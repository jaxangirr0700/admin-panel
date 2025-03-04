import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import AddRent from "../AddAndEdits/AddRent";
import EditRents from "../AddAndEdits/EditRents";
import api from "../api/api";
import Loader from "../loader/Loader";
import EditRentsTwo from "../AddAndEdits/EditRentsTwo";

function RentsPage() {
  const authState = useAuthStore();
  const [rents, setRents] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState();
  const [edit, setEdit] = useState();
  const [isOpenDrawerEditRents, setIsOpenDrawerEditRents] = useState(false);

  function fetchRents() {
    api
      .get(`/api/rents`, {
        params: {
          size: 10,
          page: currentPage,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setRents(res.data);
        const books_ids = res.data.items.map((item) => {
          // console.log(item);

          return item.stock.bookId;
        });

        api
          .get("/api/books", {
            params: {
              id: books_ids,
            },
          })
          .then((res) => {
            setBooks(res.data.items);
          });
      })
      .catch((err) => {
        console.log(err);
        message.error("RentsPage Error");
      });
  }
  useEffect(() => {
    fetchRents();
  }, [currentPage]);
  if (!rents?.items) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">RentPage</h1>
        <AddRent onFinish={fetchRents} />{" "}
        <EditRentsTwo
          isOpenDrawerEditRents={isOpenDrawerEditRents}
          setIsOpenDrawerEditRents={setIsOpenDrawerEditRents}
          edit={edit}
          setEdit={setEdit}
        />
      </div>

      <Table
        scroll={{
          x: 600,
        }}
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "Id",
            dataIndex: "id",
            render: (id) => {
              return (
                <div
                  onClick={() => {
                    setIsOpenDrawerEditRents(true);
                    const user2 = rents.items.find((u) => {
                      return u.id == id;
                    });
                    setEdit(user2);
                  }}
                >
                  {id}{" "}
                </div>
              );
            },
          },
          {
            key: "leasedAt",
            title: "Berilgan sana",
            dataIndex: "leasedAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            },
          },
          {
            key: "returnedAt",
            title: "Qaytdi",
            dataIndex: "returnedAt",
            render: (value, item) => {
              // if (!value) {
              //   return <span>Hali Qaytarilmagan</span>;
              // }
              // return new Date(value).toLocaleString("ru", {
              //   month: "short",
              //   day: "numeric",
              //   year: "numeric",
              // });
              return <EditRents value={value} item={item} />;
            },
          },
          {
            key: "user",
            title: "Kitobhon",
            dataIndex: "user",
            render: (item) => {
              return (
                <div>
                  <p>{item.id}</p>
                  <p>{item.lastName}</p>
                </div>
              );
            },
          },
          {
            key: "stock",
            title: "Zaxira Kitob",
            dataIndex: "stock",
            render: (item) => {
              return <ZaxiraKitobKatagi stock={item} books={books} />;
            },
          },
        ]}
        dataSource={rents.items.map((r) => {
          return { ...r, key: r.id };
        })}
        pagination={{
          pageSize: 10,
          current: currentPage,
          total: rents.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}
function ZaxiraKitobKatagi({ stock, books }) {
  const book = books?.find((f) => {
    return f.id === stock.bookId;
  });
  return (
    <div>
      <p>
        {stock.id}/{stock.bookId} {book?.name}
      </p>
    </div>
  );
}

// function Add(a) {
//   return function AddTwo(b) {
//     return (c) => {
//       return a * b * c;
//     };
//   };
// }
// console.log(Add(1)(2)(3));

export default RentsPage;
