const input = document.querySelector('input');
const autoComplete = document.querySelector('.autoComplete');

const dataOnImage = document.querySelector('.dataOnImage');
const dataOnText = document.querySelector('.weatherDetails .data');
const dropdownRes = document.querySelector('.dropdownRes');
const para = document.querySelector('.weatherDetails p');
const mobileViewData = document.querySelector('.mobileViewData');
const button = document.querySelector('.form-inline button')




const fetchCities = (cityName) => {
    let response = axios.get(`https://api.teleport.org/api/cities/`,{
        params:{
            search:cityName,
            limit:5,
        }
    }).then(res => {
        let cities = res.data._embedded["city:search-results"];
        autoComplete.classList.remove('hide');
        autoComplete.classList.add('active');
        dropdownRes.innerHTML = ``;
        // console.log(cityName);
        for(let city of cities) {
            let location = city.matching_full_name;
            let loc = location.split('(');
            let ul = document.createElement('ul');

            let option = document.createElement('li');
            // option.style.textOverflow = "clip"; 
            // option.classList.add('dropdown-item');
            option.innerHTML = `${loc[0]}`;
            option.classList.add('liHeight')
            ul.appendChild(option)
            dropdownRes.appendChild(ul);
            option.addEventListener('click',(event)=>{
                const cityName = event.target.innerHTML;
                input.value = cityName;
                autoComplete.classList.add('hide');
                autoComplete.classList.remove('active');
                // console.log(cityName);
                // autoComplete.classList.add('hide');
                // autoComplete.classList.remove('active');
                // para.style.display = "block";
                // dataOnImage.style.display = "block";
                // dataOnText.style.display = "block";
                // mobileViewData.style.display = "block";
            })
        }
    })
    
}


button.addEventListener('click', () => {
    setTimeout(()=> {
        para.style.display = "block";
        dataOnImage.style.display = "block";
        dataOnText.style.display = "block";
        mobileViewData.style.display = "block";
    },1000)
    
})


let timeOutId;

const onInput = (event) => {
    para.style.display = "none";
    dataOnImage.style.display = "none";
    if(dataOnText) {
        dataOnText.style.display = "none";
    }
    mobileViewData.style.display = "none";
    if(timeOutId) {
        clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(()=> {
        const cityName = event.target.value;
        fetchCities(cityName);
        // console.log(cityName);
    },500);
}

input.addEventListener('input', onInput);

document.addEventListener('click',(event) => {
    if(!autoComplete.contains(event.target)){
        autoComplete.classList.remove('active');
        autoComplete.classList.add('hide');
    }
})