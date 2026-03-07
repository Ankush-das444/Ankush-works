export default function handler(req, res) {
    const amount = req.query.am || '0.00';
    const note = req.query.tn || 'Family Hub Payment';
    
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
        <meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Secure Gateway</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; color: #0F172A; min-height: 100dvh; }</style>
    </head>
    <body class="flex flex-col items-center justify-between py-8 px-4">
        
        <div class="w-full max-w-md flex flex-col items-center flex-grow mt-2">
            
            <div class="w-full flex justify-between items-center mb-8">
                <button onclick="window.history.back()" class="text-slate-500 p-2 bg-slate-200 rounded-full shadow-sm"><span class="material-icons-round text-sm">close</span></button>
                <span class="text-[10px] font-bold tracking-widest text-slate-500 uppercase flex items-center gap-1"><span class="material-icons-round text-xs">lock</span> Onyx Secure</span>
            </div>

            <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 shadow-inner border border-blue-200">
                <img src="https://icon-flow-pi.vercel.app/api/render?q=wallet&color=3B82F6&size=32" alt="Wallet">
            </div>
            
            <h1 class="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Payment Request</h1>
            <div class="text-5xl font-bold text-slate-900 mb-3 tracking-tight">₹${amount}</div>
            <div class="px-4 py-1.5 rounded-full bg-white text-sm font-bold text-slate-600 border border-slate-200 shadow-sm">${note}</div>

            <div class="w-full bg-white rounded-3xl p-5 shadow-xl border border-slate-200 mt-8 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4 mt-2">Select App to Pay</h2>
                
                <div class="space-y-3">
                    <a href="${gpayIntent}" class="w-full flex items-center p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl active:scale-[0.98] transition">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 mr-4 shadow-sm border border-slate-100">
                            <svg class="w-6 h-6" viewBox="0 0 24 24"><path d="M23.49,12.27 C23.49,11.48 23.42,10.73 23.3,10 L12,10 L12,14.51 L18.47,14.51 C18.18,15.99 17.25,17.24 15.86,18.17 L15.86,21.17 L19.68,21.17 C21.91,19.13 23.49,16.04 23.49,12.27 Z" fill="#4285F4"></path><path d="M12,24 C15.24,24 17.96,22.91 19.98,21.05 L16.14,17.97 C15.06,18.7 13.67,19.12 12,19.12 C8.83,19.12 6.16,16.96 5.2,14.06 L1.35,14.06 L1.35,17.06 C3.36,21.06 7.46,24 12,24 Z" fill="#34A853"></path><path d="M5.2,14.06 C4.95,13.31 4.82,12.51 4.82,11.7 C4.82,10.89 4.96,10.09 5.2,9.34 L5.2,6.34 L1.34,6.34 C0.49,8.04 0,9.97 0,11.99 C0,14.03 0.49,15.95 1.35,17.66 L5.2,14.06 Z" fill="#FBBC05"></path><path d="M12,4.78 C13.78,4.78 15.35,5.39 16.6,6.59 L20.06,3.13 C17.95,1.17 15.22,0 12,0 C7.46,0 3.36,2.94 1.34,6.94 L5.2,9.94 C6.16,7.04 8.83,4.78 12,4.78 Z" fill="#EA4335"></path></svg>
                        </div>
                        <span class="text-base font-bold text-slate-800">Google Pay</span>
                    </a>
                    
                    <a href="${phonepeIntent}" class="w-full flex items-center p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl active:scale-[0.98] transition">
                        <div class="w-10 h-10 bg-[#5f259f] rounded-lg flex items-center justify-center mr-4 text-white font-bold text-lg shadow-sm">Pe</div>
                        <span class="text-base font-bold text-slate-800">PhonePe</span>
                    </a>
                    
                    <a href="${paytmIntent}" class="w-full flex items-center p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl active:scale-[0.98] transition">
                        <div class="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center mr-4 text-white font-bold text-xs shadow-sm">Paytm</div>
                        <span class="text-base font-bold text-slate-800">Paytm</span>
                    </a>
                </div>
                
                <div class="py-5 text-center text-[10px] font-bold text-slate-400 uppercase">or</div>
                
                <a href="${genericUpiIntent}" class="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md active:scale-95 transition flex justify-center">Other UPI Apps</a>
            </div>

            <button onclick="window.history.back()" class="w-full mt-6 bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition flex justify-center items-center gap-2">
                <span class="material-icons-round text-[18px]">check_circle</span> I've Completed the Payment
            </button>
        </div>
    </body>
    </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
