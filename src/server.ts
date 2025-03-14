import app from "./app";
const { affinidiProvider } = require("@affinidi/passport-affinidi");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await affinidiProvider(app, {
      id: "affinidi",
      issuer: process.env.AFFINIDI_ISSUER,
      client_id: process.env.AFFINIDI_CLIENT_ID,
      client_secret: process.env.AFFINIDI_CLIENT_SECRET,
      redirect_uris: ["http://localhost:5173/auth/callback"],
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
