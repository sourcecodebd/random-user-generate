const loadPhotos = () => {
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => displayPhotos(data.results))
    .catch(e => console.log(e));
}
loadPhotos();

const displayPhotos = photos => {
  console.log(photos.slice(0, 10));
  const mainContainer = document.querySelector('.custom-card');
  const photoContainer = document.createElement('div');
  const detailContainer = document.createElement('div');
  mainContainer.classList.add('d-flex', 'flex-column', 'align-items-center', 'mx-auto');
  photoContainer.classList.add('photoContainer', 'my-4');
  photos.slice(0, 5000).forEach(photo => {
    mainContainer.textContent = '';
    var string_date = photo.dob.date;
    var date = new Date(string_date);
    photoContainer.innerHTML = `<img src="${photo.picture.large}">`;
    detailContainer.innerHTML =
      `
            <div class="text-center">
            <button onclick="loadModal('${photo.id.name}')" class="btn my-2">More Info</button>
            </div>
            <ul class="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active text-white" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Name</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-white" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Country</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link text-white" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">DOB</button>
            </li>
          </ul>
          <div class="tab-content p-2 text-center" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">${photo.name.title} ${photo.name.first} ${photo.name.last}</div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">${photo.location.country}</div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">${date}</div>
          </div>
        `
    mainContainer.appendChild(photoContainer);
    mainContainer.appendChild(detailContainer);
  })
}

const loadModal = (id) => {
  console.log(id);
  const modalContainer = document.querySelector('#modal');
  modalContainer.textContent = '';
  const infoContainer = document.createElement('div');
  if (id == "") {
    infoContainer.innerHTML =
      `
        <div id="custom-modal">
          <h5>Modal title</h5>
          <div class="text-center">
          <button onclick="closeModal('none')" class="btn">Close</button>
          </div>
          <p class="text-center text-white">No Id Exists!</p>
        </div>
  `
  }
  else {
    infoContainer.innerHTML =
      `
        <div id="custom-modal">
          <h5>Modal title</h5>
          <div class="text-center">
          <button onclick="closeModal('none')" class="btn">Close</button>
          </div>
          <p class="text-center text-white">ID: ${id}</p>
        </div>
  `
  }
  modalContainer.appendChild(infoContainer);
  closeModal('block');
}

function closeModal(displayStyle) {
  const hidden = document.getElementById('custom-modal');
  hidden.style.display = displayStyle;
}