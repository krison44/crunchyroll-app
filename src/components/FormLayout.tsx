import React from "react";
import { Link } from "react-router-dom";
import { GENRE, MediaType } from "../medias/media.enum";
import { Media } from "../medias/media.interface";

interface Props {
  media: Media,
  submit: (data: Media) => void
}

interface State {
  media: Media
}

class FormLayoutComponent extends React.PureComponent<Props, State> {
  isFormPristine!: boolean;
  constructor(props: Props) {
    super(props);
    this.state = {
      media: this.props.media
    }
    this.isFormPristine = true;
  }

  handleInputChange = (event: any) => {
    const { value, name } = event.target;
    this.setState(previousState => ({
      media: {
        ...previousState.media,
        [name]: value
      }
    }));
    this.isFormPristine = false;
  }

  isFormValid = () => {
    if (this.state.media) {
      return Object.values(this.state.media).every(value => value);
    }
    return false;
  }
  
  render = () => {
    const mediaTypeOptions = Object.values(MediaType).map(mType => <option key={mType} value={mType}>{mType}</option>);
    const genreOptions = Object.values(GENRE).map(genre => <option key={genre} value={genre}>{genre}</option>);
    return (
      <>
        <form>
          <div className="form-group row my-2">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" value={this.state.media?.title} name="title" onChange={this.handleInputChange} placeholder="Enter Title" />
            </div>
          </div>
          <div className="form-group row my-2">
            <label className="col-sm-2 col-form-label">Type</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.media?.type} name="type" onChange={this.handleInputChange}>
                <option>Select Media Type...</option>
                {mediaTypeOptions}
              </select>
            </div>
          </div>
          <div className="form-group row my-2">
            <label className="col-sm-2 col-form-label">Genre</label>
            <div className="col-sm-10">
              <select className="form-control" value={this.state.media?.genre} name="genre" onChange={this.handleInputChange}>
                <option>Select Genre...</option>
                {genreOptions}
              </select>
            </div>
          </div>
          <div className="form-group row my-2">
            <label className="col-sm-2 col-form-label">Release Year</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" value={this.state.media?.releaseYear} name="releaseYear" onChange={this.handleInputChange} placeholder="Enter Release Year" />
            </div>
          </div>
          <div className="form-group row my-2">
            <label className="col-sm-2 col-form-label">Rating</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" value={this.state.media?.rating} name="rating" onChange={this.handleInputChange} placeholder="Enter Rating" min="1" max="10" />
            </div>
          </div>
          <button type="button" className="btn btn-primary float-end" onClick={() => this.props.submit(this.state.media)} disabled={!this.isFormValid() || this.isFormPristine}>Submit</button>
          <Link to ="/medias">
            <button type="button" className="btn btn-success float-end me-3">Back</button>
          </Link>
        </form>
      </>
    );
  }
}

export default FormLayoutComponent;
