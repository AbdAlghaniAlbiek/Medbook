"use client";

import React, { useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "./leaflet-style.css";
import "leaflet/dist/leaflet.css";

interface Point {
  lat: number;
  lng: number;
}

export interface IMapContainerProps {
  center: Point;
  zoom?: number;
  style?: React.CSSProperties;
}

// Fix marker icon (Leaflet bug when bundling with Webpack/Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface IMultiPointMapProps {
  markers: {
    position: number[];
    popup?: String | React.ReactNode;
    icon?: any;
  }[];
}

interface IMarkerPointProps {
  position: any;
  icon?: any; // You should use customIcon function
  popup?: String | React.ReactNode;
}

function MarkerPoint({ position, icon, popup }: IMarkerPointProps) {
  const setIcon = icon ? { icon: icon } : {};

  return (
    <Marker position={position} draggable={true} {...setIcon}>
      {popup && <Popup>{popup}</Popup>}
    </Marker>
  );
}

function MultiPointMap({
  center,
  style,
  zoom = 13,
  markers,
}: IMapContainerProps & IMultiPointMapProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={style}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />

      {markers.map((marker, i) => (
        <MarkerPoint
          key={i}
          position={marker.position}
          icon={marker.icon}
          popup={marker.popup}
        />
      ))}
    </MapContainer>
  );
}

export default MultiPointMap;
