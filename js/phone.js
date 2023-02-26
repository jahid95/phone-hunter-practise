const spinner = document.getElementById('spinner');
function spinnerToggle(loadSpinner) {
  if (loadSpinner) {
    spinner.classList.remove('d-none');
  } 
  else {
    spinner.classList.add('d-none');
  }
}

const loadPhones = async (searchText, dataLimit) => { 
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {  
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.textContent = '';

  const showAll = document.getElementById('show-all');
  if(typeof dataLimit =='number' && phones.length > dataLimit){
    phones = phones.slice(0, 5);
    showAll.classList.remove('d-none');    
  }
  else{       
    showAll.classList.add('d-none');
    document.getElementById('input-field').value ='';
  }

  const errorMessage = document.getElementById('error-message');
  if (phones.length === 0) {
    errorMessage.classList.remove('d-none');
  } else {
    errorMessage.classList.add('d-none');
  }  
  
  phones.forEach(phone => {
    console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card p-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `;
    phonesContainer.appendChild(div);
  })
  spinnerToggle(false);
  
}

function processSearch(dataLimit){  
  const searchText = document.getElementById('input-field').value;
  loadPhones(searchText,dataLimit);
  spinnerToggle(true);  
}

document.getElementById('btn-search').addEventListener('click', function () {
  processSearch(5);
})
document.getElementById('input-field').addEventListener('keyup', function (e) {
  if(e.key === 'Enter'){
    processSearch(5);
  }
})

document.getElementById('btn-show-all').addEventListener('click', function () {
  
  processSearch();
})

loadPhones('samsung');


