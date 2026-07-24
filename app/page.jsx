"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Mail, Menu, Moon, Phone, Sparkles, Sun, X, ExternalLink,
  Code2, Cpu, Send, Globe2, Trophy, BrainCircuit, Server, GraduationCap,
  ShieldCheck, Zap, Star, Quote, Target, Award, BadgeCheck, UserRound,
  MonitorSmartphone, Workflow, Gauge, Search, Download, Layers, Rocket,
  CheckCircle2, MousePointerClick, Languages, Database, Camera, Wifi, ArrowUp, Volume2, VolumeX, Bot, School
} from "lucide-react";


/* Firebase reviews setup
   Collection used: reviews
   Existing real reviews are loaded from Firestore and new reviews are saved there.
*/
const firebaseConfig = {
  apiKey: "AIzaSyDbvFB2CjPw94e5pEde2MK7mtWGKLjiQlQ",
  authDomain: "amr-portfolio-reviews.firebaseapp.com",
  projectId: "amr-portfolio-reviews",
  storageBucket: "amr-portfolio-reviews.firebasestorage.app",
  messagingSenderId: "1071014816105",
  appId: "1:1071014816105:web:50f55ee4463883febe35f8",
  measurementId: "G-JQF8SBVPTY"
};

const firebaseReady = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
let firebaseDbPromise = null;
function getFirebaseDb() {
  if (!firebaseReady) return Promise.resolve(null);
  if (!firebaseDbPromise) {
    firebaseDbPromise = Promise.all([
      import("firebase/app"),
      import("firebase/firestore")
    ]).then(([appModule, firestoreModule]) => {
      const app = appModule.getApps().length
        ? appModule.getApp()
        : appModule.initializeApp(firebaseConfig);
      return {
        db: firestoreModule.getFirestore(app),
        firestore: firestoreModule
      };
    });
  }
  return firebaseDbPromise;
}

const profile = {
  name: "Eng Amr Khaled",
  arabicName: "Eng Amr Khaled",
  role: "Front-End Developer, AI Engineer & Programming/Robotics Trainer",
  phone: "01008454029",
  email: "amrk78420@gmail.com",
  github: "https://github.com/byAmrkhaled0",
  linkedin: "https://www.linkedin.com/in/amr-khaled-0a58822a4",
  facebook: "https://www.facebook.com/amr.khaled.400310",
  instagram: "https://www.instagram.com/byamrkhaled/",
  tiktok: "https://www.tiktok.com/@3mor_03?is_from_webapp=1&sender_device=pc",
  image: "/images/amr-profile-creative.jfif",
  logo: "/images/amr-logo.webp",
  whatsappMessage: "السلام عليكم يا بشمهندس عمرو، عندي فكرة مشروع وعايز أعرف أنسب طريقة لتنفيذها."
};

const languageNames = {
  en: "English", ar: "العربية"
};

const translations = {
  en: {
    dir: "ltr", chooseLang: "Language", nav: ["Home", "About", "Skills", "Services", "Projects", "Packages", "Reviews", "Certificates", "Contact"],
    badge: "Front-End Developer • AI Engineer • Creative Web Designer", title1: "Built with precision.", title2: "Designed to make an impact.",
    subtitle: "I design and build fast, mobile-first websites and digital platforms that give brands a stronger presence and make every customer journey clearer.",
    ctaWork: "Explore Projects", ctaContact: "Start a Project", cv: "Download CV", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["Production-ready websites", "AI and API integration", "Programming trainer", "Hands-on IoT experience"],
    stats: [{ n: "9+", label: "Live Projects" }, { n: "AI", label: "Smart Product" }, { n: "IoT", label: "Hardware Experience" }, { n: "AR/EN", label: "Bilingual UX" }],
    aboutTitle: "About Me", aboutHeading: "Engineering discipline with a designer’s eye.",
    about: "I’m Amr Khaled Abozeid, a Computer and Artificial Intelligence graduate based in Mansoura, Egypt. I build responsive front-end experiences, connect products to APIs and Firebase, and develop practical AI and IoT solutions.",
    about2: "Ecosense AI reflects the way I work: understanding the full product, designing a clear user journey, integrating the technical layers, and delivering a polished experience ready to present and use.",
    bioTitle: "Professional Summary", bio: "Front-End Developer and AI Engineer with practical experience in React, JavaScript, Python, Flask, REST APIs, Firebase, Vercel, GitHub and IoT workflows. I also teach programming and robotics through hands-on student projects.",
    skillsTitle: "Technical Stack", servicesTitle: "Services", packagesTitle: "Website Packages", chooseTitle: "Why Work With Me", projectsTitle: "Case Studies", reviewsTitle: "Client Reviews", certTitle: "Education & Certifications", hardwareTitle: "Real Hardware & IoT", aiTitle: "AI Experience",
    caseLabels: ["Problem", "Solution", "Result"], visit: "View Project", contactTitle: "Have an idea? Let’s build it properly.", contactSubtitle: "Send me a message and I’ll help you turn it into a fast, elegant, production-ready website or AI-powered product.",
    ai: "Ecosense AI combines plant image analysis, real sensor readings, ESP32-CAM, hardware wiring, React frontend dashboards, and Flask backend integration.",
    finalTitle: "Need a premium website or AI product?", finalText: "Let’s build a digital experience that fits your brand and delivers results.", startNow: "Start Now"
  },
  ar: {
    dir: "rtl", chooseLang: "اللغة", nav: ["الرئيسية", "عني", "المهارات", "الخدمات", "الأعمال", "الباقات", "الآراء", "الشهادات", "تواصل"],
    badge: "مطور واجهات • مهندس ذكاء اصطناعي • مصمم مواقع", title1: "تنفيذ هندسي دقيق.", title2: "وتصميم يصنع فرقًا.",
    subtitle: "أنا عمرو خالد، مطور ومصمم مواقع من المنصورة. أبني مواقع ومنصات رقمية سريعة ومتوافقة مع الهاتف، بهوية واضحة وتجربة تساعد الزائر يفهم خدمتك ويتواصل معك بسهولة.",
    ctaWork: "شاهد المشاريع", ctaContact: "ابدأ مشروع", cv: "تحميل CV", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["مواقع جاهزة للاستخدام", "ربط الذكاء الاصطناعي والـAPIs", "تدريب برمجة عملي", "خبرة فعلية في IoT"],
    stats: [{ n: "9+", label: "مشروعات منشورة" }, { n: "AI", label: "منتج ذكي" }, { n: "IoT", label: "خبرة هاردوير" }, { n: "AR/EN", label: "تجارب ثنائية اللغة" }],
    aboutTitle: "من أنا؟", aboutHeading: "دقة المبرمج بعين مصمم يفهم تجربة المستخدم.",
    about: "أنا عمرو خالد أبو زيد، خريج حاسبات وذكاء اصطناعي من المنصورة. أطور واجهات متجاوبة، وأربط المواقع بالـAPIs وFirebase، وأعمل على حلول عملية تجمع الويب والذكاء الاصطناعي وإنترنت الأشياء.",
    about2: "مشروع Ecosense AI يلخص طريقة شغلي: أفهم المنتج كاملًا، أصمم رحلة استخدام واضحة، أربط الطبقات التقنية ببعضها، وأسلم تجربة نهائية احترافية قابلة للعرض والاستخدام.",
    bioTitle: "ملخص مهني", bio: "مطور واجهات ومهندس ذكاء اصطناعي بخبرة عملية في React وJavaScript وPython وFlask وREST APIs وFirebase وVercel وGitHub ومسارات IoT، بالإضافة إلى تدريب الطلاب على البرمجة والروبوتيكس من خلال مشروعات تطبيقية.",
    skillsTitle: "المهارات التقنية", servicesTitle: "الخدمات", packagesTitle: "باقات تصميم المواقع", chooseTitle: "نقاط القوة", projectsTitle: "دراسات حالة", reviewsTitle: "آراء العملاء", certTitle: "التعليم والشهادات", hardwareTitle: "Real Hardware & IoT", aiTitle: "خبرة الذكاء الاصطناعي",
    caseLabels: ["المشكلة", "الحل", "النتيجة"], visit: "مشاهدة المشروع", contactTitle: "عندك فكرة؟ خلينا نبنيها صح.", contactSubtitle: "ابعتلي رسالة وأنا أساعدك تحولها لموقع سريع واحترافي أو منتج مدعوم بالذكاء الاصطناعي.",
    ai: "Ecosense AI يجمع تحليل صور النبات وقراءات سينسورات حقيقية وESP32-CAM وتوصيلات هاردوير وReact Dashboard وFlask Backend.",
    finalTitle: "محتاج موقع Premium أو منتج AI؟", finalText: "خلينا نبني تجربة رقمية تليق بالبراند وتجيب نتيجة.", startNow: "ابدأ الآن"
  }
};

