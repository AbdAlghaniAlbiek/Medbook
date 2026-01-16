"use client";

import L from "leaflet";
// const L = dynamic(() => import("leaflet"), { ssr: false });

// export const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // 👈 your custom image
//   iconSize: [40, 40],     // size of the icon (width, height)
//   iconAnchor: [20, 40],   // point of the icon that corresponds to marker’s location
//   popupAnchor: [0, -40],  // where popups open relative to the icon
// });

interface ICustomIcon {
  iconUrl: string;
  iconSize: any;
  iconAnchor: any;
  popupAnchor: any;
}
export function customIcon({
  iconAnchor,
  iconSize,
  iconUrl,
  popupAnchor,
}: ICustomIcon) {
  return new L.Icon({
    iconUrl: iconUrl, // 👈 your custom image
    iconSize, // size of the icon (width, height)
    iconAnchor, // point of the icon that corresponds to marker’s location
    popupAnchor, // where popups open relative to the icon
  });
}
