export default function handler(req, res) {
    const amount = req.query.am || '0.00';
    const note = req.query.tn || 'Family Hub Payment';
    
    // YOUR EXACT BANK DETAILS
    const UPI_ID = "ankushz0@ptyes"; 
    const PAYEE_NAME = "Ankush Das";

    const params = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

    const gpayIntent = `intent://upi/pay?${params}#Intent;scheme=tez;package=com.google.android.apps.nbu.paisa.user;end;`;
    const phonepeIntent = `intent://pay?${params}#Intent;scheme=phonepe;package=com.phonepe.app;end;`;
    const paytmIntent = `intent://pay?${params}#Intent;scheme=paytmmp;package=net.one97.paytm;end;`;
    const genericUpiIntent = `intent://pay?${params}#Intent;scheme=upi;end;`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <title>Family Hub Secure Payment Gateway</title>
        <link href="https://fonts.googleapis.com" rel="preconnect"/>
        <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
        <script>
            tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        colors: {
                            primary: "#2563EB", 
                            "background-light": "#F3F4F6", 
                            "background-dark": "#0B1120", 
                            "card-dark": "#111827", 
                            "card-light": "#FFFFFF", 
                            "surface-dark": "#1F2937", 
                            "surface-light": "#F9FAFB",
                        }
                    },
                },
            };
        </script>
        <style>
            body { font-family: 'Inter', sans-serif; min-height: max(884px, 100dvh); }
            .shield-glow { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
        </style>
    </head>
    <body class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-between py-8 px-4 transition-colors duration-300">
        
        <div class="w-full max-w-md flex flex-col items-center flex-grow">
            <div class="flex flex-col items-center mt-6 mb-8 w-full">
                <div class="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6 shield-glow border border-emerald-500/20">
                    <span class="material-icons-round text-emerald-500 text-3xl">shield</span>
                </div>
                <h1 class="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Payment Request
                </h1>
                <div class="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    ₹${amount}
                </div>
                <div class="px-4 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700/50">
                    ${note}
                </div>
            </div>

            <div class="w-full bg-card-light dark:bg-card-dark rounded-3xl p-5 shadow-lg border border-gray-200 dark:border-gray-800 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-50"></div>
                <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 pl-1">
                    Select App to Pay
                </h2>
                
                <div class="space-y-3">
                    <a href="${gpayIntent}" class="w-full group relative flex items-center p-4 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm p-1 mr-4 border border-gray-100">
                            <svg class="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M23.49,12.27 C23.49,11.48 23.42,10.73 23.3,10 L12,10 L12,14.51 L18.47,14.51 C18.18,15.99 17.25,17.24 15.86,18.17 L15.86,21.17 L19.68,21.17 C21.91,19.13 23.49,16.04 23.49,12.27 Z" fill="#4285F4"></path>
                                <path d="M12,24 C15.24,24 17.96,22.91 19.98,21.05 L16.14,17.97 C15.06,18.7 13.67,19.12 12,19.12 C8.83,19.12 6.16,16.96 5.2,14.06 L1.35,14.06 L1.35,17.06 C3.36,21.06 7.46,24 12,24 Z" fill="#34A853"></path>
                                <path d="M5.2,14.06 C4.95,13.31 4.82,12.51 4.82,11.7 C4.82,10.89 4.96,10.09 5.2,9.34 L5.2,6.34 L1.34,6.34 C0.49,8.04 0,9.97 0,11.99 C0,14.03 0.49,15.95 1.35,17.66 L5.2,14.06 Z" fill="#FBBC05"></path>
                                <path d="M12,4.78 C13.78,4.78 15.35,5.39 16.6,6.59 L20.06,3.13 C17.95,1.17 15.22,0 12,0 C7.46,0 3.36,2.94 1.34,6.94 L5.2,9.94 C6.16,7.04 8.83,4.78 12,4.78 Z" fill="#EA4335"></path>
                            </svg>
                        </div>
                        <span class="text-base font-semibold text-gray-900 dark:text-white">Google Pay</span>
                        <span class="ml-auto text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                            <span class="material-icons-round">chevron_right</span>
                        </span>
                    </a>
                    
                    <a href="${phonepeIntent}" class="w-full group relative flex items-center p-4 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer">
                        <div class="w-10 h-10 bg-[#5f259f] rounded-lg flex items-center justify-center shadow-sm mr-4 text-white font-bold text-lg">
                            Pe
                        </div>
                        <span class="text-base font-semibold text-gray-900 dark:text-white">PhonePe</span>
                        <span class="ml-auto text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                            <span class="material-icons-round">chevron_right</span>
                        </span>
                    </a>
                    
                    <a href="${paytmIntent}" class="w-full group relative flex items-center p-4 bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer">
                        <div class="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center shadow-sm mr-4 text-white font-bold text-xs">
                            Paytm
                        </div>
                        <span class="text-base font-semibold text-gray-900 dark:text-white">Paytm</span>
                        <span class="ml-auto text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                            <span class="material-icons-round">chevron_right</span>
                        </span>
                    </a>
                </div>
                
                <div class="relative py-6 flex items-center justify-center">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div class="relative z-10 bg-card-light dark:bg-card-dark px-3 text-xs font-bold text-gray-400 uppercase">
                        or
                    </div>
                </div>
                
                <a href="${genericUpiIntent}" class="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                    Other UPI Apps
                </a>
                
                <button onclick="window.history.back()" class="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                    <span class="material-icons-round">check_circle</span>
                    I've Completed the Payment
                </button>

            </div>
        </div>

        <footer class="mt-8 text-center w-full">
            <div class="flex items-center justify-center gap-1.5 opacity-60">
                <span class="material-icons-round text-xs text-gray-500">lock</span>
                <span class="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    Secured by Onyx Gateway
                </span>
            </div>
        </footer>

        <script>
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
