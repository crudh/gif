import type { test } from "./fixtures";

export const getTabKey = (currentTest: typeof test) =>
  currentTest.info().project.name === "webkit" ? "Alt+Tab" : "Tab";
