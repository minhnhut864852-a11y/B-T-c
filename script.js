// LOGO
['navLogo','aboutLogo','footerLogo'].forEach(function(id) { var el = document.getElementById(id); if(el) el.src = 'logo.png'; });

// LIVE PRICES
async function fetchPrices() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple&vs_currencies=usd&include_24hr_change=true');
    const data = await res.json();
    const coins = [
      {ids:['btc-price','btc-price2'],key:'bitcoin'},
      {ids:['eth-price','eth-price2'],key:'ethereum'},
      {ids:['sol-price','sol-price2'],key:'solana'},
      {ids:['bnb-price','bnb-price2'],key:'binancecoin'},
      {ids:['xrp-price','xrp-price2'],key:'ripple'},
    ];
    coins.forEach(({ids,key}) => {
      const coin = data[key]; if(!coin) return;
      const price = coin.usd.toLocaleString('en-US',{maximumFractionDigits:2});
      const change = coin.usd_24h_change;
      const isUp = change >= 0;
      const text = (isUp ? '▲ +' : '▼ ') + Math.abs(change).toFixed(2) + '%  $' + price;
      ids.forEach(id => {
        const el = document.getElementById(id);
        if(el){el.textContent=text;el.className=isUp?'up':'down';}
      });
    });
  } catch(e){ console.log('Price fetch failed'); }
}
fetchPrices();
setInterval(fetchPrices, 60000);

// LANGUAGE
let currentLang = 'vi';
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-vi][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if(text !== null) el.innerHTML = text;
  });
  const nameInput = document.getElementById('inp-name');
  if(nameInput) nameInput.placeholder = lang === 'en' ? 'Nguyen Van A' : 'Nguyễn Văn A';

  // Update selects
  document.querySelectorAll('select option[data-vi][data-en]').forEach(opt => {
    opt.textContent = opt.getAttribute('data-' + lang);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
  });
}