function brandIcon(path){return <svg className="brand-svg" viewBox="0 0 24 24"><path d={path}/></svg>}
function FacebookIcon(){return brandIcon("M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.25 22 17.08 22 12.06Z")}
function InstagramIcon(){return brandIcon("M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z")}
function TikTokIcon(){return brandIcon("M16.7 2c.35 2.38 1.68 3.8 4.05 3.96v3.01c-1.38.13-2.59-.31-4-1.17v5.62c0 7.14-7.79 9.37-10.92 4.25-2.01-3.3-.78-9.1 5.68-9.33v3.17c-.45.07-.94.18-1.38.33-1.33.45-2.08 1.29-1.87 2.77.41 2.83 5.6 3.67 5.17-1.86V2h3.27Z")}
function GitHubIcon(){return brandIcon("M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.2-3.37-1.2-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.12-4.56-4.96 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.43 9.43 0 0 1 12 6.95c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z")}
function LinkedInIcon(){return brandIcon("M6.94 8.98H3.75V20h3.19V8.98ZM5.35 4a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7Zm5.22 4.98H7.52V20h3.19v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.19v-6.04c0-2.97-.64-5.25-4.11-5.25-1.66 0-2.78.91-3.24 1.78h-.04V8.98h-3.06Z")}

const skills = [
  { en: "Frontend Engineering", ar: "تطوير الواجهات", icon: Code2, items: ["React", "JavaScript", "Responsive UI", "RTL/LTR"] },
  { en: "AI & Backend APIs", ar: "الذكاء الاصطناعي والباك إند", icon: BrainCircuit, items: ["Python", "Flask", "REST APIs", "AI Logic"] },
  { en: "Real Hardware & IoT", ar: "هاردوير وIoT حقيقي", icon: Cpu, items: ["ESP32-CAM", "DHT11", "Soil Sensor", "LDR"] },
  { en: "Programming & Robotics Training", ar: "تدريب برمجة وروبوتيكس", icon: Bot, items: ["Tekatech", "Kids Coding", "Robotics", "Scratch/Python"] },
  { en: "Deployment & SEO", ar: "النشر و SEO", icon: Rocket, items: ["Vercel", "GitHub", "Performance", "Schema"] }
];

const services = [
  { en: "Business & E-commerce Websites", ar: "مواقع براندات ومتاجر", icon: MonitorSmartphone, text: "Professional product displays, WhatsApp ordering, online payment readiness, and a fast buying journey.", arText: "عرض احترافي للمنتجات، طلب مباشر على واتساب، جاهزية للدفع أونلاين، وتجربة شراء سريعة." },
  { en: "Social Catalogue Websites", ar: "مواقع لصفحات Facebook وInstagram", icon: Globe2, text: "A professional catalogue that turns social followers into real customers.", arText: "كتالوج احترافي يعرض منتجاتك ويحوّل متابعين السوشيال لعملاء حقيقيين." },
  { en: "Wedding & Event Invitations", ar: "مواقع دعوات الأفراح والمناسبات", icon: Sparkles, text: "Countdown, Google Maps location, RSVP, photo gallery, and a digital guestbook.", arText: "عداد تنازلي، موقع القاعة على Google Maps، تأكيد حضور RSVP، صور، ودفتر تهنئة رقمي." },
  { en: "AI Dashboards & API Integration", ar: "واجهات AI وربط APIs", icon: Gauge, text: "Modern dashboards connected to AI models, backend APIs, and real data.", arText: "داشبوردات حديثة متصلة بموديلات AI وواجهات API وبيانات حقيقية." },
  { en: "WhatsApp, Maps & Contact", ar: "ربط واتساب وخرائط ونماذج تواصل", icon: Phone, text: "Direct WhatsApp actions, Google Maps, contact forms, and clear conversion paths.", arText: "تواصل مباشر على واتساب، خرائط Google، نماذج تواصل، ومسارات واضحة لتحويل الزائر لعميل." },
  { en: "Fast, Secure & Responsive", ar: "سريع وآمن ومتوافق مع كل الأجهزة", icon: ShieldCheck, text: "High performance, mobile-first responsive design, security best practices, and reliable deployment.", arText: "أداء سريع، تصميم متجاوب لكل الأجهزة، أساسيات أمان قوية، ونشر موثوق." },
  { en: "SEO & Performance", ar: "تحسين الظهور والسرعة SEO", icon: Search, text: "Semantic pages, optimized assets, metadata, and a search-ready structure.", arText: "صفحات منظمة، صور مضغوطة، ميتا داتا، وهيكلة جاهزة للظهور في البحث." },
  { en: "Programming & Robotics Training", ar: "تدريب برمجة وروبوتيكس", icon: School, text: "Student-friendly sessions for coding logic, robotics basics, and practical projects at Tekatech.", arText: "سيشنات عملية للطلاب في البرمجة والروبوتيكس وتبسيط المنطق داخل Tekatech." }
];

const packages = [
  {
    name: "Starter",
    arName: "البداية",
    label: "Launch your presence",
    arLabel: "ابدأ حضورك أونلاين",
    description: "A focused one-page website for a personal brand, service, or campaign.",
    arDescription: "موقع صفحة واحدة احترافي لشخص، خدمة، أو حملة إعلانية.",
    features: ["One-page custom design", "Mobile responsive", "WhatsApp & contact form", "Basic SEO setup", "7 days support"],
    arFeatures: ["تصميم صفحة واحدة مخصص", "متوافق مع الموبايل", "ربط واتساب ونموذج تواصل", "إعداد SEO أساسي", "دعم لمدة 7 أيام"]
  },
  {
    name: "Business",
    arName: "الأعمال",
    label: "Most popular",
    arLabel: "الأكثر طلبًا",
    featured: true,
    description: "A complete business website built to present services and generate qualified leads.",
    arDescription: "موقع بيزنس متكامل يعرض خدماتك ويحوّل الزوار إلى عملاء محتملين.",
    features: ["Up to 5 tailored pages", "Services or product catalogue", "WhatsApp, Maps & forms", "Speed, security & advanced SEO", "30 days support"],
    arFeatures: ["حتى 5 صفحات مخصصة", "عرض خدمات أو كتالوج منتجات", "واتساب وخرائط ونماذج تواصل", "سرعة وأمان وSEO متقدم", "دعم لمدة 30 يومًا"]
  },
  {
    name: "Pro",
    arName: "الاحترافية",
    label: "Built around your idea",
    arLabel: "تنفيذ مخصص لفكرتك",
    description: "A custom store, academy, invitation website, or interactive platform with advanced flows.",
    arDescription: "متجر، منصة تعليمية، دعوة فرح، أو موقع تفاعلي بتنفيذ مخصص ومتطور.",
    features: ["Custom pages and user flows", "Store, RSVP, booking or dashboard", "API and Firebase integration", "Performance and launch optimization", "60 days priority support"],
    arFeatures: ["صفحات ومسارات استخدام مخصصة", "متجر أو RSVP أو حجز أو داشبورد", "ربط APIs وFirebase", "تحسين الأداء والتجهيز للإطلاق", "دعم أولوية لمدة 60 يومًا"]
  }
];

const whyChoose = [
  { en: "Real product mindset", ar: "تفكير منتج حقيقي", icon: Target },
  { en: "Clean responsive UI", ar: "واجهة نظيفة ومتجاوبة", icon: ShieldCheck },
  { en: "AI + Web + IoT", ar: "AI + Web + IoT", icon: Layers },
  { en: "Fast delivery and clear communication", ar: "تسليم سريع وتواصل واضح", icon: Zap },
  { en: "Programming & Robotics Trainer at Tekatech", ar: "مدرب برمجة وروبوتيكس في Tekatech", icon: School }
];

const hardwareExperience = [
  { title: "ESP32-CAM Workflow", arTitle: "مسار ESP32-CAM", icon: Camera, text: "Camera-based capture flow used inside the Ecosense AI plant-health system.", arText: "مسار تصوير بالكاميرا ضمن نظام Ecosense AI لتشخيص النبات." },
  { title: "Real Sensor Readings", arTitle: "قراءات سينسورات حقيقية", icon: Wifi, text: "Temperature, humidity, soil moisture, soil temperature, and light readings.", arText: "قراءات حرارة ورطوبة ورطوبة تربة وحرارة تربة وإضاءة." },
  { title: "Hardware Wiring", arTitle: "توصيلات هاردوير", icon: Cpu, text: "Hands-on wiring and project flow between sensors, camera, backend, and frontend.", arText: "توصيلات عملية بين السينسورات والكاميرا والباك إند والفرونت." }
];

