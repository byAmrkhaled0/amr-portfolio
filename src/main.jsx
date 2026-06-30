import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Mail, Menu, Moon, Phone, Sparkles, Sun, X, ExternalLink,
  Code2, Cpu, Send, Globe2, Trophy, BrainCircuit, Server, GraduationCap,
  ShieldCheck, Zap, Star, Quote, Target, Award, BadgeCheck, UserRound,
  MonitorSmartphone, Workflow, Gauge, Search, Download, Layers, Rocket,
  CheckCircle2, MousePointerClick, Languages, Database, Camera, Wifi
} from "lucide-react";
import "./styles.css";


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
      const app = appModule.initializeApp(firebaseConfig);
      return {
        db: firestoreModule.getFirestore(app),
        firestore: firestoreModule
      };
    });
  }
  return firebaseDbPromise;
}

const profile = {
  name: "Amr Khaled Abozeid",
  arabicName: "عمرو خالد أبو زيد",
  role: "AI Engineer & Front-End Developer",
  phone: "01008454029",
  email: "amrk78420@gmail.com",
  github: "https://github.com/byAmrkhaled0",
  linkedin: "https://www.linkedin.com/in/amr-khaled-0a58822a4",
  facebook: "https://www.facebook.com/amr.khaled.400310",
  instagram: "https://www.instagram.com/byamrkhaled/",
  tiktok: "https://www.tiktok.com/@3mor_03?is_from_webapp=1&sender_device=pc",
  image: "/images/amr-khaled-hero.webp",
  logo: "/images/amr-logo.webp",
  whatsappMessage: "السلام عليكم اريد التواصل مع بشمهندس عمرو"
};

const languageNames = {
  en: "English", ar: "العربية", fr: "Français", de: "Deutsch", es: "Español", it: "Italiano", tr: "Türkçe"
};

