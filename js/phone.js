const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone =>{
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
}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchText = document.getElementById('input-field').value;
    loadPhones(searchText);
    document.getElementById('input-field').value = '';
})

loadPhones();