const projects = [
  { title:"Ecosense AI", category:"AI / IoT / Real Hardware Graduation Project", image:"/images/ecosense-frontend-live.webp", previewImages:["/images/ecosense-plant-system.webp","/images/ecosense-real-hardware-wiring.webp"], url:"https://smart-plant-health-frontend.vercel.app/", stack:["React","Flask API","AI","ESP32-CAM","Real Sensors"], description:"A complete smart plant-health platform with React frontend, Flask AI backend, image diagnosis, real sensor readings, ESP32-CAM workflow, and real hardware wiring.", arDescription:"منصة كاملة لمتابعة صحة النبات بفرونت React وباك إند Flask AI، تشخيص بالصور، قراءات سينسورات حقيقية، ESP32-CAM، وتوصيلات هاردوير فعلية.", problem:"Plant monitoring needs reliable data from both images and environment readings.", arProblem:"متابعة النبات محتاجة بيانات موثوقة من الصورة وقراءات البيئة معًا.", solution:"Built the frontend, integrated backend APIs, and worked with real sensor and ESP32-CAM hardware flow.", arSolution:"نفذت الفرونت وربطت APIs واشتغلت على مسار السينسورات الحقيقية وESP32-CAM.", result:"A production-style graduation product combining AI, web, backend integration, and real IoT hardware.", arResult:"مشروع تخرج Production-style يجمع AI وWeb وربط باك إند وهاردوير IoT حقيقي." },

  { title:"Mahmoud Fawzy Science Platform", category:"Education / Student Management Platform", image:"/images/mahmoud-fawzy-science-platform-live.jpg", url:"https://mahmoud-fawzy-science-platform.vercel.app/", stack:["React","Firebase","RTL UI","QR Attendance","Student Portal"], description:"A complete Arabic education platform for science students with online booking, student portal, parent follow-up, attendance tracking, exams, reviews, and organized teacher management flows.", arDescription:"منصة تعليمية عربية كاملة لطلاب العلوم فيها حجز أونلاين، بوابة طالب، متابعة ولي الأمر، حضور بالـ QR، امتحانات، تقييمات، وتنظيم لإدارة المدرس.", problem:"The teacher needed one organized place for bookings, student follow-up, attendance, exams, and parent reports instead of scattered manual work.", arProblem:"المدرس كان محتاج مكان واحد منظم للحجز ومتابعة الطلاب والحضور والامتحانات وتقارير ولي الأمر بدل الشغل اليدوي المتفرق.", solution:"Built a responsive RTL platform with clear booking flow, student codes, parent access, teacher management sections, and mobile-friendly educational UX.", arSolution:"بنيت منصة RTL متجاوبة فيها مسار حجز واضح، أكواد للطلاب، دخول ولي الأمر، أقسام إدارة للمدرس، وتجربة مريحة على الموبايل.", result:"A live production platform that makes student registration, follow-up, exams, and communication easier and more professional.", arResult:"منصة Live احترافية سهّلت تسجيل الطلاب والمتابعة والامتحانات والتواصل بشكل منظم." },
  { title:"Techno Minds Programming & AI Academy", category:"Programming / AI Learning Platform", image:"/images/techno-minds-academy-live.jpg", url:"https://eng-amr-khaled-academy.vercel.app/", stack:["React","Python Learning UX","AI Course","Student Portal","Parent Reports"], description:"A practical programming and AI learning platform for students, featuring course booking, learning path, coding practice pages, materials, exams, online sessions, student portal, and parent follow-up.", arDescription:"منصة تعليم برمجة وذكاء اصطناعي بشكل عملي للطلاب، فيها حجز الكورس، مسار تعليمي، صفحات تدريب كود، Materials، امتحانات، محاضرات أونلاين، بوابة طالب، ومتابعة ولي الأمر.", problem:"Students and parents needed a clear learning system that explains the path, tracks progress, and keeps all course tools in one place.", arProblem:"الطلاب وأولياء الأمور كانوا محتاجين نظام واضح يشرح المسار ويتابع التقدم ويجمع أدوات الكورس في مكان واحد.", solution:"Created a modern Arabic platform focused on practical learning, Python basics, AI mindset, coding challenges, materials, and progress follow-up.", arSolution:"نفذت منصة عربية حديثة مركزة على التعلم العملي، أساسيات Python، تفكير AI، تحديات كود، ملفات التدريب، ومتابعة التقدم.", result:"A polished live academy platform that supports booking, learning, practice, evaluation, and parent communication.", arResult:"منصة أكاديمية Live منظمة تدعم الحجز والتعلم والتطبيق والتقييم والتواصل مع ولي الأمر." },
  { title:"Saad Ewida Science Platform", category:"Education / Biology & Science Platform", image:"/images/saad-ewida-science-platform.jpg", url:"https://saad-ewida-science-platform.vercel.app/", stack:["React","Firebase","Online Booking","Student Portal","Parent Follow-up"], description:"A modern Arabic biology and science platform with online booking, lessons, student access, parent follow-up, exams, and a polished mobile-first experience.", arDescription:"منصة عربية حديثة للأحياء والعلوم فيها حجز أونلاين، محاضرات، دخول الطالب، متابعة ولي الأمر، امتحانات، وتجربة احترافية على الموبايل.", problem:"The teacher needed one premium digital platform that supports both in-person and online students.", arProblem:"المدرس كان محتاج منصة رقمية قوية تجمع طلاب السنتر والأونلاين في تجربة واحدة منظمة.", solution:"Designed a clear RTL journey for booking, online lessons, student access, resources, exams, and direct communication.", arSolution:"صممت رحلة RTL واضحة للحجز والمحاضرات الأونلاين ودخول الطالب والملفات والامتحانات والتواصل المباشر.", result:"A production-ready education platform that strengthens the teacher brand and simplifies the student journey.", arResult:"منصة تعليمية جاهزة للاستخدام تقوي براند المدرس وتسهّل رحلة الطالب من الحجز للمتابعة." },
  { title:"El Mezaen Talkha", category:"Barbershop / Multi-branch Booking Website", image:"/images/el-mezaen-talkha.jpg", url:"https://el-mezaen-talkha.vercel.app/", stack:["React","Booking UX","Branch Selection","Arabic UI","Conversion Design"], description:"A premium barbershop website for Talkha and El-Mashaya branches with branch selection, services, packages, team profiles, and a focused booking journey.", arDescription:"موقع Premium لمزين مصر فرعي طلخا والمشاية، فيه اختيار الفرع، الخدمات، الباقات، الفريق، ومسار حجز واضح وسريع.", problem:"The brand needed a modern website that turns its long experience into a clear digital booking experience.", arProblem:"البراند كان محتاج يحوّل خبرته الطويلة لتجربة حجز رقمية واضحة وحديثة.", solution:"Built a dark premium visual identity with direct branch selection, service discovery, and high-visibility booking actions.", arSolution:"نفذت هوية داكنة Premium مع اختيار مباشر للفرع وعرض الخدمات وأزرار حجز واضحة.", result:"A distinctive online presence that presents the brand professionally and moves visitors directly toward booking.", arResult:"حضور رقمي مميز يعرض البراند باحتراف ويوصل الزائر للحجز بسرعة." },
  { title:"Dr. Ashraf El Abd", category:"Fitness / Coaching Platform", image:"/images/ashraf.webp", url:"https://dr.ashrafelabd.com/", stack:["React","SEO","Responsive","Conversion UX"], description:"A premium production website for an expert fitness brand with strong CTAs and mobile conversion.", arDescription:"موقع Production احترافي لبراند فيتنس مع أزرار قوية وتجربة موبايل واضحة.", problem:"The brand needed a premium digital presence that communicates expertise.", arProblem:"البراند كان محتاج حضور رقمي قوي يوضح الخبرة.", solution:"Designed a responsive React experience with structured services and bilingual content.", arSolution:"صممت تجربة React متجاوبة بخدمات منظمة ومحتوى ثنائي اللغة.", result:"A stronger brand image and clearer journey to direct contact.", arResult:"صورة براند أقوى ورحلة أوضح للتواصل المباشر." },
  { title:"7Day Gym", category:"Gym / Subscriptions Website", image:"/images/7day.webp", url:"https://www.7daygym.com/", stack:["Web Design","Arabic UX","Performance"], description:"A modern Arabic gym website presenting offers, subscriptions, services, and contact paths.", arDescription:"موقع عربي حديث لجيم يعرض العروض والاشتراكات والخدمات ومسارات التواصل.", problem:"Offers and services needed to be easy to understand on mobile.", arProblem:"العروض والخدمات كان لازم تبقى سهلة الفهم على الموبايل.", solution:"Built a clean Arabic UX with direct CTAs and responsive presentation.", arSolution:"بنيت تجربة عربية واضحة بأزرار مباشرة وعرض متجاوب.", result:"A professional online presence supporting inquiries and subscriptions.", arResult:"حضور أونلاين احترافي يدعم الاستفسارات والاشتراكات." },
  { title:"El Nawras Pest Control", category:"Business Website", image:"/images/eln.webp", url:"https://www.elnawraspestcontrol.com/", stack:["Landing Page","CTA","Business UI"], description:"A service-business website designed to build trust and generate qualified leads.", arDescription:"موقع شركة خدمات مصمم لبناء الثقة وتحويل الزوار إلى عملاء محتملين.", problem:"The company needed a clear site that explains services and drives calls.", arProblem:"الشركة كانت محتاجة موقع واضح يشرح الخدمات ويدفع للتواصل.", solution:"Created a lead-focused layout with service cards and trust signals.", arSolution:"صممت Layout مركز على العملاء المحتملين بكروت خدمات وعناصر ثقة.", result:"A business-focused website prepared to turn visitors into real inquiries.", arResult:"موقع موجه للبيزنس ومجهز لتحويل الزيارات إلى استفسارات." },
  { title:"El Sobky Charity", category:"Charity / Community Website", image:"/images/els.webp", url:"https://alsobky-charity-website.vercel.app/", stack:["RTL","Responsive","Community UX"], description:"A polished charity website for activities, registration flows, and community trust.", arDescription:"موقع خيري احترافي للأنشطة ومسارات التسجيل وبناء الثقة.", problem:"The foundation needed a trustworthy website that organizes its activities.", arProblem:"المؤسسة كانت محتاجة موقع موثوق ينظم أنشطتها.", solution:"Built a refined RTL website with official actions and strong readability.", arSolution:"بنيت موقع RTL منظم بأزرار رسمية وقابلية قراءة قوية.", result:"A credible digital platform for easier access to foundation activities.", arResult:"منصة رقمية موثوقة تسهل الوصول لأنشطة المؤسسة." }
];

