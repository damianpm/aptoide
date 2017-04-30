document.addEventListener("DOMContentLoaded", function(event) {

  const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=2f70f1a0e94575ba10c9dda701454c42&format=json&nojsoncallback=1&auth_token=72157683214945415-d7d756b4368ff000&api_sig=69967c699d79bfd92a0a65d4a031e011';

  const getJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      const status = xhr.status;
      status == 200
        ? callback(null, xhr.response)
        : callback(status);
    };
    xhr.send();
  };

  getJSON(URL, function(err, data) {
    if (err != null) {
      console.log('Error: ' + err);
    } else {
      if (data.stat === 'ok') {
        makePhotos(data.photos);
      }
    }
  });

  const makeElement = (photo) => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    image.setAttribute('src', `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
    div.appendChild(image);

    return div;
  }

  const makePhotos = data => {
    const allPhotos = data.photo.map(makeElement);
    const row = document.getElementById('container');
    allPhotos.forEach((photo)=>{
      row.appendChild(photo);
    });
  }



});
