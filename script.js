/*
**
to create map
**
*/
       function locateMeOnMap(longitude , latitude ,city)
            {


            let  map = L.map('map').setView([latitude , longitude], 14);

            let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let  marker = L.marker([latitude, longitude ]).addTo(map)
                    .bindPopup('<b>'+city+'</b>').openPopup();

            }


            /*
            **
            **Fonction permettant de mettre à jour l'affichage sur l'écran
            */

            const IP_address = document.getElementById('IP');
            const locating = document.getElementById('location');
            const timeZone = document.getElementById('timeZone');
            const ISP =  document.getElementById('ISP');
            const geoID = document.getElementById('placeID');
            const Country = document.getElementById('country');

            function updateLocationInfo(IP ,locate ,timezone,isp ,IDplace,country)

            {
                IP_address.innerText = IP;
                locating.innerText = locate;
                timeZone.innerText = timezone;
                ISP.innerText = isp; 
                geoID.innerText = IDplace; 
                Country.innerText = country; 
            }


            /*
            **Acces to my location on loading
            **
            */
                 

                window.onload = async  ()=>{
                    const reponse =  await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_KulbUChXLkzr4VgWx8oSBhQf3thSX');
                    const locationInfo = await reponse.json();

                    updateLocationInfo(
                        locationInfo.ip,
                        locationInfo.location.region,
                        locationInfo.location.timezone,
                        locationInfo.isp,
                        locationInfo.location.geonameId,
                        locationInfo.location.country
                    )

                    let long = locationInfo.location.lng;
                    let lat = locationInfo.location.lat;
                    let city = locationInfo.location.city;
                   
                    locateMeOnMap(long ,lat ,city);
                }


                
                /*
                **
                To make enable searching of IP adress
                **
                */

               const champSaisie = document.getElementById('champSaisie');
               const  btnSearch = document.getElementById('search');

               let regex = new RegExp("(((25[0-5]{2})|(2[0-4][0-9])|([01]?[0-9][0-9]?))\.){3}((25[0-5]{2})|(2[0-4][0-9])|([01]?[0-9][0-9]?))$");



               btnSearch.addEventListener('click' ,async ()=>
               {

               if(!regex.test(champSaisie.value))
               {
                champSaisie.classList.add('invalid')
               }
               else
               {

                try{
                champSaisie.classList.remove('invalid');
                }
                catch{
                    let error = true;
                }

                const reponse =  await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_KulbUChXLkzr4VgWx8oSBhQf3thSX&ipAddress=' + champSaisie.value);
                const locationInfo = await reponse.json();

                updateLocationInfo(
                    champSaisie.value,
                    locationInfo.location.region,
                    locationInfo.location.timezone,
                    locationInfo.isp,
                    locationInfo.location.geonameId,
                    locationInfo.location.country
                )


                let longi = locationInfo.location.lng;
                let lati = locationInfo.location.lat;
                let citi = locationInfo.location.city;
                
                const  container = L.DomUtil.get('map');
                if(container != null){
                  container._leaflet_id = null;
                }
                locateMeOnMap(longi , lati ,citi);
               }
              
               })