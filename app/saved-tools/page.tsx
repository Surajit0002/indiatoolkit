import { User, Settings, History, Star, Search, Bookmark } from "lucide-react";
import Link from "next/link";
import SavedToolsClient from "./SavedToolsClient";

export const metadata = {
  title: "Saved Tools - OMNITOOLS",
};

export default function SavedToolsPage() {
  return <SavedToolsClient />;
}
