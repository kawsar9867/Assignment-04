let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");
const jobUpdate = document.getElementById("job-update");
const allCardSection = document.getElementById("all-cards");
const mainContainer = document.getElementById("main-container");
const filterSection = document.getElementById("filtered-section");

const allFilterBtn = document.getElementById("filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// COUNTER UPDATE
function countCalculate() {
  const allJobCards = Array.from(allCardSection.children).filter(function(card) {
    return card.id !== "no-job"; 
  });
  totalCount.innerText = allJobCards.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

// JOB POSITION UPDATE
function updateJobPositions() {
  const allCards = Array.from(allCardSection.children);
  const totalJobs = allCards.filter(function(card) {
    return card.id !== "no-job";
  }).length;
  if (!allCardSection.classList.contains("hidden")) {
    jobUpdate.innerText = `${totalJobs} jobs`;
  } 
  else {
    const filteredCards = Array.from(filterSection.children).filter(function(card) {
      return card.id !== "no-job";
    });
    const currentJobs = filteredCards.length;
    if (currentJobs === 0) {
      jobUpdate.innerText = "0 jobs";
    } 
    else {
      jobUpdate.innerText = `${currentJobs} of ${totalJobs}`;
    }
  }
}

// TOGGLE FILTER STYLE
function toggleStyle(id) {
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-white", "text-gray-500");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("bg-white", "text-gray-500");
  selected.classList.add("bg-blue-500", "text-white");

  if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected();
  } else {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  }

  updateJobPositions();
}

// EVENT LISTENER 
mainContainer.addEventListener("click", function(event) {
  const card = event.target.closest(".card, .space-y-4");
  if (!card) return;

  const plantName = card.querySelector(".job-title")?.innerText;
  const workName = card.querySelector(".job-role")?.innerText;
  const salary = card.querySelector(".salary")?.innerText;
  const discription = card.querySelector(".discription")?.innerText;

  // INTERVIEW BUTTON
  if (event.target.classList.contains("interview-btn")) {
    rejectedList = rejectedList.filter(item => !(item.plantName === plantName && item.workName === workName));
    const cardInfo = { plantName, workName, salary, status: "INTERVIEW", discription };

    const statusSpan = card.querySelector(".status");
    if (statusSpan) {
      statusSpan.innerText = "INTERVIEW";
      statusSpan.classList.remove("bg-red-100", "text-red-700");
      statusSpan.classList.add("bg-green-500", "text-[#002C5C]");
    }

    if (!interviewList.find(item => item.plantName === plantName && item.workName === workName))
      interviewList.push(cardInfo);

    countCalculate();

    if (rejectedFilterBtn.classList.contains("bg-blue-500")) toggleStyle("interview-filter-btn");
    else if (interviewFilterBtn.classList.contains("bg-blue-500")) renderInterview();

    updateJobPositions();
  }

  // REJECTED BUTTON
  if (event.target.classList.contains("rejected-btn")) {
    interviewList = interviewList.filter(item => !(item.plantName === plantName && item.workName === workName));
    const cardInfo = { plantName, workName, salary, status: "REJECTED", discription };

    const statusSpan = card.querySelector(".status");
    if (statusSpan) {
      statusSpan.innerText = "REJECTED";
      statusSpan.classList.remove("bg-green-500", "text-[#002C5C]");
      statusSpan.classList.add("bg-red-100", "text-red-700");
    }

    if (!rejectedList.find(item => item.plantName === plantName && item.workName === workName))
      rejectedList.push(cardInfo);

    countCalculate();

    if (interviewFilterBtn.classList.contains("bg-blue-500")) { renderInterview(); toggleStyle("rejected-filter-btn"); }
    else if (rejectedFilterBtn.classList.contains("bg-blue-500")) renderRejected();

    updateJobPositions();
  }

  // DELETE BUTTON
  if (event.target.closest(".delete-btn") || event.target.closest(".fa-trash-can")) {
    interviewList = interviewList.filter(item => !(item.plantName === plantName && item.workName === workName));
    rejectedList = rejectedList.filter(item => !(item.plantName === plantName && item.workName === workName));

    card.remove();
    countCalculate();

    if (!allCardSection.classList.contains("hidden")) { updateJobPositions(); return; }
    if (interviewFilterBtn.classList.contains("bg-blue-500")) renderInterview();
    else if (rejectedFilterBtn.classList.contains("bg-blue-500")) renderRejected();

    updateJobPositions();
  }
});

// RENDER INTERVIEW LIST
function renderInterview() {
  filterSection.innerHTML = "";
  if (interviewList.length === 0) { showNoJob(); updateJobPositions(); return; }

  interviewList.forEach(interview => {
    const div = document.createElement("div");
    div.className = "space-y-4 bg-white p-[24px] mt-[16px]";
    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h3 class="job-title font-semibold">${interview.plantName}</h3>
          <p class="job-role text-[#64748B]">${interview.workName}</p>
        </div>
        <button class="delete-btn w-10 h-10 flex items-center justify-center border-2 border-gray-500 opacity-60 rounded-full hover:opacity-100 hover:border-red-500 transition duration-200">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p class="salary text-[#64748B] text-[14px]/[20px] mt-4">${interview.salary}</p>
      <div>
        <span class="status p-[8px] rounded-md text-[#002C5C] inline bg-green-500">${interview.status}</span>
        <p class="discription mt-[10px] text-[#323B49]">${interview.discription}</p>
      </div>
      <div>
        <button class="btn btn-outline btn-success interview-btn">INTERVIEW</button>
        <button class="btn btn-outline btn-error rejected-btn">REJECTED</button>
      </div>
    `;
    filterSection.appendChild(div);
  });

  updateJobPositions();
}

// RENDER REJECTED LIST
function renderRejected() {
  filterSection.innerHTML = "";
  if (rejectedList.length === 0) { showNoJob(); updateJobPositions(); return; }

  rejectedList.forEach(rejected => {
    const div = document.createElement("div");
    div.className = "space-y-4 bg-white p-[24px] mt-[16px]";
    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h3 class="job-title font-semibold">${rejected.plantName}</h3>
          <p class="job-role text-[#64748B]">${rejected.workName}</p>
        </div>
        <button class="delete-btn w-10 h-10 flex items-center justify-center border-2 border-gray-500 opacity-60 rounded-full hover:opacity-100 hover:border-red-500 transition duration-200">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p class="salary text-[#64748B] text-[14px]/[20px] mt-4">${rejected.salary}</p>
      <div>
        <span class="bg-red-100 text-red-700 px-3 py-2 rounded-md inline">${rejected.status}</span>
        <p class="discription mt-[10px] text-[#323B49]">${rejected.discription}</p>
      </div>
      <div>
        <button class="btn btn-outline btn-success interview-btn">INTERVIEW</button>
        <button class="btn btn-outline btn-error rejected-btn">REJECTED</button>
      </div>
    `;
    filterSection.appendChild(div);
  });

  updateJobPositions();
}

// NO JOB CARD
function showNoJob() {
  const div = document.createElement("div");
  div.id = "no-job";
  div.className = "card h-[250px] bg-white mt-[16px] mb-5";
  div.innerHTML = `
    <div class="text-center m-auto">
      <img src="img/png1.png" alt="No job png" class="m-auto" />
      <h2 class="text-[#002C5C] text-[24px]">No jobs available</h2>
      <p class="text-[#64748B]">Check back soon for new job opportunities</p>
    </div>
  `;
  filterSection.appendChild(div);
}

// PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
  toggleStyle("filter-btn");
  countCalculate();
  updateJobPositions();
});