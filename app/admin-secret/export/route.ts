import { NextResponse } from "next/server"
import { listEnquiries } from "@/lib/mysql"

export const dynamic = "force-dynamic"

function escapeCsvValue(value: string) {
  const normalized = value.replaceAll('"', '""')
  return `"${normalized}"`
}

export async function GET() {
  const enquiries = await listEnquiries()
  const header = [
    "Submitted At",
    "Parent / Guardian Name",
    "Mobile",
    "Email",
    "Child's Age",
    "Wants Tour",
    "Interests",
    "Other Interest",
    "Decision Factors",
    "Referral Source",
    "Consent Given",
  ]

  const rows = enquiries.map((enquiry) => [
    enquiry.submittedAt,
    enquiry.parentName,
    enquiry.mobile,
    enquiry.email,
    enquiry.childAge,
    enquiry.tour,
    enquiry.interests.join("; "),
    enquiry.otherInterest,
    enquiry.decisionFactors.join("; "),
    enquiry.referralSource,
    enquiry.consent ? "Yes" : "No",
  ])

  const csv = [header, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n")

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="atlas-enquiry-responses.csv"',
      "Cache-Control": "no-store",
    },
  })
}