const translations = {
  en: {
    dir: "ltr", chooseLang: "Choose language", nav: ["Home", "About", "Skills", "Services", "Projects", "Reviews", "Certificates", "Contact"],
    badge: "AI Engineer • Front-End • Real IoT Hardware", title1: "AI-powered web products", title2: "built with clean execution",
    subtitle: "I build modern React websites, AI-integrated dashboards, backend API experiences, and real IoT hardware projects that look professional and work in production.",
    ctaWork: "Explore Projects", ctaContact: "Start a Project", cv: "Download CV", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["Production websites", "AI + API integration", "Real IoT hardware", "7-language portfolio"],
    stats: [{ n: "7+", label: "Live Projects" }, { n: "AI", label: "Graduation Product" }, { n: "IoT", label: "Real Hardware" }, { n: "7", label: "Languages" }],
    aboutTitle: "Professional Profile", aboutHeading: "I combine clean UI, backend integration, AI thinking, and real hardware experience.",
    about: "I’m Amr Khaled Abozeid, an Egyptian Computer & AI graduate from Mansoura. I work across front-end development, AI engineering, backend API integration, and IoT sensor workflows.",
    about2: "My strongest project is Ecosense AI: a smart plant-health platform that connects React frontend screens, Flask AI backend APIs, image-based diagnosis, ESP32-CAM workflow, and real sensor readings.",
    bioTitle: "Short Professional Bio", bio: "Front-End Developer and AI Engineer skilled in React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM, DHT sensors, soil-moisture sensors, LDR/light sensors, and real hardware wiring.",
    skillsTitle: "Technical Stack", servicesTitle: "Services", chooseTitle: "Why Work With Me", projectsTitle: "Case Studies", reviewsTitle: "Client Reviews", certTitle: "Education & Certifications", hardwareTitle: "Real Hardware & IoT", aiTitle: "AI Experience",
    caseLabels: ["Problem", "Solution", "Result"], visit: "View Project", contactTitle: "Have an idea? Let’s build it properly.", contactSubtitle: "Send me a message and I’ll help you turn it into a fast, elegant, production-ready website or AI-powered product.",
    ai: "Ecosense AI combines plant image analysis, real sensor readings, ESP32-CAM, hardware wiring, React frontend dashboards, and Flask backend integration.",
    finalTitle: "Need a premium website or AI product?", finalText: "Let’s build a digital experience that fits your brand and delivers results.", startNow: "Start Now"
  },
  ar: {
    dir: "rtl", chooseLang: "اختار اللغة", nav: ["الرئيسية", "عني", "المهارات", "الخدمات", "الأعمال", "الآراء", "الشهادات", "تواصل"],
    badge: "مهندس AI • Front-End • هاردوير IoT حقيقي", title1: "مواقع ومنتجات ذكية", title2: "بتنفيذ نظيف واحترافي",
    subtitle: "أبني مواقع React حديثة، داشبوردات متصلة بالذكاء الاصطناعي، تجارب APIs، ومشاريع IoT بهاردوير حقيقي بشكل احترافي وجاهز للاستخدام.",
    ctaWork: "شاهد المشاريع", ctaContact: "ابدأ مشروع", cv: "تحميل CV", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["مواقع Production", "دمج AI + APIs", "هاردوير IoT حقيقي", "بورتفوليو 7 لغات"],
    stats: [{ n: "7+", label: "مشاريع Live" }, { n: "AI", label: "مشروع تخرج" }, { n: "IoT", label: "هاردوير حقيقي" }, { n: "7", label: "لغات" }],
    aboutTitle: "نبذة احترافية", aboutHeading: "بجمع بين واجهة نظيفة، ربط باك إند، تفكير AI، وخبرة هاردوير حقيقي.",
    about: "أنا عمرو خالد أبو زيد، خريج حاسبات وذكاء اصطناعي مصري من المنصورة. شغلي بين Front-End، هندسة AI، ربط APIs، ومسارات IoT والسينسورات.",
    about2: "أقوى مشروع عندي هو Ecosense AI: منصة ذكية لصحة النبات بتربط واجهات React وFlask AI APIs وتشخيص بالصور وESP32-CAM وقراءات سينسورات حقيقية.",
    bioTitle: "سيرة مختصرة", bio: "Front-End Developer وAI Engineer متمكن من React وJavaScript وPython وFlask وREST APIs وVercel وGitHub وESP32-CAM وDHT وSoil Moisture وLDR وتوصيلات الهاردوير الحقيقي.",
    skillsTitle: "المهارات التقنية", servicesTitle: "الخدمات", chooseTitle: "نقاط القوة", projectsTitle: "دراسات حالة", reviewsTitle: "آراء العملاء", certTitle: "التعليم والشهادات", hardwareTitle: "Real Hardware & IoT", aiTitle: "خبرة الذكاء الاصطناعي",
    caseLabels: ["المشكلة", "الحل", "النتيجة"], visit: "مشاهدة المشروع", contactTitle: "عندك فكرة؟ خلينا نبنيها صح.", contactSubtitle: "ابعتلي رسالة وأنا أساعدك تحولها لموقع سريع واحترافي أو منتج مدعوم بالذكاء الاصطناعي.",
    ai: "Ecosense AI يجمع تحليل صور النبات وقراءات سينسورات حقيقية وESP32-CAM وتوصيلات هاردوير وReact Dashboard وFlask Backend.",
    finalTitle: "محتاج موقع Premium أو منتج AI؟", finalText: "خلينا نبني تجربة رقمية تليق بالبراند وتجيب نتيجة.", startNow: "ابدأ الآن"
  },
  fr: {
    dir: "ltr", chooseLang: "Choisir la langue", nav: ["Accueil", "À propos", "Compétences", "Services", "Projets", "Avis", "Certificats", "Contact"],
    badge: "Ingénieur IA • Front-End • IoT réel", title1: "Produits web avec IA", title2: "exécutés proprement",
    subtitle: "Je crée des sites React modernes, des tableaux de bord connectés à l’IA, des intégrations API backend et des projets IoT avec matériel réel.",
    ctaWork: "Voir les projets", ctaContact: "Démarrer un projet", cv: "Télécharger le CV", codeRole: "Ingénieur IA + Développeur Front-End",
    highlights: ["Sites en production", "IA + APIs", "Matériel IoT réel", "Portfolio 7 langues"], stats: [{ n: "7+", label: "Projets en ligne" }, { n: "AI", label: "Projet de fin d’études" }, { n: "IoT", label: "Matériel réel" }, { n: "7", label: "Langues" }],
    aboutTitle: "Profil professionnel", aboutHeading: "J’associe UI propre, intégration backend, logique IA et expérience matérielle réelle.", about: "Je suis Amr Khaled Abozeid, diplômé en informatique et IA, originaire de Mansoura, Égypte.", about2: "Mon projet phare est Ecosense AI: une plateforme de santé des plantes avec React, Flask, diagnostic par image, ESP32-CAM et capteurs réels.", bioTitle: "Bio courte", bio: "Développeur Front-End et ingénieur IA maîtrisant React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM et capteurs IoT.",
    skillsTitle: "Stack technique", servicesTitle: "Services", chooseTitle: "Pourquoi travailler avec moi", projectsTitle: "Études de cas", reviewsTitle: "Avis", certTitle: "Formation & Certificats", hardwareTitle: "Matériel réel & IoT", aiTitle: "Expérience IA", caseLabels: ["Problème", "Solution", "Résultat"], visit: "Voir le projet", contactTitle: "Une idée ? Construisons-la correctement.", contactSubtitle: "Envoyez-moi un message pour créer un site rapide, élégant ou un produit IA.", ai: "Ecosense AI combine images, capteurs réels, ESP32-CAM, câblage, React et Flask.", finalTitle: "Besoin d’un site premium ou d’un produit IA ?", finalText: "Construisons une expérience efficace pour votre marque.", startNow: "Commencer"
  },
  de: {
    dir: "ltr", chooseLang: "Sprache wählen", nav: ["Start", "Über mich", "Skills", "Services", "Projekte", "Bewertungen", "Zertifikate", "Kontakt"],
    badge: "AI Engineer • Front-End • echte IoT-Hardware", title1: "KI-gestützte Webprodukte", title2: "sauber umgesetzt", subtitle: "Ich entwickle moderne React-Websites, KI-Dashboards, API-Integrationen und IoT-Projekte mit echter Hardware.", ctaWork: "Projekte ansehen", ctaContact: "Projekt starten", cv: "CV herunterladen", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["Production Websites", "AI + APIs", "Echte IoT-Hardware", "7 Sprachen"], stats: [{ n: "7+", label: "Live-Projekte" }, { n: "AI", label: "Abschlussprojekt" }, { n: "IoT", label: "Echte Hardware" }, { n: "7", label: "Sprachen" }],
    aboutTitle: "Professionelles Profil", aboutHeading: "Ich verbinde saubere UI, Backend-Integration, KI-Denken und reale Hardware-Erfahrung.", about: "Ich bin Amr Khaled Abozeid, Computer- und AI-Absolvent aus Mansoura, Ägypten.", about2: "Mein stärkstes Projekt ist Ecosense AI: React Frontend, Flask AI Backend, Bilddiagnose, ESP32-CAM und echte Sensorwerte.", bioTitle: "Kurzprofil", bio: "Front-End Developer und AI Engineer mit React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM und IoT-Sensoren.",
    skillsTitle: "Technischer Stack", servicesTitle: "Services", chooseTitle: "Warum mit mir arbeiten", projectsTitle: "Case Studies", reviewsTitle: "Bewertungen", certTitle: "Bildung & Zertifikate", hardwareTitle: "Echte Hardware & IoT", aiTitle: "AI Erfahrung", caseLabels: ["Problem", "Lösung", "Ergebnis"], visit: "Projekt ansehen", contactTitle: "Eine Idee? Lass sie uns richtig bauen.", contactSubtitle: "Schreib mir für eine schnelle, elegante Website oder ein KI-Produkt.", ai: "Ecosense AI kombiniert Pflanzenbilder, reale Sensoren, ESP32-CAM, Hardware-Verkabelung, React und Flask.", finalTitle: "Premium Website oder AI-Produkt?", finalText: "Lass uns eine digitale Erfahrung bauen, die Ergebnisse liefert.", startNow: "Starten"
  },
  es: {
    dir: "ltr", chooseLang: "Elegir idioma", nav: ["Inicio", "Sobre mí", "Habilidades", "Servicios", "Proyectos", "Reseñas", "Certificados", "Contacto"],
    badge: "Ingeniero IA • Front-End • Hardware IoT real", title1: "Productos web con IA", title2: "con ejecución limpia", subtitle: "Construyo sitios React modernos, paneles con IA, integraciones API y proyectos IoT con hardware real.", ctaWork: "Ver proyectos", ctaContact: "Iniciar proyecto", cv: "Descargar CV", codeRole: "Ingeniero IA + Front-End Developer",
    highlights: ["Webs en producción", "IA + APIs", "Hardware IoT real", "Portfolio 7 idiomas"], stats: [{ n: "7+", label: "Proyectos live" }, { n: "AI", label: "Proyecto final" }, { n: "IoT", label: "Hardware real" }, { n: "7", label: "Idiomas" }],
    aboutTitle: "Perfil profesional", aboutHeading: "Combino UI limpia, integración backend, pensamiento IA y experiencia con hardware real.", about: "Soy Amr Khaled Abozeid, graduado en Computación e IA de Mansoura, Egipto.", about2: "Mi proyecto principal es Ecosense AI: React, Flask AI APIs, diagnóstico por imagen, ESP32-CAM y sensores reales.", bioTitle: "Bio breve", bio: "Front-End Developer e Ingeniero IA con React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM y sensores IoT.",
    skillsTitle: "Stack técnico", servicesTitle: "Servicios", chooseTitle: "Por qué trabajar conmigo", projectsTitle: "Casos de estudio", reviewsTitle: "Reseñas", certTitle: "Educación y Certificados", hardwareTitle: "Hardware real & IoT", aiTitle: "Experiencia IA", caseLabels: ["Problema", "Solución", "Resultado"], visit: "Ver proyecto", contactTitle: "¿Tienes una idea? Construyámosla bien.", contactSubtitle: "Envíame un mensaje y creemos un sitio rápido o producto con IA.", ai: "Ecosense AI combina imágenes, sensores reales, ESP32-CAM, cableado, React y Flask.", finalTitle: "¿Necesitas web premium o producto IA?", finalText: "Construyamos una experiencia digital que entregue resultados.", startNow: "Empezar"
  },
  it: {
    dir: "ltr", chooseLang: "Scegli lingua", nav: ["Home", "Chi sono", "Skill", "Servizi", "Progetti", "Recensioni", "Certificati", "Contatti"],
    badge: "AI Engineer • Front-End • Hardware IoT reale", title1: "Prodotti web con IA", title2: "realizzati con cura", subtitle: "Creo siti React moderni, dashboard con IA, integrazioni API e progetti IoT con hardware reale.", ctaWork: "Vedi progetti", ctaContact: "Avvia progetto", cv: "Scarica CV", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["Siti in produzione", "IA + APIs", "Hardware IoT reale", "Portfolio 7 lingue"], stats: [{ n: "7+", label: "Progetti live" }, { n: "AI", label: "Progetto finale" }, { n: "IoT", label: "Hardware reale" }, { n: "7", label: "Lingue" }],
    aboutTitle: "Profilo professionale", aboutHeading: "Unisco UI pulita, integrazione backend, logica IA ed esperienza hardware reale.", about: "Sono Amr Khaled Abozeid, laureato in Computer & AI da Mansoura, Egitto.", about2: "Il mio progetto principale è Ecosense AI: React, Flask AI APIs, diagnosi da immagine, ESP32-CAM e sensori reali.", bioTitle: "Bio breve", bio: "Front-End Developer e AI Engineer con React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM e sensori IoT.",
    skillsTitle: "Stack tecnico", servicesTitle: "Servizi", chooseTitle: "Perché lavorare con me", projectsTitle: "Case Study", reviewsTitle: "Recensioni", certTitle: "Formazione & Certificati", hardwareTitle: "Hardware reale & IoT", aiTitle: "Esperienza IA", caseLabels: ["Problema", "Soluzione", "Risultato"], visit: "Vedi progetto", contactTitle: "Hai un’idea? Costruiamola bene.", contactSubtitle: "Mandami un messaggio per creare un sito veloce o un prodotto IA.", ai: "Ecosense AI combina immagini, sensori reali, ESP32-CAM, cablaggio, React e Flask.", finalTitle: "Serve un sito premium o prodotto IA?", finalText: "Costruiamo un’esperienza digitale efficace.", startNow: "Inizia"
  },
  tr: {
    dir: "ltr", chooseLang: "Dil seç", nav: ["Ana sayfa", "Hakkımda", "Yetenekler", "Hizmetler", "Projeler", "Yorumlar", "Sertifikalar", "İletişim"],
    badge: "AI Engineer • Front-End • gerçek IoT donanımı", title1: "AI destekli web ürünleri", title2: "temiz uygulama ile", subtitle: "Modern React siteleri, AI panelleri, backend API entegrasyonları ve gerçek donanımlı IoT projeleri geliştiriyorum.", ctaWork: "Projeleri gör", ctaContact: "Proje başlat", cv: "CV indir", codeRole: "AI Engineer + Front-End Developer",
    highlights: ["Canlı siteler", "AI + API", "Gerçek IoT donanımı", "7 dil"], stats: [{ n: "7+", label: "Canlı proje" }, { n: "AI", label: "Mezuniyet projesi" }, { n: "IoT", label: "Gerçek donanım" }, { n: "7", label: "Dil" }],
    aboutTitle: "Profesyonel profil", aboutHeading: "Temiz UI, backend entegrasyonu, AI yaklaşımı ve gerçek donanım deneyimini birleştiriyorum.", about: "Ben Amr Khaled Abozeid, Mansoura, Mısır’dan Bilgisayar ve AI mezunuyum.", about2: "En güçlü projem Ecosense AI: React frontend, Flask AI backend, görüntü tanıma, ESP32-CAM ve gerçek sensör verileri.", bioTitle: "Kısa bio", bio: "React, JavaScript, Python, Flask, REST APIs, Vercel, GitHub, ESP32-CAM ve IoT sensörlerinde deneyimli Front-End Developer ve AI Engineer.",
    skillsTitle: "Teknik stack", servicesTitle: "Hizmetler", chooseTitle: "Neden benimle çalışmalısınız", projectsTitle: "Case Studies", reviewsTitle: "Yorumlar", certTitle: "Eğitim & Sertifikalar", hardwareTitle: "Gerçek Donanım & IoT", aiTitle: "AI Deneyimi", caseLabels: ["Problem", "Çözüm", "Sonuç"], visit: "Projeyi gör", contactTitle: "Bir fikrin var mı? Doğru şekilde oluşturalım.", contactSubtitle: "Hızlı, şık bir site veya AI ürünü için bana mesaj gönder.", ai: "Ecosense AI bitki görüntüleri, gerçek sensörler, ESP32-CAM, kablolama, React ve Flask’ı birleştirir.", finalTitle: "Premium site veya AI ürünü mü lazım?", finalText: "Markana uygun sonuç odaklı bir deneyim oluşturalım.", startNow: "Başla"
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
  { en: "Deployment & SEO", ar: "النشر و SEO", icon: Rocket, items: ["Vercel", "GitHub", "Performance", "Schema"] }
];

const services = [
  { en: "Portfolio & Business Websites", ar: "مواقع شخصية وبيزنس", icon: MonitorSmartphone, text: "Clean, responsive, conversion-focused websites.", arText: "مواقع نظيفة ومتجاوبة ومركزة على التحويل." },
  { en: "AI Dashboard Frontends", ar: "واجهات داشبورد AI", icon: Gauge, text: "Frontend screens connected to AI backend APIs.", arText: "واجهات متصلة بباك إند وAPIs للذكاء الاصطناعي." },
  { en: "API Integration", ar: "ربط APIs", icon: Workflow, text: "Structured React experiences for real backend systems.", arText: "تجارب React منظمة لأنظمة باك إند حقيقية." },
  { en: "SEO & Performance", ar: "SEO وسرعة", icon: Search, text: "Semantic pages, optimized assets, and clear metadata.", arText: "صفحات منظمة، صور مضغوطة، وميتا داتا قوية." }
];

const whyChoose = [
  { en: "Real product mindset", ar: "تفكير منتج حقيقي", icon: Target },
  { en: "Clean responsive UI", ar: "واجهة نظيفة ومتجاوبة", icon: ShieldCheck },
  { en: "AI + Web + IoT", ar: "AI + Web + IoT", icon: Layers },
  { en: "Fast delivery and clear communication", ar: "تسليم سريع وتواصل واضح", icon: Zap }
];

const hardwareExperience = [
  { title: "ESP32-CAM Workflow", arTitle: "مسار ESP32-CAM", icon: Camera, text: "Camera-based capture flow used inside the Ecosense AI plant-health system.", arText: "مسار تصوير بالكاميرا ضمن نظام Ecosense AI لتشخيص النبات." },
  { title: "Real Sensor Readings", arTitle: "قراءات سينسورات حقيقية", icon: Wifi, text: "Temperature, humidity, soil moisture, soil temperature, and light readings.", arText: "قراءات حرارة ورطوبة ورطوبة تربة وحرارة تربة وإضاءة." },
  { title: "Hardware Wiring", arTitle: "توصيلات هاردوير", icon: Cpu, text: "Hands-on wiring and project flow between sensors, camera, backend, and frontend.", arText: "توصيلات عملية بين السينسورات والكاميرا والباك إند والفرونت." }
];

const projects = [
  { title:"Ecosense AI", category:"AI / IoT / Real Hardware Graduation Project", image:"/images/ecosense-frontend-live.webp", previewImages:["/images/ecosense-plant-system.webp","/images/ecosense-real-hardware-wiring.webp"], url:"https://smart-plant-health-frontend.vercel.app/", stack:["React","Flask API","AI","ESP32-CAM","Real Sensors"], description:"A complete smart plant-health platform with React frontend, Flask AI backend, image diagnosis, real sensor readings, ESP32-CAM workflow, and real hardware wiring.", arDescription:"منصة كاملة لمتابعة صحة النبات بفرونت React وباك إند Flask AI، تشخيص بالصور، قراءات سينسورات حقيقية، ESP32-CAM، وتوصيلات هاردوير فعلية.", problem:"Plant monitoring needs reliable data from both images and environment readings.", arProblem:"متابعة النبات محتاجة بيانات موثوقة من الصورة وقراءات البيئة معًا.", solution:"Built the frontend, integrated backend APIs, and worked with real sensor and ESP32-CAM hardware flow.", arSolution:"نفذت الفرونت وربطت APIs واشتغلت على مسار السينسورات الحقيقية وESP32-CAM.", result:"A production-style graduation product combining AI, web, backend integration, and real IoT hardware.", arResult:"مشروع تخرج Production-style يجمع AI وWeb وربط باك إند وهاردوير IoT حقيقي." },

  { title:"Mahmoud Fawzy Science Platform", category:"Education / Student Management Platform", image:"/images/mahmoud-fawzy-science.webp", url:"https://mahmoud-fawzy-science-platform.vercel.app/", stack:["React","Firebase","RTL UI","QR Attendance","Student Portal"], description:"A complete Arabic education platform for science students with online booking, student portal, parent follow-up, attendance tracking, exams, reviews, and organized teacher management flows.", arDescription:"منصة تعليمية عربية كاملة لطلاب العلوم فيها حجز أونلاين، بوابة طالب، متابعة ولي الأمر، حضور بالـ QR، امتحانات، تقييمات، وتنظيم لإدارة المدرس.", problem:"The teacher needed one organized place for bookings, student follow-up, attendance, exams, and parent reports instead of scattered manual work.", arProblem:"المدرس كان محتاج مكان واحد منظم للحجز ومتابعة الطلاب والحضور والامتحانات وتقارير ولي الأمر بدل الشغل اليدوي المتفرق.", solution:"Built a responsive RTL platform with clear booking flow, student codes, parent access, teacher management sections, and mobile-friendly educational UX.", arSolution:"بنيت منصة RTL متجاوبة فيها مسار حجز واضح، أكواد للطلاب، دخول ولي الأمر، أقسام إدارة للمدرس، وتجربة مريحة على الموبايل.", result:"A live production platform that makes student registration, follow-up, exams, and communication easier and more professional.", arResult:"منصة Live احترافية سهّلت تسجيل الطلاب والمتابعة والامتحانات والتواصل بشكل منظم." },
  { title:"Techno Minds Programming & AI Academy", category:"Programming / AI Learning Platform", image:"/images/techno-minds-academy.webp", url:"https://eng-amr-khaled-academy.vercel.app/", stack:["React","Python Learning UX","AI Course","Student Portal","Parent Reports"], description:"A practical programming and AI learning platform for students, featuring course booking, learning path, coding practice pages, materials, exams, online sessions, student portal, and parent follow-up.", arDescription:"منصة تعليم برمجة وذكاء اصطناعي بشكل عملي للطلاب، فيها حجز الكورس، مسار تعليمي، صفحات تدريب كود، Materials، امتحانات، محاضرات أونلاين، بوابة طالب، ومتابعة ولي الأمر.", problem:"Students and parents needed a clear learning system that explains the path, tracks progress, and keeps all course tools in one place.", arProblem:"الطلاب وأولياء الأمور كانوا محتاجين نظام واضح يشرح المسار ويتابع التقدم ويجمع أدوات الكورس في مكان واحد.", solution:"Created a modern Arabic platform focused on practical learning, Python basics, AI mindset, coding challenges, materials, and progress follow-up.", arSolution:"نفذت منصة عربية حديثة مركزة على التعلم العملي، أساسيات Python، تفكير AI، تحديات كود، ملفات التدريب، ومتابعة التقدم.", result:"A polished live academy platform that supports booking, learning, practice, evaluation, and parent communication.", arResult:"منصة أكاديمية Live منظمة تدعم الحجز والتعلم والتطبيق والتقييم والتواصل مع ولي الأمر." },
  { title:"Dr. Ashraf El Abd", category:"Fitness / Coaching Platform", image:"/images/ashraf.webp", url:"https://dr.ashrafelabd.com/", stack:["React","SEO","Responsive","Conversion UX"], description:"A premium production website for an expert fitness brand with strong CTAs and mobile conversion.", arDescription:"موقع Production احترافي لبراند فيتنس مع أزرار قوية وتجربة موبايل واضحة.", problem:"The brand needed a premium digital presence that communicates expertise.", arProblem:"البراند كان محتاج حضور رقمي قوي يوضح الخبرة.", solution:"Designed a responsive React experience with structured services and bilingual content.", arSolution:"صممت تجربة React متجاوبة بخدمات منظمة ومحتوى ثنائي اللغة.", result:"A stronger brand image and clearer journey to direct contact.", arResult:"صورة براند أقوى ورحلة أوضح للتواصل المباشر." },
  { title:"7Day Gym", category:"Gym / Subscriptions Website", image:"/images/7day.webp", url:"https://www.7daygym.com/", stack:["Web Design","Arabic UX","Performance"], description:"A modern Arabic gym website presenting offers, subscriptions, services, and contact paths.", arDescription:"موقع عربي حديث لجيم يعرض العروض والاشتراكات والخدمات ومسارات التواصل.", problem:"Offers and services needed to be easy to understand on mobile.", arProblem:"العروض والخدمات كان لازم تبقى سهلة الفهم على الموبايل.", solution:"Built a clean Arabic UX with direct CTAs and responsive presentation.", arSolution:"بنيت تجربة عربية واضحة بأزرار مباشرة وعرض متجاوب.", result:"A professional online presence supporting inquiries and subscriptions.", arResult:"حضور أونلاين احترافي يدعم الاستفسارات والاشتراكات." },
  { title:"El Nawras Pest Control", category:"Business Website", image:"/images/eln.webp", url:"https://www.elnawraspestcontrol.com/", stack:["Landing Page","CTA","Business UI"], description:"A service-business website designed to build trust and generate qualified leads.", arDescription:"موقع شركة خدمات مصمم لبناء الثقة وتحويل الزوار إلى عملاء محتملين.", problem:"The company needed a clear site that explains services and drives calls.", arProblem:"الشركة كانت محتاجة موقع واضح يشرح الخدمات ويدفع للتواصل.", solution:"Created a lead-focused layout with service cards and trust signals.", arSolution:"صممت Layout مركز على العملاء المحتملين بكروت خدمات وعناصر ثقة.", result:"A business-focused website prepared to turn visitors into real inquiries.", arResult:"موقع موجه للبيزنس ومجهز لتحويل الزيارات إلى استفسارات." },
  { title:"El Sobky Charity", category:"Charity / Community Website", image:"/images/els.webp", url:"https://alsobky-charity-website.vercel.app/", stack:["RTL","Responsive","Community UX"], description:"A polished charity website for activities, registration flows, and community trust.", arDescription:"موقع خيري احترافي للأنشطة ومسارات التسجيل وبناء الثقة.", problem:"The foundation needed a trustworthy website that organizes its activities.", arProblem:"المؤسسة كانت محتاجة موقع موثوق ينظم أنشطتها.", solution:"Built a refined RTL website with official actions and strong readability.", arSolution:"بنيت موقع RTL منظم بأزرار رسمية وقابلية قراءة قوية.", result:"A credible digital platform for easier access to foundation activities.", arResult:"منصة رقمية موثوقة تسهل الوصول لأنشطة المؤسسة." }
];

const certificates = [
  { title:"Sadat University - Faculty of Computers and Artificial Intelligence", issuer:"Education", meta:"Computer & Artificial Intelligence Graduate", icon:GraduationCap },
  { title:"AWS Academy Graduate - Cloud Foundations", issuer:"Amazon Web Services Training and Certification", meta:"AWS badge - Cloud Computing foundations and AWS core services", icon:Server },
  { title:"AWS Academy Graduate - Machine Learning for Natural Language Processing", issuer:"Amazon Web Services Training and Certification", meta:"AWS badge - NLP and machine learning workflows", icon:BrainCircuit },
  { title:"Artificial Intelligence & Machine Learning", issuer:"Information Technology Institute - ITI", meta:"72 hours", icon:Award },
  { title:"Intro to Deep Learning", issuer:"Kaggle", meta:"Certificate of Completion", icon:BrainCircuit },
  { title:"Computer Vision", issuer:"Kaggle", meta:"Certificate of Completion", icon:Cpu },
  { title:"Getting Started with Deep Learning", issuer:"NVIDIA", meta:"Certificate of Competency", icon:Trophy }
];

const fallbackReviews = [
  { name:"Business Client", role:"Website Owner", text:"Amr delivered a clean and professional website with strong attention to mobile experience.", rating:5 },
  { name:"Project Teammate", role:"Graduation Project", text:"He handled frontend integration and AI project flow clearly and stayed focused on final delivery.", rating:5 },
  { name:"Local Brand", role:"Client", text:"The website became clearer, faster, and easier for customers to understand.", rating:5 }
];

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
    <div className="browser-screen"><img src={image} alt={`${title} website preview`} loading={priority?"eager":"lazy"} width="1100" height="620"/></div>
  </div>
}

