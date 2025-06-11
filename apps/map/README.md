MAP SERVICE

Open API for consuming venue and events service.
MAP Service only returns an array of events or venues with filters by geolocation.
It can reveive a country, state, province, city or a object containing "lat" for Latitude and "lng" for Longitude
The query filter by 10 kilometers as default, and accept a max value of 100 kilometers. 
{
    lat: number,
    lng: number
}