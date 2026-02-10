/**
 * ============================================================================
 * IMPACT CHART COMPONENT
 * ============================================================================
 * 
 * Visual display of fund allocation using a simple bar chart.
 * Styled with sharp corners and the editorial design system.
 * Supports both dark and light backgrounds via the lightMode prop.
 */

type Beneficiary = {
  name: string;
  amount: number;
  description: string | null;
};

type ImpactChartProps = {
  beneficiaries: Beneficiary[];
  totalRaised: number;
  /** When true, renders in black-on-white for white background sections */
  lightMode?: boolean;
};

/**
 * ImpactChart — renders a horizontal bar chart of fund distribution
 * Inputs: beneficiaries (array), totalRaised (number), lightMode (boolean)
 * Outputs: Bar chart with labels, amounts, and optional descriptions
 */
export default function ImpactChart({ beneficiaries, totalRaised, lightMode = false }: ImpactChartProps) {
  // Calculate percentages relative to the largest amount
  const maxAmount = Math.max(...beneficiaries.map(b => b.amount));

  return (
    <div className="space-y-6">
      {/* Total Raised */}
      <div className="text-center mb-8">
        <p className="text-label mb-2">
          Total Raised
        </p>
        <p className="text-5xl text-display text-highlight">
          £{totalRaised.toLocaleString()}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        {beneficiaries.map((beneficiary, index) => {
          const percentage = (beneficiary.amount / maxAmount) * 100;
          
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-title text-sm ${lightMode ? 'text-black' : 'text-white'}`}>
                  {beneficiary.name}
                </span>
                <span className="text-title text-sm text-highlight">
                  £{beneficiary.amount.toLocaleString()}
                </span>
              </div>
              <div className={`h-8 overflow-hidden ${lightMode ? 'bg-black/10' : 'bg-white/10'}`}>
                <div
                  className="h-full bg-gradient-to-r from-highlight to-amber-500 transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {beneficiary.description && (
                <p className={`text-meta text-sm mt-1 ${lightMode ? 'text-black/40' : 'text-white/40'}`}>
                  {beneficiary.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className={`pt-6 border-t text-center ${lightMode ? 'border-black/10' : 'border-white/10'}`}>
        <p className={`text-body ${lightMode ? 'text-black/60' : 'text-white/60'}`}>
          Distributed to <span className={`text-title ${lightMode ? 'text-black' : 'text-white'}`}>{beneficiaries.length}</span> organisations
        </p>
      </div>
    </div>
  );
}
