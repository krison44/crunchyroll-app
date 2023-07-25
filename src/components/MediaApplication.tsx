import React from "react";
import { Link } from "react-router-dom";
import mediaStore from "../store/MediaStore";
import { Media } from "../medias/media.interface";

interface Props {}

interface State {
  medias: Media[]
}

class MediaApplicationComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      medias: mediaStore.medias
    }
  }

  deleteMedia = (media: Media) => {
    if (media?.id) {
      if (window.confirm(`Are you sure you want to delete ${media.title} ${media.type} released on ${media.releaseYear}?`) == true) {
        mediaStore.deleteMedia(media.id);
        this.setState({ medias: mediaStore.medias })
      }
    }
  }

  render = () => {
    return (
      <>
        <h3>Media List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SN</th>
              <th>Title</th>
              <th>Type</th>
              <th>Genre</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.medias.map((media, index) => (
              <tr key={media.id}>
                <td>{index + 1}</td>
                <td>{media.title}</td>
                <td>{media.type}</td>
                <td>{media.genre}</td>
                <td>{media.releaseYear}</td>
                <td>{media.rating}</td>
                <td>
                  <Link to={`${media.id}`}>
                    <button className="btn btn-success btn-sm me-2">Edit</button>
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => this.deleteMedia(media)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/medias/add">
          <button className="btn btn-primary float-end">Add Media</button>
        </Link>
      </>
    );
  }
}

export default MediaApplicationComponent
