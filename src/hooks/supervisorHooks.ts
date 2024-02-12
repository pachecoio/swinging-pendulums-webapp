import { serverSentEventsSupervisor } from "@/api";
import { toast } from "sonner";

export function useSupervisorSentEventsNotification() {
  serverSentEventsSupervisor((data) => {
    switch (data) {
      case "STOP":
        toast("Stopped all pendulums");
        break;
      case "START":
        toast("Started all pendulums");
        break;
      case "PAUSE":
        toast("Paused all pendulums");
        break;
    }
  });
}
