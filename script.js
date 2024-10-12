let countrylist=document.querySelector(".country-list");
let filter=document.querySelector(".filter-by-region");
let loader=document.querySelector("#loader");
let searchbar=document.querySelector(".search input");
let CountriesData;
let countryapi=async()=>{
    countrylist.innerHTML=``;
    loader.classList.remove("hidden");
    try{
    let promise= await fetch("https://restcountries.com/v3.1/all")
    let countrydata=await promise.json();
    CountriesData= countrydata;
    countrydata.forEach(country => {
       RenderCountry(country);
    });
}catch(e){
    console.log("Fetching Error is : ",e);
} finally{
    loader.classList.add("hidden");
}
    
}

filter.addEventListener('change',(e)=>{
    countrylist.innerHTML=``;
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res)=>res.json())
    .then(data=>{
        data.forEach((regionCountry)=>{
            // console.log(regionCountry)
            RenderCountry(regionCountry)
            
        });
    }).catch((e)=>{
        console.log("fetching error: ",e);
    });
})

const RenderCountry=(country)=>{
    // console.log(country.name.common);
     let countrydiv=document.createElement('div');
     countrydiv.classList.add("country-card", "w-[250px]", "max-h-[350px]", "rounded-lg",
                              "shadow-2xl", "overflow-hidden", "my-6", "transition-all", "hover:scale-[1.05]", "cursor-pointer")
      countrydiv.innerHTML = `
           <a href="/country.html?name=${country.name.common}" class="flex flex-col gap-5">
                 <img src="${country.flags.svg}" alt="" class="w-full h-[170px] shadow-3xl">
                 <div class="px-4 mb-7">
                     <h1 class="font-[700] text-xl py-3">${country.name.common}</h1>
                     <p class=""><b>Population:- </b> ${(country.population).toLocaleString('en-IN')}</p>
                     <p class=""><b>Region:-</b> ${country.region}</p>
                     <p class=""><b>Capital:-</b> ${country.capital}</p>
                 </div>
             </a>
             `;
             if (countrylist) {
                 countrylist.append(countrydiv);
               } else {
                 console.error("Country list element not found.");
               }
}

searchbar.addEventListener(`input`,(e)=>{
            let inputSearch=e.target.value.toLowerCase();
            countrylist.innerHTML=``;
            let filteredCountry=CountriesData.filter((country)=>country.name.common.toLowerCase().includes(inputSearch))
            // console.log(filteredCountry)

            filteredCountry.forEach((searchCountry)=>{
                RenderCountry(searchCountry);
            })

            if(filteredCountry.length===0){
                countrylist.innerHTML=`<p class="text-center my-4">No results found.</p>`
            }
})

let modebtn=document.querySelector(".mode");
let lightimg=document.querySelector(".light");
let darkimg=document.querySelector(".dark");
let header=document.querySelector("header");
let searchsection=document.querySelector(".searchAndfilter");
let countrySection=document.querySelector("main section");
let selector=document.querySelector("main select");
let countrylistAncher=countrylist.querySelector("a");
let mode=`light`;

modebtn.addEventListener('click',(e)=>{
        if(mode==='light'){
            darkimg.classList.remove("hidden");
            lightimg.classList.add("hidden");
            header.classList.add(`bg-[#2b3945]`,`text-[white]`);
            searchbar.classList.add(`bg-[#2b3945]`,`text-[white]`);
            selector.classList.add(`bg-[#2b3945]`,`text-[white]`);
            modebtn.classList.add(`border-[white]`);
            modebtn.classList.remove(`border-gray-900`);
            searchsection.classList.add(`bg-[#202c37]`)
            countrySection.classList.add(`bg-[#202c37]`,`text-[white]`)
            document.querySelector("body").classList.add(`bg-[#202c37]`)
            document.querySelector(".mode h3").innerText="Light Mode";
            // countrylistAncher.forEach('ele',()=>{
            //         ele.classList.add(`bg-[#2b3945]`,`text-[white]`)
            // })
            mode='dark';
        }else{
            darkimg.classList.add("hidden");
            lightimg.classList.remove("hidden");
            header.classList.remove(`bg-[#2b3945]`,`text-[white]`);
            searchbar.classList.remove(`bg-[#2b3945]`,`text-[white]`);
            selector.classList.remove(`bg-[#2b3945]`,`text-[white]`);
            modebtn.classList.remove(`border-[white]`);
            modebtn.classList.add(`border-gray-900`);
            searchsection.classList.remove(`bg-[#202c37]`)
            countrySection.classList.remove(`bg-[#202c37]`,`text-[white]`)
            document.querySelector("body").classList.remove(`bg-[#202c37]`);
            document.querySelector(".mode h3").innerText="Dark Mode";
            // countrylistAncher.forEach('ele',()=>{
            //     ele.classList.remove(`bg-[#2b3945]`,`text-[white]`)
            // })
            mode=`light`;
        }
})



countryapi();

