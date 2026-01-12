import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/poimenu.css";
import { getMenuList, getMenuByType, deleteMenuItem } from "../../../service/web_demo";

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

function ListMenu() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const navigator = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      try {
        console.log('Attempting to delete item:', id);
        
        await deleteMenuItem(id);
        
        // Update UI state
        setMenu(prevMenu => prevMenu.filter(item => item.id !== id));
        
        console.log('✅ Item deleted successfully');
        alert("Xóa thành công!");
        
      } catch (error) {
        console.error("❌ Delete error details:", {
          message: error.message,
          code: error.code,
          response: error.response
        });
        
        // Show more specific error message
        let errorMessage = "Xóa không thành công. ";
        if (error.code === 'ERR_NETWORK') {
          errorMessage += "Lỗi kết nối mạng.";
        } else if (error.response) {
          errorMessage += `Server error: ${error.response.status}`;
        } else {
          errorMessage += "Vui lòng thử lại.";
        }
        
        alert(errorMessage);
      }
    }
  };

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
          >
            <img src={item.imageUrl} alt={item.name} />
            <h4>{item.name}</h4>
            <button onClick={() => navigator(`/editmenu/${item.id}`)}>Edit</button>
            {/* ✅ FIX: Truyền item.id vào handleDelete */}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListMenu;