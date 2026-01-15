"use client";

import { Provider} from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import {asyncCurrentuser} from '../store/actions/UserAction'

export default function ReduxProvider({ children }) {

  useEffect(()=>{
   store.dispatch(asyncCurrentuser())
  },[])
  return (<Provider store={store}>{children}</Provider>);
}
