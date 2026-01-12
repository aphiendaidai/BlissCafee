import React, {useState, useEffect} from "react";
import { getIDItem, updateMenuItem, addMenuItem } from "../service/web_demo";
import { useNavigate, useParams } from "react-router-dom";




const EditItem = ()=> {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigator = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters

  useEffect(() => {
    if (id) {
      getIDItem(id).then(response => {
        const item = response.data;
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setImage(item.image);
      }).catch(error => console.error('Error fetching item:', error));
    }
  }, [id]);

  
    const save = (e) => {
    e.preventDefault();
    const menuItem = { name, description, price, image };
    if (id) {
      updateMenuItem(id, menuItem)  
        .then(() => {
          navigator("/");
        })
        .catch(error => console.error('Error updating item:', error));
    } else {
      addMenuItem(menuItem)
        .then(() => {
          navigator("/");
        })
        .catch(error => console.error('Error adding item:', error));
    }
  };


  function pageTitle() {
    return id ? "Chỉnh Sửa Mục" : "Thêm Mới Mục";
  }


  return (
    <div className="container mt-5">
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
            <h2 className="text-center">{pageTitle()}</h2>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên Menu</label>
                <input  
                  type="text"
                  className=    "form-control"
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

export default EditItem;