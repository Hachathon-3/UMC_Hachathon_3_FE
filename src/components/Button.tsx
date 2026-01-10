interface ButtonProps {
    type?: 'button' | 'submit';
    label: string;
    onClick?: () => void;
    width?: string;
    disabled?: boolean;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Button = ({
    type = 'button',
    label,
    onClick,
    width = 'w-full',
    disabled = false,
    variant = 'primary',
    size = 'md',
    className = ''
}: ButtonProps) => {
    const baseStyles = "rounded-lg font-semibold transition-colors flex items-center justify-center";

    const sizeStyles = {
        sm: "py-2 text-detail",
        md: "py-3 text-body-3",
        lg: "py-4 text-body-2"
    };

    const variantStyles = {
        primary: !disabled
            ? "bg-primary-400 text-white hover:bg-primary-500 cursor-pointer"
            : "bg-gray-500 text-white cursor-not-allowed opacity-50",
        outline: !disabled
            ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
            : "bg-white border border-gray-200 text-gray-300 cursor-not-allowed",
        ghost: !disabled
            ? "bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
            : "bg-transparent text-gray-300 cursor-not-allowed"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${width} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
