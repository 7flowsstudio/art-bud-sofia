import nodemailer from "nodemailer";

export async function POST(req) {
	const { name, phone, message } = await req.json();

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.SMTP_FROM,
			to: process.env.SMTP_TO,
			subject: `Wiadomość od ${name}`,
			text: `Imię: ${name}\nNumer telefonu: ${phone}\nWiadomość: ${message}`,
			html: `
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Numer telefonu:</strong> ${phone}</p>
        <p><strong>nWiadomość:</strong> ${message}</p>
      `,
		});

		return Response.json(
			{ message: "Email sent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return Response.json({ message: "Error sending email" }, { status: 500 });
	}
}
