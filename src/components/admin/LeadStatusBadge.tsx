/**
 * ============================================================================
 * LEAD STATUS BADGE COMPONENT
 * ============================================================================
 * 
 * Visual indicator for lead status with appropriate colors.
 */

import { type LeadStatus } from '@/lib/db/leads';

type LeadStatusBadgeProps = {
  status: LeadStatus;
  size?: 'sm' | 'md' | 'lg';
};

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  },
  negotiating: {
    label: 'Negotiating',
    className: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-green-500/20 text-green-400 border-green-500/50',
  },
  declined: {
    label: 'Declined',
    className: 'bg-red-500/20 text-red-400 border-red-500/50',
  },
  archived: {
    label: 'Archived',
    className: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function LeadStatusBadge({ status, size = 'md' }: LeadStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.new;
  
  return (
    <span 
      className={`
        inline-flex items-center font-medium rounded-full border
        ${config.className}
        ${sizeClasses[size]}
      `}
    >
      {config.label}
    </span>
  );
}
