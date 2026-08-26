"use client";

import Navbar from "@/components/Navbar";
import { useNavState } from "@/hooks/useNavState";

export default function NavbarWrapper() {
  const { navState } = useNavState();
  return <Navbar navState={navState} />;
}