type QueryValue = string | number | boolean | null

type MySqlPool = {
  execute: <T = unknown>(
    sql: string,
    values: readonly QueryValue[],
  ) => Promise<[T, unknown]>
}

type MySqlModule = {
  createPool: (config: {
    host: string
    port: number
    user: string
    password: string
    database: string
    waitForConnections: boolean
    connectionLimit: number
    queueLimit: number
  }) => MySqlPool
}

export type EnquiryInsert = {
  parentName: string
  mobile: string
  email: string
  childAge: string
  tour: string
  interests: string[]
  otherInterest: string
  decisionFactors: string[]
  referralSource: string
  consent: boolean
}

type EnquiryRow = {
  id: number
  parent_name: string
  mobile: string
  email: string
  child_age: string | null
  wants_tour: string | null
  interests: string
  other_interest: string | null
  decision_factors: string
  referral_source: string | null
  consent_given: number | boolean
  submitted_at: Date | string
}

export type EnquiryRecord = {
  id: number
  parentName: string
  mobile: string
  email: string
  childAge: string
  tour: string
  interests: string[]
  otherInterest: string
  decisionFactors: string[]
  referralSource: string
  consent: boolean
  submittedAt: string
}

declare global {
  var __atlasEnquiryPool: MySqlPool | undefined
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function getDatabaseConfig() {
  const port = Number(process.env.MYSQL_PORT?.trim() || "3306")

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("MYSQL_PORT must be a valid positive integer")
  }

  return {
    host: getRequiredEnv("MYSQL_HOST"),
    port,
    user: getRequiredEnv("MYSQL_USER"),
    password: getRequiredEnv("MYSQL_PASSWORD"),
    database: getRequiredEnv("MYSQL_DATABASE"),
  }
}

async function loadMySqlModule(): Promise<MySqlModule> {
  try {
    const importModule = new Function(
      "specifier",
      "return import(specifier)",
    ) as (specifier: string) => Promise<unknown>

    return (await importModule("mysql2/promise")) as MySqlModule
  } catch (error) {
    throw new Error(
      "The mysql2 package is required. Run `npm install` before starting the app.",
      { cause: error },
    )
  }
}

async function getPool(): Promise<MySqlPool> {
  if (!globalThis.__atlasEnquiryPool) {
    const mysql = await loadMySqlModule()
    const { host, port, user, password, database } = getDatabaseConfig()

    globalThis.__atlasEnquiryPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }

  return globalThis.__atlasEnquiryPool!
}

function parseJsonArray(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value)

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : []
  } catch {
    return []
  }
}

export async function saveEnquiry(enquiry: EnquiryInsert) {
  const pool = await getPool()

  await pool.execute(
    `INSERT INTO enrolment_enquiries (
      parent_name,
      mobile,
      email,
      child_age,
      wants_tour,
      interests,
      other_interest,
      decision_factors,
      referral_source,
      consent_given
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      enquiry.parentName,
      enquiry.mobile,
      enquiry.email,
      enquiry.childAge || null,
      enquiry.tour || null,
      JSON.stringify(enquiry.interests),
      enquiry.otherInterest || null,
      JSON.stringify(enquiry.decisionFactors),
      enquiry.referralSource || null,
      enquiry.consent,
    ],
  )
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  const pool = await getPool()
  const [rows] = await pool.execute<EnquiryRow[]>(
    `SELECT
      id,
      parent_name,
      mobile,
      email,
      child_age,
      wants_tour,
      interests,
      other_interest,
      decision_factors,
      referral_source,
      consent_given,
      submitted_at
    FROM enrolment_enquiries
    ORDER BY submitted_at DESC, id DESC`,
    [],
  )

  return rows.map((row) => ({
    id: row.id,
    parentName: row.parent_name,
    mobile: row.mobile,
    email: row.email,
    childAge: row.child_age ?? "",
    tour: row.wants_tour ?? "",
    interests: parseJsonArray(row.interests),
    otherInterest: row.other_interest ?? "",
    decisionFactors: parseJsonArray(row.decision_factors),
    referralSource: row.referral_source ?? "",
    consent: row.consent_given === true || row.consent_given === 1,
    submittedAt: new Date(row.submitted_at).toISOString(),
  }))
}
