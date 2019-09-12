let bgpage=chrome.extension.getBackgroundPage();
let word=bgpage.word;
let url=bgpage.url;

let ps=document.getElementsByTagName('p');
let footers=document.getElementsByTagName('footer');
let footer=footers[0];
footer.innerHTML="";
let mains=document.getElementsByTagName('main');
let main=mains[0];
let p=ps[0];
p.innerHTML=word;
let buttons=document.getElementsByTagName('button');
let button1=buttons[0];
let button2=buttons[1];
button1.addEventListener('click',save);
button2.addEventListener('click',getSaved);
main.innerHTML="";
function save(){
   
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        let found=0;
        for(let key of allKeys){
            if(key==url){
                found=1;
                chrome.storage.sync.get(key, function(item) {
                 
                    item[key].push(word);
                  });

            }
        }
        if(found==0){
        chrome.storage.sync.set({[url]: [word]}, function() {
       
      });
        }
  
    });
    footer.innerHtml="saved";
}


function getSaved(){

    
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
      if(allKeys==null){
          main.innerHTML="Nothing to show";
          return;
      }
        for(let key of allKeys){
     
                    chrome.storage.sync.get(key, function(items) {
                        let itemsArray=items[key];
                    let h3=document.createElement('h3');
                    let h4=document.createElement('h4');
                    let h5=document.createElement('h5');
                    h5.innerHTML="Remove";
                        h5.addEventListener('click',()=>{
                            chrome.storage.sync.remove(key,()=>{
                                footer.innerHTML="Deleted";
                            })
                        })
                        for(let item of itemsArray){
                            h4.innerHTML+=item.toString()+"\n";
                        }
                    h4.innerHTML+=key+"\n\n";
                    h3.appendChild(h4);
                    h3.appendChild(h5);
                        main.appendChild(h3);
                  });

            
        }
       
    });
 
}