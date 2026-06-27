import { listEnquiries } from "@/lib/mysql"

export const dynamic = "force-dynamic"

function formatList(values: string[]) {
  return values.length > 0 ? values.join(", ") : "—"
}

export default async function AdminSecretPage() {
  const enquiries = await listEnquiries()

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Atlas admin export</p>
            <h1 className="font-heading text-3xl font-bold text-primary">
              Enquiry responses
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {enquiries.length} submission{enquiries.length === 1 ? "" : "s"}{" "}
              available for download.
            </p>
          </div>
          <a
            href="/admin-secret/export"
            download
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            Download CSV
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-left text-sm">
              <thead className="bg-muted/40 text-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Parent / Guardian</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Child&apos;s age</th>
                  <th className="px-4 py-3 font-semibold">Tour</th>
                  <th className="px-4 py-3 font-semibold">Prospectus Meeting</th>
                  <th className="px-4 py-3 font-semibold">Interests</th>
                  <th className="px-4 py-3 font-semibold">Decision factors</th>
                  <th className="px-4 py-3 font-semibold">Referral source</th>
                  <th className="px-4 py-3 font-semibold">Other interest</th>
                  <th className="px-4 py-3 font-semibold">Consent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      No enquiries have been submitted yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="align-top">
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(enquiry.submittedAt).toLocaleString("en-ZW", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {enquiry.parentName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <div>{enquiry.mobile}</div>
                        <div>{enquiry.email}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.childAge || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.tour || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.prospectusMeeting || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatList(enquiry.interests)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatList(enquiry.decisionFactors)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.referralSource || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.otherInterest || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {enquiry.consent ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}