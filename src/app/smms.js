import { database, ref, onValue } from "./firebase"; // Adjust path if needed
import axios from "axios"; // Ensure axios is installed

const pumpRef = ref(database, "pump/status"); // Path to your pump status in Firebase
let lastAlertSent = 0;
const ALERT_INTERVAL = 300000; // 5 minutes (to prevent spam)

export function listenForPumpAlerts() {
  onValue(pumpRef, async (snapshot) => {
    const pumpStatus = snapshot.val();
    console.log("Pump status changed:", pumpStatus);

    if (pumpStatus === "on" && Date.now() - lastAlertSent > ALERT_INTERVAL) {
      await sendSmsAlert();
      lastAlertSent = Date.now();
    }
  });
}

async function sendSmsAlert() {
  try {
    await axios.post("/api/send-sms", {
      message: "⚠️ Warning: The pump has been turned ON. Please check the system!",
    });
    console.log("SMS Alert Sent Successfully!");
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
}
