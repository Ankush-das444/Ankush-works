export default function handler(req, res) {
    // 1. Grab parameters from the URL
    const amount = req.query.am || '0.00';
    const note = req.query.tn || 'Family Hub Payment';
    
    // 2. YOUR BANK DETAILS (Put your bob Champ UPI ID here)
    const UPI_ID = "ankushz0@ptyes"; 
    const PAYEE_NAME = "Ankush Das";

    // Core parameter string
    const params = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

    // 3. Android WebView Intent URIs (Crucial for HTML Apps)
    const gpayIntent = `intent://upi/pay?${params}#Intent;scheme=tez;package=com.google.android.apps.nbu.paisa.user;end;`;
    const phonepeIntent = `intent://pay?${params}#Intent;scheme=phonepe;package=com.phonepe.app;end;`;
    const paytmIntent = `intent://pay?${params}#Intent;scheme=paytmmp;package=net.one97.paytm;end;`;
    const genericUpiIntent = `intent://pay?${params}#Intent;scheme=upi;end;`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Secure Checkout</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { background-color: #0F172A; color: white; font-family: sans-serif; }
            .app-btn { display: flex; align-items: center; gap: 16px; background: #1E293B; padding: 16px; border-radius: 16px; margin-bottom: 12px; border: 1px solid #334155; text-decoration: none; color: white; font-weight: bold; transition: 0.2s; }
            .app-btn:active { transform: scale(0.95); background: #334155; }
            .icon-circle { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; }
        </style>
    </head>
    <body class="min-h-screen flex flex-col p-6 max-w-md mx-auto">
        
        <div class="text-center mt-12 mb-10">
            <div class="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://icon-flow-pi.vercel.app/api/render?q=shield&color=10B981&size=32" alt="Secure">
            </div>
            <h1 class="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Payment Request</h1>
            <h2 class="text-5xl font-extrabold mb-3 tracking-tight">₹${amount}</h2>
            <p class="text-slate-400 bg-slate-800/50 inline-block px-4 py-1.5 rounded-full text-sm">${note}</p>
        </div>

        <div class="bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-800">
            <h3 class="text-xs text-slate-500 mb-4 px-2 uppercase font-bold tracking-wider">Select App to Pay</h3>
            
            <a href="${gpayIntent}" class="app-btn">
                <div class="icon-circle bg-white">
                    <img src="https://icon-flow-pi.vercel.app/api/render?q=google&color=000000&size=24" alt="GPay">
                </div>
                <span class="text-lg">Google Pay</span>
            </a>
            
            <a href="${phonepeIntent}" class="app-btn">
                <div class="icon-circle bg-purple-600 text-white pb-1 tracking-tighter">पे</div>
                <span class="text-lg">PhonePe</span>
            </a>
            
            <a href="${paytmIntent}" class="app-btn">
                <div class="icon-circle bg-blue-500 text-white text-xs tracking-tighter">Paytm</div>
                <span class="text-lg">Paytm</span>
            </a>

            <div class="my-5 text-center text-slate-600 text-xs font-bold uppercase tracking-wider">OR</div>

            <a href="${genericUpiIntent}" class="app-btn bg-blue-600 border-blue-500 justify-center">
                <span class="text-lg text-white">Other UPI Apps</span>
            </a>
        </div>
        
        <p class="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-widest font-bold">Secured by Home Payments Gateway</p>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
