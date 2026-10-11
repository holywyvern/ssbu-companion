"use client";
import { useState } from "react";
import { Plus, Merge } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface HomeTabsProps {
  onTabChange: (tab: string) => void;
}

export default function HomeTabs({ onTabChange }: HomeTabsProps) {
  const [tab, setTab] = useState("create-lobby");

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    onTabChange(newTab);
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange}>
      <TabsList variant="line">
        <TabsTrigger value="create-lobby">
          <Plus /> Create
        </TabsTrigger>
        <TabsTrigger value="join-lobby">
          <Merge /> Join
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
