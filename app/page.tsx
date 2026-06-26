import Image from "next/image"
import { EnquiryForm } from "@/components/enquiry-form"

const stats = [
  { value: "Cambridge", label: "Primary Curriculum" },
  { value: "Max 24", label: "Per Class" },
  { value: "Grade 1–2", label: "Founding Intake" },
]

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Compact header */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-2xl px-5 py-12 text-center sm:py-16">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground">
            <Image
              src="/atlas-logo.png"
              alt="Atlas — A Compass for the Future"
              width={64}
              height={64}
              className="h-14 w-14 object-contain"
              priority
            />
          </div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
            Aspindale Park · Harare · Opening January 2027
          </p>
          <h1 className="mt-4 text-balance font-heading text-3xl font-bold leading-tight sm:text-4xl">
            Begin your child&apos;s Atlas journey
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/85">
            Founding intake now open for Grade 1 &amp; 2.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-lg font-bold">{value}</p>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Enquiry form — the primary call to action */}
      <section className="mx-auto -mt-8 max-w-2xl px-5 pb-16">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-9">
          <div className="border-b border-border pb-5">
            <h2 className="mt-1 font-heading text-2xl font-bold text-primary">
              Enquiry form
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All fields marked with * are required.
            </p>
          </div>
          <div className="pt-6">
            <EnquiryForm />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Questions? Call{" "}
          <a
            href="tel:+263719885192"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            +263 719 885 192
          </a>{" "}
          or email{" "}
          <a
            href="mailto:enrolment@atlas.ac.zw"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            enrolment@atlas.ac.zw
          </a>
        </p>
      </section>
    </main>
  )
}
