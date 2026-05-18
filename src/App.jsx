import { useState, useEffect } from "react";
import {
  LogIn, UserPlus, Gift, TrendingUp, Send, Shield, Users, Star,
  Home, Zap, Crown, HelpCircle, Phone, CheckCircle2, ChevronDown,
  ChevronUp, Globe, Clock, Gamepad2, Lock, ArrowRight, Sparkles,
  BarChart2, MessageCircle, Award, Percent, Menu, X, ExternalLink,
  Mail, Heart, AlertCircle
} from "lucide-react";

const LOGIN_URL    = "https://www.jaiclub38.com/#/login";
const REGISTER_URL = "https://www.jaiclub38.com/#/register?invitationCode=78711100207";
const GIFT_URL     = "https://t.me/+SrcbhRijTW83M2Vl";
const PREDICT_URL  = "https://t.me/+l6iCLdOvKkI5OWVl";
const TELEGRAM_URL = "https://t.me/jaiclub_official_channel?start=referral_12345";
const LOGO = "https://jaiclub.games/wp-content/uploads/2026/03/jai-club-1.png";
const HERO_BG = "https://i.postimg.cc/13Tsf0dx/jai-club-reduced.png";

const bonuses = [
  { label: "DAILY BONUS",    upto: "UP TO", amount: "₹300",  Icon: Gift,    type: "Daily Bonus"  },
  { label: "WELCOME BONUS",  upto: "UP TO", amount: "₹500",  Icon: Sparkles, type: "Welcome"     },
  { label: "REFERRAL BONUS", upto: "UP TO", amount: "₹1000", Icon: Users,   type: "Referral"     },
  { label: "CASHBACK",       upto: "UP TO", amount: "15%",   Icon: Percent, type: "Cashback"     },
];

const stats = [
  { Icon: Users,        value: "128K+", label: "Active Members"    },
  { Icon: TrendingUp,   value: "10K+",  label: "New Members Daily" },
  { Icon: Crown,        value: "5000+", label: "Daily Winners"     },
  { Icon: Shield,       value: "100%",  label: "Safe & Trusted"    },
];

const faqs = [
  { q: "Is Jaiclub official and safe?",    a: "Yes. Jaiclub is an official gaming platform with secure UPI payments, encrypted transactions, and verified admins. The platform is 100% trusted by thousands of Indian players." },
  { q: "How to join the VIP channel?",     a: "Click the 'JOIN VIP TELEGRAM' button on this page. You'll be redirected to the official JaiClub Telegram channel where you can get daily tips, bonuses, and strategies." },
  { q: "Are the bonuses real?",            a: "Absolutely. All bonuses — daily, welcome, referral, and cashback — are credited directly to your JaiClub wallet. Check the Promotions section in-app to claim them." },
  { q: "How to get VIP bonuses?",          a: "Register using our link, make your first deposit, and enter the invitation code. Then join the VIP Telegram channel for exclusive gift codes and daily bonus updates." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Nunito',sans-serif;background:#06021a;color:#fff;overflow-x:hidden;}
:root{
  --purple:#7c3aed;--blue:#3b5bfa;--gold:#ffd700;--gold2:#ffb800;
  --bg:#06021a;--bg2:#0e0530;--card:rgba(255,255,255,0.035);
  --border:rgba(120,70,255,0.22);--muted:#9080c0;
}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:rgba(120,60,220,0.5);border-radius:3px;}

@keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
@keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes scanLine{0%{transform:translateY(-100%);}100%{transform:translateY(100vh);}}
@keyframes borderPulse{
  0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,0.4),inset 0 1px 0 rgba(255,255,255,.1);}
  50%{box-shadow:0 0 16px 4px rgba(255,215,0,0.25),inset 0 1px 0 rgba(255,255,255,.1);}
}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.5;}}

