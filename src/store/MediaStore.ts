import { observable, action, autorun, runInAction, makeObservable, toJS, computed } from 'mobx';
import { Media } from "../medias/media.interface";
import { createRandomMedia } from "../medias/media.stubdata";

class MediaStore {
  medias: Media[] = [];
  isEditFormInProgress: boolean = false;

  constructor() {
    makeObservable(this, {
      medias: observable,
      isEditFormInProgress: observable,
      fetchMedias: action,
      addMedia: action,
      updateMedia: action,
      deleteMedia: action,
      setEditFormInProgress: action,
      getMediaById: computed
    });
  }

  fetchMedias() {
    try {
      this.medias = createRandomMedia(10);
    } catch (error) {
      throw error;
    }
  }

  get getMediaById() {
    return (id: number) => toJS(this.medias.find(media => media.id === id));
  }

  addMedia(newMedia: Media) {
    try {
      runInAction(() => newMedia && this.medias.push(newMedia));
    } catch (error) {
      throw error;
    }
  }

  updateMedia(updatedMedia: Media) {
    try {
      const mediaToUpdate = this.medias.find(media => media.id === updatedMedia.id)
      if (mediaToUpdate) {
        mediaToUpdate.title = updatedMedia.title;
        mediaToUpdate.type = updatedMedia.type;
        mediaToUpdate.genre = updatedMedia.genre;
        mediaToUpdate.releaseYear = updatedMedia.releaseYear;
        mediaToUpdate.rating = updatedMedia.rating;
      }
    } catch (error) {
      throw error;
    }
  }

  deleteMedia(id: number) {
    try {
      runInAction(() => this.medias = this.medias.filter((media) => media.id !== id));
    } catch (error) {
      throw error;
    }
  }

  setEditFormInProgress(value: boolean) {
    runInAction(() => this.isEditFormInProgress = value);
  }
}

const mediaStore = new MediaStore();

autorun(() => {
  console.log('[autorun]', toJS(mediaStore));
});

export default mediaStore;
