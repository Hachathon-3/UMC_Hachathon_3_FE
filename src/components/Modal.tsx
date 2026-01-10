
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    confirmText?: string;
    cancelText?: string;
}

const Modal = ({ isOpen, onClose, onConfirm, title, confirmText = '채택', cancelText = '취소' }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl w-full max-w-[300px] p-6 flex flex-col items-center text-center shadow-lg animate-fade-in">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-primary-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>

                <p className="text-title-2 font-bold text-gray-900 mb-2 whitespace-pre-wrap leading-relaxed">
                    {title}
                </p>
                <p className="text-body-3 text-gray-500 mb-6">
                    이 댓글이 불안 해결에 도움이 되었나요?
                </p>

                <div className="flex gap-3 w-full">
                    <div className="flex-1">
                        <Button
                            label={cancelText}
                            onClick={onClose}
                            variant="outline"
                            size="lg"
                            className="bg-gray-200 border-none text-gray-600 hover:bg-gray-300 font-bold"
                        />
                    </div>
                    <div className="flex-1">
                        <Button
                            label={confirmText}
                            onClick={onConfirm}
                            variant="primary"
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
