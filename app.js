// constants
const body =  document.body,
              tbl = document.querySelector('.board');
const size = 10

// calculate size of the board
  const viewLength = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  cellSize = (viewLength - 0.4 * viewLength) / 10

// 💣



// generating the board 
const bombValues = []

for (let i=0; i<size; i++) {
  bombValues[i] = [];
}

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (Math.random() < 0.2) {
      bombValues[i][j] = true
    } else {
      bombValues[i][j] = false
    }
  }
}

console.table(bombValues)

// generating the board and placing bombs
function fillTheBombs() {  // cell creation also happens here
  for (let i = 0; i < size; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < size; j++) {
      const td = tr.insertCell();
      if (bombValues[i][j]) {
        td.appendChild(document.createTextNode(`💣`));
      }
      td.classList.add("cell")
      td.style.width = `${cellSize}px`
      td.style.height = `${cellSize}px`
    }
  }
}
// fill the rest of the board with values
function fillTheValues() {  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      
      // calculate the adjBombs
      // put the adjBombs value in the cell
      //td.appendChild(document.createTextNode(`💣`));
      
      td.classList.add("cell")
      td.style.width = `${cellSize}px`
      td.style.height = `${cellSize}px`
    }
  }
}

fillTheBombs();


// on right-click event
tbl.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  // let cellX = getCellCordsX(cell), cellY = getCellCordsY(cell)

  e.target.innerText = "F"
  e.target.style.backgroundColor = 'white'
})

// on click event
tbl.addEventListener('click', (e) => {
  // e.preventDefault()
  let cellX = e.target.cellIndex
  let cellY = e.target.parentElement.rowIndex

  if(bombValues[cellY][cellX]) {
    console.log("bomb exploded at X: " + cellX + " Y: " + cellY + " game over")
    return
  } else {
    console.log("you are safe")
  }

  e.target.style.backgroundColor = 'red'
})



