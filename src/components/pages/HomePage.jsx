import { Card, Flex, Table } from "antd";
import useAuthStore from "../../store/my-store";

function HomePage() {
  const authState = useAuthStore();
  console.log(authState);
  function Paragrf({ children }) {
    return (
      <p className="flex w-40 justify-between items-center font-bold">
        {children}
      </p>
    );
  }

  return (
    <div className="ml-2 mt-2">
      {" "}
      <h1 className="font-bold text-2xl">Home Page</h1>
      <Card title={"Ustoz Assalamu Alaykum"} style={{ width: "100%" }}>
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
      {/* <span className="text-xl font-bold font-mono">Assalamu Alaykum</span> */}
    </div>
  );
}
export default HomePage;
