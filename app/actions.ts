"use server"

import { saveEnquiry } from "@/lib/mysql"

export type EnquiryState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parentName = String(formData.get("parentName") ?? "").trim()
  const mobile = String(formData.get("mobile") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const consent = formData.get("consent") === "on"

  // Basic server-side validation
  if (!parentName || !mobile || !email) {
    return {
      status: "error",
      message: "Please complete your name, mobile number, and email address.",
    }
  }

  if (!consent) {
    return {
      status: "error",
      message: "Please provide consent so we can contact you about admissions.",
    }
  }

  const enquiry = {
    parentName,
    mobile,
    email,
    childAge: String(formData.get("childAge") ?? "").trim(),
    tour: String(formData.get("tour") ?? "").trim(),
    prospectusMeeting: String(formData.get("prospectusMeeting") ?? "").trim(),
    interests: formData.getAll("interests").map(String),
    otherInterest: String(formData.get("otherInterest") ?? "").trim(),
    decisionFactors: formData.getAll("decisionFactors").map(String),
    referralSource: String(formData.get("referralSource") ?? "").trim(),
    consent,
  }

  try {
    await saveEnquiry(enquiry)
  } catch (error) {
    console.error("Failed to save Atlas enrolment enquiry", error)

    return {
      status: "error",
      message:
        "We could not save your enquiry right now. Please try again in a moment.",
    }
  }

  return {
    status: "success",
    message: "Thank you! Your enquiry has been received.",
  }
}