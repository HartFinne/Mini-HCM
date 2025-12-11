export const getTodayDate = (timezone = "Asia/Manila") => {
  const now = new Date().toLocaleString("en-US", { timeZone: timezone });
  return new Date(now).toISOString().split("T")[0];
}