/* ── HEADER ── */
.hdr{
  position:sticky;top:0;z-index:999;
  background:rgba(6,2,26,0.92);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  border-bottom:1px solid rgba(120,70,255,0.18);
  transition:background .5s ease,border-color .5s ease,backdrop-filter .5s ease,box-shadow .5s ease;
}
.hdr.scrolled{
  background:rgba(6,2,26,0.0);
  backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);
  border-bottom-color:transparent;
  box-shadow:none;
}
.hdr-inner{max-width:1200px;margin:auto;padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:66px;}
.logo-wrap{display:flex;align-items:center;gap:10px;text-decoration:none;}
.logo-wrap img{width:88px;height:180px;object-fit:contain;}
.logo-wrap .brand{font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;letter-spacing:1.5px;}
.logo-wrap .brand span{color:var(--gold);}
.hdr-nav{display:flex;gap:6px;align-items:center;}
.nav-link{
  display:flex;align-items:center;gap:6px;
  color:#aaa0d0;text-decoration:none;font-size:.72rem;
  font-weight:800;letter-spacing:1px;text-transform:uppercase;
  transition:all .2s;padding:7px 12px;border-radius:8px;
}
.nav-link:hover{color:#fff;background:rgba(120,70,255,0.12);}
.nav-link svg{width:14px;height:14px;flex-shrink:0;}
.hdr-join{
  display:flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#5b21b6,#2350e0);
  color:#fff;text-decoration:none;padding:10px 20px;border-radius:50px;
  font-size:.78rem;font-weight:800;letter-spacing:.6px;
  box-shadow:0 4px 22px rgba(80,30,200,.55);transition:transform .2s,box-shadow .2s;white-space:nowrap;
}
.hdr-join:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(80,30,200,.75);}
.hdr-join svg{width:15px;height:15px;flex-shrink:0;}
.ham{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;min-width:44px;min-height:44px;justify-content:center;align-items:center;}
.ham span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s;}
.mob-menu{display:none;flex-direction:column;gap:0;background:rgba(6,2,26,.99);border-top:1px solid rgba(120,60,220,.2);padding:12px 24px 24px;}
.mob-menu.open{display:flex;}
.mob-menu a{color:#c0b8e0;text-decoration:none;font-size:.9rem;font-weight:700;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.06);text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:8px;min-height:44px;}
.mob-menu a:hover{color:var(--gold);}
.mob-menu a svg{width:15px;height:15px;opacity:.7;}
.mob-join{margin-top:16px;text-align:center;background:linear-gradient(135deg,#5b21b6,#2350e0);color:#fff;padding:15px;border-radius:50px;font-weight:800;text-decoration:none;font-size:.9rem;min-height:52px;display:flex;align-items:center;justify-content:center;}

/* ── HERO ── */
.hero-wrapper{position:relative;overflow:hidden;min-height:100vh;display:flex;align-items:center;}
.hero-bg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;z-index:0;animation:fadeIn 1.2s ease both;}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(105deg,rgba(4,1,20,0.93) 0%,rgba(8,2,35,0.80) 38%,rgba(8,2,35,0.42) 62%,rgba(4,1,20,0.22) 100%);}
.hero-scanline{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden;}
.hero-scanline::after{content:'';position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(130,60,255,.15),rgba(255,215,0,.08),transparent);animation:scanLine 8s linear infinite;}
.hero-grid-overlay{position:absolute;inset:0;z-index:2;pointer-events:none;background-image:radial-gradient(rgba(180,120,255,.07) 1px,transparent 1px);background-size:40px 40px;}
.hero-vignette{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(4,1,20,.7) 100%);}
.hero-bottom-fade{position:absolute;bottom:0;left:0;right:0;height:200px;z-index:4;background:linear-gradient(to bottom,transparent,#06021a);pointer-events:none;}
.hero{position:relative;z-index:5;max-width:1280px;margin:auto;width:100%;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:20px;padding:120px 40px 140px;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);border-radius:50px;padding:7px 18px;margin-bottom:22px;font-size:.75rem;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;animation:fadeUp .7s ease both;backdrop-filter:blur(10px);}
.hero-badge svg{width:13px;height:13px;color:#ffd700;}
.hero-title{font-family:'Rajdhani',sans-serif;line-height:1.05;margin-bottom:18px;animation:fadeUp .7s ease .1s both;}
.hero-title .t1{display:block;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:rgba(255,255,255,.9);letter-spacing:.5px;text-shadow:0 0 40px rgba(130,80,255,.4);}
.hero-title .t2{display:block;font-size:clamp(2.8rem,5.5vw,4.6rem);font-weight:700;background:linear-gradient(90deg,#e0a0ff 0%,#9b50ff 35%,#5585ff 70%,#ffd700 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3s linear infinite,fadeUp .7s ease .1s both;filter:drop-shadow(0 0 30px rgba(130,60,255,.5));}
.hero-desc{color:rgba(220,210,255,.85);font-size:.96rem;line-height:1.8;margin-bottom:20px;max-width:430px;animation:fadeUp .7s ease .2s both;text-shadow:0 1px 8px rgba(0,0,0,.6);}
.hero-trust{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap;animation:fadeUp .7s ease .3s both;}
.hero-trust span{display:flex;align-items:center;gap:8px;font-size:.82rem;font-weight:700;color:#e0d4ff;background:rgba(0,0,0,.3);backdrop-filter:blur(8px);padding:6px 14px;border-radius:50px;border:1px solid rgba(255,255,255,.12);}
.hero-trust svg{width:14px;height:14px;color:#7c3aed;}

/* ── 4 PROFESSIONAL HERO BUTTONS — GLASSMORPHISM ── */
.hero-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:480px;animation:fadeUp .7s ease .4s both;}

.btn-pro{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  text-decoration:none;border-radius:16px;
  font-size:.88rem;font-weight:800;letter-spacing:.5px;
  padding:16px 20px;position:relative;overflow:hidden;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  transition:transform .25s ease,box-shadow .25s ease,background .25s ease,border-color .25s ease;
  white-space:nowrap;border:1px solid;cursor:pointer;
  min-height:64px;
  -webkit-tap-highlight-color:transparent;
  touch-action:manipulation;
}
/* top-edge gloss */
.btn-pro::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
  pointer-events:none;
}
/* inner shine overlay */
.btn-pro::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.09) 0%,transparent 55%);
  pointer-events:none;border-radius:inherit;
}
.btn-pro:active{transform:scale(0.97);}
@media(hover:hover){.btn-pro:hover{transform:translateY(-3px) scale(1.035);}}
.btn-pro svg{width:18px;height:18px;flex-shrink:0;}

/* Login — blue glass */
.btn-login{
  background:rgba(30,80,240,.22);
  border-color:rgba(100,150,255,.38);
  color:#c8d8ff;
  box-shadow:0 8px 32px rgba(40,80,255,.25),inset 0 1px 0 rgba(255,255,255,.1);
}
.btn-login:hover{
  background:rgba(40,90,255,.32);
  border-color:rgba(130,170,255,.6);
  box-shadow:0 14px 44px rgba(40,80,255,.4),inset 0 1px 0 rgba(255,255,255,.16);
}

/* Register — violet glass */
.btn-register{
  background:rgba(110,40,220,.2);
  border-color:rgba(160,90,255,.35);
  color:#dcc8ff;
  box-shadow:0 8px 32px rgba(110,40,220,.22),inset 0 1px 0 rgba(255,255,255,.08);
}
.btn-register:hover{
  background:rgba(120,50,230,.32);
  border-color:rgba(180,110,255,.58);
  box-shadow:0 14px 44px rgba(110,40,220,.38),inset 0 1px 0 rgba(255,255,255,.14);
}

/* Gift — gold glass */
.btn-gift{
  background:rgba(180,100,0,.2);
  border-color:rgba(255,190,50,.35);
  color:#ffe9a0;
  box-shadow:0 8px 32px rgba(200,120,0,.2),inset 0 1px 0 rgba(255,255,255,.08);
  animation:borderPulse 2.5s ease-in-out infinite;
}
.btn-gift:hover{
  background:rgba(200,120,0,.3);
  border-color:rgba(255,210,80,.6);
  box-shadow:0 14px 44px rgba(220,140,0,.38),inset 0 1px 0 rgba(255,255,255,.14);
}

/* Prediction — teal glass */
.btn-predict{
  background:rgba(5,120,80,.2);
  border-color:rgba(20,200,140,.32);
  color:#a7f3d0;
  box-shadow:0 8px 32px rgba(5,150,100,.2),inset 0 1px 0 rgba(255,255,255,.08);
}
.btn-predict:hover{
  background:rgba(5,150,100,.3);
  border-color:rgba(30,220,160,.55);
  box-shadow:0 14px 44px rgba(5,150,100,.36),inset 0 1px 0 rgba(255,255,255,.14);
}

/* icon circle badge inside each button */
.btn-icon-wrap{width:32px;height:32px;border-radius:8px;background:rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.btn-content{display:flex;flex-direction:column;align-items:flex-start;text-align:left;}
.btn-label{font-size:.85rem;font-weight:800;letter-spacing:.4px;line-height:1.1;}
.btn-sub{font-size:.62rem;font-weight:700;opacity:.65;letter-spacing:.3px;margin-top:1px;}

.hero-sub{color:rgba(160,150,200,.8);font-size:.8rem;font-weight:700;margin-top:10px;animation:fadeUp .7s ease .55s both;}
.hero-right{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;animation:fadeUp .9s ease .3s both;}

/* ── TELEGRAM BUTTON (full-width) ── */
.tg-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:12px;
  background:linear-gradient(135deg,#1a3af5,#5b21b6);
  color:#fff;text-decoration:none;padding:16px 28px;border-radius:14px;
  font-size:.95rem;font-weight:900;letter-spacing:.6px;
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 12px 40px rgba(90,30,255,.55),0 0 80px rgba(90,30,255,.2),inset 0 1px 0 rgba(255,255,255,.14);
  transition:all .25s ease;position:relative;overflow:hidden;white-space:nowrap;
  min-height:54px;
  -webkit-tap-highlight-color:transparent;
  touch-action:manipulation;
}
.tg-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.1),transparent 60%);pointer-events:none;}
@media(hover:hover){.tg-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 18px 55px rgba(90,30,255,.7),0 0 100px rgba(90,30,255,.3),inset 0 1px 0 rgba(255,255,255,.2);}}
.tg-btn:active{transform:scale(0.98);}
.tg-btn svg{width:20px;height:20px;flex-shrink:0;}

