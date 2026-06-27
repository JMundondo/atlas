"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { submitEnquiry, type EnquiryState } from "@/app/actions"

const interestOptions = [
  "Fees",
  "Curriculum",
  "Facilities",
  "Transport",
  "Extracurricular Activities",
  "Admissions Process",
]

const factorOptions = [
  "Academic Excellence",
  "Discipline",
  "Safety",
  "Affordable Fees",
  "Sports & Activities",
  "Technology & Innovation",
]

const referralOptions = [
  "Word of mouth",
  "Facebook / Instagram / WhatsApp",
  "Google search",
  "Flyer / Print",
  "Event / Activation",
  "Other",
]

const fieldClass =
  "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground"

const labelClass = "block text-sm font-medium text-foreground"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-lg font-semibold text-primary">
      {children}
    </h3>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Submitting…" : "Submit Enquiry"}
    </button>
  )
}

function EnquiryFormContent({
  onReset,
}: {
  onReset: () => void
}) {
  const initialState: EnquiryState = { status: "idle" }
  const [state, formAction] = useActionState(submitEnquiry, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-accent" aria-hidden="true" />
        <h2 className="font-heading text-2xl font-bold text-primary">
          Enquiry received
        </h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Thank you for your interest in Atlas Primary School. Our admissions
          team will be in touch shortly to guide you through the next steps.
        </p>
        <p className="text-sm text-muted-foreground">
          Questions? Call{" "}
          <a
            href="tel:+263719885192"
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            +263 719 885 192
          </a>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          Enter another parent
        </button>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      {state.status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Contact details */}
      <div className="space-y-5">
        <SectionLabel>Your details</SectionLabel>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="parentName" className={labelClass}>
              Parent / Guardian name <span className="text-accent">*</span>
            </label>
            <input
              id="parentName"
              name="parentName"
              required
              autoComplete="name"
              placeholder="Full name"
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mobile" className={labelClass}>
              Mobile number <span className="text-accent">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+263 ..."
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className={labelClass}>
              Email address <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="childAge" className={labelClass}>
              Child&apos;s age
            </label>
            <input
              id="childAge"
              name="childAge"
              placeholder="e.g. 6 years"
              className={fieldClass}
            />
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className={labelClass}>
            Would you like a tour of the school?
          </legend>
          <div className="flex gap-3">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-accent sm:flex-none sm:px-8"
              >
                <input
                  type="radio"
                  name="tour"
                  value={opt}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className={labelClass}>
            Would you like to attend prospectus meeting in August?
          </legend>
          <div className="flex gap-3">
            {["Yes", "No"].map((opt) => (
              <label
                key={opt}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:text-accent sm:flex-none sm:px-8"
              >
                <input
                  type="radio"
                  name="prospectusMeeting"
                  value={opt}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <hr className="border-border" />

      {/* Interests */}
      <div className="space-y-4">
        <SectionLabel>What would you like to know more about?</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground transition hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10"
            >
              <input
                type="checkbox"
                name="interests"
                value={opt}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="space-y-2">
          <label htmlFor="otherInterest" className={labelClass}>
            Anything else? (Other)
          </label>
          <input
            id="otherInterest"
            name="otherInterest"
            placeholder="Tell us what else you'd like to know"
            className={fieldClass}
          />
        </div>
      </div>

      <hr className="border-border" />

      {/* Insight */}
      <div className="space-y-5">
        <div>
          <SectionLabel>Insight</SectionLabel>
          <p className="mt-1 text-sm text-muted-foreground">
            Optional — this helps us understand what matters most to your
            family.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className={labelClass}>
            What matters most when choosing a school?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {factorOptions.map((opt) => (
              <label
                key={opt}
                className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground transition hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/10"
              >
                <input
                  type="checkbox"
                  name="decisionFactors"
                  value={opt}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <label htmlFor="referralSource" className={labelClass}>
            How did you hear about Atlas?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Select an option
            </option>
            {referralOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="border-border" />

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          I consent to Atlas School contacting me regarding admissions, school
          updates, events, and related information.{" "}
          <span className="text-accent">*</span>
        </span>
      </label>

      <SubmitButton />
    </form>
  )
}

export function EnquiryForm() {
  const [formInstance, setFormInstance] = useState(0)

  return (
    <EnquiryFormContent
      key={formInstance}
      onReset={() => setFormInstance((current) => current + 1)}
    />
  )
}