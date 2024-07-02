import { useEffect, useState } from "react"
import axios from 'axios';

export const useCategory=()=>{
    const [categories,setCategories]=useState([]);

    const getCategories=async()=>{
        try{
            const {data}=await axios.get('http://localhost:5000/api/v1/category/get-category');
            setCategories(data?.category);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}