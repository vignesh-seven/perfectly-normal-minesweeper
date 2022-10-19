// constants
const board = document.querySelector(".board")
const size = 10

// generating the board
function tableCreate() {
  const body = document.body,
        tbl = document.querySelector('.board');
  tbl.style.width = '500px';
  tbl.style.border = '1px solid black';

  for (let i = 0; i < size; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < size; j++) {
    
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
      td.style.border = '1px solid black';
      
    
    }
  }
  body.appendChild(tbl);
}

tableCreate();