const featuredProject = projects.find(project => project.title === "Ecosense AI") || projects[0];
const portfolioProjects = projects.filter(project => project.title !== "Ecosense AI");

const certificates = [
  { title:"Tekatech Programming & Robotics Trainer", issuer:"Professional Experience", meta:"Teaching programming logic, robotics concepts, and practical tech sessions", icon:School },
  { title:"Sadat University - Faculty of Computers and Artificial Intelligence", issuer:"Education", meta:"Computer & Artificial Intelligence Graduate", icon:GraduationCap },
  { title:"AWS Academy Graduate - Cloud Foundations", issuer:"Amazon Web Services Training and Certification", meta:"AWS badge - Cloud Computing foundations and AWS core services", icon:Server },
  { title:"AWS Academy Graduate - Machine Learning for Natural Language Processing", issuer:"Amazon Web Services Training and Certification", meta:"AWS badge - NLP and machine learning workflows", icon:BrainCircuit },
  { title:"Artificial Intelligence & Machine Learning", issuer:"Information Technology Institute - ITI", meta:"72 hours", icon:Award },
  { title:"Intro to Deep Learning", issuer:"Kaggle", meta:"Certificate of Completion", icon:BrainCircuit },
  { title:"Computer Vision", issuer:"Kaggle", meta:"Certificate of Completion", icon:Cpu },
  { title:"Getting Started with Deep Learning", issuer:"NVIDIA", meta:"Certificate of Competency", icon:Trophy }
];

const fallbackReviews = [];

function ReviewStars({ value = 5, interactive = false, onChange }) {
  return <div className={interactive ? "stars stars-clickable" : "stars"}>
    {Array.from({length:5}).map((_,i)=>{
      const active = i < Number(value || 0);
      return <button type="button" key={i} aria-label={`rating ${i+1}`} onClick={()=>interactive && onChange?.(i+1)} disabled={!interactive} className={active ? "star-active" : ""}>
        <Star size={18} fill={active ? "currentColor" : "none"}/>
      </button>;
    })}
  </div>;
}
function getProjectText(project, isAr, key){ return isAr ? project[`ar${key}`] || project[key.toLowerCase()] : project[key.toLowerCase()] }
function SectionLabel({children}){ return <span className="section-label">{children}</span> }
function AnimatedCard({className="", children, style}){ return <div className={`reveal-card ${className}`} style={style}>{children}</div> }
function BrowserFrame({ image, title, className="", priority=false }){
  return <div className={`browser-frame ${className}`}>
    <div className="browser-top"><span/><span/><span/><small>{title}</small></div>
    <div className="browser-screen"><img src={image} alt={`${title} website preview`} loading={priority?"eager":"lazy"} decoding="async" fetchPriority={priority?"high":"low"} width="1100" height="620"/></div>
  </div>
}

