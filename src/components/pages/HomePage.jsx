import { Button, Card, Flex, Table } from "antd";
import useAuthStore from "../../store/my-store";
import { useState } from "react";

function HomePage() {
  const authState = useAuthStore();
  const [num, setNum] = useState(Number(localStorage.getItem("a")));
  // console.log(num);

  // console.log(authState);
  function Paragrf({ children }) {
    return (
      <p className="flex w-40 justify-between items-center font-bold">
        {children}
      </p>
    );
  }

  return (
    <div className="ml-2 mt-2">
      {/* <div>
        <Button
          onClick={() => {
            const new_num = num + 1;
            setNum(new_num);
            localStorage.setItem("a", new_num);
          }}
        >
          Save{num}
        </Button>
        <Button
          onClick={() => {
            localStorage.removeItem("a");
          }}
        >
          Remove
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
          }}
        >
          Clear
        </Button>
      </div>{" "} */}
      <h1 className="font-bold text-2xl">Home Page</h1>
      <Card title={"Assalamu Alaykum"} style={{ width: "100%" }}>
        <Paragrf>
          {" "}
          <span>Id</span>
          <span> {authState.user.id}</span>
        </Paragrf>{" "}
        <Paragrf>
          {" "}
          <span>Name</span>
          <span> {authState.user.username}</span>
        </Paragrf>{" "}
        <Paragrf>
          {" "}
          <span>Gender</span>
          <span> {authState.user.gender}</span>
        </Paragrf>{" "}
        <Paragrf>
          {" "}
          <span>Phone</span>
          <span> {authState.user.phone}</span>
        </Paragrf>{" "}
      </Card>
    </div>
  );
}
export default HomePage;
