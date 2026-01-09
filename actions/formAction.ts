"use server"

import nodemailer from "nodemailer"

interface FormState {
  errors: {
    name: boolean
    email: boolean
    subject: boolean
    message: boolean
  }
  status: "idle" | "success" | "error"
  message: string | null
}

export async function formSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const subject = formData.get("subject")?.toString().trim()
  const message = formData.get("message")?.toString().trim()

  const errors = {
    name: !name || name.length < 2,
    email: !email || !email.includes("@"),
    subject: !subject || subject.length < 2,
    message: !message || message.length < 3,
  }

  if (Object.values(errors).some(Boolean)) {
    return {
      errors,
      status: "error",
      message: "Please fill in all required fields.",
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return {
      errors,
      status: "success",
      message: "Thanks! Your message has been sent.",
    }
  } catch (error) {
    console.error("Contact form email failed:", error)
    return {
      errors,
      status: "error",
      message: "Sorry, something went wrong. Please try again.",
    }
  }

}
