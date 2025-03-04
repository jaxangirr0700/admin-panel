import { Switch } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useAuthStore from "../../store/my-store";

function EditRents({ value, item }) {
  //   console.log(value, item);

  const [checked, setChecked] = useState(false);
  const authState = useAuthStore();
  //   console.log(authState);

  return (
    <Switch
      onChange={() => {
        axios
          .put(`https://library.softly.uz/api/rents/53670/return`, {
            headers: {
              Authorization: `Bearer${authState.token}`,
            },
          })
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            // console.log(err);
          });
      }}
      // loading={true}
      checked={value ? true : false}
    ></Switch>
  );
}

export default EditRents;
