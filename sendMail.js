import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { email: "info@nilkanthholidays.in", name: "Nilkanth Holidays Website" },
        to: [{ email: "nilkanth22@gmail.com" }],
        subject: "📩 New Contact Form Message",
        htmlContent: `<h3>New Contact Form Submission</h3>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Message:</strong><br>${message}</p>`
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(400).json({ error: text });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
