"use client";
import { ComponentType, Fragment } from "react";

export interface SelectProps<T extends string> {
  value: T;
  pages: Record<T, ComponentType>;
}

export default function Select<T extends string>({ value, pages }: SelectProps<T>) {
  const Page: ComponentType = pages[value] || Fragment;
  return <Page />;
}