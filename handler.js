var divList = [];
function submit(){
  document.getElementById("specific").hidden = false;
  let inputPrompt = document.getElementById("prompText").value;
  get(inputPrompt);

}
let key1 = 'sk-G3hXszobDo9IsDFZU';
let key2 = '0I9T3BlbkFJCIQ1imSeiGlu81REfbyh';
let API_KEY = key1+key2;

//fetch data from openai
function get(input){
  const data = {
    prompt: input,
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty:0,
    presence_penalty: 0,
  };

  fetch("https://api.openai.com/v1/engines/text-curie-001/completions",{
    method:"POST",
    headers: {
      'content-Type':'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
  .then((data) => data.json())
  .then((responseJSON) => {
    responseData = responseJSON.choices[0].text;
    updateDivList(input, responseData);
  });
}

//add the new completion to the top of the history list and refresh.
function updateDivList(prompt,responseData){
  //turn new completion to json object.
  let currentDivObj = {
    "prompt": prompt,
    "response": responseData
  };
  //add to the top of the array.
  divList.unshift(currentDivObj);
  const objDivList = JSON.parse(JSON.stringify(divList));
  //make div element using divlist
  refreshResponses(objDivList);
}

function refreshResponses(list){
  console.log(list);
  const divBlock = document.getElementById("divBlock");
  divBlock.innerHTML = '';
  for(i = 0; i<list.length; i++){
    //create response table
    const newDivBlock = document.createElement("table");
    newDivBlock.id = i;
    newDivBlock.className = "divblocks";
    if(newDivBlock.id ==0){
      newDivBlock.classList.add("zoom");
    }
    //prompt row
    var row1 = newDivBlock.insertRow();
    var cell1 = row1.insertCell();
    var cell2 = row1.insertCell();
    cell1.innerHTML = "Prompt: ";
    cell2.innerHTML = list[i].prompt;
    //response row
    var row2 = newDivBlock.insertRow();
    var cell1r2 = row2.insertCell();
    var cell2r2 = row2.insertCell();
    cell1r2.innerHTML = "Response:      ";
    cell2r2.innerHTML = list[i].response;

    //newDivBlock.innerHTML = "prompt: "+list[i].prompt+"response: "+list[i].response;
    divBlock.appendChild(newDivBlock);
  }

}
