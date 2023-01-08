import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import {createTheme, NextUIProvider} from "@nextui-org/react";
import MainPage from "./routes/MainPage";
import Categories from "./routes/categories/categories";
import CategoryDetails from "./routes/categories/categoryDetails";

const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        letterSpacings: {
            tighter: '0em',
        },
    },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <NextUIProvider theme={ theme }>
          <HashRouter>

              <Routes>
                  <Route path="/" element={ <PageLayout/> }>
                      <Route index element={ <MainPage/> }/>

                      <Route path="categories">
                          <Route index element={<Categories title={"Kategorije"} />} />
                          <Route path=":categoryId" element={<CategoryDetails />} />
                      </Route>

                  </Route>
              </Routes>

          </HashRouter>
      </NextUIProvider>
  </React.StrictMode>
);
