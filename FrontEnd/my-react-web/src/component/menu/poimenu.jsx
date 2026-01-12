import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/poimenu.css";
import { getMenuList, getMenuByType } from "../../service/web_demo";
// import { useLocation } from "react-router-dom";

const categoryMap = {
  "Tất cả": null,
  "Cà phê": "ca-phe",
  "Bánh": "banh-ngot",
  "Trà": "tra-chanh",
  "Nước giải khát": "nuoc-ngot",
  "Sinh tố": "sinh-to",
  "Nước ép": "nuoc-ep",
  "Trà sữa": "tra-sua",
  "Đồ uống khác": "khac"
};

const categories = Object.keys(categoryMap);

function Poimenu() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const navigator = useNavigate();


// const location = useLocation();
// const queryParams = new URLSearchParams(location.search);
// const typeFromURL = queryParams.get("type");

// useEffect(() => {
//   if (typeFromURL) {
//     getMenuDessert(typeFromURL).then(res => setmenu(res.data));
//     setSelectedCategory(typeFromURL); // cập nhật danh mục hiện tại
//   } else {
//     getMenuList().then(res => setmenu(res.data));
//   }
// }, [typeFromURL]);




  useEffect(() => {
    getMenuList()
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const type = categoryMap[selectedCategory];

    if (!type) {
      getMenuList()
        .then((response) => setMenu(response.data))
        .catch((error) => console.error("Error fetching all data:", error));
    } else {
      getMenuByType(type)
        .then((response) => setMenu(response.data))
        .catch((error) =>
          console.error(`Error fetching data for type ${type}:`, error)
        );
    }
  }, [selectedCategory]);

  return (
    <div className="poimenu-container">
      {/* Danh mục bên phải */}
      <div className="poimenu-sidebar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm bên trái */}
      <div className="poimenu-items">
        {menu.map((item) => (
          <div
            key={item.id}
            className="menu-item"
            onClick={() => navigator(`/detail/${item.id}`)}
          >
            <img src={item.imageUrl} alt={item.name} />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poimenu;
