 window.word="";
 window.url="";
chrome.runtime.onMessage.addListener((req,sender,sendResponse)=>{
    window.word=req.txt;
    window.url=req.url;
})