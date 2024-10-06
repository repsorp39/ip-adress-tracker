//Dom required element
const IP_address = document.getElementById('IP');
const locating = document.getElementById('location');
const timeZone = document.getElementById('timeZone');
const ISP =  document.getElementById('ISP');
const geoID = document.getElementById('placeID');
const Country = document.getElementById('country');

// to create map
function mapConstructor(longitude , latitude ,city){
    let  map = L.map('map').setView([latitude , longitude], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    L.marker([latitude, longitude ]).addTo(map).bindPopup('<b>'+city+'</b>').openPopup();
        
}

// update screen render
function updateLocationInfo(IP ,locate ,timezone,isp ,IDplace,country){
    IP_address.innerText = IP;
    locating.innerText = locate;
    timeZone.innerText = timezone;
    ISP.innerText = isp; 
    geoID.innerText = IDplace; 
    Country.innerText = country; 
}

async function fetchLocationAndSetUpdate (addrIp = null) {
    const reponse =  await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_KulbUChXLkzr4VgWx8oSBhQf3thSX&${addrIp ?'ipAddress=' + addrIp :''}`);
    const locationInfo = await reponse.json();

    const  container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }

    updateLocationInfo(
        locationInfo.ip,
        locationInfo.location.region,
        locationInfo.location.timezone,
        locationInfo.isp,
        locationInfo.location.geonameId,
        locationInfo.location.country
    )


    const long = locationInfo.location.lng;
    const lat = locationInfo.location.lat;
    const city = locationInfo.location.city;
    mapConstructor(long ,lat ,city);

}

// **Acces to my location on loading
window.onload = async  ()=>{
  await fetchLocationAndSetUpdate();
}

// To enable searching of IP adress
const champSaisie = document.getElementById('champSaisie');
const  btnSearch = document.getElementById('search');

let ipRegex = /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;

btnSearch.addEventListener('click' ,async ()=>
{

    if(!ipRegex.test(champSaisie.value)){
        champSaisie.classList.add('invalid')
    }else{
        const addrIp = champSaisie.value;
        champSaisie.value = "";
      if (champSaisie.classList.contains('invalid'))
            champSaisie.classList.remove('invalid');
     await fetchLocationAndSetUpdate(addrIp);
}

})