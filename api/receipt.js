export default function handler(req, res) {
    const title = req.query.title || 'Utility Bill';
    const amount = req.query.am || '0.00';
    const cnum = req.query.cnum || 'N/A';
    const tx = req.query.tx || 'Pending';
    const date = req.query.dt || new Date().toLocaleDateString('en-IN');

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <title>Payment Receipt</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <style>
            body { font-family: 'Inter', sans-serif; background-color: #F3F4F6; }
            .receipt-edge { background-image: radial-gradient(#F3F4F6 4px, transparent 4px); background-size: 16px 16px; background-position: -8px -8px; }
            .data-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed #E5E7EB; }
            .data-row:last-child { border-bottom: none; }
        </style>
    </head>
    <body class="min-h-screen flex flex-col items-center py-8 px-4">
        
        <div class="w-full max-w-md flex justify-between items-center mb-6" data-html2canvas-ignore>
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 font-bold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <span class="material-icons-round text-sm">arrow_back</span> Back
            </button>
            <button onclick="downloadReceipt()" class="flex items-center gap-2 text-white font-bold bg-blue-600 px-5 py-2.5 rounded-xl shadow-md">
                <span class="material-icons-round text-sm">file_download</span> Save
            </button>
        </div>

        <div id="receipt-card" class="w-full max-w-md bg-white rounded-t-2xl shadow-xl overflow-hidden pb-8">
            <div class="bg-[#0e8f4f] p-8 flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3"><span class="material-icons-round text-[#0e8f4f] text-4xl">check_circle</span></div>
                <h1 class="text-white font-extrabold text-2xl">Payment Successful</h1>
                <p class="text-emerald-100 font-semibold text-xs tracking-widest uppercase mt-1">BharatConnect (BBPS)</p>
            </div>

            <div class="px-8 pt-8 pb-4 text-center">
                <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Amount Paid</p>
                <h2 class="text-5xl font-extrabold text-slate-900">₹${amount}</h2>
            </div>

            <div class="px-8 py-2 flex flex-col">
                <div class="data-row"><span class="text-slate-500 text-sm font-medium">Biller</span><span class="text-slate-900 font-bold">${title}</span></div>
                <div class="data-row"><span class="text-slate-500 text-sm font-medium">Consumer No.</span><span class="text-slate-900 font-bold">${cnum}</span></div>
                <div class="data-row"><span class="text-slate-500 text-sm font-medium">Payment Date</span><span class="text-slate-900 font-bold">${date}</span></div>
                <div class="data-row"><span class="text-slate-500 text-sm font-medium">Payment Mode</span><span class="text-slate-900 font-bold">EG Payments</span></div>
            </div>

            <div class="mx-8 mt-4 mb-2 bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                <p class="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">BharatConnect Txn ID</p>
                <p class="text-slate-900 font-mono font-bold text-sm">${tx}</p>
            </div>

            <div class="mt-8 flex justify-center items-center gap-1.5 opacity-40">
                <span class="material-icons-round text-[14px]">verified_user</span>
                <span class="text-[10px] font-bold tracking-widest uppercase">Home Payments</span>
            </div>
        </div>
        <div class="w-full max-w-md h-4 receipt-edge shadow-xl" data-html2canvas-ignore></div>

        <script>
            function downloadReceipt() {
                const element = document.getElementById('receipt-card');
                element.style.paddingBottom = "32px";
                html2canvas(element, { scale: 3, useCORS: true, backgroundColor: "#FFFFFF" }).then(canvas => {
                    element.style.paddingBottom = "8px";
                    const link = document.createElement('a');
                    link.download = 'EG_Payment_Receipt.png';
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                });
            }
        </script>
    </body>
    </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
