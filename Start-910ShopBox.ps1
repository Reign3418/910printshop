<#
.SYNOPSIS
  910 PrintShop — 1-Click Showroom TV & Countertop Touch Deck Sync Launcher
  1. Disables sleep when the shop laptop lid is closed (AC & Battery).
  2. Displays all active Wi-Fi / Hotspot IPv4 addresses (including Windows Mobile Hotspot 192.168.137.1).
  3. Starts the local Wi-Fi Phone-to-Showroom-TV Sync Server on port 3000.
#>

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " 🚐 910 PRINTSHOP — 4315 BRAGG BLVD SHOWROOM TV & BAY SYNC RIG 🚐" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# 1. Configure Windows Power Settings so closing the laptop lid does NOT sleep the PC
Write-Host "`n[1/3] Configuring Shop Laptop Lid-Close Policy -> 'DO NOTHING'..." -ForegroundColor Yellow
try {
    powercfg /setacvalueindex SCHEME_CURRENT 4f971e89-eebd-4455-a8de-9e59040e7347 5ca83367-6e45-459f-a27b-476b1d01c936 0
    powercfg /setdcvalueindex SCHEME_CURRENT 4f971e89-eebd-4455-a8de-9e59040e7347 5ca83367-6e45-459f-a27b-476b1d01c936 0
    powercfg /setactive SCHEME_CURRENT
    Write-Host "  ✅ Lid-Close Sleep DISABLED! You can safely close the laptop lid." -ForegroundColor Green
} catch {
    Write-Host "  ⚠️ Could not auto-set powercfg (run as Administrator if needed)." -ForegroundColor DarkYellow
}

# 2. Show Built-In Wi-Fi Hotspot instructions & active IP addresses
Write-Host "`n[2/3] Built-In Showroom Wi-Fi Billboard & Counter Control Network:" -ForegroundColor Yellow
Write-Host "  • Tip: In Windows Settings -> Network & Internet -> Mobile Hotspot:" -ForegroundColor Gray
Write-Host "    Set Network Name (SSID) to:  🚐 910_PrintShop_Quotes_WiFi" -ForegroundColor White
Write-Host "  • Active Local IPv4 Addresses on this Shop Rig:" -ForegroundColor Gray

Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*"
} | ForEach-Object {
    Write-Host ("    👉 Phone / 7-in Counter Deck: http://{0}:3000/#shop-sim" -f $_.IPAddress) -ForegroundColor Green
    Write-Host ("    👉 1080p Showroom HDMI TV:    http://{0}:3000/?tv=1#tv-display" -f $_.IPAddress) -ForegroundColor Cyan
}

# 3. Launch Vite Local Wi-Fi Sync Server
Write-Host "`n[3/3] Starting Live Phone-to-Showroom-TV Sync Server on Port 3000..." -ForegroundColor Yellow
Set-Location -Path $PSScriptRoot
npm.cmd run dev
