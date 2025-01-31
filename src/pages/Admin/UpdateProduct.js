import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import axios from 'axios';
import {Select} from 'antd';
import {useNavigate,useParams} from 'react-router-dom';

const {Option}=Select;

export const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  
    //get single product
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/product/get-single-product/${params.slug}`
        );
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      getSingleProduct();
      //eslint-disable-next-line
    }, []);

    //get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    //update product function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
        productData.append("shipping",shipping);
        console.log(productData);
        await axios.post(`http://localhost:5000/api/v1/product/update-product/${id}`,productData)
        .then(res=>{
          console.log(res);
          navigate("/admin/products");
        })
      } catch (error) {
        console.log(error);
      }
    };
  
    
    //delete a product
    const handleDelete = async () => {
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        await axios.delete(
          `http://localhost:5000/api/v1/product/delete-product/${id}`
        );
        navigate("/admin/products");
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <Layout title={"p-Kart Update-Product"}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-update-pro mx-0 border shadow">
              <h1 className='text-center text-uppercase'>Update Product</h1>
              <div className="px-2">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                  name="category"
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`http://localhost:5000/api/v1/product/get-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                  />
                </div>
  
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                    name="quantity"
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "yes" : "No"}
                    name="shipping"
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary w-100" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger w-100" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  