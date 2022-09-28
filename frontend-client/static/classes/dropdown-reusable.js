function dropdownPress(name)
{
    let dp = document.querySelector(name);
    
    let dpCh = dp.children;
    let isPressed = dpCh[1].style.display == 'block' ? true : false;
    isPressed = !isPressed;
    if(isPressed)
    {
        
        dpCh[1].style.display="block";
        
    }
    else
    {
        dpCh[1].style.display="none";  
        getDropVal(name);
    }
}

function dropdownSelect(name, options, i)
{
    let dp = document.querySelector(name);
    dp.val = i;
    let dpCh = dp.children;
    dpCh[0].innerHTML=options[i].innerHTML;
    dpCh[1].style.display="none";  
}

function initDropDown(dname, name)
{
    
    let dp = document.querySelector(name);
    dp.val = -1;
    let dpCh = dp.children;
    dpCh[0].innerHTML=dname;
    dpCh[0].onclick = (e) => {
        e.preventDefault();
        dropdownPress(name);
      };

    dpCh[1].style.display="none";  
    let options=dpCh[1].children;
    for(let i = 0; i < options.length; i++)
    {
        options[i].onclick = (e) => {e.preventDefault();dropdownSelect(name, options, i);};
    }
}

function getDropVal(name)
{
    let dp = document.querySelector(name).val;
    return dp;
}

function selectDropVal(i, name)
{
    let dp = document.querySelector(name);
    dp.val = i;
    let dpCh = dp.children;
    let options=dpCh[1].children;
    dropdownSelect(name, options, i);
}

export {initDropDown, getDropVal, selectDropVal};