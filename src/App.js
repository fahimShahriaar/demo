import logo from "./logo.svg";
import "./App.css";
import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [allBrands, setAllBrands] = useState([]);

  // GET USERS
  //**********Get user ***********
  useEffect(() => {
    fetch(`http://localhost:3333/api/v1/user/628f25c744080f294e0e8180`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user info", data);
        setUserInfo(data);
      });
  }, []);

  // GET BRANDS
  useEffect(() => {
    // console.log("userInfo", userInfo);
    fetch("http://localhost:3333/api/v1/brand/all-brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cid: "reneta123" }),
    })
      .then((response) => response.json())
      .then((result) => {
        const brandNames = result.map((b) => b.brand);
        setAllBrands(brandNames);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  console.log(allBrands);

  return (
    <div className="flex justify-center mt-6">
      <div className="w-3/12 text-sm">
        <Multiselect
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={function noRefCheck(e) {
            console.log(e);
          }}
          selectedValues={userInfo?.brands}
          options={allBrands}
        />
      </div>
    </div>
  );
}

export default App;

// options={["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]}
