//CONSTANTES
const calculator=document.querySelector('.calculator');
const display=document.querySelector('.calculator__display');
const keys=document.querySelector('.calculator__keys');

keys.addEventListener('click', e =>{
  if(!e.target.matches('button'))return;
  const key=e.target;
  const action=key.dataset.action;
  const keyContent=key.textContent;
  const displayedNum=display.textContent;
  const previousKeyType=calculator.dataset.previousKeyType;
  // NÚMEROS
  if(!action){
    if(displayedNum==='0' || previousKeyType==='operator'){
      display.textContent=keyContent;
    }else{
      display.textContent=displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType='number';
  }
  // DECIMAL
  if(action==='decimal') {
    if(!displayedNum.includes('.')){
      display.textContent=displayedNum +'.';
    }
    calculator.dataset.previousKeyType='decimal';
  }
  // OPERADORES
  if(
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ){
    calculator.dataset.firstValue=displayedNum;
    calculator.dataset.operator=action;
    calculator.dataset.previousKeyType='operator';
  }
  // CALCULAR
  if(action==='calculate'){
    const firstValue=calculator.dataset.firstValue;
    const operator=calculator.dataset.operator;
    const secondValue=displayedNum;
    display.textContent=calculate(firstValue, operator, secondValue);
    calculator.dataset.previousKeyType = 'calculate';
  }
  // LIMPIAR
  if(action==='clear'){
    display.textContent='0';
    calculator.dataset.firstValue='';
    calculator.dataset.operator='';
    calculator.dataset.previousKeyType='';
  }
});
// FUNCIÓN CALCULOS
function calculate(n1, operator, n2) {
  const firstNum=parseFloat(n1);
  const secondNum=parseFloat(n2);
  if(operator === 'add') return firstNum + secondNum;
  if(operator === 'subtract') return firstNum - secondNum;
  if(operator === 'multiply') return firstNum * secondNum;
  if(operator === 'divide') return firstNum / secondNum;
  return secondNum;
}