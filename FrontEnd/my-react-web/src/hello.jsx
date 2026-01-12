// import React, {useEffect, useState} from "react";
// import { getMenuList, deleteMenuItem } from "./service/web_demo";
// import {useNavigate} from "react-router-dom";

// function Hello() {

// const [items, setCount] = useState([]);
// const navigator = useNavigate();

//   useEffect(() => { 
//     getMenuList().then((response)=> {
//     setCount(response.data);
//   })  .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   function addNewItem() {
//     navigator('/add-item')
//   }
  
//   function editItem(id) {
//    navigator(`/edit-item/${id}`);
//   }

//   function deleteItem(id) {
//   deleteMenuItem(id).then(() => {
//     // Optionally, refresh the item list after deletion
//     getMenuList().then((response) => {   
//       setCount(response.data);
//     });
//   }).catch(error => console.error('Error deleting item:', error));
//   console.log(`Delete item with ID: ${id}`);
//   }

//   return (
//     <div className="container mt-5"> 


//       <h1>Hello, World!</h1>
//       <p>Welcome to my React application.</p>

//       <button onClick={addNewItem}> ADD Items</button>
//       <table className="table table-dark table-striped">
//         <thead>
//           <tr>
//             <th>ID: </th>
//             <th>Tên: </th>
//             <th>Mô tả: </th>
//             <th>Giá: </th>
//             <th>Hình ảnh: </th>
//           <th>Hành động: </th>
//           </tr>

//         </thead>
//         <tbody>
//           {
//             items.map( item =>
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.description}</td>
//                 <td>{item.price}</td>
//                 {/* <td><img src={items.image} alt={items.name} style={{width: '50px'}}/></td> */}
//                 <td>{item.image}</td>

//                 <td>
//                   <button className="btn btn-primary" onClick={() => editItem(item.id)}>sửa</button>  
//                   <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Xóa</button>
//                 </td>

//               </tr>

//             )

//           }
//         </tbody>
//       </table>



//       </div>
//       );
// }
// export default Hello;