function App(){
  const [lang,setLang] = useState(()=> localStorage.getItem("portfolio-lang") || "en");
  const [theme,setTheme] = useState(()=> localStorage.getItem("portfolio-theme") || "dark");
  const [menuOpen,setMenuOpen] = useState(false);
  const [reviews,setReviews] = useState(fallbackReviews);
  const [reviewForm,setReviewForm] = useState({ name:"", role:"", text:"", rating:5 });
  const [sending,setSending] = useState(false);
  const [reviewStatus,setReviewStatus] = useState("");
  const [activeFilter,setActiveFilter] = useState("all");
  const [activeProject,setActiveProject] = useState(null);

  const t = translations[lang] || translations.en;
  const isAr = lang === "ar";
  const whatsappUrl = useMemo(()=>`https://wa.me/20${profile.phone.slice(1)}?text=${encodeURIComponent(profile.whatsappMessage)}` ,[]);
  const navIds=["home","about","skills","services","projects","reviews","certificates","contact"];

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

  const filteredProjects = useMemo(()=>projects.filter(project=>{
    if(activeFilter === "all") return true;
    const text = `${project.title} ${project.category}`.toLowerCase();
    if(activeFilter === "ai") return text.includes("ecosense") || text.includes("ai") || text.includes("iot");
    if(activeFilter === "education") return text.includes("education") || text.includes("academy") || text.includes("programming") || text.includes("student");
    if(activeFilter === "business") return text.includes("business") || text.includes("charity") || text.includes("community") || text.includes("pest");
    if(activeFilter === "fitness") return text.includes("fitness") || text.includes("gym") || text.includes("coaching");
    return true;
  }),[activeFilter]);

  useEffect(()=>{
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    localStorage.setItem("portfolio-theme", theme);
    localStorage.setItem("portfolio-lang", lang);
  },[theme,lang,t.dir]);

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

  return <main>
    <div className="bg-grid"/>
    <div className="cinematic-noise"/>
    <div className="depth-lights"><span/><span/><span/></div>
    <div className="aurora aurora-one"/><div className="aurora aurora-two"/><div className="aurora aurora-three"/>
    <div className="hologram-lines"/>

    <header className="nav glass-panel">
      <a className="brand" onClick={()=>goTo("home")} aria-label="Go to home">
        <img src={profile.logo} alt="Amr Khaled logo" width="40" height="40"/>
        <span>{isAr ? profile.arabicName : profile.name}</span>
      </a>
      <nav className={menuOpen ? "open" : ""}>{t.nav.map((item,index)=><button key={item} onClick={()=>goTo(navIds[index])}>{item}</button>)}</nav>
      <div className="nav-actions">
        <label className="lang-picker" aria-label={t.chooseLang}><Languages size={16}/><span>{t.chooseLang}</span><select value={lang} onChange={e=>setLang(e.target.value)}>{Object.entries(languageNames).map(([code,name])=><option value={code} key={code}>{name}</option>)}</select></label>
        <button className="icon-btn" onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?<Sun/>:<Moon/>}</button>
        <button className="menu-btn icon-btn" onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>

    <section id="home" className="hero section">
      <div className="hero-content">
        <span className="badge super-badge"><Sparkles size={16}/>{t.badge}</span>
        <div className="cinema-strip"><span>PREMIUM UI</span><span>FAST REACT</span><span>SEO READY</span><span>LIVE PROJECTS</span></div>
        <h1 className="hero-title">{t.title1}<span>{t.title2}</span></h1>
        <p>{t.subtitle}</p>
        <div className="hero-actions">
          <button className="primary magnetic" onClick={()=>goTo("projects")}>{t.ctaWork}<ArrowRight size={18}/></button>
          <a className="secondary magnetic" href={whatsappUrl} target="_blank" rel="noreferrer">{t.ctaContact}<Phone size={18}/></a>
          <a className="secondary magnetic" href="/Amr-Khaled-CV.pdf" download>{t.cv}<Download size={18}/></a>
        </div>
        <div className="trust-row">{t.highlights.map(item=><span key={item}><BadgeCheck size={16}/>{item}</span>)}</div>
        <div className="metrics">{t.stats.map(stat=><div key={stat.label}><b>{stat.n}</b><span>{stat.label}</span></div>)}</div>
        <div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon/>GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon/>LinkedIn</a><a href={profile.facebook} target="_blank" rel="noreferrer"><FacebookIcon/>Facebook</a><a href={profile.instagram} target="_blank" rel="noreferrer"><InstagramIcon/>Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer"><TikTokIcon/>TikTok</a></div>
      </div>
      <aside className="profile-card premium-3d hero-cinematic hero-3d-stage" aria-label="Developer profile">
        <div className="hero-depth-grid" aria-hidden="true"/>
        <div className="developer-plate tilt-3d">
          <div className="photo-wrap"><img src={profile.image} alt="Amr Khaled Abozeid" width="520" height="760" fetchPriority="high"/><div className="photo-caption"><img src={profile.logo} alt="logo" width="34" height="34"/><span>AI • Front-End • IoT</span></div></div>
        </div>
        <div className="hero-browser-stack tilt-3d">
          <BrowserFrame image="/images/ecosense-frontend-live.webp" title="ecosense.ai/dashboard" className="hero-browser-main" priority/>
          <div className="hero-code-card"><Code2 size={16}/><span>React UI</span><b>Clean</b></div>
          <div className="hero-code-card hero-code-card-two"><BrainCircuit size={16}/><span>AI API</span><b>Live</b></div>
          <div className="hero-code-card hero-code-card-three"><Cpu size={16}/><span>IoT</span><b>ESP32</b></div>
        </div>
        <div className="hero-mini-panel">
          <div><span>{isAr?"واجهة":"Interface"}</span><b>Premium React</b></div>
          <div><span>{isAr?"مشروع قوي":"Top case"}</span><b>Ecosense AI</b></div>
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

    <section id="projects" className="section projects-section cinematic-projects">
      <div className="section-head projects-head">
        <div><SectionLabel>{t.projectsTitle}</SectionLabel><h2 className="section-title">{isAr?"مشاريع حقيقية مبنية للاستخدام الفعلي وليس للعرض فقط.":"Real projects built for actual use, not just for display."}</h2></div>
        <div className="filter-pills">{projectFilters.map(filter=><button key={filter.key} className={activeFilter===filter.key?"active":""} onClick={()=>setActiveFilter(filter.key)}>{isAr?filter.ar:filter.en}</button>)}</div>
      </div>
      <div className="projects-grid">{filteredProjects.map((project,index)=>{
        const featured = project.title === "Ecosense AI";
        return <article className={`project-card premium-3d kinetic-card ${featured ? "featured-project" : ""}`} key={project.title} style={{"--card-i": index}}>
          <div className="project-image project-browser-area"><span className="project-scan"/><span className="project-depth-badge">{featured ? "FEATURED / AI" : "LIVE CASE"}</span><BrowserFrame image={project.image} title={project.title} className="project-browser-frame" priority={featured}/>{project.previewImages&&<div className="project-previews mini-browser-previews">{project.previewImages.map((img,i)=><BrowserFrame key={img} image={img} title={`${project.title} ${i+1}`} className="mini-browser-frame"/>)}</div>}</div>
          <div className="project-body"><span>{project.category}</span><h3>{project.title}</h3><p>{getProjectText(project,isAr,"Description")}</p><div className="case-study"><div><b>{t.caseLabels[0]}</b><p>{getProjectText(project,isAr,"Problem")}</p></div><div><b>{t.caseLabels[1]}</b><p>{getProjectText(project,isAr,"Solution")}</p></div><div><b>{t.caseLabels[2]}</b><p>{getProjectText(project,isAr,"Result")}</p></div></div><div className="stack">{project.stack.map(item=><b key={item}>{item}</b>)}</div><div className="project-links"><button onClick={()=>setActiveProject(project)}>{isAr?"تفاصيل المشروع":"Project Details"}<MousePointerClick size={16}/></button><a href={project.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink size={16}/></a></div></div>
        </article>
      })}</div>
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

    <section id="contact" className="section contact"><img className="contact-logo" src={profile.logo} alt="Amr Khaled logo" width="90" height="90"/><h2>{t.contactTitle}</h2><p>{t.contactSubtitle}</p><div className="contact-links"><a href={whatsappUrl} target="_blank" rel="noreferrer"><Phone/>WhatsApp</a><a href={`mailto:${profile.email}`}><Mail/>Email</a><a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon/>GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon/>LinkedIn</a><a href={profile.facebook} target="_blank" rel="noreferrer"><FacebookIcon/>Facebook</a><a href={profile.instagram} target="_blank" rel="noreferrer"><InstagramIcon/>Instagram</a><a href={profile.tiktok} target="_blank" rel="noreferrer"><TikTokIcon/>TikTok</a></div></section>

    {activeProject && <div className="project-modal" role="dialog" aria-modal="true" onClick={()=>setActiveProject(null)}><div className="project-modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setActiveProject(null)} aria-label="Close"><X/></button><div className="modal-browser-wrap"><BrowserFrame image={activeProject.image} title={activeProject.title} className="modal-browser-frame" priority/></div><div className="modal-content"><span className="badge"><Layers size={16}/>{activeProject.category}</span><h2>{activeProject.title}</h2><p>{getProjectText(activeProject,isAr,"Description")}</p><div className="modal-case"><div><b>{t.caseLabels[0]}</b><p>{getProjectText(activeProject,isAr,"Problem")}</p></div><div><b>{t.caseLabels[1]}</b><p>{getProjectText(activeProject,isAr,"Solution")}</p></div><div><b>{t.caseLabels[2]}</b><p>{getProjectText(activeProject,isAr,"Result")}</p></div></div><div className="stack">{activeProject.stack.map(item=><b key={item}>{item}</b>)}</div><a className="primary modal-link" href={activeProject.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink size={17}/></a></div></div></div>}

    <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Send size={22}/></a><footer>© {new Date().getFullYear()} Amr Khaled Abozeid. React Portfolio optimized for SEO and performance.</footer>
  </main>
}

createRoot(document.getElementById("root")).render(<App/>);
