/**
 * ============================================================================
 * IMPACT CHART COMPONENT
 * ============================================================================
 * 
 * Visual display of fund allocation using simple bar chart.
 */

type Beneficiary = {
  name: string;
  amount: number;
  description: string | null;
};

type ImpactChartProps = {
  beneficiaries: Beneficiary[];
  totalRaised: number;
};

export default function ImpactChart({ beneficiaries, totalRaised }: ImpactChartProps) {
  // Calculate percentages
  const maxAmount = Math.max(...beneficiaries.map(b => b.amount));

  return (
    <div className="space-y-6">
      {/* Total Raised */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">
          Total Raised
        </div>
        <div className="text-5xl font-bold text-highlight">
          £{totalRaised.toLocaleString()}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-4">
        {beneficiaries.map((beneficiary, index) => {
          const percentage = (beneficiary.amount / maxAmount) * 100;
          
          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{beneficiary.name}</span>
                <span className="text-highlight font-semibold">
                  £{beneficiary.amount.toLocaleString()}
                </span>
              </div>
              <div className="h-8 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-highlight to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {beneficiary.description && (
                <p className="text-sm text-gray-400 mt-1">{beneficiary.description}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-400">
          Distributed to <span className="text-white font-medium">{beneficiaries.length}</span> organisations
        </p>
      </div>
    </div>
  );
}
