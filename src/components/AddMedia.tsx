import React from "react";
import { Navigate } from "react-router-dom";
import { Media } from "../medias/media.interface";
import mediaStore from "../store/MediaStore";
import FormLayoutComponent from "./FormLayout";

interface Props {}

interface State {
  newMedia: Media
}

class AddMediaComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newMedia: {
        title: '',
        type: '',
        genre: '',
        releaseYear: '',
        rating: 0,
      }
    };
    mediaStore.setEditFormInProgress(true);
  }

  addNewMedia = (newMedia: Media) => {
    const arrayOfIds: number[] = [...mediaStore.medias.map(media => media.id)] as number[];
    this.setState({newMedia}, () => {
      mediaStore.addMedia({
        id: Math.max(...arrayOfIds) + 1,
        ...this.state.newMedia
      });
    });
    mediaStore.setEditFormInProgress(false);  
  }

  render = () => {
    return (
      <>        
        {this.state.newMedia && <FormLayoutComponent media={this.state.newMedia} submit={this.addNewMedia.bind(this)} />}
        {!mediaStore.isEditFormInProgress && <Navigate to="/medias" replace={true}></Navigate>}
      </>
    );
  }
}

export default AddMediaComponent;
