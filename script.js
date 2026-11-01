const fields=['roll','name','course','semester','marks'];
let currentStudentArray=[];
let allStudentsArray=[];
const $=id=>document.getElementById(id);
const demoStudents=[
['BCA-2024-001','Aarav Sharma','BCA · Computer Applications','Semester 4','88.5% · A+'],
['BCA-2024-002','Meera Singh','BCA · Data Science','Semester 4','92% · A+'],
['BCA-2024-003','Kabir Das','BCA · Cloud Computing','Semester 3','81% · A'],
['BCA-2024-004','Ananya Roy','BCA · Software Development','Semester 5','86% · A'],
['BCA-2024-005','Rohan Kumar','BCA · Cyber Security','Semester 2','79% · B+']
];
function values(){return fields.map(id=>$(id).value.trim())}
function updateCurrent(){currentStudentArray=values();$('currentArray').textContent=currentStudentArray.some(Boolean)?JSON.stringify(currentStudentArray,null,2):'// Active input values appear here\n[]'}
fields.forEach(id=>$(id).addEventListener('input',updateCurrent));
function notify(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
function render(){const n=allStudentsArray.length;$('used').textContent=n;$('totalLabel').textContent=`${n} / 5`;$('displayCount').textContent=`${n} / 5 DISPLAYED`;$('progress').style.width=(n/5*100)+'%';$('allArray').textContent=JSON.stringify(allStudentsArray,null,2);const host=$('records');host.innerHTML='';if(!n){host.innerHTML='<div class="empty"><div class="empty-icon">▤</div><h3>No records added yet</h3><p>Enter student details in the form, or use the demo data to see how records appear in this area.</p><button class="btn secondary" type="button" id="demoBtnInner">Populate 5 demo students</button></div>';$('demoBtnInner').addEventListener('click',populateDemo);return}allStudentsArray.forEach((s,i)=>{const card=document.createElement('article');card.className='student';const initials=s[1].split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();card.innerHTML=`<div class="student-top"><div class="avatar"></div><div class="roll"></div></div><h3></h3><div class="course"></div><div class="details"><span class="semester"></span><span class="grade"></span></div>`;card.querySelector('.avatar').textContent=initials;card.querySelector('.roll').textContent=s[0];card.querySelector('h3').textContent=s[1];card.querySelector('.course').textContent=s[2];card.querySelector('.semester').textContent=s[3];card.querySelector('.grade').textContent=s[4];host.appendChild(card)})}
$('studentForm').addEventListener('submit',e=>{e.preventDefault();const data=values();$('message').textContent='';if(data.some(x=>!x)){ $('message').textContent='Please complete all five fields.';return}if(allStudentsArray.length>=5){$('message').textContent='The record capacity is full. Clear a record before adding another.';return}if(allStudentsArray.some(s=>s[0].toLowerCase()===data[0].toLowerCase())){$('message').textContent='That roll number already exists.';return}allStudentsArray.push(data);$('studentForm').reset();updateCurrent();render();notify('Student record stored successfully.')});
$('sampleBtn').addEventListener('click',()=>{const s=demoStudents[0];fields.forEach((id,i)=>$(id).value=s[i]);updateCurrent();$('message').textContent='Sample details loaded. Press Store record to add them.'});
$('resetBtn').addEventListener('click',()=>{$('studentForm').reset();$('message').textContent='';updateCurrent()});
function populateDemo(){allStudentsArray=demoStudents.map(s=>[...s]);$('studentForm').reset();$('message').textContent='';updateCurrent();render();notify('Five demo records loaded.')}
$('demoBtn').addEventListener('click',populateDemo);
$('clearBtn').addEventListener('click',()=>{if(!allStudentsArray.length){notify('There are no records to clear.');return}allStudentsArray=[];$('studentForm').reset();$('message').textContent='';updateCurrent();render();notify('All student records cleared.')});
updateCurrent();render();
