import { combineReducers } from '@reduxjs/toolkit';
import entities from 'store/entities';
import dataset from './dataset';
import filters from './filters';
import selected from './selected';

export default combineReducers({ dataset, entities, filters, selected });
