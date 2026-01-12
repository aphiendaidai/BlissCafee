import React, { useState, useEffect } from "react";
import { getIDItem, updateMenuItem } from "../../../service/web_demo";
import { useNavigate, useParams } from "react-router-dom";

const EditMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null); // File object mới
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // URL ảnh hiện tại
  const [previewUrl, setPreviewUrl] = useState(null); // URL preview ảnh mới
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getIDItem(id)
        .then((response) => {
          const item = response.data;
          setName(item.name);
          setDescription(item.description);
          setPrice(item.price);
          setCategory(item.category);
          setType(item.type);
          setCurrentImageUrl(item.imageUrl); // Lưu URL ảnh cũ
          setPreviewUrl(item.imageUrl); // Hiển thị ảnh cũ ban đầu
        })
        .catch((error) => console.error("Error fetching item:", error));
    }
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Lưu file object
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Tạo preview URL
    } else {
      setFile(null);
      setPreviewUrl(currentImageUrl); // Trở về ảnh cũ nếu không chọn file
    }
  };

  const save = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("type", type);

    // Chỉ append file nếu người dùng chọn ảnh mới
    if (file) {
      formData.append("file", file);
    }

    try {
      await updateMenuItem(id, formData); // Truyền cả id và formData
      alert("Cập nhật thành công!");
      navigator("/");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Lỗi cập nhật: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="addmenu-page">
      <div className="addmenu-container">
        <h2>Chỉnh sửa món</h2>
        <form className="addmenu-form" onSubmit={save}>
          <div className="addmenu-left">
            <label>Ảnh món ăn:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="preview-image" />
            )}
          </div>

          <div className="addmenu-right">
            <label>Tên món:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Mô tả:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Giá:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Loại món:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Khác</option>
              <option value="drink">Đồ uống</option>
              <option value="food">Đồ ăn</option>
            </select>

            <label>Loại chi tiết:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="ca-phe">Cà Phê</option>
              <option value="tra-trai-cay">Trà trái cây</option>
              <option value="tra-chanh">Trà chanh</option>
              <option value="banh-ngot">Bánh ngọt</option>
              <option value="banh-mi">Bánh mì</option>
              <option value="sinh-to">Sinh tố</option>
              <option value="nuoc-ep">Nước ép</option>
              <option value="tra-sua">Trà sữa</option>
              <option value="nuoc-ngot">Nước ngọt</option>
              <option value="do-an-vat">Đồ ăn vặt</option>
            </select>

            <button type="submit">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;