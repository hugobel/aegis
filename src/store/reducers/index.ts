import { combineReducers } from "@reduxjs/toolkit";
import dataset from "./dataset";
import filters from "./filters";
import selected from "./selected";

export default combineReducers({ dataset, filters, selected });