// HAMBURGER
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ABOUT TABS
function switchTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// NEWBIE TABS
function switchNewbieTab(id, btn) {
  document.querySelectorAll('.newbie-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.newbie-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('ntab-' + id).classList.add('active');
  btn.classList.add('active');
}

// FAQ
function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FORM SUBMIT
function handleSubmit() {
  const btn = document.getElementById('submitBtn');
  const span = btn.querySelector('span');
  span.textContent = currentLang === 'vi' ? '✓ Đã Gửi Thành Công!' : '✓ Submitted!';
  btn.style.background = 'linear-gradient(135deg,#059669,#34D399)';
  setTimeout(() => { setLang(currentLang); btn.style.background = ''; }, 3000);
}

// DASHBOARD DATA
// ── Real trade data extracted from Excel ──
const allTrades = [{"d": "07/06", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "17/07", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "07/07", "c": "DOGE/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "18/07", "c": "OP/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "07/07", "c": "FARTCOIN/USDT", "k": "THẮNG", "l": 1.5, "m": 7, "y": 2025}, {"d": "20/07", "c": "OP/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "07/08", "c": "TON/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "21/07", "c": "LINK/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "07/08", "c": "BTC/USDT", "k": "THẮNG", "l": 3.5, "m": 7, "y": 2025}, {"d": "21/07", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 7, "y": 2025}, {"d": "07/08", "c": "LINK/USDT", "k": "THẮNG", "l": 4.0, "m": 7, "y": 2025}, {"d": "21/07", "c": "NEAR/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "07/09", "c": "IP/USDT", "k": "THẮNG", "l": 1.0, "m": 7, "y": 2025}, {"d": "22/07", "c": "LINK/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "07/10", "c": "HAEDAL/USDT", "k": "THẮNG", "l": 0.8, "m": 7, "y": 2025}, {"d": "22/07", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 7, "y": 2025}, {"d": "07/11", "c": "NEAR/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "22/07", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 7, "y": 2025}, {"d": "07/12", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "22/07", "c": "LINK/USDT", "k": "THẮNG", "l": 2.0, "m": 7, "y": 2025}, {"d": "13/07", "c": "WLD/USDT", "k": "THẮNG", "l": 2.0, "m": 7, "y": 2025}, {"d": "22/07", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 7, "y": 2025}, {"d": "23/07", "c": "WLD/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "14/07", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "23/07", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 7, "y": 2025}, {"d": "14/07", "c": "NEAR/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "24/07", "c": "BTC/USDT", "k": "THẮNG", "l": 0.5, "m": 7, "y": 2025}, {"d": "15/07", "c": "LINK/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "24/07", "c": "BTC/USDT", "k": "THUA", "l": -0.5, "m": 7, "y": 2025}, {"d": "15/07", "c": "WLD/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "15/07", "c": "LINK/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "15/07", "c": "ETH/USDT", "k": "HÒA", "l": 0.0, "m": 7, "y": 2025}, {"d": "15/07", "c": "BANANA/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "15/07", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 7, "y": 2025}, {"d": "16/07", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 7, "y": 2025}, {"d": "17/07", "c": "TIA/USDT", "k": "THẮNG", "l": 1.0, "m": 7, "y": 2025}, {"d": "17/07", "c": "SEI/USDT", "k": "THẮNG", "l": 1.0, "m": 7, "y": 2025}, {"d": "17/07", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 7, "y": 2025}, {"d": "01/08", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 8, "y": 2025}, {"d": "16/08", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "02/08", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "18/08", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 8, "y": 2025}, {"d": "03/08", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "19/08", "c": "XRP/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "04/08", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "19/08", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 8, "y": 2025}, {"d": "05/08", "c": "ETH/USDT", "k": "THẮNG", "l": 1.0, "m": 8, "y": 2025}, {"d": "20/08", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 8, "y": 2025}, {"d": "05/08", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 8, "y": 2025}, {"d": "20/08", "c": "BTC/USDT", "k": "THẮNG", "l": 2.4, "m": 8, "y": 2025}, {"d": "06/08", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 8, "y": 2025}, {"d": "21/08", "c": "BTC/USDT", "k": "THẮNG", "l": 2.4, "m": 8, "y": 2025}, {"d": "07/08", "c": "XRP/USDT", "k": "THẮNG", "l": 3.5, "m": 8, "y": 2025}, {"d": "22/08", "c": "ADA/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "07/08", "c": "MYX/USDT", "k": "THẮNG", "l": 1.0, "m": 8, "y": 2025}, {"d": "25/08", "c": "LINK/USDT", "k": "THUA", "l": -1.0, "m": 8, "y": 2025}, {"d": "26/08", "c": "AAVE/USDT", "k": "THẮNG", "l": 2.0, "m": 8, "y": 2025}, {"d": "11/08", "c": "SOL/USDT", "k": "THUA", "l": -1.0, "m": 8, "y": 2025}, {"d": "12/08", "c": "XRP/USDT", "k": "THẮNG", "l": 2.0, "m": 8, "y": 2025}, {"d": "13/08", "c": "LINK/USDT", "k": "HÒA", "l": 0.0, "m": 8, "y": 2025}, {"d": "28/08", "c": "LINK/USDT", "k": "THẮNG", "l": 7.0, "m": 8, "y": 2025}, {"d": "13/08", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 8, "y": 2025}, {"d": "31/08", "c": "LINK/USDT", "k": "THẮNG", "l": 1.0, "m": 8, "y": 2025}, {"d": "31/08", "c": "BTC/USDT", "k": "THẮNG", "l": 1.5, "m": 8, "y": 2025}, {"d": "01/09", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "14/09", "c": "XRP/USDT", "k": "HÒA", "l": -0.5, "m": 9, "y": 2025}, {"d": "02/09", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 9, "y": 2025}, {"d": "15/09", "c": "LINK/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "03/09", "c": "SUI/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "15/09", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 9, "y": 2025}, {"d": "03/09", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 9, "y": 2025}, {"d": "16/09", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "03/09", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "17/09", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "04/09", "c": "SEI/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "18/09", "c": "TON/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "05/09", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 9, "y": 2025}, {"d": "07/09", "c": "XRP/USDT", "k": "THẮNG", "l": 3.5, "m": 9, "y": 2025}, {"d": "07/09", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 9, "y": 2025}, {"d": "08/09", "c": "LINK/USDT", "k": "THẮNG", "l": 0.8, "m": 9, "y": 2025}, {"d": "10/09", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 9, "y": 2025}, {"d": "10/09", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 9, "y": 2025}, {"d": "23/09", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 9, "y": 2025}, {"d": "25/09", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 9, "y": 2025}, {"d": "01/10", "c": "AVAX/USDT", "k": "THẮNG", "l": 2.0, "m": 10, "y": 2025}, {"d": "16/10", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 10, "y": 2025}, {"d": "02/10", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 10, "y": 2025}, {"d": "16/10", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 10, "y": 2025}, {"d": "06/10", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 10, "y": 2025}, {"d": "17/10", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 10, "y": 2025}, {"d": "08/10", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 10, "y": 2025}, {"d": "19/10", "c": "BTC/USDT", "k": "THẮNG", "l": 2.5, "m": 10, "y": 2025}, {"d": "10/10", "c": "BNB/USDT", "k": "THẮNG", "l": 1.0, "m": 10, "y": 2025}, {"d": "21/10", "c": "BTC/USDT", "k": "THẮNG", "l": 2.5, "m": 10, "y": 2025}, {"d": "10/10", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 10, "y": 2025}, {"d": "14/10", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 10, "y": 2025}, {"d": "14/10", "c": "SOL/USDT", "k": "THẮNG", "l": 4.0, "m": 10, "y": 2025}, {"d": "15/10", "c": "SOL/USDT", "k": "THẮNG", "l": 2.0, "m": 10, "y": 2025}, {"d": "15/10", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 10, "y": 2025}, {"d": "29/10", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 10, "y": 2025}, {"d": "31/10", "c": "XRP/USDT", "k": "THẮNG", "l": 3.0, "m": 10, "y": 2025}, {"d": "31/10", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 10, "y": 2025}, {"d": "02/11", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 11, "y": 2025}, {"d": "22/11", "c": "NMR/USDT", "k": "THẮNG", "l": 8.0, "m": 11, "y": 2025}, {"d": "03/11", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 11, "y": 2025}, {"d": "22/11", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 11, "y": 2025}, {"d": "07/11", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 11, "y": 2025}, {"d": "12/11", "c": "ETH/USDT", "k": "THẮNG", "l": 3.5, "m": 11, "y": 2025}, {"d": "13/11", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 11, "y": 2025}, {"d": "17/11", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 11, "y": 2025}, {"d": "17/11", "c": "ETH/USDT", "k": "THẮNG", "l": 1.0, "m": 11, "y": 2025}, {"d": "20/11", "c": "XRP/USDT", "k": "THẮNG", "l": 0.5, "m": 11, "y": 2025}, {"d": "24/11", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 11, "y": 2025}, {"d": "03/12", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 12, "y": 2025}, {"d": "17/12", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 12, "y": 2025}, {"d": "05/12", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 12, "y": 2025}, {"d": "07/12", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 12, "y": 2025}, {"d": "08/12", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 12, "y": 2025}, {"d": "15/12", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 12, "y": 2025}, {"d": "15/12", "c": "ETH/USDT", "k": "THẮNG", "l": 1.0, "m": 12, "y": 2025}, {"d": "15/12", "c": "TAO/USDT", "k": "THẮNG", "l": 0.5, "m": 12, "y": 2025}, {"d": "17/12", "c": "BTC/USDT", "k": "THẮNG", "l": 1.5, "m": 12, "y": 2025}, {"d": "18/12", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 12, "y": 2025}, {"d": "18/12", "c": "ETH/USDT", "k": "THẮNG", "l": 3.0, "m": 12, "y": 2025}, {"d": "23/12", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 12, "y": 2025}, {"d": "31/12", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 12, "y": 2025}, {"d": "31/12", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 12, "y": 2025}, {"d": "05/01", "c": "BTC/USDT", "k": "HÒA", "l": -0.5, "m": 1, "y": 2026}, {"d": "05/01", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 1, "y": 2026}, {"d": "05/01", "c": "ETH/USDT", "k": "THẮNG", "l": 0.5, "m": 1, "y": 2026}, {"d": "06/01", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "06/01", "c": "ZK/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "06/01", "c": "BTC/USDT", "k": "THẮNG", "l": 2.5, "m": 1, "y": 2026}, {"d": "08/01", "c": "BTC/USDT", "k": "THUA", "l": -0.5, "m": 1, "y": 2026}, {"d": "08/01", "c": "ETH/USDT", "k": "THUA", "l": -0.5, "m": 1, "y": 2026}, {"d": "08/01", "c": "BTC/USDT", "k": "THẮNG", "l": 1.5, "m": 1, "y": 2026}, {"d": "10/01", "c": "BTC/USDT", "k": "THUA", "l": -0.5, "m": 1, "y": 2026}, {"d": "10/01", "c": "PEPE/USDT", "k": "THẮNG", "l": 2.0, "m": 1, "y": 2026}, {"d": "11/01", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 1, "y": 2026}, {"d": "11/01", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "11/01", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 1, "y": 2026}, {"d": "11/01", "c": "XRP/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "11/01", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "12/01", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "12/01", "c": "PEPE/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "12/01", "c": "ETH/USDT", "k": "THUA", "l": -1.5, "m": 1, "y": 2026}, {"d": "13/1", "c": "ZEC/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "13/1", "c": "DASH/USDT", "k": "THẮNG", "l": 4.5, "m": 1, "y": 2026}, {"d": "01/01", "c": "ZEC/USDT", "k": "THẮNG", "l": 3.5, "m": 1, "y": 2026}, {"d": "15/1", "c": "PEPE/USDT", "k": "THUA", "l": -0.5, "m": 1, "y": 2026}, {"d": "15/1", "c": "BTC/USDT", "k": "THẮNG", "l": 1.0, "m": 1, "y": 2026}, {"d": "15/1", "c": "BTC/USDT", "k": "THẮNG", "l": 1.5, "m": 1, "y": 2026}, {"d": "16/1", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "16/1", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "16/1", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "16/1", "c": "PENGU/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "17/1", "c": "HBAR/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "17/1", "c": "ENS/USDT", "k": "HÒA", "l": -0.5, "m": 1, "y": 2026}, {"d": "17/1", "c": "BCH/USDT", "k": "HÒA", "l": -0.5, "m": 1, "y": 2026}, {"d": "17/1", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "18/01", "c": "WIF/USDT", "k": "THUA", "l": -6.0, "m": 1, "y": 2026}, {"d": "20/1", "c": "HYPE/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "20/1", "c": "AXS/USDT", "k": "THẮNG", "l": 5.0, "m": 1, "y": 2026}, {"d": "20/1", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "20/1", "c": "ETH/USDT", "k": "THUA", "l": -3.0, "m": 1, "y": 2026}, {"d": "20/01", "c": "ETH/USDT", "k": "THUA", "l": -3.0, "m": 1, "y": 2026}, {"d": "23/1", "c": "AAVE/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "23/1", "c": "SUI/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "24/01", "c": "HYPE/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "25/01", "c": "SAPIEN/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "25/01", "c": "HYPER/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "25/01", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "25/01", "c": "XRP/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "25/01", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "27/1", "c": "AXS/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "27/1", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "27/1", "c": "ETH/USDT", "k": "THẮNG", "l": 4.0, "m": 1, "y": 2026}, {"d": "28/01", "c": "ETH/USDT", "k": "THẮNG", "l": 4.0, "m": 1, "y": 2026}, {"d": "28/01", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "29/01", "c": "BTC/USDT", "k": "THẮNG", "l": 18.0, "m": 1, "y": 2026}, {"d": "02/02", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "03/02", "c": "ETH/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "03/02", "c": "BTC/USDT", "k": "THUA", "l": -4.0, "m": 1, "y": 2026}, {"d": "03/02", "c": "ETH/USDT", "k": "THUA", "l": -4.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "ETH/USDT", "k": "HÒA", "l": 0.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 1, "y": 2026}, {"d": "04/02", "c": "BTC/USDT", "k": "THUA", "l": -4.0, "m": 1, "y": 2026}, {"d": "05/02", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 1, "y": 2026}, {"d": "09/02", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 2, "y": 2026}, {"d": "20/02", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 2, "y": 2026}, {"d": "09/02", "c": "ETH/USDT", "k": "THUA", "l": -2.0, "m": 2, "y": 2026}, {"d": "09/02", "c": "ETH/USDT", "k": "THẮNG", "l": 3.0, "m": 2, "y": 2026}, {"d": "11/02", "c": "BTC/USDT", "k": "THẮNG", "l": 6.0, "m": 2, "y": 2026}, {"d": "12/02", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 2, "y": 2026}, {"d": "12/02", "c": "ZRO/USDT", "k": "HÒA", "l": 0.0, "m": 2, "y": 2026}, {"d": "13/02", "c": "BTC/USDT", "k": "THUA", "l": -1.5, "m": 2, "y": 2026}, {"d": "16/02", "c": "AXS/USDT", "k": "THUA", "l": -2.0, "m": 2, "y": 2026}, {"d": "17/02", "c": "USELESS/USDT", "k": "THẮNG", "l": 3.0, "m": 2, "y": 2026}, {"d": "19/02", "c": "BTC/USDT", "k": "HÒA", "l": 0.0, "m": 2, "y": 2026}, {"d": "19/02", "c": "ETH/USDT", "k": "HÒA", "l": 0.0, "m": 2, "y": 2026}, {"d": "20/02", "c": "ZEC/USDT", "k": "HÒA", "l": 0.0, "m": 2, "y": 2026}, {"d": "24/02", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 2, "y": 2026}, {"d": "25/02", "c": "BTC/USDT", "k": "THẮNG", "l": 3.5, "m": 2, "y": 2026}, {"d": "27/02", "c": "BTC/USDT", "k": "THUA", "l": -2.0, "m": 2, "y": 2026}, {"d": "28/02", "c": "BTC/USDT", "k": "THUA", "l": -1.0, "m": 2, "y": 2026}, {"d": "02/03", "c": "BTC/USDT", "k": "THẮNG", "l": 2.0, "m": 2, "y": 2026}, {"d": "04/03", "c": "BTC/USDT", "k": "THẮNG", "l": 3.0, "m": 2, "y": 2026}, {"d": "05/03", "c": "ETH/USDT", "k": "THẮNG", "l": 2.0, "m": 2, "y": 2026}];
const monthSummary = {"7-2025": {"lenh": 50, "thang": 24, "thua": 17, "hoa": 9, "winrate": 59, "loinhuan": 26}, "8-2025": {"lenh": 36, "thang": 12, "thua": 10, "hoa": 14, "winrate": 55, "loinhuan": 10.5}, "9-2025": {"lenh": 32, "thang": 10, "thua": 15, "hoa": 6, "winrate": 40, "loinhuan": -6}, "10-2025": {"lenh": 29, "thang": 15, "thua": 12, "hoa": 2, "winrate": 56, "loinhuan": 12}, "11-2025": {"lenh": 25, "thang": 8, "thua": 10, "hoa": 6, "winrate": 45, "loinhuan": 2}, "12-2025": {"lenh": 30, "thang": 13, "thua": 13, "hoa": 4, "winrate": 50, "loinhuan": 2.5}, "1-2026": {"lenh": 64, "thang": 19, "thua": 29, "hoa": 16, "winrate": 39.6, "loinhuan": 0}, "2-2026": {"lenh": 23, "thang": 9, "thua": 7, "hoa": 7, "winrate": 56, "loinhuan": 9.5}};

function renderChart(filterM, filterY) {
  const svg = document.getElementById('dashChart');
  if (!svg) return;

  const allMonthKeys = ['7-2025','8-2025','9-2025','10-2025','11-2025','12-2025','1-2026','2-2026'];
  const viNames = ['','T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

  let keys;
  if (filterM === 0 && filterY === 0) {
    keys = allMonthKeys;
  } else if (filterM === 0 && filterY !== 0) {
    keys = allMonthKeys.filter(k => parseInt(k.split('-')[1]) === filterY);
  } else if (filterM !== 0 && filterY === 0) {
    keys = allMonthKeys.filter(k => parseInt(k.split('-')[0]) === filterM);
  } else {
    keys = allMonthKeys.filter(k => k === filterM + '-' + filterY);
  }

  const points = [];
  let cumulative = 0;
  keys.forEach(k => {
    const s = monthSummary[k];
    if (!s) return;
    const mo = parseInt(k.split('-')[0]);
    const yr = parseInt(k.split('-')[1]);
    cumulative += s.loinhuan;
    points.push({ label: viNames[mo] + '/' + String(yr).slice(2), ln: s.loinhuan, cum: parseFloat(cumulative.toFixed(1)) });
  });

  const W = 900, H = 165;
  const padL = 50, padR = 50, padT = 15, padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const defs = '<defs><linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#A855F7;stop-opacity:0.3"/><stop offset="100%" style="stop-color:#A855F7;stop-opacity:0"/></linearGradient></defs>';

  if (points.length === 0) {
    svg.innerHTML = defs + '<text x="450" y="82" fill="rgba(216,180,254,0.4)" font-size="14" text-anchor="middle" font-family="Space Mono">Không có dữ liệu</text>';
    return;
  }

  const cumValues = points.map(p => p.cum);
  const minV = Math.min(0, ...cumValues);
  const maxV = Math.max(0, ...cumValues);
  const range = maxV - minV || 1;
  const toX = function(i) { return padL + (points.length > 1 ? (i / (points.length - 1)) : 0.5) * chartW; };
  const toY = function(v) { return padT + chartH - ((v - minV) / range) * chartH * 0.85; };

  var gridLines = '';
  for (var g = 0; g <= 3; g++) {
    var gy = (padT + (g / 3) * chartH).toFixed(1);
    gridLines += '<line x1="0" y1="' + gy + '" x2="' + W + '" y2="' + gy + '" stroke="rgba(168,85,247,0.1)" stroke-width="1"/>';
  }

  var zeroLine = '';
  if (minV < 0 && maxV > 0) {
    var zy = toY(0).toFixed(1);
    zeroLine = '<line x1="' + padL + '" y1="' + zy + '" x2="' + (W-padR) + '" y2="' + zy + '" stroke="rgba(168,85,247,0.3)" stroke-width="1" stroke-dasharray="4,3"/>';
  }

  var coords = points.map(function(p, i) { return [toX(i), toY(p.cum)]; });

  function cardinalPath(pts) {
    if (pts.length === 1) return 'M ' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1) + ' L ' + (pts[0][0]+1).toFixed(1) + ',' + pts[0][1].toFixed(1);
    var d = 'M ' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    var t = 0.4;
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(i-1, 0)], p1 = pts[i], p2 = pts[i+1], p3 = pts[Math.min(i+2, pts.length-1)];
      var cp1x = (p1[0] + (p2[0]-p0[0])*t/2).toFixed(1);
      var cp1y = (p1[1] + (p2[1]-p0[1])*t/2).toFixed(1);
      var cp2x = (p2[0] - (p3[0]-p1[0])*t/2).toFixed(1);
      var cp2y = (p2[1] - (p3[1]-p1[1])*t/2).toFixed(1);
      d += ' C ' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }

  var linePath = cardinalPath(coords);
  var firstX = coords[0][0].toFixed(1), firstY = coords[0][1].toFixed(1);
  var lastX = coords[coords.length-1][0].toFixed(1);
  var baseY = (H - padB).toFixed(1);
  var fillPath = linePath + ' L ' + lastX + ',' + baseY + ' L ' + firstX + ',' + baseY + ' Z';

  var circles = '', labels = '';
  points.forEach(function(p, i) {
    var cx = toX(i).toFixed(1), cy = toY(p.cum).toFixed(1);
    var isLast = i === points.length - 1;
    var color = p.ln < 0 ? '#F87171' : (p.ln === 0 ? '#F59E0B' : '#A855F7');
    var labelColor = p.ln > 0 ? '#C084FC' : (p.ln < 0 ? '#F87171' : '#F59E0B');
    var lnStr = (p.ln > 0 ? '+' : '') + p.ln + '%';
    if (isLast) {
      circles += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#34D399" stroke="white" stroke-width="2"/>';
    } else {
      circles += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="' + color + '"/>';
    }
    circles += '<text x="' + cx + '" y="' + (parseFloat(cy)-9).toFixed(1) + '" fill="' + labelColor + '" font-size="9" text-anchor="middle" font-family="Space Mono">' + lnStr + '</text>';
    labels += '<text x="' + cx + '" y="' + (H-4) + '" fill="rgba(216,180,254,0.5)" font-size="10" text-anchor="middle" font-family="Space Mono">' + p.label + '</text>';
  });

  svg.innerHTML = defs + gridLines + zeroLine + '<path d="' + fillPath + '" fill="url(#chartGrad)"/><path d="' + linePath + '" fill="none" stroke="#A855F7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' + circles + labels;
}

function updateMonthOptions() {
  const y = parseInt(document.getElementById('filterYear').value);
  const monthSel = document.getElementById('filterMonth');
  const viNames = ['','T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  let available;
  if (y === 2025) available = [7,8,9,10,11,12];
  else if (y === 2026) available = [1,2];
  else available = [1,2,3,4,5,6,7,8,9,10,11,12];
  monthSel.innerHTML = '<option value="0">Tất Cả Tháng</option>';
  available.forEach(mo => {
    monthSel.innerHTML += '<option value="' + mo + '">' + viNames[mo] + '</option>';
  });
  monthSel.value = '0';
}

function getPeriodLabel(m, y, prefix) {
  let label;
  if (m === 0 && y === 0) label = 'T7/2025 – T2/2026';
  else if (m === 0 && y !== 0) label = 'Năm ' + y;
  else if (m !== 0 && y === 0) label = 'T' + m + ' (2025–2026)';
  else label = 'T' + m + '/' + y;
  return prefix ? prefix + label : label;
}

function updateDashboard() {
  const m = parseInt(document.getElementById('filterMonth').value);
  const y = parseInt(document.getElementById('filterYear').value);
  const filtered = allTrades.filter(t => (m === 0 || t.m === m) && (y === 0 || t.y === y));

  // Update table — columns: Ngày, Cặp, Kết Quả, LN (%), Tháng
  const tbody = document.querySelector('.trade-table tbody');
  if(filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:2rem">' + (currentLang==='vi'?'Không có dữ liệu cho khoảng thời gian này':'No data for this period') + '</td></tr>';
  } else {
    // Show latest 30 trades reversed
    const display = filtered.slice(-30).reverse();
    tbody.innerHTML = display.map(t => {
      const isWin = t.k === 'THẮNG';
      const isDraw = t.k === 'HÒA';
      const lnStr = t.l > 0 ? '+' + t.l + '%' : (t.l < 0 ? t.l + '%' : 'HÒA');
      const cls = isWin ? 'profit' : (isDraw ? '' : 'loss');
      const kqCls = isWin ? 'tag-buy' : (isDraw ? 'tag-neutral' : 'tag-sell');
      const monthLabel = 'T' + t.m + '/' + t.y;
      return `<tr>
        <td>${t.d || '—'}</td>
        <td>${t.c}</td>
        <td><span class="${kqCls}">${t.k}</span></td>
        <td><span class="${cls}">${lnStr}</span></td>
        <td>${monthLabel}</td>
      </tr>`;
    }).join('');
  }

  // Update metrics from monthly summaries
  let totalLenh=0, totalThang=0, totalThua=0, totalLN=0, lnCount=0;
  Object.entries(monthSummary).forEach(([key, s]) => {
    const [mo, yr] = key.split('-').map(Number);
    if((m === 0 || mo === m) && (y === 0 || yr === y)) {
      totalLenh += s.lenh; totalThang += s.thang; totalThua += s.thua;
      if(s.loinhuan !== 0) { totalLN += s.loinhuan; lnCount++; }
    }
  });
  const wr = (totalThang + totalThua) > 0 ? ((totalThang/(totalThang+totalThua))*100).toFixed(1) : '—';
  const lnDisp = totalLN !== 0 ? (totalLN > 0 ? '+' : '') + totalLN.toFixed(1) + '%' : '—';

  const cards = document.querySelectorAll('.metric-value');
  if(cards[0]) cards[0].textContent = lnDisp;
  if(cards[1]) cards[1].textContent = wr !== '—' ? wr + '%' : '—';
  if(cards[2]) cards[2].textContent = totalLenh || '—';

  // Update metric subtitles dynamically
  const lnArrow = (totalLN > 0 ? '▲ ' : totalLN < 0 ? '▼ ' : '');
  const changes = document.querySelectorAll('.metric-change');
  if(changes[0]) changes[0].textContent = getPeriodLabel(m, y, lnArrow);
  if(changes[1]) changes[1].textContent = getPeriodLabel(m, y, '');
  if(changes[2]) changes[2].textContent = getPeriodLabel(m, y, '');

  // Render dynamic chart
  renderChart(m, y);

  // Update title
  const mSel = document.getElementById('filterMonth');
  const ySel = document.getElementById('filterYear');
  const mLabel = mSel.options[mSel.selectedIndex].text;
  const titleEl = document.getElementById('dashTitle');
  const base = currentLang==='vi' ? 'Hiệu Suất BoToc' : 'BoToc Performance';
  const suffix = (m===0 && y===0) ? '' : ` — ${m!==0?mLabel:''} ${y!==0?y:''}`.trim();
  titleEl.textContent = base + suffix;
}




// BACK TO TOP
window.addEventListener('scroll', () => {
  const btn = document.getElementById('toTopBtn');
  if(btn) btn.classList.toggle('visible', window.scrollY > 400);
});


// FEAR & GREED INDEX + BTC DOMINANCE
async function loadMarketSentiment() {
  try {
    // Fear & Greed from alternative.me
    const fgRes = await fetch('https://api.alternative.me/fng/?limit=1');
    const fgData = await fgRes.json();
    const score = parseInt(fgData.data[0].value);
    const classification = fgData.data[0].value_classification;

    document.getElementById('fgScore').textContent = score;
    const label = document.getElementById('fgLabel');
    label.textContent = classification;

    // Color based on score
    let color = score < 25 ? '#F87171' : score < 45 ? '#F59E0B' : score < 55 ? '#FBBF24' : score < 75 ? '#86EFAC' : '#34D399';
    document.getElementById('fgScore').style.color = color;
    label.style.color = color;

    // Animate gauge needle + fill
    const pct = score / 100;
    const angle = -90 + pct * 180; // -90deg = far left, +90deg = far right
    document.getElementById('gaugeNeedle').setAttribute('transform', `rotate(${angle}, 100, 100)`);
    const arcLen = 283;
    document.getElementById('gaugeFill').style.strokeDashoffset = arcLen - (arcLen * pct);

    // BTC Dominance from CoinGecko global
    const cgRes = await fetch('https://api.coingecko.com/api/v3/global');
    const cgData = await cgRes.json();
    const btcPct = cgData.data.market_cap_percentage.btc.toFixed(1);
    const ethPct = cgData.data.market_cap_percentage.eth.toFixed(1);

    document.getElementById('btcDom').textContent = btcPct + '%';
    document.getElementById('ethDom').textContent = ethPct + '%';
    document.getElementById('btcDomBar').style.width = Math.min(btcPct, 100) + '%';
    document.getElementById('ethDomBar').style.width = Math.min(ethPct * 2.5, 100) + '%'; // scale eth for visual

    const now = new Date();
    document.getElementById('sentimentUpdated').textContent = 'Cập nhật: ' + now.toLocaleTimeString('vi-VN');
  } catch(e) {
    document.getElementById('fgScore').textContent = '--';
    document.getElementById('fgLabel').textContent = 'Không tải được';
    console.log('Market sentiment error:', e);
  }
}
loadMarketSentiment();
setInterval(loadMarketSentiment, 300000); // refresh every 5 mins


// TELEGRAM QR POPUP
function toggleTeleQR(e) {
  e.preventDefault();
  const popup = document.getElementById('teleQrPopup');
  popup.classList.toggle('show');
  e.stopPropagation();
}
document.addEventListener('click', function(e) {
  const popup = document.getElementById('teleQrPopup');
  if(popup && !popup.contains(e.target)) popup.classList.remove('show');
});

// Pill chip toggle
function togglePill(btn) {
  btn.classList.toggle('active');
}
function toggleKhacPill(btn) {
  const khacInput = document.getElementById('inp-goal-khac');
  if(khacInput) khacInput.style.display = btn.classList.contains('active') ? 'block' : 'none';
}
// Get selected pill values (for form submission)
function getSelectedGoals() {
  const pills = document.querySelectorAll('#inp-goal-group .pill-chip.active');
  return Array.from(pills).map(p => p.dataset.value).join(', ');
}

// Init dashboard with real data on load
document.addEventListener('DOMContentLoaded', function() {
  updateMonthOptions();
  updateDashboard();
});
