/**
 * EmailJS — Configuration BATIDIAS
 *
 * Pour activer l'envoi d'emails :
 * 1. Crée un compte sur https://dashboard.emailjs.com/admin
 * 2. Connecte un service (Gmail, Outlook, etc.) → récupère SERVICE_ID
 * 3. Crée 2 templates → récupère TEMPLATE_TEAM_ID et TEMPLATE_CLIENT_ID
 * 4. Récupère ta Public Key dans Account → API Keys
 * 5. Remplace les placeholders ci-dessous
 *
 * Tant que les valeurs commencent par "REPLACE_", l'envoi email est désactivé
 * mais la demande est quand même sauvegardée en base.
 */
export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_BATIDIAS",
  TEMPLATE_TEAM_ID: "BATIDIAS_EMAIL",
  TEMPLATE_CLIENT_ID: "BATIDIAS_EMAIL",
  PUBLIC_KEY: "OoO117nkipohk9Y-4uo9K",
  TEAM_EMAIL: "batidiasgestion@hotmail.com",
} as const;

export const isEmailJsConfigured = () =>
  !EMAILJS_CONFIG.SERVICE_ID.startsWith("REPLACE_") &&
  !EMAILJS_CONFIG.PUBLIC_KEY.startsWith("REPLACE_");
