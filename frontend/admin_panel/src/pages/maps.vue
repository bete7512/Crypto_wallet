<template>
  <div
    class="bg-white w-full h-full rounded-lg flex items-center justify-center"
  >
    <!-- <div class="flex flex-col items-center"> -->
    <div ref="map" class="w-full h-full"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";

// Google Maps API key
const apiKey = "AIzaSyDERBfcufAtcbPCYbNaBq_Ry6g3SGfjsks";

// Reference to the map instance
const map = ref(null);

// Reference to the current location
const location = ref("");
const geo_data = reactive([
  {
    lat: 11.68515,
    long: 37.186591,
  },
  {
    lat: 11.474019,
    long: 37.288196,
  },
]);
// Initialize Google Maps API
const initMap = () => {
  console.log("Initializing Google Maps API");
  const center = { lat: 0, lng: 0 };
  map.value = new google.maps.Map(map.value, {
    center,
    zoom: 8,
  });
  const geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    console.log("Geolocation is supported");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Got current position");
        const { latitude, longitude } = position.coords;
        center.lat = latitude;
        center.lng = longitude;
        map.value.setCenter(center);
        const latLng = new google.maps.LatLng(latitude, longitude);
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              location.value = results[0].formatted_address;
            } else {
              location.value = "No results found";
            }
          } else {
            location.value = `Geocoder failed due to: ${status}`;
          }
          console.log(`Location: ${location.value}`);
        });
      },
      () => {
        location.value = "Geolocation service failed";
        console.log(`Location: ${location.value}`);
      }
    );
  } else {
    location.value = "Your browser doesn't support geolocation";
    console.log(`Location: ${location.value}`);
  }
  geo_data.forEach((data) => {
    const marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.long },
      map: map.value,
      title: `Latitude: ${data.lat}, Longitude: ${data.long}`,
    });
  });
};

// Initialize Google Maps API on component mount
onMounted(() => {
  console.log("Mounting component");
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    console.log("Failed to load Google Maps API");
  };
  document.head.appendChild(script);
  window.initMap = initMap;
});
</script>
