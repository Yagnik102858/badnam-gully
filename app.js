const API="https://dkrgjrrmlxbqnwjihevd.supabase.co/functions/v1/badnam-gully";
const form=document.getElementById("searchForm"),input=document.getElementById("nameInput"),status=document.getElementById("status"),result=document.getElementById("result"),personName=document.getElementById("personName"),description=document.getElementById("description"),memoryGallery=document.getElementById("memoryGallery"),closeResult=document.getElementById("closeResult");
form.addEventListener("submit",async e=>{
 e.preventDefault();const name=input.value.trim();if(!name)return;
 result.style.display="none";status.textContent="Looking up the memories…";
 try{const res=await fetch(API+"?lookup="+encodeURIComponent(name));if(!res.ok)throw new Error("lookup failed");
 const data=await res.json();if(!data.found){status.textContent="No memory found for that name.";return}
 status.textContent="";personName.textContent=data.name;description.textContent=data.description||"";memoryGallery.innerHTML="";
 const memories=data.memories||[];
 if(memories.length===0){memoryGallery.innerHTML='<div class="no-photo">No photos added yet.</div>'}
 memories.forEach((m,i)=>{const card=document.createElement("div");card.className="memory-item";if(m.image_url){const im=document.createElement("img");im.src=m.image_url;im.alt=data.name+" memory "+(i+1);card.appendChild(im)}if(m.caption){const cap=document.createElement("div");cap.className="memory-caption";cap.textContent=m.caption;card.appendChild(cap)}memoryGallery.appendChild(card)});
 result.style.display="block";result.scrollIntoView({behavior:"smooth",block:"center"});
 }catch(err){status.textContent="Something went wrong. Please try again."}});
closeResult.addEventListener("click",()=>{result.style.display="none";status.textContent=""});