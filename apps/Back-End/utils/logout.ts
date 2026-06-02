export function handleLogout() {
  localStorage.removeItem("auth_token")
  window.location.href = "/SessionManagement/login"
}