import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/social")({
  component: () => <Outlet />,
  head: () => ({ meta: [{ title: "Réseau RePère" }] }),
});
