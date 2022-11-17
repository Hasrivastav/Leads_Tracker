let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn =document.getElementById("save-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
 })
    

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems +="<li><a target='_blank' href=' " + myLeads[i]+ "'>" + myLeads[i]  +"</a></li>"
    listItems += `
        <li>
        <a target='_blank' href='${myLeads[i]}'>
        ${myLeads[i]}</a>
        </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// console.log(leadsFromLocalStorage)

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);

  console.log(localStorage.getItem("myLeads"));
});

// for (let i = 0  ;i< myLeads.length;i++){
//     //  ulEl.innerHTML+="<li>"+myLeads[i]+"</li>"
//   const li=  document.createElement("li")
//   li.textContent  = myLeads[i]
//   ulEl.append(li)

// ;}
