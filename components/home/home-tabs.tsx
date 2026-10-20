"use client";
import { Plus, Merge } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface HomeTabsProps {
  value: string;
  onTabChange: (tab: string) => void;
}

export default function HomeTabs({ value, onTabChange }: HomeTabsProps) {
  return (
    <Tabs value={value} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="create-lobby">
          <Plus /> Create Lobby
        </TabsTrigger>
        <TabsTrigger value="join-lobby">
          <Merge /> Join Lobby
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
