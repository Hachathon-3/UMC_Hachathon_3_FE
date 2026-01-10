import { useState, useRef, useEffect } from 'react';

interface DropdownProps<T> {
    options: T[];
    value: T | null;
    onChange: (value: T) => void;
    placeholder?: string;
    width?: string;
}

export default function Dropdown<T extends string>({
    options,
    value,
    onChange,
    placeholder = '선택해주세요',
    width = '100%'
}: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" style={{ width }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-4 rounded-lg border bg-white text-left flex justify-between items-center outline-none transition-colors
                    ${isOpen ? 'border-primary-400' : 'border-gray-200'}
                `}
            >
                <span className={value ? 'text-gray-900 text-body-2' : 'text-gray-400 text-body-2'}>
                    {value || placeholder}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className="w-full p-4 text-left hover:bg-gray-50 text-body-2 text-gray-900 transition-colors"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
