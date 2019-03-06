import React from 'react';
import './Utils/bootstrap.min.css';
import AppRouter from './AppRouter';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faBalanceScale,
  faSpinner,
  faMoneyBill,
  faMousePointer,
  faHeart,
  faArrowsAltV,
  faShareAlt,
  faComment
} from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);
library.add(faSpinner);
library.add(faBalanceScale);
library.add(faMoneyBill);
library.add(faMousePointer);
library.add(faHeart);
library.add(faShareAlt);
library.add(faComment);
library.add(faArrowsAltV);


export default function IndexApp() {
  return (
    <AppRouter />
  )
}
