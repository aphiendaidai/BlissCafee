import React, {useState} from "react";
import { addMenuItem } from "../service/web_demo";
import { useNavigate } from "react-router-dom";




const AddItem = ()=> {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigator = useNavigate();

  function save(e){
    e.preventDefault();
    const menuItem = {name, description, price, image};

    addMenuItem(menuItem).then((response) => {
      console.log("Item added successfully:", response.data);
      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setImage("");

      // Navigate to the home page or another page after adding the item
      navigator("/");
    }
    ).catch((error) => {
      console.error("There was an error adding the item:", error);
    });
  }


  return (
    <div className="container mt-5">
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Thêm Mới Mục</h2>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên Menu</label>
                <input  
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên mục"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Mo Ta</label>
                <input  
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả mục"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Gia</label>
                <input  
                  type="text"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Nhập giá mục"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Chon Hinh anh </label>
                <input  
                  type="text"
                  className="form-control"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Nhập đường dẫn hình ảnh"
                />
              </div>
                
                <button className="btn btn-success" onClick={save}> Save</button>
                </form>
          </div>
          
          </div> 

      </div>   

    </div>
  );
}

export default AddItem;