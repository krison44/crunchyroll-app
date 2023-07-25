import React from 'react';
import './App.scss';
import { Media } from './medias/media.interface';
import AppRouter from './App.router';
import mediaStore from './store/MediaStore';

class App extends React.PureComponent {
  constructor(props: {medias: Media[]}) {
    super(props);
    mediaStore.fetchMedias();
  }
  
  render() {
    return (
      <div className="container-fluid">
        <AppRouter />
      </div>
    )
  }
}

export default App;
