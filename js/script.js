
let interList = [];
let rejectList = [];
let currentStatus = 'all';

let totalCount = document.getElementById('total-count');
let interCount = document.getElementById('inter-count');
let rejectCount = document.getElementById('reject-count');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');


const avilableJovCount = document.getElementById('available-job-count');
const deleteBtn = document.querySelectorAll('#delete-btn');

const allCards = document.getElementById('allcards');
const filterCard = document.getElementById('filter-card');



function count() {
  interCount.innerText = interList.length;
  rejectCount.innerText = rejectList.length;
}



function toggleStyle(id) {
  allBtn.classList.remove('bg-blue-500');
  interviewBtn.classList.remove('bg-blue-500');
  rejectedBtn.classList.remove('bg-blue-500');

  allBtn.classList.add('bg-transparent');
  interviewBtn.classList.add('bg-transparent');
  rejectedBtn.classList.add('bg-transparent');

  const selected = document.getElementById(id);

  currentStatus = id;

  selected.classList.remove('bg-transparent');
  selected.classList.add('bg-blue-500');

  if(id === 'interview-btn'){
    allCards.classList.add('hidden');
    filterCard.classList.remove('hidden');
    renderInterview()
  }else if(id === 'all-btn') {
    allCards.classList.remove('hidden');
    filterCard.classList.add('hidden');
  }else if (id === "rejected-btn") {
    allCards.classList.add('hidden');
    filterCard.classList.remove('hidden');
    renderRejected();
  }

}


const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function (event){
  
  if(event.target.classList.contains("inter-btn")) {
    const parenNode = event.target.parentNode.parentNode;
    const companyName = parenNode.querySelector('.company-name').innerText;
    const postName = parenNode.querySelector('.post-name').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const status = parenNode.querySelector('.status').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'INTERVIEW';


    const fullInfo = {
      companyName, 
      postName, 
      salary, 
      status:'INTERVIEW', 
      notes
    };

  
    const exitCompanyName = interList.find(item => item.companyName === fullInfo.companyName);
    
    
    if(!exitCompanyName) {
      interList.push(fullInfo);
    }
    
    rejectList = rejectList.filter(item => item.companyName !== fullInfo.companyName);

    count();
    
    if(currentStatus === 'rejected-btn') {
      renderRejected()
    }

  }else if(event.target.classList.contains("reject-btn")) {
    const parenNode = event.target.parentNode.parentNode;
    const companyName = parenNode.querySelector('.company-name').innerText;
    const postName = parenNode.querySelector('.post-name').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const status = parenNode.querySelector('.status').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'REJECTED';


    const fullInfo = {
      companyName, 
      postName, 
      salary, 
      status:'REJECTED', 
      notes
    };

  
    const exitCompanyName = rejectList.find(item => item.companyName === fullInfo.companyName);
    
    
    if(!exitCompanyName) {
      rejectList.push(fullInfo);
    }

    interList = interList.filter(item => item.companyName !== fullInfo.companyName);

    if(currentStatus === 'interview-btn') {
      renderInterview();
    }

    count();
  }
 

  
});


function renderInterview() {
  filterCard.innerHTML = '';
  for(let inter of interList) {
    let div = document.createElement('div');
    div.className = 'flex justify-between border-2 border-gray-700 rounded-xl p-6 my-6';
    div.innerHTML = `
      <div class="space-y">
        <h2 class="company-name text-[20px] text-white font-semibold">${inter.companyName}</h2>
        <h3 class="post-name text-[17px] text-gray-400">${inter.postName}</h3>
        <p class="salary text-[15px] text-gray-300 my-4">${inter.salary}</p>
        <button class="status bg-gray-700 border border-gray-700 text-white py-2 px-6 rounded-md mr-2">${inter.status}</button>
        <P class="notes text-[14px] text-gray-400 mt-3 mb-4">${inter.notes}</P>
        <button class="inter-btn border border-green-300 text-green-300 py-2 px-6 rounded-md mr-2 cursor-pointer">INTERVIEW</button>
        <button class="reject-btn border border-red-500 text-red-500 py-2 px-6 rounded-md mr-2 cursor-pointer">REJECTED</button>
      </div>
      <div>
        <i id="delete-btn" class='bx bx-trash text-gray-400 text-[18px] bg-gray-700 w-8 h-8 inline-flex justify-center items-center text-center p-1.5 rounded-full cursor-pointer'></i>
      </div>
    `
    filterCard.appendChild(div);
  }
}

function renderRejected() {
  filterCard.innerHTML = '';
  for(let reject of rejectList) {
    let div = document.createElement('div');
    div.className = 'flex justify-between border-2 border-gray-700 rounded-xl p-6 my-6';
    div.innerHTML = `
      <div class="space-y">
        <h2 class="company-name text-[20px] text-white font-semibold">${reject.companyName}</h2>
        <h3 class="post-name text-[17px] text-gray-400">${reject.postName}</h3>
        <p class="salary text-[15px] text-gray-300 my-4">${reject.salary}</p>
        <button class="status bg-gray-700 border border-gray-700 text-white py-2 px-6 rounded-md mr-2">${reject.status}</button>
        <P class="notes text-[14px] text-gray-400 mt-3 mb-4">${reject.notes}</P>
        <button class="inter-btn border border-green-300 text-green-300 py-2 px-6 rounded-md mr-2 cursor-pointer">INTERVIEW</button>
        <button class="reject-btn border border-red-500 text-red-500 py-2 px-6 rounded-md mr-2 cursor-pointer">REJECTED</button>
      </div>
      <div>
        <i id="delete-btn" class='bx bx-trash text-gray-400 text-[18px] bg-gray-700 w-8 h-8 inline-flex justify-center items-center text-center p-1.5 rounded-full cursor-pointer'></i>
      </div>
    `
    filterCard.appendChild(div);
  }
}

deleteBtn.forEach(btn => {
  btn.addEventListener('click', function() {
    alert('are you sure?');
    this.parentElement.parentElement.remove();
    totalCount.innerText = allCards.children.length;
    avilableJovCount.innerText = allCards.children.length;
  });
});












