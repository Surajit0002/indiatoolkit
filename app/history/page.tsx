import { User, Settings, History as HistoryIcon, Clock, Trash2, ExternalLink, Calendar, Filter, Download } from "lucide-react";
import Link from "next/link";
import HistoryClient from "./HistoryClient";

export const metadata = {
  title: "Tool History - OMNITOOLS",
};

export default function HistoryPage() {
  return <HistoryClient />;
}
