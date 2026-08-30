export const AUDIT_PRICE = 149;
export const MINIMUM_IMPLEMENTATION_FEE = 500;
export const BENEFIT_COST_MULTIPLE = 5;

export const fields = [
  "inquiries", "missedPercent", "currentBookingPercent", "jobRevenue",
  "grossMarginPercent", "monthlyOperatingCost", "lowBookingPercent",
  "baseBookingPercent", "highBookingPercent",
] as const;

export type AuditField = typeof fields[number];
export type AuditInput = Record<AuditField, string | number>;
export type Scenario = {
  name: "Low" | "Base" | "High";
  proposedBookingPercent: number;
  currentBookings: number;
  proposedBookings: number;
  incrementalBookings: number;
  monthlyRevenue: number;
  monthlyGrossProfit: number;
  grossProfit90: number;
  operatingCost90: number;
  benefitAfterOperatingCosts90: number;
  feeCeiling: number;
  meetsMinimum: boolean;
  benefitCostRatioAtMinimum: number;
};

export const demoInputs: AuditInput = {
  inquiries: 200, missedPercent: 20, currentBookingPercent: 5,
  jobRevenue: 500, grossMarginPercent: 40, monthlyOperatingCost: 30,
  lowBookingPercent: 8, baseBookingPercent: 12, highBookingPercent: 18,
};

export function calculateAudit(input: AuditInput): {
  errors: string[];
  missedProspects?: number;
  scenarios: Scenario[];
} {
  const values = {} as Record<AuditField, number>;
  const errors: string[] = [];
  for (const field of fields) {
    const raw = input[field];
    const value = typeof raw === "number" ? raw
      : typeof raw === "string" && raw.trim() !== "" ? Number(raw) : NaN;
    const maximum = field.endsWith("Percent") ? 100 : 1e12;
    if (!Number.isFinite(value) || value < 0 || value > maximum) {
      errors.push(field + ": enter a finite number between 0 and " + maximum + ".");
    }
    values[field] = value;
  }
  if (errors.length) return { errors, scenarios: [] };
  if (values.lowBookingPercent > values.baseBookingPercent ||
      values.baseBookingPercent > values.highBookingPercent) {
    return { errors: ["Proposed booking rates must be ordered Low ≤ Base ≤ High."], scenarios: [] };
  }

  const missedProspects = values.inquiries * values.missedPercent / 100;
  const currentBookings = missedProspects * values.currentBookingPercent / 100;
  const operatingCost90 = values.monthlyOperatingCost * 3;
  const scenarios = ([
    ["Low", values.lowBookingPercent],
    ["Base", values.baseBookingPercent],
    ["High", values.highBookingPercent],
  ] as const).map(([name, proposedBookingPercent]): Scenario => {
    const proposedBookings = missedProspects * proposedBookingPercent / 100;
    const incrementalBookings = missedProspects *
      (proposedBookingPercent - values.currentBookingPercent) / 100;
    const monthlyRevenue = incrementalBookings * values.jobRevenue;
    const monthlyGrossProfit = monthlyRevenue * values.grossMarginPercent / 100;
    const grossProfit90 = monthlyGrossProfit * 3;
    // GP / (total setup fee + incremental operating costs) must be >= 5.
    const rawCeiling = grossProfit90 / BENEFIT_COST_MULTIPLE - operatingCost90;
    return {
      name, proposedBookingPercent, currentBookings, proposedBookings,
      incrementalBookings, monthlyRevenue, monthlyGrossProfit, grossProfit90,
      operatingCost90,
      benefitAfterOperatingCosts90: grossProfit90 - operatingCost90,
      feeCeiling: Math.max(0, rawCeiling),
      meetsMinimum: rawCeiling >= MINIMUM_IMPLEMENTATION_FEE,
      benefitCostRatioAtMinimum: grossProfit90 /
        (MINIMUM_IMPLEMENTATION_FEE + operatingCost90),
    };
  });

  if (scenarios.some(s => Object.values(s).some(v =>
    typeof v === "number" && (!Number.isFinite(v) || Math.abs(v) > Number.MAX_SAFE_INTEGER)))) {
    return { errors: ["Scenario exceeds the supported calculation range. Use smaller, verified inputs."], scenarios: [] };
  }
  return { errors, missedProspects, scenarios };
}
