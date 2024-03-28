"use client";

import {  useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";
import Map from "./components/map";
import { useDispatch } from "react-redux";
import { fetchHistory } from "@/redux/features/history/historySlice";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchHistory());
  })

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
