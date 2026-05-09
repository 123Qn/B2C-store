export async function handleLogout() {
  await fetch("/api/auth", {
    method: "DELETE",
  });

  window.location.href = "/";
}