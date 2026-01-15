import axios from "@/store/utils/axiosConfig";
import { loadproduct } from "../Reducer/ProductSlice";


export const asyncCreateProduct = (data) => async () => {
    try{
         const response = await axios.post("/products", data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  } );
        console.log("asyncCreateProduct = ", response);

    }catch (error){
        console.log(error)
    }
}

// export const asyncLoadProduct = () => async (dispatch) => {
//     try{
//          const response = await axios.get("/products?_start=0&_limit=4");
//         console.log("asyncLoadProduct = ", response.data);  
//         dispatch(loadproduct(response.data))
//     }catch (error){
//         console.log(error)
//     }
// }     



// export const asyncLoadProduct = (skip = 0, limit = 8) => async (dispatch) => {
//     try {
//         // const response = await axios.get("/products");
//         const response = await axios.get(`/products?_skip=${skip}&_limit=${limit}`);
//         console.log("asyncLoadProduct = ", response.data);  
//         // dispatch(loadproduct(response.data)); 
//         return response.data
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }


export const fetchProductsApi = async ({ skip, limit }) => {
    try{
         const res = await axios.get(`/products?_skip=${skip}&_limit=${limit}`);
         console.log(res.data.products)
        return res.data;
    }catch (error) {
        console.log(error);
    }
  
};



export const asyncsingleProduct = (productId) => async () => {    
try{
     const response = await axios.get(`/products/${productId}`);
     console.log("asyncsingleProduct = ", response.data);
     return response.data;
}catch (error){
    console.log(error)
}
}

