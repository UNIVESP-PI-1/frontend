import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

export default function Scanner({ onScan, onClose }) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.777778
        });

        scanner.render((decodedText) => {
            const audio = new Audio('/beep.mp3');
            audio.play();
            if (window.navigator.vibrate) window.navigator.vibrate(100);
            onScan(decodedText);
            scanner.clear();
        }, (error) => {
            // erros
        });

        return () => scanner.clear();
    }, []);

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-4">
            <div id="reader" className="w-full max-w-md overflow-hidden rounded-2xl bg-white"></div>
            <button
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-white/10 text-white rounded-full font-bold"
            >
                Cancelar
            </button>
        </div>
    );
}
