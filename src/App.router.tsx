import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MediaApplicationComponent from "./components/MediaApplication";
import AddMediaComponent from './components/AddMedia';
import EditMediaComponent from './components/EditMedia';

class AppRouter extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<MediaApplicationComponent />}></Route>
          <Route path="/medias" element={<MediaApplicationComponent />}></Route>
          <Route path="/medias/add" element={<AddMediaComponent />}></Route>
          <Route path="/medias/:id" element={<EditMediaComponent />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
};

export default AppRouter;
