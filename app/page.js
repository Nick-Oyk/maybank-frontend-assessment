"use client";

import {  useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import Map from "./components/map";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return <Map />;
}
