var titel=document.getElementById('titel');
var price=document.getElementById('price');
var ads=document.getElementById('ads');
var descount=document.getElementById('descount');
var count=document.getElementById('count');
var taxes=document.getElementById('taxes');
var total=document.getElementById('total');
var catogory=document.getElementById('catogory');
var submit=document.getElementById('submit');

var mood='create';
var tm;
function gettotal(){
    if(price.value != ""){
        result=( +price.value + +taxes.value + +ads.value)- +descount.value;
        total.innerHTML=result;
        total.style.background='rose'
    }
}

//creat product
var arraydate;
if(localStorage.product!=null){
  arraydate=JSON.parse(localStorage.product);
}else{
    arraydate = [];
}

function addclic()
{
    console.log('hee');
    var newpro={
        titel:titel.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        descount:descount.value,
        total:total.innerHTML,
        count:count.value,
        catogory:catogory.value,
    }
    if(mood==='create'){
        if(newpro.count > 1){
            for(var i=0; i<count;i++){
                arraydate.push(newpro);
            }
        }
        else{
            arraydate.push(newpro);
        }
    }
    else{
        arraydate[tm]=newpro;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    localStorage.setItem('product', JSON.stringify(arraydate));
    cleardate();
    shwodate();
}

//clear
function cleardate(){
  titel.value='';
  price.value='';
  taxes.value='';
  ads.value='';
  descount.value='';
  total.innerHTML='';
  count.value='';
  catogory.value='';
  

}

//read
function shwodate(){
    gettotal();
    var table="";
    for(var i=0;i<arraydate.length;i++){
       table +=`<tr>
       <td>${i}</td>
       <td>${arraydate[i].titel}</td>
       <td>${arraydate[i].price}</td>
       <td>${arraydate[i].taxes}</td>
       <td>${arraydate[i].ads}</td>
       <td>${arraydate[i].descount}</td>
       <td>${arraydate[i].total}</td>
       <td>${arraydate[i].count}</td>
       <td>${arraydate[i].catogory}</td>
       <td><button id="updata" onclick="updateDate(${i})" class="btn btn-outline-danger btn-sm">Update</button></td>
       <td><button id="delete"onclick="deletdate(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
   </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    var btndelete=document.getElementById('deletall');
    if(arraydate.length>0){
        btndelete.innerHTML=`
    <button onclick="deletall()" class=" btn btn-danger w-100">Delete All(${arraydate.length})</button>`
    } 
    else{
        btndelete.innerHTML='';
    } 
    
}  
shwodate()


//delete
function deletdate(i)
{
    arraydate.splice(i,1);
    localStorage.product=JSON.stringify(arraydate);
    shwodate();
}


//deletall
function  deletall(){
    localStorage.clear()
    arraydate.splice(0);
    shwodate();
}

//count


//update
function updateDate(i)
{
   titel.value=arraydate[i].titel;
   price.value=arraydate[i].price;
   taxes.value=arraydate[i].taxes;
   ads.value=arraydate[i].ads;
   descount.value=arraydate[i].titel;
   gettotal();
   count.style.display='noun';
  catogory.value=arraydate[i].catogory;
  submit.innerHTML='Update';
  mood='Update';
  tm=i;

  scroll({
    top:0,
behavior:'smooth',
    
  })
}


//search

var searchMood='titel';
function getSerchMood(id){
   
    var search=document.getElementById('saerch')
   
    if(id=='searchtitel'){
        searchMood='titel';
        search.placeholder='search by titel';
    }
    else{
        searchMood='catogory';
        search.placeholder='search by category';
    }
    search.focus()
    search.value='';
    shwodate();
}

function searchDate(value)
{
    if(searchMood=='titel'){
        for(var i=0; i<arraydate.length;i++)
        {
            if(arraydate[i].titel.includes(value))
            {
                table +=`<tr>
       <td>${i}</td>
       <td>${arraydate[i].titel}</td>
       <td>${arraydate[i].price}</td>
       <td>${arraydate[i].taxes}</td>
       <td>${arraydate[i].ads}</td>
       <td>${arraydate[i].descount}</td>
       <td>${arraydate[i].total}</td>
       <td>${arraydate[i].count}</td>
       <td>${arraydate[i].catogory}</td>
       <td><button id="updata" onclick="updateDate(${i})" class="btn btn-outline-danger btn-sm">Update</button></td>
       <td><button id="delete"onclick="deletdate(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
   </tr>`;
            }
        }
    }
    else
     {
        for(var i=0; i<arraydate.length;i++)
        {
            if(arraydate[i].catogory.includes(value))
            {
                table +=`<tr>
       <td>${i}</td>
       <td>${arraydate[i].titel}</td>
       <td>${arraydate[i].price}</td>
       <td>${arraydate[i].taxes}</td>
       <td>${arraydate[i].ads}</td>
       <td>${arraydate[i].descount}</td>
       <td>${arraydate[i].total}</td>
       <td>${arraydate[i].count}</td>
       <td>${arraydate[i].catogory}</td>
       <td><button id="updata" onclick="updateDate(${i})" class="btn btn-outline-danger btn-sm">Update</button></td>
       <td><button id="delete"onclick="deletdate(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
   </tr>`;
            }
        }
     }

    document.getElementById('tbody').innerHTML = table;

}







