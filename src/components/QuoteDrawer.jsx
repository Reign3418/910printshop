import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Phone, MessageCircle, Send, FileText } from 'lucide-react';

export default function QuoteDrawer() {
  const {
    isQuoteDrawerOpen,
    setIsQuoteDrawerOpen,
    quoteItems,
    updateQuoteQty,
    removeFromQuote,
    clearQuote,
    quoteSubtotal,
    shopInfo
  } = useShop();

  if (!isQuoteDrawerOpen) return null;

  const ncSalesTax = quoteSubtotal * 0.07; // Cumberland County NC 7.00% sales tax
  const estimatedGrandTotal = quoteSubtotal + ncSalesTax;

  const formattedLines = quoteItems
    .map(
      (q) =>
        `• ${q.qty}x ${q.name} (${q.price})${q.customNotes ? ` — ${q.customNotes}` : ''}`
    )
    .join('\n');

  const whatsappBody = `Hi 910 PrintShop! I built a project estimate on your website and would like to get a proof started:\n\n${formattedLines}\n\nEst. Subtotal: $${quoteSubtotal.toFixed(
    2
  )}\nEst. Total w/ NC Tax: $${estimatedGrandTotal.toFixed(2)}\n\nMy Name & Vehicle/Artwork details:`;

  const smsHref = `sms:${shopInfo.phoneRaw}?&body=${encodeURIComponent(whatsappBody)}`;
  const whatsappHref = `https://wa.me/19109200863?text=${encodeURIComponent(whatsappBody)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-[#0E131A] text-white w-full max-w-md h-full flex flex-col border-l-2 border-cyan-500/60 shadow-2xl rounded-none">
        {/* Drawer Header */}
        <div className="p-4 bg-[#080B0F] border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-lg font-black uppercase font-['Bebas_Neue'] tracking-wider">
                My Wrap &amp; Print Quote Tray
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                4315 Bragg Blvd • Direct to WhatsApp or SMS
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuoteDrawerOpen(false)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 cursor-pointer rounded-none"
            aria-label="Close Quote Tray"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {quoteItems.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-400">
              <p className="text-sm font-bold">Your Quote Tray is currently empty.</p>
              <p className="text-xs">
                Tap <strong>&quot;+ Add to Quote&quot;</strong> on any vehicle wrap, custom t-shirt pack, decal, or banner package to build your instant project estimate.
              </p>
            </div>
          ) : (
            quoteItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="p-3 bg-[#141C27] border border-[#263447] space-y-2 rounded-none"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-xs text-white">{item.name}</div>
                    {item.customNotes && (
                      <div className="text-[11px] text-cyan-300 font-mono mt-0.5">
                        {item.customNotes}
                      </div>
                    )}
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {item.price} <span className="text-[10px]">({item.unit})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromQuote(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuoteQty(idx, -1)}
                      className="w-6 h-6 bg-slate-800 border border-slate-600 font-mono text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQuoteQty(idx, 1)}
                      className="w-6 h-6 bg-slate-800 border border-slate-600 font-mono text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="font-mono font-black text-xs text-cyan-300">
                    ${(item.numericPrice * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Totals & 1-Tap Dispatch */}
        {quoteItems.length > 0 && (
          <div className="p-4 bg-[#080B0F] border-t border-[#1E293B] space-y-3">
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Estimated Subtotal:</span>
                <span>${quoteSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Est. Cumberland Co. NC Tax (7.0%):</span>
                <span>${ncSalesTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-cyan-300 pt-1 border-t border-slate-800">
                <span>Estimated Project Total:</span>
                <span>${estimatedGrandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-none shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Quote via WhatsApp (910) 920-0863</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={smsHref}
                  className="py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>1-Tap SMS Quote</span>
                </a>

                <a
                  href={`tel:${shopInfo.phoneRaw}`}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-none"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Shop</span>
                </a>
              </div>

              <button
                onClick={clearQuote}
                className="text-[11px] font-mono text-slate-500 hover:text-rose-400 underline text-center pt-1 cursor-pointer"
              >
                Clear Estimate Tray
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
