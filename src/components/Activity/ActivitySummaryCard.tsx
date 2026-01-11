import React from 'react';

interface ActivitySummaryCardProps {
    title: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    variant: 'all' | 'solved' | 'unsolved' | 'helped';
}

const ActivitySummaryCard: React.FC<ActivitySummaryCardProps> = ({
    title,
    count,
    isActive,
    onClick,
    icon,
    variant
}) => {
    // Determine active colors based on variant
    const getActiveStyles = () => {
        if (!isActive) return 'bg-white border-gray-200 text-gray-900';

        // Active states with colored borders
        switch (variant) {
            case 'solved':
                return 'bg-white border-secondary-700 text-secondary-700';
            case 'unsolved':
                return 'bg-white border-status-alert text-status-alert';
            case 'helped':
                return 'bg-white border-primary-400 text-primary-400';
            case 'all':
            default:
                return 'bg-white border-gray-400 text-gray-900';
        }
    };

    const getIconColor = () => {
        switch (variant) {
            case 'solved': return 'text-secondary-700';
            case 'unsolved': return 'text-status-alert';
            case 'helped': return 'text-primary-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <button
            onClick={onClick}
            className={`
                relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                ${getActiveStyles()}
                hover:shadow-md h-[100px] cursor-pointer
            `}
        >
            <div className={`shrink-0 ${getIconColor()}`}>
                {icon}
            </div>

            <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-body-4 font-medium text-gray-900 mb-1">{title}</span>
                <span className="text-title-1 font-bold text-gray-900">{count}</span>
            </div>
        </button>
    );
};

export default ActivitySummaryCard;