function App(){
  const [lang,setLang] = useState("ar");
  const [theme,setTheme] = useState("dark");
  const [prefsReady,setPrefsReady] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [reviews,setReviews] = useState(fallbackReviews);
  const [reviewForm,setReviewForm] = useState({ name:"", role:"", text:"", rating:5 });
  const [sending,setSending] = useState(false);
  const [reviewStatus,setReviewStatus] = useState("");
  const [activeFilter,setActiveFilter] = useState("all");
  const [activeProject,setActiveProject] = useState(null);
  const [scrollUi,setScrollUi] = useState({ visible:false, progress:0 });
  const [soundOn,setSoundOn] = useState(false);
  const audioRef = React.useRef(null);

  const t = translations[lang] || translations.en;
  const isAr = lang === "ar";
  const whatsappUrl = useMemo(()=>`https://wa.me/20${profile.phone.slice(1)}?text=${encodeURIComponent(profile.whatsappMessage)}` ,[]);
  const navIds=["home","about","skills","services","projects","packages","reviews","certificates","contact"];

  const playUiSound = (type = "tap", force = false) => {
    if((!soundOn && !force) || typeof window === "undefined") return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext) return;
    const ctx = audioRef.current || new AudioContext();
    audioRef.current = ctx;
    if(ctx.state === "suspended") ctx.resume?.();

    const now = ctx.currentTime;
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const compressor = ctx.createDynamicsCompressor();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(5400, now);
    filter.Q.setValueAtTime(0.65, now);
    compressor.threshold.setValueAtTime(-22, now);
    compressor.knee.setValueAtTime(24, now);
    compressor.ratio.setValueAtTime(5, now);
    compressor.attack.setValueAtTime(0.004, now);
    compressor.release.setValueAtTime(0.13, now);

    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(type === "tap" ? 0.028 : 0.042, now + 0.014);
    master.gain.exponentialRampToValueAtTime(0.0001, now + (type === "tap" ? 0.16 : 0.34));
    master.connect(filter);
    filter.connect(compressor);
    compressor.connect(ctx.destination);

    const presets = {
      tap: [{ f: 620, d: 0.09, delay: 0 }, { f: 930, d: 0.11, delay: 0.035, v: 0.55 }],
      open: [{ f: 392, d: 0.14, delay: 0 }, { f: 587, d: 0.16, delay: 0.055, v: 0.72 }, { f: 784, d: 0.18, delay: 0.105, v: 0.54 }],
      success: [{ f: 523.25, d: 0.15, delay: 0 }, { f: 659.25, d: 0.16, delay: 0.06, v: 0.68 }, { f: 880, d: 0.20, delay: 0.12, v: 0.48 }]
    };

    const notes = presets[type] || presets.tap;
    notes.forEach((note) => {
      const t0 = now + (note.delay || 0);
      const gain = ctx.createGain();
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const volume = note.v ?? 1;

      osc.type = "sine";
      overtone.type = "triangle";
      osc.frequency.setValueAtTime(note.f, t0);
      osc.frequency.exponentialRampToValueAtTime(note.f * 1.012, t0 + note.d);
      overtone.frequency.setValueAtTime(note.f * 2, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.18 * volume, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + note.d);

      osc.connect(gain);
      overtone.connect(gain);
      gain.connect(master);
      osc.start(t0);
      overtone.start(t0);
      osc.stop(t0 + note.d + 0.025);
      overtone.stop(t0 + note.d + 0.025);
    });
  };

  const toggleSound = () => {
    setSoundOn((value)=>{
      const next = !value;
      localStorage.setItem("portfolio-sound", next ? "on" : "off");
      if(next) window.setTimeout(()=>playUiSound("success", true), 0);
      return next;
    });
  };

  const projectFilters = [
    { key:"all", en:"All Work", ar:"كل الأعمال" },
    { key:"ai", en:"AI & IoT", ar:"AI و IoT" },
    { key:"education", en:"Education", ar:"منصات تعليم" },
    { key:"business", en:"Business", ar:"بيزنس" },
    { key:"fitness", en:"Fitness", ar:"فيتنس" }
  ];

  const processSteps = [
    { icon:Target, en:"Analyze the product goal", ar:"تحليل هدف المنتج" },
    { icon:Layers, en:"Map screens and user flow", ar:"تخطيط الشاشات ومسار المستخدم" },
    { icon:Code2, en:"Build responsive React UI", ar:"تنفيذ واجهات React متجاوبة" },
    { icon:Workflow, en:"Connect APIs and live data", ar:"ربط APIs والبيانات الحقيقية" },
    { icon:Rocket, en:"Optimize, test, and deploy", ar:"تحسين واختبار ونشر" }
  ];

  const creativeCards = [
    { icon:Sparkles, title:isAr?"Design System":"Design System", text:isAr?"ألوان، خطوط، أزرار، وكروت ثابتة تخلي الموقع شكله براند مش قالب جاهز.":"Consistent colors, typography, cards, and buttons so the site feels branded, not templated." },
    { icon:Gauge, title:isAr?"Fast Motion":"Fast Motion", text:isAr?"أنيميشن خفيف يظهر مع التفاعل والظهور فقط، من غير مؤثرات شغالة طول الوقت.":"Lightweight animation on interaction and reveal only, without heavy always-running effects." },
    { icon:Search, title:isAr?"SEO Architecture":"SEO Architecture", text:isAr?"هيكلة عناوين ومحتوى وMeta وSchema تساعد الموقع يظهر بشكل أقوى في البحث والمشاركة.":"Structured headings, metadata, and schema for stronger search and social sharing." }
  ];

  const systemLayers = [
    { icon:Camera, label:isAr?"ESP32-CAM":"ESP32-CAM", title:isAr?"التقاط صورة النبات":"Plant Image Capture", text:isAr?"صورة حقيقية تدخل لمسار التحليل بدل بيانات وهمية.":"A real plant image enters the analysis flow instead of fake demo data." },
    { icon:Wifi, label:isAr?"Sensors":"Sensors", title:isAr?"قراءات البيئة":"Environmental Readings", text:isAr?"حرارة ورطوبة وتربة وإضاءة مرتبطة بتشخيص أوضح.":"Temperature, humidity, soil, and light data support a clearer diagnosis." },
    { icon:BrainCircuit, label:isAr?"AI Model":"AI Model", title:isAr?"منطق التشخيص":"Diagnosis Logic", text:isAr?"دمج الصورة والقراءات للوصول لحالة النبات النهائية.":"Combines image and sensor signals to reach the final plant status." },
    { icon:Server, label:isAr?"Backend":"Backend", title:isAr?"APIs منظمة":"Structured APIs", text:isAr?"نتائج وتحليلات محفوظة وقابلة للعرض داخل الواجهة.":"Analysis results are structured and ready for the frontend experience." },
    { icon:MonitorSmartphone, label:isAr?"Dashboard":"Dashboard", title:isAr?"واجهة استخدام كاملة":"Complete UI Experience", text:isAr?"داشبورد ويب وموبايل يعرض التشخيص والتاريخ والمهام.":"Web and mobile-friendly dashboard for diagnosis, history, and actions." }
  ];

  const filteredProjects = useMemo(()=>portfolioProjects.filter(project=>{
    if(activeFilter === "all") return true;
    const text = `${project.title} ${project.category} ${project.stack?.join(" ") || ""}`.toLowerCase();
    if(activeFilter === "ai") return text.includes("ai") || text.includes("iot") || text.includes("programming");
    if(activeFilter === "education") return text.includes("education") || text.includes("academy") || text.includes("programming") || text.includes("student");
    if(activeFilter === "business") return text.includes("business") || text.includes("charity") || text.includes("community") || text.includes("pest");
    if(activeFilter === "fitness") return text.includes("fitness") || text.includes("gym") || text.includes("coaching");
    return true;
  }),[activeFilter]);

  useEffect(()=>{
    const savedLang = localStorage.getItem("portfolio-lang");
    const savedTheme = localStorage.getItem("portfolio-theme");
    setLang(["en", "ar"].includes(savedLang) ? savedLang : "en");
    setTheme(["dark", "light"].includes(savedTheme) ? savedTheme : "dark");
    setSoundOn(localStorage.getItem("portfolio-sound") === "on");
    setPrefsReady(true);
  },[]);

  useEffect(()=>{
    if(!prefsReady) return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    document.body.dataset.theme = theme;
    root.lang = lang;
    root.dir = t.dir;
    document.body.dir = t.dir;
    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-lang", lang);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if(metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#020712" : "#ffffff");
  },[theme,lang,t.dir,prefsReady]);
  useEffect(()=>{
    if(!soundOn) return;
    const onClick = (event) => {
      const target = event.target;
      if(target?.closest?.("button, a, .filter-pills button, .lang-toggle")) playUiSound("tap");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  },[soundOn]);


  useEffect(()=>{
    let unsubscribe = null;
    let cancelled = false;
    let observer = null;

    const loadReviews = () => {
      if(cancelled || unsubscribe) return;
      getFirebaseDb().then((firebase)=>{
        if(cancelled || !firebase?.db) return;
        const { db, firestore } = firebase;
        const q = firestore.query(
          firestore.collection(db,"reviews"),
          firestore.orderBy("createdAt","desc"),
          firestore.limit(12)
        );
        unsubscribe = firestore.onSnapshot(q, (snap)=>{
          const liveReviews = snap.docs.map(doc=>({ id: doc.id, ...doc.data() }));
          setReviews(liveReviews.length ? liveReviews : fallbackReviews);
        }, () => setReviews(fallbackReviews));
      }).catch(()=>setReviews(fallbackReviews));
    };

    const reviewsSection = document.getElementById("reviews");
    if("IntersectionObserver" in window && reviewsSection){
      observer = new IntersectionObserver((entries)=>{
        if(entries.some(entry=>entry.isIntersecting)){
          loadReviews();
          observer?.disconnect();
        }
      }, { rootMargin: "320px" });
      observer.observe(reviewsSection);
    } else {
      window.setTimeout(loadReviews, 1200);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      unsubscribe?.();
    };
  },[]);

  useEffect(()=>{
    document.body.classList.toggle("modal-open", Boolean(activeProject));
  },[activeProject]);

  useEffect(()=>{
    let ticking = false;
    const updateScrollUi = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const current = window.scrollY || doc.scrollTop || 0;
      setScrollUi({
        visible: current > 420,
        progress: Math.min(100, Math.max(0, (current / max) * 100))
      });
      ticking = false;
    };
    const onScroll = () => {
      if(!ticking){
        ticking = true;
        window.requestAnimationFrame(updateScrollUi);
      }
    };
    updateScrollUi();
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onScroll, { passive:true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  },[]);

  const scrollToTop = () => {
    playUiSound("tap");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top:0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(()=>{
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) return;

    const root = document.documentElement;
    root.classList.add("motion-ready");

    const selector = [
      ".hero-content > .badge",
      ".cinema-strip",
      ".hero-title",
      ".hero-content > p",
      ".hero-actions",
      ".trust-row",
      ".metrics",
      ".socials",
      ".profile-card",
      ".featured-showcase",
      ".featured-visual",
      ".feature-pillars",
      ".signature-strip",
      ".reveal-card",
      ".project-card",
      ".system-layer",
      ".final-cta",
      ".contact"
    ].join(",");

    const nodes = Array.from(document.querySelectorAll(selector))
      .filter((node) => !node.closest(".project-modal"));

    nodes.forEach((node, index) => {
      node.classList.add("scroll-reveal");
      node.style.setProperty("--reveal-i", String(Math.min(index % 6, 5)));
    });

    const makeVisible = (node) => {
      node.classList.add("is-visible", "is-animating");
      window.setTimeout(() => node.classList.remove("is-animating"), 850);
    };

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(makeVisible);
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          makeVisible(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("scroll-reveal", "is-visible", "is-animating"));
      root.classList.remove("motion-ready");
    };
  }, [activeFilter, reviews.length, lang]);

  const goTo=(id)=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const handleReviewSubmit=async(e)=>{
    e.preventDefault();
    const clean = {
      name: reviewForm.name.trim() || (isAr ? "زائر" : "Visitor"),
      role: reviewForm.role.trim() || (isAr ? "زائر الموقع" : "Website visitor"),
      text: reviewForm.text.trim(),
      rating: Number(reviewForm.rating) || 5
    };
    if(!clean.text){
      setReviewStatus(isAr ? "اكتب التقييم الأول." : "Please write your review first.");
      return;
    }
    setSending(true);
    setReviewStatus("");
    try {
      const firebase = await getFirebaseDb();
      if(!firebase?.db) {
        setReviewStatus(isAr ? "Firebase غير متصل حاليًا." : "Firebase is not connected right now.");
        return;
      }
      const { db, firestore } = firebase;
      await firestore.addDoc(firestore.collection(db,"reviews"), {
        name: clean.name.slice(0,60),
        role: clean.role.slice(0,80),
        text: clean.text.slice(0,400),
        rating: clean.rating,
        createdAt: firestore.serverTimestamp()
      });
      setReviewForm({ name:"", role:"", text:"", rating:5 });
      setReviewStatus(isAr ? "تم إرسال تقييمك بنجاح." : "Your review was submitted successfully.");
    } catch {
      setReviewStatus(isAr ? "حصل خطأ أثناء الإرسال. راجع إعدادات Firebase." : "Something went wrong. Check Firebase settings.");
    } finally {
      setSending(false);
    }
  };

  const sectionIntro = {
    services: isAr ? "حلول رقمية منظمة: مواقع سريعة، واجهات AI، ربط APIs، وتجربة استخدام جاهزة للإطلاق." : "Structured digital solutions: fast websites, AI interfaces, API integrations, and launch-ready UX.",
    process: isAr ? "Workflow واضح من تحليل الفكرة لحد النشر، مع تنفيذ نظيف واختبار قبل التسليم." : "A clear workflow from idea analysis to deployment, with clean execution and testing before delivery.",
    hardware: isAr ? "خبرة عملية في ربط الويب بالذكاء الاصطناعي والهاردوير الحقيقي وقراءات السينسورات." : "Practical experience connecting web interfaces with AI, real hardware, and sensor readings.",
    certificates: isAr ? "خلفية أكاديمية وتقنية في Computer Science وAI وCloud وDeep Learning." : "Academic and technical background in Computer Science, AI, Cloud, and Deep Learning."
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://amr-developer-portfolio.basemngm.chatgpt.site/#person",
        name: "Eng Amr Khaled Abozeid",
        alternateName: "عمرو خالد أبو زيد",
        jobTitle: ["Web Developer", "Front-End Developer", "AI Engineer", "Website Designer"],
        image: "https://amr-developer-portfolio.basemngm.chatgpt.site/images/amr-profile-creative.jfif",
        email: profile.email,
        telephone: profile.phone,
        address: { "@type": "PostalAddress", addressLocality: "Mansoura", addressCountry: "EG" },
        sameAs: [profile.github, profile.linkedin, profile.facebook, profile.instagram, profile.tiktok],
        knowsAbout: ["React", "Web Design", "SEO", "Artificial Intelligence", "Educational Platforms", "E-commerce", "IoT"]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://amr-developer-portfolio.basemngm.chatgpt.site/#service",
        name: "Amr Khaled Web Development & Design",
        alternateName: "عمرو خالد لتصميم وبرمجة المواقع",
        url: "https://amr-developer-portfolio.basemngm.chatgpt.site/",
        image: "https://amr-developer-portfolio.basemngm.chatgpt.site/images/amr-profile-creative.jfif",
        description: "تصميم وبرمجة مواقع في المنصورة، منصات تعليمية، متاجر إلكترونية، وواجهات React مدعومة بالذكاء الاصطناعي.",
        founder: { "@id": "https://amr-developer-portfolio.basemngm.chatgpt.site/#person" },
        areaServed: [
          { "@type": "City", name: "Mansoura" },
          { "@type": "Country", name: "Egypt" }
        ],
        serviceType: ["Website Design", "Web Development", "SEO", "Educational Platform Development", "E-commerce Development"]
      },
      {
        "@type": "WebSite",
        "@id": "https://amr-developer-portfolio.basemngm.chatgpt.site/#website",
        url: "https://amr-developer-portfolio.basemngm.chatgpt.site/",
        name: "Eng Amr Khaled Portfolio",
        inLanguage: ["ar-EG", "en"],
        about: { "@id": "https://amr-developer-portfolio.basemngm.chatgpt.site/#person" }
      }
    ]
  };

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
    <div className="bg-grid"/>
    <div className="cinematic-noise"/>
    <div className="depth-lights"><span/><span/><span/></div>
    <div className="aurora aurora-one"/><div className="aurora aurora-two"/><div className="aurora aurora-three"/>
    <div className="hologram-lines"/>

    <header className="nav glass-panel">
      <a className="brand" onClick={()=>goTo("home")} aria-label="Go to home">
        <img src={profile.logo} alt="Amr Khaled logo" width="40" height="40" decoding="async"/>
        <span>{isAr ? profile.arabicName : profile.name}</span>
      </a>
      <nav className={menuOpen ? "open" : ""}>{t.nav.map((item,index)=><button key={item} onClick={()=>goTo(navIds[index])}>{item}</button>)}</nav>
      <div className="nav-actions">
        <button type="button" className="icon-btn lang-toggle" onClick={()=>setLang(lang === "ar" ? "en" : "ar")} aria-label={isAr ? "Switch to English" : "تغيير اللغة للعربية"} title={isAr ? "English" : "العربية"}><Languages size={18}/></button>
        <button className="icon-btn" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?<Sun/>:<Moon/>}</button>
        <button className={`icon-btn sound-toggle ${soundOn ? "active" : ""}`} onClick={toggleSound} aria-label={isAr ? "تشغيل أو إيقاف صوت الواجهة" : "Toggle interface sound"} title={isAr ? "صوت الواجهة" : "Interface sound"}>{soundOn?<Volume2/>:<VolumeX/>}</button>
        <button className="menu-btn icon-btn" onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>

    <section id="home" className="hero section">
      <div className="hero-content">
        <span className="badge super-badge"><Sparkles size={16}/>{t.badge}</span>
        <div className="cinema-strip"><span>PREMIUM UI</span><span>FAST REACT</span><span>SEO READY</span><span>LIVE PROJECTS</span></div>
        <div className="creative-signature" aria-label="Code, art and impact"><span>CODE</span><i>×</i><span>ART</span><i>×</i><span>IMPACT</span></div>
        <h1 className="hero-title">{t.title1}<span>{t.title2}</span></h1>
        <p>{t.subtitle}</p>
        <div className="hero-actions">
          <button className="primary magnetic" onClick={()=>goTo("featured")}>{isAr?"شوف أقوى مشروع":"See Flagship Project"}<ArrowRight size={18}/></button>
          <a className="secondary magnetic" href={whatsappUrl} target="_blank" rel="noreferrer">{t.ctaContact}<Phone size={18}/></a>
          <a className="secondary magnetic" href="/Amr-Khaled-CV.pdf" download>{t.cv}<Download size={18}/></a>
        </div>
        <div className="trust-row">{t.highlights.map(item=><span key={item}><BadgeCheck size={16}/>{item}</span>)}</div>
        <div className="metrics">{t.stats.map(stat=><div key={stat.label}><b>{stat.n}</b><span>{stat.label}</span></div>)}</div>
        <div className="signature-strip" aria-label="Execution strengths">
          <span><Gauge size={15}/>{isAr?"60fps Motion":"60fps Motion"}</span>
          <span><Search size={15}/>{isAr?"SEO قوي":"SEO Built-in"}</span>
          <span><Database size={15}/>{isAr?"Firebase Ready":"Firebase Ready"}</span>
          <span><School size={15}/>{isAr?"مدرب Tekatech":"Tekatech Trainer"}</span>
        </div>
        <div className="command-deck premium-3d" aria-label="Developer execution console">
          <div className="command-top"><span/><span/><span/><b>{isAr?"AMR PRODUCT OS":"AMR PRODUCT OS"}</b></div>
          <div className="command-lines">
            <code><em>01</em> designSystem.create(<b>"premium-ui"</b>)</code>
            <code><em>02</em> aiApi.connect(<b>"real-product-flow"</b>)</code>
            <code><em>03</em> performance.lock(<b>"fast-mobile"</b>)</code>
          </div>
        </div>
        <div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon/>GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon/>LinkedIn</a><a href={profile.facebook} target="_blank" rel="noreferrer"><FacebookIcon/>Facebook</a><a href={profile.instagram} target="_blank" rel="noreferrer"><InstagramIcon/>Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer"><TikTokIcon/>TikTok</a></div>
      </div>
      <aside className="profile-card premium-3d hero-cinematic hero-3d-stage" aria-label="Developer profile">
        <div className="hero-depth-grid" aria-hidden="true"/>
        <div className="developer-plate tilt-3d">
          <div className="photo-wrap"><img src={profile.image} alt="Eng Amr Khaled profile photo" width="720" height="720" fetchPriority="high" decoding="async"/><div className="photo-caption"><img src={profile.logo} alt="Eng Amr Khaled logo" width="34" height="34" loading="lazy" decoding="async"/><span>AI • Front-End • IoT</span></div></div>
        </div>
        <div className="hero-mini-panel">
          <div><span>{isAr?"واجهة":"Interface"}</span><b>Premium React</b></div>
          <div><span>{isAr?"مشروع قوي":"Top case"}</span><b>Ecosense AI</b></div>
          <div><span>{isAr?"تدريب":"Training"}</span><b>Tekatech Robotics</b></div>
          <div><span>{isAr?"أداء":"Performance"}</span><b>Fast UX</b></div>
        </div>
      </aside>
    </section>

    <section className="cinematic-marquee" aria-label="Premium technology highlights">
      <div className="marquee-track">
        {Array.from({length:2}).map((_,loop)=><div className="marquee-group" key={loop}>
          {['React','AI Dashboards','Fast UI','API Integration','IoT Hardware','Premium UI/UX','SEO Ready','Case Studies'].map(item=><span key={`${loop}-${item}`}><Sparkles size={14}/>{item}</span>)}
        </div>)}
      </div>
    </section>

    <section className="section inspiration-lab" aria-label="Creative engineering direction">
      <div className="lab-head">
        <SectionLabel>{isAr?"مش بورتفوليو تقليدي":"Not a template portfolio"}</SectionLabel>
        <h2 className="section-title">{isAr?"تجربة بتعرض طريقة التفكير قبل صور المشاريع.":"A portfolio experience that shows the thinking before the screenshots."}</h2>
        <p>{isAr?"تجربة بورتفوليو مبنية على Product Thinking، جودة تنفيذ هندسية، ومشاريع حقيقية جاهزة للعرض والعمل.":"A portfolio experience built around product thinking, engineering quality, and real shipped projects."}</p>
      </div>
      <div className="lab-bento">
        <AnimatedCard className="lab-card lab-card-large"><Rocket/><span>01</span><h3>{isAr?"Product Mindset":"Product Mindset"}</h3><p>{isAr?"ببدأ من هدف المشروع وتجربة المستخدم قبل شكل الزر والكارت.":"Starts from the product goal and user journey before colors and cards."}</p></AnimatedCard>
        <AnimatedCard className="lab-card"><Layers/><span>02</span><h3>{isAr?"Visual System":"Visual System"}</h3><p>{isAr?"هوية واضحة، تباين محسوب، وحركة صغيرة تخدم المحتوى.":"A clear identity, measured contrast, and motion that supports the content."}</p></AnimatedCard>
        <AnimatedCard className="lab-card"><BrainCircuit/><span>03</span><h3>{isAr?"AI Ready":"AI Ready"}</h3><p>{isAr?"مشاريع تقدر تربط موديلات، APIs، بيانات، وواجهات حقيقية.":"Projects ready for models, APIs, data, and real interfaces."}</p></AnimatedCard>
        <AnimatedCard className="lab-card lab-card-wide"><Gauge/><span>04</span><h3>{isAr?"Fast by Design":"Fast by Design"}</h3><p>{isAr?"تأثيرات خفيفة على transform وopacity فقط، وسرعة على الموبايل قبل الديسكتوب.":"Light transform/opacity motion only, mobile speed before desktop decoration."}</p></AnimatedCard>
        <AnimatedCard className="lab-card lab-card-training"><School/><span>05</span><h3>{isAr?"Programming & Robotics Trainer":"Programming & Robotics Trainer"}</h3><p>{isAr?"بدرّب طلاب في Tekatech على البرمجة والروبوتيكس بطريقة عملية ومبسطة.":"Training students at Tekatech in programming logic and robotics through practical sessions."}</p></AnimatedCard>
      </div>
    </section>

    <section id="featured" className="section featured-showcase">
      <div className="featured-copy">
        <SectionLabel>{isAr?"Flagship Case Study":"Flagship Case Study"}</SectionLabel>
        <h2 className="section-title">{isAr?"Ecosense AI كمنتج كامل: صورة، سينسورات، AI، Backend، وDashboard.":"Ecosense AI as a complete product: image, sensors, AI, backend, and dashboard."}</h2>
        <p>{isAr?"يعرض Ecosense AI أقوى تجربة عملية في البورتفوليو: مشروع تخرج حقيقي يجمع Front-End وAI Integration وIoT Hardware وBackend Flow داخل منتج واحد.":"Ecosense AI is the flagship proof of work: a real graduation product combining front-end, AI integration, IoT hardware, and backend flow inside one product."}</p>
        <div className="feature-pillars">
          <span><Camera size={16}/>{isAr?"ESP32-CAM":"ESP32-CAM"}</span>
          <span><BrainCircuit size={16}/>{isAr?"AI Diagnosis":"AI Diagnosis"}</span>
          <span><Server size={16}/>{isAr?"Backend APIs":"Backend APIs"}</span>
          <span><MonitorSmartphone size={16}/>{isAr?"React Dashboard":"React Dashboard"}</span>
        </div>
        <div className="feature-actions">
          <button className="primary magnetic" onClick={()=>{playUiSound("open");setActiveProject(featuredProject)}}>{isAr?"افتح التفاصيل":"Open Case Study"}<MousePointerClick size={17}/></button>
          <a className="secondary magnetic" href={featuredProject.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink size={17}/></a>
        </div>
      </div>
      <div className="featured-visual premium-3d">
        <span className="feature-orbit orbit-a"/>
        <span className="feature-orbit orbit-b"/>
        <BrowserFrame image={featuredProject.image} title={featuredProject.title} className="featured-browser" priority/>
        <div className="featured-mini-stack">
          {featuredProject.previewImages?.map((img,index)=><BrowserFrame key={img} image={img} title={`${featuredProject.title} preview ${index+1}`} className="floating-browser-mini"/>)}
        </div>
      </div>
    </section>

    <section id="projects" className="section projects-section cinematic-projects">
      <div className="section-head projects-head">
        <div><SectionLabel>{t.projectsTitle}</SectionLabel><h2 className="section-title">{isAr?"مشاريع حقيقية مبنية للاستخدام الفعلي وليس للعرض فقط.":"Real projects built for actual use, not just for display."}</h2></div>
        <div className="filter-pills">{projectFilters.map(filter=><button key={filter.key} className={activeFilter===filter.key?"active":""} onClick={()=>setActiveFilter(filter.key)}>{isAr?filter.ar:filter.en}</button>)}</div>
      </div>
      <div className="projects-grid">{filteredProjects.map((project,index)=>{
        const featured = project.title === "Ecosense AI";
        return <article className={`project-card premium-3d kinetic-card ${featured ? "featured-project" : ""}`} key={project.title} style={{"--card-i": index}}>
          <div className="project-image project-browser-area"><span className="project-scan"/><span className="project-depth-badge">{featured ? "FEATURED / AI" : "LIVE CASE"}</span><BrowserFrame image={project.image} title={project.title} className="project-browser-frame" priority={featured}/>{project.previewImages&&<div className="project-previews mini-browser-previews">{project.previewImages.map((img,i)=><BrowserFrame key={img} image={img} title={`${project.title} ${i+1}`} className="mini-browser-frame"/>)}</div>}</div>
          <div className="project-body"><span>{project.category}</span><h3>{project.title}</h3><div className="project-role-line"><Code2 size={15}/>{isAr?"الدور: UI/UX + Front-End + Integration + Deployment":"Role: UI/UX + Front-End + Integration + Deployment"}</div><p>{getProjectText(project,isAr,"Description")}</p><div className="case-study"><div><b>{t.caseLabels[0]}</b><p>{getProjectText(project,isAr,"Problem")}</p></div><div><b>{t.caseLabels[1]}</b><p>{getProjectText(project,isAr,"Solution")}</p></div><div><b>{t.caseLabels[2]}</b><p>{getProjectText(project,isAr,"Result")}</p></div></div><div className="stack">{project.stack.map(item=><b key={item}>{item}</b>)}</div><div className="project-links"><button onClick={()=>{playUiSound("open");setActiveProject(project)}}>{isAr?"تفاصيل المشروع":"Project Details"}<MousePointerClick size={16}/></button><a href={project.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink size={16}/></a></div></div>
        </article>
      })}</div>
    </section>

    <section id="about" className="section about-grid">
      <div><SectionLabel>{t.aboutTitle}</SectionLabel><h2 className="section-title">{t.aboutHeading}</h2><p>{t.about}</p><p>{t.about2}</p></div>
      <AnimatedCard className="bio-box"><UserRound/><div><h3>{t.bioTitle}</h3><p>{t.bio}</p></div><div className="checks"><span><GraduationCap/>Sadat University Graduate</span><span><ShieldCheck/>Production Projects</span><span><Zap/>AI + Web + IoT</span><span><Target/>Business-focused Delivery</span></div></AnimatedCard>
    </section>

    <section id="skills" className="section">
      <SectionLabel>{t.skillsTitle}</SectionLabel>
      <div className="skills-grid">{skills.map((skill)=><AnimatedCard className="skill-card" key={skill.en}>{React.createElement(skill.icon)}<h3>{isAr?skill.ar:skill.en}</h3><div className="mini-tags">{skill.items.map(item=><span key={item}>{item}</span>)}</div></AnimatedCard>)}</div>
    </section>

    <section id="services" className="section">
      <div className="section-head"><div><SectionLabel>{t.servicesTitle}</SectionLabel><h2 className="section-title">{sectionIntro.services}</h2></div></div>
      <div className="services-grid">{services.map((service)=><AnimatedCard className="service-card" key={service.en}>{React.createElement(service.icon)}<h3>{isAr?service.ar:service.en}</h3><p>{isAr?service.arText:service.text}</p></AnimatedCard>)}</div>
    </section>

    <section id="packages" className="section pricing-section">
      <div className="pricing-heading">
        <div>
          <SectionLabel>{t.packagesTitle}</SectionLabel>
          <h2 className="section-title">{isAr?"اختار الباقة المناسبة لفكرتك وابدأ بشكل احترافي.":"Choose the right package for your idea and launch professionally."}</h2>
        </div>
        <p>{isAr?"كل باقة قابلة للتطوير حسب احتياجات المشروع، والسعر بيتحدد بعد معرفة التفاصيل المطلوبة.":"Every package can be tailored to the project. Final pricing is confirmed after reviewing the required scope."}</p>
      </div>
      <div className="pricing-grid">
        {packages.map((item,index)=>{
          const features = isAr ? item.arFeatures : item.features;
          return <article className={`pricing-card ${item.featured ? "pricing-featured" : ""}`} key={item.name}>
            {item.featured && <span className="popular-badge"><Sparkles size={15}/>{isAr?"الأكثر طلبًا":"Most popular"}</span>}
            <div className="package-number">0{index+1}</div>
            <span className="package-label">{isAr?item.arLabel:item.label}</span>
            <h3>{isAr?item.arName:item.name}</h3>
            <p>{isAr?item.arDescription:item.description}</p>
            <div className="package-price">{isAr?"عرض سعر مخصص":"Custom quote"}</div>
            <ul>
              {features.map(feature=><li key={feature}><CheckCircle2 size={18}/><span>{feature}</span></li>)}
            </ul>
            <a className={item.featured ? "primary package-cta" : "secondary package-cta"} href={whatsappUrl} target="_blank" rel="noreferrer">
              {isAr?"اختار الباقة":"Choose package"}<ArrowRight size={17}/>
            </a>
          </article>
        })}
      </div>
      <div className="pricing-note"><ShieldCheck size={18}/><span>{isAr?"كل المواقع سريعة، آمنة، متجاوبة، ومجهزة للتواصل المباشر عبر واتساب.":"Every website is fast, secure, responsive, and ready for direct WhatsApp contact."}</span></div>
    </section>

    <section className="section process-section">
      <div className="section-head"><div><SectionLabel>{isAr?"طريقة الشغل":"Work Process"}</SectionLabel><h2 className="section-title">{sectionIntro.process}</h2></div></div>
      <div className="process-grid">{processSteps.map((step,index)=><AnimatedCard className="process-card kinetic-card" key={step.en}><span className="step-number">0{index+1}</span>{React.createElement(step.icon)}<h3>{isAr?step.ar:step.en}</h3></AnimatedCard>)}</div>
    </section>

    <section className="section creative-lab">
      <div className="creative-lab-copy">
        <SectionLabel>{isAr?"Creative Engineering":"Creative Engineering"}</SectionLabel>
        <h2 className="section-title">{isAr?"شكل مميز، حركة محسوبة، وأداء سريع." : "Distinct visuals, measured motion, and fast performance."}</h2>
        <p>{isAr?"الفكرة مش مؤثرات كتير؛ الفكرة إن كل تفصيلة تخدم الثقة والوضوح والسرعة." : "The goal is not more effects; it is every detail serving trust, clarity, and speed."}</p>
      </div>
      <div className="creative-lab-grid">{creativeCards.map(card=><AnimatedCard className="creative-card" key={card.title}>{React.createElement(card.icon)}<h3>{card.title}</h3><p>{card.text}</p></AnimatedCard>)}</div>
    </section>

    <section className="section choose-section">
      <SectionLabel>{t.chooseTitle}</SectionLabel>
      <div className="choose-grid">{whyChoose.map(item=><AnimatedCard className="choose-card" key={item.en}>{React.createElement(item.icon)}<h3>{isAr?item.ar:item.en}</h3></AnimatedCard>)}</div>
    </section>

    <section className="section hardware-section">
      <div className="hardware-copy"><SectionLabel>{t.hardwareTitle}</SectionLabel><h2 className="section-title">{sectionIntro.hardware}</h2><p>{t.ai}</p></div>
      <div className="hardware-grid">{hardwareExperience.map(item=><AnimatedCard className="hardware-card" key={item.title}>{React.createElement(item.icon)}<h3>{isAr?item.arTitle:item.title}</h3><p>{isAr?item.arText:item.text}</p></AnimatedCard>)}</div>
    </section>

    <section className="section system-3d-section">
      <div className="section-head"><div><SectionLabel>{isAr?"Ecosense AI Architecture":"Ecosense AI Architecture"}</SectionLabel><h2 className="section-title">{isAr?"طبقات مشروع AI + IoT بشكل بصري 3D يوضح قوة التنفيذ.":"A 3D visual system map that shows the AI + IoT execution depth."}</h2></div></div>
      <div className="system-stage" aria-label="Ecosense AI system layers">
        {systemLayers.map((layer,index)=><AnimatedCard className="system-layer tilt-3d" key={layer.label} style={{"--layer-i": index}}>{React.createElement(layer.icon)}<span>{layer.label}</span><h3>{layer.title}</h3><p>{layer.text}</p></AnimatedCard>)}
        <div className="system-spine" aria-hidden="true"><span/><span/><span/><span/></div>
      </div>
    </section>

    <section id="reviews" className="section reviews-page">
      <div className="section-head"><div><SectionLabel>{t.reviewsTitle}</SectionLabel><h2 className="section-title">{isAr?"آراء مختصرة بتدي ثقة من غير زحمة في الصفحة.":"Short reviews that add trust without making the page crowded."}</h2></div></div>
      <div className="reviews-layout"><form className="review-form premium-3d" onSubmit={handleReviewSubmit}><Quote/><h3>{isAr?"ضيف تقييمك":"Add your review"}</h3><p>{isAr?"التقييمات متوصلة بـ Firebase وتظهر للزوار بعد الإرسال.":"Reviews are connected to Firebase and appear after submission."}</p><div className="form-row"><input value={reviewForm.name} onChange={e=>setReviewForm({...reviewForm,name:e.target.value})} placeholder={isAr?"اسمك":"Your name"}/><input value={reviewForm.role} onChange={e=>setReviewForm({...reviewForm,role:e.target.value})} placeholder={isAr?"الصفة / المشروع":"Role / project"}/></div><ReviewStars interactive value={reviewForm.rating} onChange={rating=>setReviewForm({...reviewForm,rating})}/><textarea value={reviewForm.text} onChange={e=>setReviewForm({...reviewForm,text:e.target.value})} placeholder={isAr?"اكتب تقييمك هنا":"Write your review here"} rows="4" required/><button className="primary" type="submit" disabled={sending}>{sending ? (isAr?"جاري الإرسال...":"Sending...") : (isAr?"إضافة التقييم":"Add Review")}<Star size={17}/></button>{reviewStatus && <div className={reviewStatus.includes("نجاح") || reviewStatus.includes("success") ? "form-status success" : "form-status warning"}><CheckCircle2 size={17}/>{reviewStatus}</div>}</form><div className="review-grid">{reviews.slice(0,6).map((review,index)=><AnimatedCard className="review-card" key={review.id || `${review.name}-${index}`}><Quote/><ReviewStars value={review.rating || 5}/><p>{review.text}</p><h3>{review.name}</h3><span>{review.role || (isAr?"زائر الموقع":"Website visitor")}</span></AnimatedCard>)}</div></div>
    </section>

    <section id="certificates" className="section">
      <div className="section-head"><div><SectionLabel>{t.certTitle}</SectionLabel><h2 className="section-title">{sectionIntro.certificates}</h2></div></div>
      <div className="cert-grid">{certificates.map(cert=><AnimatedCard className="cert-card" key={cert.title}>{React.createElement(cert.icon,{className:"award-icon"})}<h3>{cert.title}</h3><p>{cert.issuer}</p><span>{cert.meta}</span></AnimatedCard>)}</div>
    </section>

    <section className="section final-cta"><div><MousePointerClick/><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><a href={whatsappUrl} target="_blank" rel="noreferrer"><Send/>{t.startNow}</a></section>

    <section id="contact" className="section contact"><img className="contact-logo" src={profile.logo} alt="Eng Amr Khaled logo" width="90" height="90" loading="lazy" decoding="async"/><h2>{t.contactTitle}</h2><p>{t.contactSubtitle}</p><div className="contact-links"><a href={whatsappUrl} target="_blank" rel="noreferrer"><Phone/>WhatsApp</a><a href={`mailto:${profile.email}`}><Mail/>Email</a><a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon/>GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon/>LinkedIn</a><a href={profile.facebook} target="_blank" rel="noreferrer"><FacebookIcon/>Facebook</a><a href={profile.instagram} target="_blank" rel="noreferrer"><InstagramIcon/>Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer"><TikTokIcon/>TikTok</a></div></section>

    {activeProject && <div className="project-modal" role="dialog" aria-modal="true" onClick={()=>setActiveProject(null)}><div className="project-modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>{playUiSound("tap");setActiveProject(null)}} aria-label="Close"><X/></button><div className="modal-browser-wrap"><BrowserFrame image={activeProject.image} title={activeProject.title} className="modal-browser-frame" priority/></div><div className="modal-content"><span className="badge"><Layers size={16}/>{activeProject.category}</span><h2>{activeProject.title}</h2><p>{getProjectText(activeProject,isAr,"Description")}</p><div className="modal-case"><div><b>{t.caseLabels[0]}</b><p>{getProjectText(activeProject,isAr,"Problem")}</p></div><div><b>{t.caseLabels[1]}</b><p>{getProjectText(activeProject,isAr,"Solution")}</p></div><div><b>{t.caseLabels[2]}</b><p>{getProjectText(activeProject,isAr,"Result")}</p></div></div><div className="stack">{activeProject.stack.map(item=><b key={item}>{item}</b>)}</div><a className="primary modal-link" href={activeProject.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink size={17}/></a></div></div></div>}

    <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollUi.progress}%` }}/></div>
    <button className={`back-to-top ${scrollUi.visible ? "is-visible" : ""}`} type="button" onClick={scrollToTop} aria-label={isAr ? "الرجوع لأول الصفحة" : "Back to top"}>
      <ArrowUp size={21}/>
    </button>
    <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Send size={22}/></a><footer>{isAr ? `© ${new Date().getFullYear()} عمرو خالد أبو زيد — جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} Amr Khaled Abozeid — All rights reserved.`}</footer>
  </main>
}

export default App;
