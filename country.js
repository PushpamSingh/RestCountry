const countryName= new URLSearchParams(location.search).get('name');
// console.log(countryName);
const countrycontent=document.querySelector(".country-details");
const backbtn=document.querySelector(".back-btn");
let loader=document.querySelector("#loader");
let country=()=>{
    loader.classList.remove("hidden");
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).
   then((result) => result.json())
   .then((data)=>{
    // console.log(data);
    let border=document.createElement("div");
    border.classList.add("flex", "gap-6", "flex-wrap");
    if(data[0].borders){
    let borderarr=data[0].borders;
    // console.log(borderarr)
    borderarr.forEach(element => {
        fetch(`https://restcountries.com/v3.1/alpha/${element}`).then((res)=>res.json())
        .then(([borderdata])=>{
            // console.log(borderdata)
            let borderancher=document.createElement("a");
            borderancher.setAttribute("href",`/country.html?name=${borderdata.name.common}`);
            borderancher.classList.add("hover:border-b-2", "border-[gray]", "py-1", "px-2", "font-[600]", "text-xl")
            borderancher.innerText=borderdata.name.common;
            border.append(borderancher)
        })
    
    });
    }else{
        let borderancher=document.createElement("a");
        borderancher.setAttribute("href","#");
        borderancher.classList.add("hover:border-b-2", "border-[gray]", "py-1", "px-2", "font-[600]", "text-xs")
        borderancher.innerText="None";
        border.append(borderancher)
    }

    const countrydata=`
             <img src="${data[0].flags.svg}" alt="${countryName}" class="w-[35%] h-full max-[755px]:w-full max-[955px]:w-[80%] max-[955px]:h-[20%] shadow-3xl">
            <div class="flex flex-col gap-6">
                <h1 class="font-[800] text-2xl">${data[0].name.common}</h1>
            <div class="flex gap-8 max-[755px]:flex-col">
                <div>
                    <p><b>Native Name:-</b> ${data[0].name.nativeName?Object.values(data[0].name.nativeName)[0].common:data[0].name.common}</p>
                    <p><b>Populations:-</b>  ${(data[0].population).toLocaleString('en-IN')}</p>
                    <p><b>Region:-</b> ${data[0].region}</p>
                    <p><b>Sub Region:-</b> ${data[0].subregion?data[0].subregion:data[0].region}</p>
                    <p><b>Capital:-</b> ${data[0].capital}</p>
                </div>
                <div>
                    <p><b>Top Level Domain:-</b> ${data[0].tld.join(', ')}</p>
                    <p><b>Currency:-</b>  ${Object.values(data[0].currencies)[0].name}</p>
                    <p><b>Language:-</b> ${Object.values(data[0].languages).join(", ")}</p>
                </div>
            </div>
            <div class="flex flex-wrap justify-start items-center gap-4">
                <h1 class="font-[800] text-xl"><b>Border Countries</b></h1>
            </div>
            </div>
    `;
    countrycontent.innerHTML=countrydata;

    document.querySelector(".flex.flex-wrap.justify-start.items-center.gap-4").append(border);

   }).catch((e)=>{
    console.log("fetching error: ",e)
   }).finally(()=>{
    loader.classList.add("hidden");
   })
}

country();

backbtn.addEventListener(`click`,()=>{
    history.back();
})