
window.addEventListener('mouseup',()=>{
  let url=window.location.href.toString();

    let selectedTxt=window.getSelection().toString().trim();
 
    if(selectedTxt.length>0){
        let msg={
            txt:selectedTxt,
            url:url
        }
        chrome.runtime.sendMessage(msg);
    }
})