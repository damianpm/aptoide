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
    div.className = 'element';

    const divPhoto = document.createElement('div');
    divPhoto.className = 'photo';
    div.appendChild(divPhoto);

    const image = document.createElement('img');
    image.setAttribute('src', `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
    image.className = 'image';
    divPhoto.appendChild(image);

    const rightCol = document.createElement('div');
    rightCol.className = 'right';
    const h2 = document.createElement('H2');
    var title = document.createTextNode(photo.title);
    h2.appendChild(title);
    rightCol.appendChild(h2);

    const button = document.createElement('button');
    var btnText = document.createTextNode('LOAD TAGS');
    button.appendChild(btnText);

    div.appendChild(rightCol);
    rightCol.appendChild(title);
    rightCol.appendChild(button);
    return div;
  }

  const makePhotos = data => {
    const allPhotos = data.photo.map(makeElement);
    const row = document.getElementById('container');
    allPhotos.forEach((photo) => {
      row.appendChild(photo);
    });
  }


  const getPhotoInfo = (url, callback) => {
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

  getPhotoInfo('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=96d0595fff116e11031cf6a34912dff9&photo_id=33507004534&secret=0c046ae02c&format=json&nojsoncallback=1&auth_token=72157680071162523-c22e1a501b5bcc0a&api_sig=d1afa150fface441a7a382e0ca1e0e99', function(err, data) {
    if (err != null) {
      console.log('Error: ' + err);
    } else {
      if (data.stat === 'ok') {
        console.log('Info of photo', data.photo.tags);
      }
    }
  });

});


//get info --->> for TAGS
// https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=96d0595fff116e11031cf6a34912dff9&photo_id=33507004534&secret=0c046ae02c&format=json&nojsoncallback=1&auth_token=72157680071162523-c22e1a501b5bcc0a&api_sig=d1afa150fface441a7a382e0ca1e0e99
