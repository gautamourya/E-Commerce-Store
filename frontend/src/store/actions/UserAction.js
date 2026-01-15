import axios from "@/store/utils/axiosConfig";
import { loadUser } from "../Reducer/userSlice";


export const asyncSignupUser = (user) => async () => {
  try {
    const response = await axios.post("/register", user);
    // dispatch(loadUser(response.data))
    console.log("asyncsignupUser = ", response);
  } catch (error) {
    console.log(error); 
  }
};

// export const asyncLoginuser = (user) => async (dispatch) => {
//   try {
//     const data  = await axios.post("/login", user);  
//     console.log("Login Response:", data);
//       if (data.status === 200){
//         return true;
//       }else{
//         return false;
//       }
//     }catch (error) {
//     console.log(error);
//   }
// };


export const asyncLoginuser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/login", user, {
      withCredentials: true,
    });

    if (res.status === 200) {
      const loginUser = res.data.user;
      dispatch(loadUser(loginUser));
      localStorage.setItem("userName", loginUser.name);
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};



// export const asyncCurrentuser = () => async (dispatch) => {
//   console.log("i am running on every refresh"); 
//   const response = await axios.get("/verify");
//   console.log("asyncCurrentuser response:", response);
   
// }

export const asyncCurrentuser = () => async (dispatch) => {
  try {
    console.log("i am running on every refresh"); 
    const response = await axios.get("/verify");
    console.log("asyncCurrentuser response:", response);
    
    if (response.status === 200 && response.data.user) {
      // ✅ User mil gaya, Redux me set karo
      dispatch(loadUser(response.data.user));
      return response; // ✅ Response return karo
    }
    
    return response;
  } catch (error) {
    console.error("asyncCurrentuser error:", error);
    return null;
  }
}

export const asyncLogoutuser = () => async (dispatch) => {
  try {
    const response = await axios.get("/logout");
    console.log("Logout Response:", response);
    dispatch(logoutUser());
    localStorage.removeItem("userName");
  } catch (error) {
    console.log(error);
  }
}


// conosole