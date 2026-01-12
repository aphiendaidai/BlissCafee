import React, { useState } from "react";
import { addMenuItem } from "../../../service/web_demo";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/addmenu.css"; // 👉 CSS riêng

const AddMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const navigator = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile)); // tạo link ảnh tạm
    }
  };


  const save = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Vui lòng chọn ảnh món ăn!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("file", file); // ảnh
    formData.append("type", type);

    try {
      const response = await addMenuItem(formData);
      console.log("Thêm thành công:", response.data);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
      setCategory("");
      setType("");

      // navigatorx("/");
    } catch (error) {
      console.error("Lỗi khi thêm món:", error);
    }
  };

  return (
   <div className="addmenu-page">
  <div className="addmenu-container">
    <h2>Thêm món mới vào menu</h2>
    <form className="addmenu-form" onSubmit={save}>
      <div className="addmenu-left">
        <label>Ảnh món ăn:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
      </div>

      <div className="addmenu-right">
        <label>Tên món:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Mô tả:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Giá:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Loại món:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Khác</option>
          <option value="drink">Đồ uống</option>
          <option value="food">Đồ ăn</option>
        </select>

        
        <label>Loại chi tiết</label>
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


        <button type="submit">Thêm món</button>
      </div>
    </form>
  </div>
</div>
  );
}

export default AddMenu;
