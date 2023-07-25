import React from "react";
import { Navigate } from "react-router-dom";
import mediaStore from "../store/MediaStore";
import FormLayoutComponent from "./FormLayout";
import withRouter from "../withRouter";
import { Media } from "../medias/media.interface";

interface Props {
  params: {
    id: string
  }
}

interface State {
  media: Media
}

class EditMediaComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      media: {...mediaStore.getMediaById(parseInt(props.params.id))}
    };
    mediaStore.setEditFormInProgress(true);
  }

  editMedia = (media: Media) => {
    this.setState({media}, () => {
      mediaStore.updateMedia({
        ...this.state.media
      });
    });
    mediaStore.setEditFormInProgress(false);  
  }

  render = () => {
    return (
      <>    
        {this.state.media && <FormLayoutComponent media={this.state.media} submit={this.editMedia.bind(this)} />}
        {!mediaStore.isEditFormInProgress && <Navigate to="/medias" replace={true}></Navigate>}
      </>
    );
  }
}

export default withRouter(EditMediaComponent);
