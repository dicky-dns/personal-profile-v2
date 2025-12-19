"use server"

interface FormState {
  errors: {
    name: boolean
    email: boolean
    subject: boolean
    message: boolean
  }
}

export async function formSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const subject = formData.get("subject")?.toString().trim()
  const message = formData.get("message")?.toString().trim()

  return {
    errors: {
      name: !name || name.length < 2,
      email: !email || !email.includes("@"),
      subject: !subject || subject.length < 2,
      message: !message || message.length < 3,
    },
  }
}
