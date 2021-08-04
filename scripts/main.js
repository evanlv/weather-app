const API_KEY = "2bafbeb367d729d6edb9335e000158bf";
let resultsApi;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      callApi(long, lat);
    },
    () => {
      alert("We cannot locate your position, please allow the geolocation.");
    }
  );
}
const callApi = (long, lat) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metrics&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};
