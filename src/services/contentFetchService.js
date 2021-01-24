import { storage, db } from '../firebase';

/**
 * A content fetching service to be called from the top level app
 *   to preload content and images into the cache
 */
class ContentFetchService {
  /**
   * Parameters to specify where the images are that should be loaded
   * @param {string} collection
   * @param {string} document
   * @param {string | array} field
   */
  constructor(collection, document, field, field2) {
    this.collection = collection || 'general';
    this.document = document || 'static';
    this.field = field || 'photos';
    return (async () => {
      await this.getContent();
      this.photos = await this.cachePhotos(field);
      await this.cacheVideo();
      if (field2) {
        this.icons = await this.cachePhotos(field2);
      }
      return this;
    })();
  }

  async getContent() {
    await db
      .collection(this.collection)
      .doc(this.document)
      .get()
      .then((result) => {
        this.content = result.data();
      });
  }

  async cachePhotos(field) {
    let photos = {};
    if (typeof field === 'string') {
      this.content &&
        this.content[field] &&
        this.content[field].forEach((photo) => {
          storage
            .child(photo)
            .getDownloadURL()
            .then((url) => {
              const img = new Image();
              img.src = url;
              photos[photo] = img;
            });
        });
    } else {
      // todo: obvs this will only work for a specific style of array;
      //    should make this work for any size of array
      this.content &&
        this.content[field[0]] &&
        this.content[field[0]].forEach((project) => {
          project[field[1]] &&
            project[field[1]].forEach((photo) => {
              storage
                .child(field[2] ? photo[field[2]] : photo)
                .getDownloadURL()
                .then((url) => {
                  const img = new Image();
                  img.src = url;
                  if (field[2]) {
                    img.alt = photo[field[3]];
                  }
                  if (!photos[project.title]) {
                    photos[project.title] = {};
                  }
                  if (field[2]) {
                    photos[project.title][photo[field[2]]] = img;
                  } else {
                    photos[project.title][photo] = img;
                  }
                });
            });
        });
    }
    return photos;
  }

  async cacheVideo() {
    this.videos = {};
    this.content &&
      this.content[this.field[0]] &&
      this.content[this.field[0]].forEach((project) => {
        project.video &&
          storage
            .child(project.video)
            .getDownloadURL()
            .then((url) => {
              const vid = document.createElement('video');
              vid.src = url;
              if (!this.videos[project.title]) {
                this.photos[project.title] = {};
              }
              this.videos[project.title] = vid;
            });
      });
  }
}

export default ContentFetchService;
