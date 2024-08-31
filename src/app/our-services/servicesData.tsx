import START_A_BUSINESS from "@/data/start_business.json";
import TAXATION from "@/data/taxation.json";
import REGISTRATION from "@/data/registration.json";
import TRADEMARK from "@/data/trademark.json";
import MANAGE_BUSINESS from "@/data/manage_business.json";

export const services = [
  ...START_A_BUSINESS,
  ...TAXATION,
  ...REGISTRATION,
  ...TRADEMARK,
  ...MANAGE_BUSINESS,
];
