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
  constructor(collection, document, field) {
    this.collection = collection || 'general';
    this.document = document || 'static';
    this.field = field || 'photos';
    return (async () => {
      await this.getContent();
      await this.cachePhotos();
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

  async cachePhotos() {
    this.photos = {};
    if (typeof this.field === 'string') {
      this.content &&
        this.content[this.field] &&
        this.content[this.field].forEach((photo) => {
          storage
            .child(photo)
            .getDownloadURL()
            .then((url) => {
              const img = new Image();
              img.src = url;
              this.photos[photo] = img;
            });
        });
    } else {
      // todo: obvs this will only work for a 2-item array;
      //    should make this work for any size of array
      this.content &&
        this.content[this.field[0]] &&
        this.content[this.field[0]].forEach((project) => {
          project[this.field[1]] &&
            project[this.field[1]].forEach((photo) => {
              storage
                .child(photo)
                .getDownloadURL()
                .then((url) => {
                  const img = new Image();
                  img.src = url;
                  if (!this.photos[project.title]) {
                    this.photos[project.title] = {};
                  }
                  this.photos[project.title][photo] = img;
                });
            });
        });
    }
  }
}

export default ContentFetchService;