/* ── SECTIONS ── */
.sec{padding:76px 24px;}
.sec-inner{max-width:1200px;margin:auto;}
.sec-title{font-family:'Rajdhani',sans-serif;font-size:clamp(1.5rem,3.5vw,2.3rem);font-weight:700;text-align:center;margin-bottom:50px;text-transform:uppercase;letter-spacing:1px;color:#fff;}
.sec-title .hl{background:linear-gradient(90deg,#ffd700,#ffb800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.sec.dark{background:#0b0425;}
.sec.darker{background:#060118;}

/* WHY JOIN */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.why-card{background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(130,80,255,.25);border-radius:22px;padding:34px 22px;backdrop-filter:blur(14px);position:relative;overflow:hidden;transition:all .3s ease;text-align:center;}
.why-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);}
@media(hover:hover){.why-card:hover{transform:translateY(-7px);border-color:rgba(150,80,255,.65);box-shadow:0 18px 44px rgba(90,30,180,.3);}}
.why-icon-wrap{width:66px;height:66px;border-radius:16px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;}
.why-icon-wrap.purple{background:rgba(140,50,255,.18);border:1px solid rgba(140,50,255,.35);}
.why-icon-wrap.blue{background:rgba(40,120,255,.18);border:1px solid rgba(40,120,255,.35);}
.why-icon-wrap svg{width:28px;height:28px;}
.why-icon-wrap.purple svg{color:#a855f7;}
.why-icon-wrap.blue svg{color:#60a5fa;}
.why-card h3{font-size:.76rem;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:10px;color:#fff;}
.why-card p{color:#8878b8;font-size:.83rem;line-height:1.7;}

/* REAL COMMUNITY */
.rc-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.rc-phones{display:flex;align-items:flex-start;position:relative;}
.rc-phone-a,.rc-phone-b{
  border-radius:16px;overflow:hidden;
  border:2px solid rgba(100,55,200,.5);
  box-shadow:0 20px 60px rgba(0,0,0,.7);
  flex-shrink:0;position:relative;
}
.rc-phone-a{width:52%;z-index:1;margin-right:-30px;margin-top:20px;}
.rc-phone-b{width:55%;z-index:2;margin-top:0;}
.rc-phone-a img,.rc-phone-b img{width:100%;height:100%;display:block;object-fit:cover;}
.rc-right h2{font-family:'Rajdhani',sans-serif;font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:700;line-height:1.1;margin-bottom:18px;text-transform:uppercase;}
.rc-right h2 .hl{background:linear-gradient(90deg,#ffd700,#ffb800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.rc-right p{color:#8878b8;font-size:.95rem;line-height:1.8;margin-bottom:22px;}
.rc-checks{display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.rc-check{display:flex;align-items:center;gap:12px;font-size:.93rem;font-weight:600;color:#e0d4ff;}
.check-circle{width:24px;height:24px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#7c3aed,#3b5bfa);display:flex;align-items:center;justify-content:center;}
.check-circle svg{width:13px;height:13px;color:#fff;}
.rc-sub{color:#6060a0;font-size:.82rem;margin-top:10px;font-style:italic;}

/* BONUS CARDS */
.bonus-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:18px;}
.bonus-card{border-radius:18px;overflow:hidden;position:relative;border:1px solid rgba(120,55,220,.4);background:linear-gradient(175deg,#1c0948 0%,#0e0430 100%);padding:26px 18px 22px;text-align:center;transition:all .3s;}
@media(hover:hover){.bonus-card:hover{transform:translateY(-7px);border-color:rgba(255,200,0,.45);box-shadow:0 18px 50px rgba(90,30,180,.4);}}
.bonus-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(155,70,255,.9),transparent);}
.bc-icon{width:64px;height:64px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);}
.bc-icon svg{width:28px;height:28px;}
.bonus-card:nth-child(1) .bc-icon{background:rgba(124,58,237,.15);border-color:rgba(124,58,237,.3);}
.bonus-card:nth-child(1) .bc-icon svg{color:#a78bfa;}
.bonus-card:nth-child(2) .bc-icon{background:rgba(59,130,246,.12);border-color:rgba(59,130,246,.3);}
.bonus-card:nth-child(2) .bc-icon svg{color:#93c5fd;}
.bonus-card:nth-child(3) .bc-icon{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3);}
.bonus-card:nth-child(3) .bc-icon svg{color:#6ee7b7;}
.bonus-card:nth-child(4) .bc-icon{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.3);}
.bonus-card:nth-child(4) .bc-icon svg{color:#fcd34d;}
.bc-type{font-size:.66rem;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:#7050a0;margin-bottom:4px;}
.bc-name{font-family:'Rajdhani',sans-serif;font-size:.85rem;font-weight:700;text-transform:uppercase;color:#fff;margin-bottom:2px;}
.bc-upto{font-size:.66rem;text-transform:uppercase;color:#7050a0;letter-spacing:.5px;margin-bottom:2px;}
.bc-amount{font-family:'Rajdhani',sans-serif;font-size:2.6rem;font-weight:700;background:linear-gradient(90deg,#ffd700,#ffb800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.05;}
.bonus-note{text-align:center;color:#7050a0;font-size:.82rem;display:flex;align-items:center;justify-content:center;gap:6px;margin-top:4px;}
.bonus-note svg{width:14px;height:14px;color:#7050a0;}

/* STATS */
.stats-strip{background:rgba(255,255,255,.025);border-top:1px solid rgba(100,55,200,.18);border-bottom:1px solid rgba(100,55,200,.18);}
.stats-inner{max-width:1000px;margin:auto;padding:52px 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.stat-item{text-align:center;}
.stat-icon-wrap{width:54px;height:54px;border-radius:50%;margin:0 auto 12px;background:rgba(100,55,200,.12);border:1px solid rgba(100,55,200,.28);display:flex;align-items:center;justify-content:center;}
.stat-icon-wrap svg{width:24px;height:24px;color:#a78bfa;}
.stat-value{font-family:'Rajdhani',sans-serif;font-size:2.3rem;font-weight:700;color:#fff;line-height:1;}
.stat-label{color:#7070a0;font-size:.8rem;margin-top:6px;}

/* FAQ */
.faq-list{display:flex;flex-direction:column;gap:10px;max-width:820px;margin:0 auto;}
.faq-item{border-radius:12px;overflow:hidden;border:1px solid rgba(100,55,200,.2);background:rgba(255,255,255,.022);}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;cursor:pointer;font-weight:700;font-size:.93rem;color:#ddd4ff;transition:background .2s;user-select:none;min-height:58px;-webkit-tap-highlight-color:transparent;}
.faq-q:hover{background:rgba(100,55,200,.08);}
.faq-toggle{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:1px solid rgba(100,55,200,.4);display:flex;align-items:center;justify-content:center;transition:all .3s;color:#7070a0;}
.faq-toggle svg{width:14px;height:14px;}
.faq-toggle.open{color:var(--gold);border-color:var(--gold);}
.faq-a{overflow:hidden;max-height:0;transition:max-height .35s ease,padding .35s ease;color:#8878b8;font-size:.9rem;line-height:1.78;}
.faq-a.open{max-height:300px;padding:0 22px 18px;}

/* FOOTER */
.footer{background:#040110;border-top:1px solid rgba(100,55,200,.14);padding:54px 24px 24px;}
.footer-inner{max-width:1200px;margin:auto;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;margin-bottom:42px;}
.f-brand img{width:80px;height:80px;margin-bottom:10px;display:block;object-fit:contain;}
.f-brand .fname{font-family:'Rajdhani',sans-serif;font-size:1.35rem;font-weight:700;color:#fff;margin-bottom:10px;}
.f-brand .fname span{color:var(--gold);}
.f-brand p{color:#6060a0;font-size:.82rem;line-height:1.75;}
.f-col h4{font-size:.76rem;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;color:#fff;margin-bottom:16px;}
.f-col a{display:block;color:#6060a0;text-decoration:none;font-size:.85rem;margin-bottom:10px;transition:color .2s;min-height:36px;display:flex;align-items:center;}
.f-col a:hover{color:var(--gold);}
.f-tg{display:inline-flex;align-items:center;gap:8px;background:rgba(26,79,216,.14);border:1px solid rgba(26,79,216,.32);color:#7aaaff;text-decoration:none;padding:10px 18px;border-radius:10px;font-size:.85rem;font-weight:700;transition:all .2s;}
.f-tg:hover{background:rgba(26,79,216,.28);}
.f-tg svg{width:18px;height:18px;}
.footer-bottom{max-width:1200px;margin:auto;border-top:1px solid rgba(255,255,255,.05);padding-top:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;color:#4040a0;font-size:.8rem;}

/* ── INNER PAGES ── */
.page-sec{max-width:800px;margin:auto;padding:76px 24px;}
.page-sec h1{font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;margin-bottom:10px;color:#fff;}
.page-sec h1 span{background:linear-gradient(90deg,var(--gold),#ffb800);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.page-divider{height:3px;width:60px;border-radius:2px;background:linear-gradient(90deg,var(--purple),var(--blue));margin-bottom:28px;}
.page-sec p{color:#8878b8;line-height:1.85;margin-bottom:14px;}
.page-sec h2{font-family:'Rajdhani',sans-serif;font-size:1.2rem;font-weight:700;color:var(--gold);margin:28px 0 10px;}
.page-sec ul{color:#8878b8;padding-left:20px;line-height:1.85;margin-bottom:14px;}
.page-sec ul li{margin-bottom:8px;}
.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:24px;}
.c-card{background:rgba(255,255,255,.035);border:1px solid rgba(100,55,200,.22);border-radius:16px;padding:24px 20px;transition:border-color .2s;}
.c-card:hover{border-color:var(--purple);}
.c-card .c-ico{width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.25);display:flex;align-items:center;justify-content:center;margin-bottom:10px;}
.c-card .c-ico svg{width:18px;height:18px;color:#a78bfa;}
.c-card .c-lbl{font-size:.74rem;text-transform:uppercase;letter-spacing:.8px;color:#6060a0;}
.c-card .c-val{font-weight:700;color:#fff;margin-top:4px;}
.c-card a{color:#7aaaff;text-decoration:none;}

/* ══════════════════════════════════════════════
   RESPONSIVE — TABLET  960px
══════════════════════════════════════════════ */
@media(max-width:960px){
  .hdr-nav,.hdr-join{display:none;}
  .ham{display:flex;}
  .hero{grid-template-columns:1fr;padding:60px 20px 80px;text-align:center;gap:42px;}
  .hero-trust{justify-content:center;}
  .hero-btns{margin:0 auto;justify-items:center;}
  .why-grid{grid-template-columns:repeat(2,1fr);}
  .rc-grid{grid-template-columns:1fr;}
  .rc-phones{justify-content:center;}
  .bonus-grid{grid-template-columns:repeat(2,1fr);}
  .stats-inner{grid-template-columns:repeat(2,1fr);}
  .footer-inner{grid-template-columns:1fr 1fr;}
  .footer-bottom{justify-content:center;text-align:center;}
}

/* ══════════════════════════════════════════════
   RESPONSIVE — MOBILE  600px
   Amélioré pour Android / iPhone
══════════════════════════════════════════════ */
@media(max-width:600px){
  /* — Header — */
  .hdr-inner{padding:0 16px;height:58px;}
  /* Logo réduit : hauteur raisonnable sur mobile */
  .logo-wrap img{width:52px;height:52px;object-fit:contain;}
  .logo-wrap .brand{font-size:1.15rem;}

  /* — Hero — */
  .hero-wrapper{min-height:100svh;} /* svh = safe viewport height (notch-safe) */
  .hero{
    padding:70px 18px 72px;
    text-align:center;
    grid-template-columns:1fr;
  }
  /* Fond plus immersif sur mobile : couvre tout avec bonne position */
  .hero-bg-img{object-position:60% center;}
  .hero-overlay{
    background:linear-gradient(
      180deg,
      rgba(4,1,20,0.82) 0%,
      rgba(6,2,26,0.72) 40%,
      rgba(6,2,26,0.88) 80%,
      rgba(4,1,20,0.96) 100%
    );
  }
  /* Badge */
  .hero-badge{font-size:.68rem;padding:6px 14px;}
  /* Titre */
  .hero-title .t1{font-size:1.55rem;}
  .hero-title .t2{font-size:2.5rem;}
  /* Description */
  .hero-desc{font-size:.88rem;max-width:100%;margin-left:auto;margin-right:auto;}
  /* Trust pills */
  .hero-trust{gap:8px;justify-content:center;flex-wrap:wrap;}
  .hero-trust span{font-size:.74rem;padding:5px 10px;}

  /* — Boutons 2×2 — cibles tactiles 60px min */
  .hero-btns{
    grid-template-columns:1fr 1fr;
    gap:8px;
    width:100%;
    max-width:100%;
    margin:0 auto;
  }
  .btn-pro{
    padding:12px 10px;
    font-size:.78rem;
    border-radius:12px;
    min-height:60px;
    gap:8px;
  }
  .btn-icon-wrap{
    width:28px;height:28px;border-radius:7px;
    display:flex;align-items:center;justify-content:center;
  }
  .btn-icon-wrap svg{width:15px;height:15px;}
  .btn-label{font-size:.76rem;}
  .btn-sub{font-size:.58rem;}
  .hero-sub{font-size:.74rem;margin-top:8px;}

  /* — Sections — */
  .sec{padding:44px 16px;}
  .sec-title{font-size:1.25rem;margin-bottom:28px;letter-spacing:.5px;}

  /* — Why cards 2 colonnes — */
  .why-grid{grid-template-columns:1fr 1fr;gap:10px;}
  .why-card{padding:18px 12px;border-radius:16px;}
  .why-icon-wrap{width:50px;height:50px;border-radius:12px;}
  .why-icon-wrap svg{width:22px;height:22px;}
  .why-card h3{font-size:.68rem;letter-spacing:.8px;}
  .why-card p{font-size:.78rem;line-height:1.6;}

  /* — Real community — */
.rc-grid{gap:32px;}
.rc-phones{
  flex-direction:row;
  justify-content:center;
  align-items:flex-start;
  position:relative;
}
.rc-phone-a{width:50%;margin-right:-20px;margin-top:14px;z-index:1;}
.rc-phone-b{width:54%;margin-top:0;z-index:2;}
.rc-right{text-align:center;}
.rc-checks{align-items:center;}
.tg-btn{
  width:100%;
  justify-content:center;
  padding:16px 20px;
  font-size:.88rem;
  border-radius:12px;
  min-height:56px;
}

  /* — Bonus cards 2×2 — */
  .bonus-grid{grid-template-columns:1fr 1fr;gap:10px;}
  .bonus-card{padding:16px 10px 14px;border-radius:14px;}
  .bc-icon{width:50px;height:50px;margin-bottom:10px;}
  .bc-icon svg{width:22px;height:22px;}
  .bc-name{font-size:.78rem;}
  .bc-amount{font-size:1.9rem;}
  .bc-type{font-size:.6rem;}
  .bc-upto{font-size:.6rem;}

  /* — Stats — */
  .stats-inner{grid-template-columns:1fr 1fr;gap:14px;padding:32px 16px;}
  .stat-icon-wrap{width:46px;height:46px;}
  .stat-icon-wrap svg{width:20px;height:20px;}
  .stat-value{font-size:1.75rem;}
  .stat-label{font-size:.74rem;}

  /* — FAQ — */
  .faq-q{padding:14px 16px;font-size:.85rem;min-height:52px;line-height:1.4;}
  .faq-a{font-size:.84rem;}
  .faq-a.open{padding:0 16px 14px;}
  .faq-toggle{width:26px;height:26px;flex-shrink:0;}

  /* — Footer — */
  .footer-inner{grid-template-columns:1fr;gap:24px;}
  .footer{padding:32px 16px 16px;}
  .f-brand img{width:36px;height:36px;}
  .f-col a{font-size:.84rem;min-height:40px;}
  .footer-bottom{font-size:.74rem;gap:8px;flex-direction:column;text-align:center;}

  /* — Inner pages — */
  .page-sec{padding:44px 16px;}
  .page-sec h1{font-size:1.65rem;}
  .contact-grid{grid-template-columns:1fr 1fr;}
}

/* ══════════════════════════════════════════════
   RESPONSIVE — TRÈS PETIT  420px
   iPhone SE, Galaxy A03, etc.
══════════════════════════════════════════════ */
@media(max-width:420px){
  /* Boutons en 2 colonnes jusqu'à 360px, puis 1 colonne */
  .hero-btns{grid-template-columns:1fr 1fr;}
  .hero-title .t2{font-size:2.15rem;}
  .bc-amount{font-size:1.7rem;}
  .stats-inner{padding:26px 12px;}
  .stat-value{font-size:1.6rem;}
  .rc-phone-a,.rc-phone-b{width:50%;}
}

@media(max-width:360px){
  .hero-btns{grid-template-columns:1fr;}
  .hero-title .t2{font-size:1.95rem;}
  .btn-pro{min-height:54px;}
  .why-grid{grid-template-columns:1fr;}
  .bonus-grid{grid-template-columns:1fr;}
}

/* ══════════════════════════════════════════════
   SAFE AREA (iPhone notch / Dynamic Island)
══════════════════════════════════════════════ */
@supports(padding:max(0px)){
  .hdr-inner{
    padding-left:max(16px,env(safe-area-inset-left));
    padding-right:max(16px,env(safe-area-inset-right));
  }
  .mob-menu{
    padding-left:max(24px,env(safe-area-inset-left));
    padding-right:max(24px,env(safe-area-inset-right));
    padding-bottom:max(24px,env(safe-area-inset-bottom));
  }
  .footer{
    padding-bottom:max(24px,env(safe-area-inset-bottom));
  }
}
`;

// Telegram SVG icon
const TgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247-2.042 9.627c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.604.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.874 14.42l-2.965-.924c-.645-.203-.658-.645.136-.954l11.57-4.461c.537-.194 1.006.131.947.166z"/>
  </svg>
);

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <div className={`faq-toggle${open ? " open" : ""}`}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div className={`faq-a${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <div className="hero-wrapper">
        <img src={HERO_BG} alt="" className="hero-bg-img" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-scanline" />
        <div className="hero-grid-overlay" />
        <div className="hero-vignette" />
        <div className="hero-bottom-fade" />

        <div className="hero">
          <div className="hero-left">
            <div className="hero-badge">
              <Shield />
              OFFICIAL COMMUNITY
            </div>
            <h1 className="hero-title">
              <span className="t1">WELCOME TO</span>
              <span className="t2">JAICLUB VIP</span>
            </h1>
            <p className="hero-desc">Join our exclusive community for daily game insights, bonuses &amp; VIP rewards.</p>
            <div className="hero-trust">
              <span><CheckCircle2 /> 100% Official</span>
              <span><Lock /> Safe &amp; Secure</span>
            </div>

            {/* 4 Professional Buttons */}
            <div className="hero-btns">
              {/* Login */}
              <a href={LOGIN_URL} className="btn-pro btn-login" target="_blank" rel="noreferrer">
                <div className="btn-icon-wrap"><LogIn size={16} /></div>
                <div className="btn-content">
                  <span className="btn-label">LOG IN</span>
                  <span className="btn-sub">Your Account</span>
                </div>
              </a>

              {/* Gift Code */}
              <a href={GIFT_URL} className="btn-pro btn-gift" target="_blank" rel="noreferrer">
                <div className="btn-icon-wrap"><Gift size={16} /></div>
                <div className="btn-content">
                  <span className="btn-label">GIFT CODE</span>
                  <span className="btn-sub">Official Rewards</span>
                </div>
              </a>

              {/* Register */}
              <a href={REGISTER_URL} className="btn-pro btn-register" target="_blank" rel="noreferrer">
                <div className="btn-icon-wrap"><UserPlus size={16} /></div>
                <div className="btn-content">
                  <span className="btn-label">REGISTER</span>
                  <span className="btn-sub">Join Free</span>
                </div>
              </a>

              {/* Prediction */}
              <a href={PREDICT_URL} className="btn-pro btn-predict" target="_blank" rel="noreferrer">
                <div className="btn-icon-wrap"><TrendingUp size={16} /></div>
                <div className="btn-content">
                  <span className="btn-label">PREDICTION</span>
                  <span className="btn-sub">Win Strategies</span>
                </div>
              </a>
            </div>

            <div className="hero-sub">Fast · Free · Exclusive</div>
          </div>
          <div className="hero-right" />
        </div>
      </div>

      {/* WHY JOIN */}
      <section className="sec dark">
        <div className="sec-inner">
          <h2 className="sec-title">WHY JOIN <span className="hl">JAICLUB VIP</span> COMMUNITY?</h2>
          <div className="why-grid">
            {[
              { cls:"purple", Icon: Gift,          title:"EXCLUSIVE BONUSES", desc:"Get daily bonuses & special VIP rewards." },
              { cls:"blue",   Icon: BarChart2,      title:"GAME STRATEGIES",   desc:"WinGo tips, color predictions & more." },
              { cls:"purple", Icon: Users,          title:"ACTIVE COMMUNITY",  desc:"Join thousands of active members daily." },
              { cls:"blue",   Icon: Shield,         title:"SAFE & SECURE",     desc:"Official channel with trusted admins." },
            ].map(c => (
              <div className="why-card" key={c.title}>
                <div className={`why-icon-wrap ${c.cls}`}><c.Icon /></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL COMMUNITY */}
      <section className="sec">
        <div className="sec-inner">
          <div className="rc-grid">
            <div className="rc-phones">
              <div className="rc-phone-a">
                <img src="https://i.postimg.cc/RCc7dX1c/photo-2026-05-18-12-20-02.jpg" />
              </div>
              <div className="rc-phone-b">
                <img src="https://i.postimg.cc/XY2cFqK3/photo-2026-05-18-12-18-36.jpg" alt="JaiClub" />
              </div>
            </div>
            <div className="rc-right">
              <h2>REAL COMMUNITY<br /><span className="hl">REAL WINNERS</span></h2>
              <p>Our members share real wins, strategies and valuable tips every day.</p>
              <div className="rc-checks">
                {[
                  { label: "Real-time updates",      Icon: Zap },
                  { label: "Daily game tips",        Icon: Star },
                  { label: "Winning proof shared",   Icon: Award },
                ].map(({ label, Icon: Ic }) => (
                  <div className="rc-check" key={label}>
                    <div className="check-circle"><Ic size={13} /></div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a href={TELEGRAM_URL} className="tg-btn" target="_blank" rel="noreferrer">
                <TgIcon /> JOIN TELEGRAM CHANNEL
              </a>
              <p className="rc-sub">Be part of the winning community!</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP BONUSES */}
      <section className="sec darker">
        <div className="sec-inner">
          <h2 className="sec-title">EXCLUSIVE <span className="hl">VIP</span> BONUSES</h2>
          <div className="bonus-grid">
            {bonuses.map(b => (
              <div className="bonus-card" key={b.label}>
                <div className="bc-icon"><b.Icon /></div>
                <div className="bc-type">{b.type}</div>
                <div className="bc-name">{b.label}</div>
                <div className="bc-upto">{b.upto}</div>
                <div className="bc-amount">{b.amount}</div>
              </div>
            ))}
          </div>
          <p className="bonus-note"><AlertCircle /> Bonuses are updated regularly. Stay connected!</p>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stats-inner">
          {stats.map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-icon-wrap"><s.Icon /></div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <section className="sec dark">
        <div className="sec-inner">
          <h2 className="sec-title">FAQ</h2>
          <div className="faq-list">
            {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPage() {
  return (
    <div className="page-sec">
      <h1>Privacy <span>Policy</span></h1>
      <div className="page-divider" />
      <p>Last updated: 2025. This Privacy Policy describes how JaiClub collects, uses, and shares information about you when you use our platform and services.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, make a deposit, or contact us for support. This may include your name, phone number, email address, and payment information.</p>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve our services</li>
        <li>To process transactions and send related information</li>
        <li>To send promotional communications (with your consent)</li>
        <li>To monitor and analyze usage patterns and trends</li>
        <li>To detect and prevent fraudulent transactions and abuse</li>
      </ul>
      <h2>Data Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information. All transactions are processed through a secure gateway provider and are not stored or processed on our servers.</p>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="page-sec">
      <h1>Terms &amp; <span>Conditions</span></h1>
      <div className="page-divider" />
      <p>Welcome to JaiClub. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
      <h2>Eligibility</h2>
      <p>You must be at least 18 years of age to use our platform. By using JaiClub, you confirm you are of legal age and have the legal capacity to enter into a binding agreement.</p>
      <h2>Responsible Gaming</h2>
      <ul>
        <li>Only play with money you can afford to lose</li>
        <li>Do not chase losses</li>
        <li>Set personal limits on deposits and playing time</li>
        <li>Take regular breaks from gaming</li>
        <li>Seek help if gaming is causing problems in your life</li>
      </ul>
      <h2>Prohibited Activities</h2>
      <p>Users are prohibited from fraudulent activities, using multiple accounts, or attempting to manipulate game outcomes. Violations result in immediate account suspension.</p>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page-sec">
      <h1>Contact <span>Us</span></h1>
      <div className="page-divider" />
      <p>Have questions or need support? We're here to help 24/7. Reach out through any of the channels below.</p>
      <div className="contact-grid">
        {[
          { Icon: Send,       lbl:"Telegram",      val:<a href="https://t.me/Jaiclub_official" target="_blank" rel="noreferrer">Online support</a> },
          { Icon: Globe,      lbl:"Website",       val:<a href="http://www.jaiclubs.com/" target="_blank" rel="noreferrer">jaiclub.com</a> },
          { Icon: Clock,      lbl:"Support Hours", val:"24 Hours / 7 Days" },
          { Icon: Gamepad2,   lbl:"Platform",      val:<a href={LOGIN_URL} target="_blank" rel="noreferrer">JaiClub Game</a> },
        ].map(c => (
          <div className="c-card" key={c.lbl}>
            <div className="c-ico"><c.Icon /></div>
            <div className="c-lbl">{c.lbl}</div>
            <div className="c-val">{c.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const go = (p) => { setPage(p); setMenu(false); window.scrollTo(0, 0); };

  const navLinks = [
    { label:"HOME",     page:"home",    Icon: Home },
    { label:"BENEFITS", page:"home",    Icon: Zap },
    { label:"BONUSES",  page:"home",    Icon: Crown },
    { label:"FAQ",      page:"home",    Icon: HelpCircle },
    { label:"ABOUT",    page:"contact", Icon: Phone },
  ];

  return (
    <>
      <style>{css}</style>

      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="hdr-inner">
          <a className="logo-wrap" href="#" onClick={e => { e.preventDefault(); go("home"); }}>
            <img src={LOGO} alt="JaiClub" />
          </a>
          <nav className="hdr-nav">
            {navLinks.map(l => (
              <a key={l.label} href="#" className="nav-link"
                onClick={e => { e.preventDefault(); go(l.page); }}>
                <l.Icon />
                {l.label}
              </a>
            ))}
          </nav>
          <button className="ham" onClick={() => setMenu(o => !o)} aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}>
            {menu ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
          </button>
        </div>
        <nav className={`mob-menu${menu ? " open" : ""}`}>
          {navLinks.map(l => (
            <a key={l.label} href="#" onClick={e => { e.preventDefault(); go(l.page); }}>
              <l.Icon /> {l.label}
            </a>
          ))}
          <a href="#" onClick={e => { e.preventDefault(); go("privacy"); }}><Lock /> Privacy Policy</a>
          <a href="#" onClick={e => { e.preventDefault(); go("terms"); }}><Shield /> Terms</a>
          <a href={TELEGRAM_URL} className="mob-join" target="_blank" rel="noreferrer">JOIN VIP TELEGRAM</a>
        </nav>
      </header>

      <main>
        {page === "home"    && <HomePage />}
        {page === "privacy" && <PrivacyPage />}
        {page === "terms"   && <TermsPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="f-brand">
            <img src={LOGO} alt="JaiClub" />
            <div className="fname">JAI<span>CLUB</span></div>
            <p>Official gaming community for WinGo players. Join now and enjoy exclusive bonuses, tips and rewards.</p>
          </div>
          <div className="f-col">
            <h4>Quick Links</h4>
            {[["Home","home"],["Benefits","home"],["Bonuses","home"],["FAQ","home"],["About Us","contact"]].map(([l,p]) => (
              <a key={l} href="#" onClick={e => { e.preventDefault(); go(p); }}>{l}</a>
            ))}
          </div>
          <div className="f-col">
            <h4>Legal</h4>
            <a href="#" onClick={e => { e.preventDefault(); go("privacy"); }}>Privacy Policy</a>
            <a href="#" onClick={e => { e.preventDefault(); go("terms"); }}>Terms &amp; Conditions</a>
            <a href="#" onClick={e => { e.preventDefault(); go("terms"); }}>Disclaimer</a>
          </div>
          <div className="f-col">
            <h4>Join Us</h4>
            <a href={TELEGRAM_URL} className="f-tg" target="_blank" rel="noreferrer">
              <Send size={18} /> Join Telegram Channel
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Jaiclub. All Rights Reserved.</span>
          <span>Play responsibly. 18+ only.</span>
        </div>
      </footer>
    </>
  );
}
