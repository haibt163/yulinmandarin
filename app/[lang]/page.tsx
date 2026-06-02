'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Globe, Calendar, Clock, BookOpen, Award, MessageCircle, Star, Sparkles, User, CheckCircle2 } from 'lucide-react';

// --- ENVIRONMENT CONFIGURATION ---
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'yulin71312@gmail.com';
const FORMSPREE_KEY = process.env.NEXT_PUBLIC_FORMSPREE_KEY || 'mbdbvovv';

// --- TRANSLATION DICTIONARY ---
const t = {
  vi: {
    nav: { about: 'Giới thiệu', booking: 'Đặt lịch', testimonials: 'Đánh giá', contact: 'Liên hệ' },
    hero: { title: 'Mandarin with Yulin', subtitle: 'Khóa học Tiếng Trung 1 kèm 1 Chất Lượng Cao' },
    about: {
      title: 'Về Yulin',
      desc: 'Giáo viên bản ngữ người Đài Loan, sở hữu chứng chỉ giảng dạy được cấp tại New Zealand. Khóa học được thiết kế cá nhân hóa, giảng dạy hoàn toàn bằng Tiếng Anh để giúp bạn nắm bắt nhanh chóng và chuẩn xác nhất.',
    },
    chineasyWidget: {
      title: 'Học tiếng Trung qua Hình ảnh & Câu chuyện',
      subtitle: 'Bấm thử các chữ dưới đây để xem cách học chữ tượng hình siêu dễ nhớ!',
      chars: [
        { char: '人', pinyin: 'rén', meaning: 'Người', desc: 'Trông y như một người đang sải bước đi bộ.', color: 'from-orange-400 to-pink-500' },
        { char: '木', pinyin: 'mù', meaning: 'Cây', desc: 'Một thân cây thẳng đứng với các cành cây chìa ra.', color: 'from-emerald-400 to-teal-600' },
        { char: '火', pinyin: 'huǒ', meaning: 'Lửa', desc: 'Hình ảnh ngọn lửa đang bùng cháy với hai tia lửa nhỏ.', color: 'from-red-500 to-amber-500' },
        { char: '明', pinyin: 'míng', meaning: 'Sáng sủa', desc: 'Mặt trời (日) kết hợp với Mặt trăng (月) tạo nên sự tỏa sáng rực rỡ.', color: 'from-cyan-400 to-blue-600' },
      ]
    },
    details: {
      title: 'Thông tin Khóa học',
      time: '60 - 75 phút mỗi buổi',
      schedule: 'Thứ 7 (6:00 - 16:00) & Chủ Nhật (7:00 - 16:00) qua WhatsApp / WeChat',
      fee: '500,000 VND / buổi (Thanh toán sau mỗi buổi học)',
      curriculum: 'Tự chọn (Giao tiếp/Luyện thi HSK...) hoặc Giáo trình chuẩn HSK của Đại học Bắc Kinh',
    },
    promo: '🎁 Đặc biệt: Đăng ký trong tháng 6 trên 4 buổi, TẶNG NGAY bộ 3 quyển sách Chineasy của ShaoLan Hsueh (Trị giá $100)!',
    testimonials: {
      title: 'Học viên nói gì?',
      reviews: [
        { name: 'Sarah J.', text: 'Yulin giúp tôi sửa phát âm cực tốt. Việc học 1 kèm 1 đem lại hiệu quả vượt mong đợi!' },
        { name: 'Minh T.', text: 'Lịch học cuối tuần cực kỳ linh hoạt cho người đi làm bận rộn như mình.' },
        { name: 'David L.', text: 'Nhận được bộ sách Chineasy xịn sò đợt ưu đãi tháng 6. Rất đáng tiền học!' },
      ]
    },
    booking: {
      title: 'Đăng Ký Học Thử Ngay',
      desc: 'Điền thông tin của bạn để giữ chỗ. Chúng tôi sẽ gửi email xác nhận chính thức cho bạn.',
      name: 'Họ và tên của bạn',
      contactId: 'Số WhatsApp hoặc WeChat ID',
      day: 'Chọn ngày học',
      time: 'Khung giờ mong muốn',
      sat: 'Thứ Bảy (Khả dụng: 6:00 - 16:00 GMT+7)',
      sun: 'Chủ Nhật (Khả dụng: 7:00 - 16:00 GMT+7)',
      submit: 'Gửi Đăng Ký Lịch Học',
      success: `Đăng ký thành công! Vui lòng kiểm tra hộp thư đến. Email xác nhận sẽ được gửi từ ${CONTACT_EMAIL} sớm nhất!`,
      localTime: 'Giờ địa phương',
      latestSlot: 'Ca cuối',
      copied: 'Đã sao chép!'
    },
    footer: { text: 'Bản quyền thuộc về Mandarin with Yulin.' }
  },
  en: {
    nav: { about: 'About', booking: 'Booking', testimonials: 'Testimonials', contact: 'Contact' },
    hero: { title: 'Mandarin with Yulin', subtitle: 'Premium 1-on-1 Mandarin Classes' },
    about: {
      title: 'About Yulin',
      desc: 'Native Taiwanese teacher with a New Zealand teaching certification. Personalized courses taught in English to ensure clear, fast, and accurate language acquisition.',
    },
    chineasyWidget: {
      title: 'Learn via Visual Stories',
      subtitle: 'Click the characters below to see how easy ideograms can be to memorize!',
      chars: [
        { char: '人', pinyin: 'rén', meaning: 'Person', desc: 'Looks exactly like a person striding forward.', color: 'from-orange-400 to-pink-500' },
        { char: '木', pinyin: 'mù', meaning: 'Tree', desc: 'A trunk with branches spreading out wide.', color: 'from-emerald-400 to-teal-600' },
        { char: '火', pinyin: 'huǒ', meaning: 'Fire', desc: 'Flames leaping up with sparks flying outwards.', color: 'from-red-500 to-amber-500' },
        { char: '明', pinyin: 'míng', meaning: 'Bright', desc: 'The Sun (日) combined with the Moon (月) creates absolute brightness.', color: 'from-cyan-400 to-blue-600' },
      ]
    },
    details: {
      title: 'Course Details',
      time: '60 - 75 minutes per session',
      schedule: 'Saturday (6:00 - 16:00) & Sunday (7:00 - 16:00) via WhatsApp / WeChat',
      fee: '500,000 VND / session (Post-paid after each class)',
      curriculum: "Student's choice (Communication/HSK) or Peking University standard HSK curriculum",
    },
    promo: '🎁 Special Offer: Register for 4+ classes in June and get the 3-book Chineasy set by ShaoLan Hsueh FREE ($100 Value)!',
    testimonials: {
      title: 'Student Testimonials',
      reviews: [
        { name: 'Sarah J.', text: 'Yulin helps me understand the tones perfectly. The 1-on-1 focus is exactly what I needed!' },
        { name: 'Minh T.', text: 'Very flexible weekend schedule for working professionals. Highly structured content.' },
        { name: 'David L.', text: 'The Chineasy books I got from the June promo were an amazing bonus. Highly recommend!' },
      ]
    },
    booking: {
      title: 'Book Your Session',
      desc: 'Fill out your preferences below. A secure confirmation itinerary will be finalized soon.',
      name: 'Your Full Name',
      contactId: 'WhatsApp Number or WeChat ID',
      day: 'Preferred Day',
      time: 'Preferred Start Time',
      sat: 'Saturday (Available: 6:00 - 16:00 GMT+7)',
      sun: 'Sunday (Available: 7:00 - 16:00 GMT+7)',
      submit: 'Submit Booking Request',
      success: `Booking request sent! Please check your inbox. A confirmation email will arrive shortly from ${CONTACT_EMAIL}.`,
      localTime: 'Local',
      latestSlot: 'Latest slot',
      copied: 'Copied!'
    },
    footer: { text: '© Mandarin with Yulin. All rights reserved.' }
  },
  zh: {
    nav: { about: '关于我', booking: '预约', testimonials: '学员评价', contact: '联系方式' },
    hero: { title: '跟玉玲学中文', subtitle: '一对一精品中文课程' },
    about: {
      title: '关于 玉玲',
      desc: '台湾母语教师，持有新西兰教师资格证。英语授课，为您量身定制学习方案，确保快速准确掌握语言。',
    },
    chineasyWidget: {
      title: '通过视觉故事轻松学中文',
      subtitle: '点击下方的汉字，体验象形文字的独特记忆魔力！',
      chars: [
        { char: '人', pinyin: 'rén', meaning: '人类', desc: '字形就像一个正在迈步向前走的人。', color: 'from-orange-400 to-pink-500' },
        { char: '木', pinyin: 'mù', meaning: '树木', desc: '一棵笔直的树干，枝桠向两边舒展。', color: 'from-emerald-400 to-teal-600' },
        { char: '火', pinyin: 'huǒ', meaning: '火焰', desc: '熊熊燃烧的烈火，带着向外飞溅的火星。', color: 'from-red-500 to-amber-500' },
        { char: '明', pinyin: 'míng', meaning: '明亮', desc: '太阳（日）与月亮（月）交相辉映，带来极致的光明。', color: 'from-cyan-400 to-blue-600' },
      ]
    },
    details: {
      title: '课程详情',
      time: '每节课 60 - 75 分钟',
      schedule: '周六 (6:00 - 16:00) & 周日 (7:00 - 16:00) 通过 WhatsApp / WeChat 授课',
      fee: '500,000 越南盾 / 节 (课后付款)',
      curriculum: '教材自选（日常交流/HSK等）或使用北京大学标准HSK教材',
    },
    promo: '🎁 六月特别优惠：报名4节课以上，免费赠送价值100美元的邵兰 (ShaoLan Hsueh) Chineasy 三本书籍套装！',
    testimonials: {
      title: '学员评价',
      reviews: [
        { name: 'Sarah J.', text: '玉玲老师的英语授课让我更容易理解声调。一对一的专注正戏需要的！' },
        { name: 'Minh T.', text: '上课时间非常灵活，适合上班族。北大的教材也很系统。' },
        { name: 'David L.', text: '六月活动赠送的 Chineasy 书籍非常棒，强烈推荐！' },
      ]
    },
    booking: {
      title: '立即预约您的课程',
      desc: '请在下方填写您的联系方式与时间。我们将尽快为您排课。',
      name: '您的姓名',
      contactId: 'WhatsApp 号码 或 微信 ID',
      day: '选择上课日期',
      time: '期望上课开始时间段',
      sat: '星期六 (可选时间: 6:00 - 16:00 GMT+7)',
      sun: '星期日 (可选时间: 7:00 - 16:00 GMT+7)',
      submit: '提交预约申请',
      success: `预约成功！请检查您的邮箱。确认邮件将由 ${CONTACT_EMAIL} 发出。`,
      localTime: '当地时间',
      latestSlot: '最后时段',
      copied: '已复制!'
    },
    footer: { text: '© 跟玉玲学中文 版权所有' }
  }
};

// SEO Image Alt Data
const imageAlts = {
  vi: 'Yulin Chen - Giáo viên bản ngữ Đài Loan, Học tiếng Trung 1 kèm 1 online',
  en: 'Yulin Chen - Native Taiwanese Mandarin Teacher Online, 1-on-1 Tutor UK',
  zh: 'Yulin Chen - 台湾母语教师，一对一在线中文家教'
};

export default function LandingPage() {
  const router = useRouter();
  const params = useParams();
  
  // Isolate client rendering to prevent hydration mismatch on dynamic timezones
  const [isClient, setIsClient] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const lang = (params?.lang as 'vi' | 'en' | 'zh') || 'vi';
  const [activeChar, setActiveChar] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentText = t[lang];

  // Form states
  const [name, setName] = useState('');
  const [contactId, setContactId] = useState('');
  const [selectedDay, setSelectedDay] = useState<'sat'|'sun'>('sat');
  const [selectedTime, setSelectedTime] = useState('SAT 06:00 AM GMT+7');

  // --- DYNAMIC TIMEZONE GENERATOR ---
  const generateTimeOptions = (day: 'sat' | 'sun') => {
    const options = [];
    const startHour = day === 'sat' ? 6 : 7;
    const endHour = 15;

    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m <= 30; m += 30) {
        if (h === endHour && m > 0) continue;

        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const timeGmt7 = `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;

        let label = `${timeGmt7} GMT+7`;

        if (isClient) {
          const baseDate = day === 'sat' ? 6 : 7;
          const refDate = new Date(Date.UTC(2024, 0, baseDate, h - 7, m, 0));

          const localDay = refDate.toLocaleDateString(undefined, { weekday: 'short' });
          const localTime = refDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

          label = `${timeGmt7} GMT+7 (${currentText.booking.localTime}: ${localDay}, ${localTime})`;
        }

        if (h === endHour && m === 0) {
          label += ` - ${currentText.booking.latestSlot}`;
        }

        options.push({ value: `${day.toUpperCase()} ${timeGmt7} GMT+7`, label });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions(selectedDay);

  const handleWeChatCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('mumula265');
      setWechatCopied(true);
      setTimeout(() => setWechatCopied(false), 2000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: name,
      contact: contactId,
      day: selectedDay === 'sat' ? 'Saturday' : 'Sunday',
      time: selectedTime,
      _replyto: CONTACT_EMAIL
    };

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('Something went wrong. Please try again or contact via WeChat/WhatsApp.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold tracking-tighter shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              陳
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">陳玉玲 <span className="text-indigo-600 font-normal text-sm">Yulin</span></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-indigo-600 transition-colors">{currentText.nav.about}</a>
            <a href="#booking" className="hover:text-indigo-600 transition-colors">{currentText.nav.booking}</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">{currentText.nav.testimonials}</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">{currentText.nav.contact}</a>
          </div>
          
          {/* DYNAMIC LANGUAGE SWITCHER */}
          <div className="flex items-center space-x-2 bg-slate-100/80 border border-slate-200/50 p-1.5 rounded-2xl">
            <Globe className="w-4 h-4 ml-2 text-slate-500" />
            <select 
              value={lang} 
              onChange={(e) => router.push(`/${e.target.value}`)}
              className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer py-0.5 pr-2"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="zh">简体中文</option>
            </select>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Image 
              src="/photo_2026-06-01_10-59-34.png" 
              alt={imageAlts[lang]} 
              width={176}
              height={176}
              priority
              className="w-44 h-44 object-cover rounded-full shadow-xl border-4 border-white relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg z-20">
              Native Trainer
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight bg-clip-text bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900">
            {currentText.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
            {currentText.hero.subtitle}
          </p>
          <a 
            href="#booking" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
          >
            {currentText.booking.title}
          </a>
        </div>
      </section>

      {/* PROMO BANNER */}
      <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-amber-500 text-white py-4 px-6 text-center shadow-md relative z-10">
        <p className="font-bold text-sm md:text-base tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 shrink-0 animate-spin" />
          {currentText.promo}
        </p>
      </div>

      {/* ABOUT & INTERACTIVE CHINEASY WIDGET */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-xl mb-4">
              <Award className="w-4 h-4" />
              <span>Certified Professional</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {currentText.about.title}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 mb-8 font-medium">
              {currentText.about.desc}
            </p>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{currentText.details.time}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{currentText.details.fee}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{currentText.details.curriculum}</p>
              </div>
            </div>
          </div>
          
          {/* Right Chineasy Interactive Canvas Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none"></div>
            
            <div>
              <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Chineasy Methodology Inspired</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{currentText.chineasyWidget.title}</h3>
              <p className="text-sm text-slate-500 mb-8">{currentText.chineasyWidget.subtitle}</p>
              
              {/* Character Selector Row */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {currentText.chineasyWidget.chars.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChar(idx)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 group ${
                      activeChar === idx 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md scale-[1.03]' 
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className={`text-3xl font-black block mb-1 transition-transform group-hover:scale-110 ${activeChar === idx ? 'text-indigo-600' : 'text-slate-700'}`}>
                      {item.char}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">{item.pinyin}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Visual Canvas Area */}
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${currentText.chineasyWidget.chars[activeChar].color} text-white transition-all duration-500 flex flex-col md:flex-row items-center gap-6 shadow-inner relative`}>
              <div className="text-7xl font-black bg-white/20 w-24 h-24 rounded-2xl flex items-center justify-center shadow-md animate-bounce">
                {currentText.chineasyWidget.chars[activeChar].char}
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
                  <span className="text-xs font-black uppercase bg-white/30 px-2 py-0.5 rounded-md tracking-wider font-mono">
                    {currentText.chineasyWidget.chars[activeChar].pinyin}
                  </span>
                  <span className="text-lg font-bold">
                    = {currentText.chineasyWidget.chars[activeChar].meaning}
                  </span>
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed max-w-md">
                  {currentText.chineasyWidget.chars[activeChar].desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-slate-900 tracking-tight">{currentText.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {currentText.testimonials.reviews.map((review, idx) => (
              <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:bg-white transition-all duration-300 group">
                <div className="flex text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic font-medium leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-indigo-600 inline-block"></span>
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BOOKING FORM */}
      <section id="booking" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-gradient-to-b from-white to-slate-50/40 border border-slate-200/80 rounded-3xl shadow-2xl p-8 md:p-12 relative">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3">{currentText.booking.title}</h2>
            <p className="text-slate-500 text-sm font-medium">{currentText.booking.desc}</p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Row 1: Name & ID */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{currentText.booking.name}</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{currentText.booking.contactId}</label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={contactId}
                      onChange={(e) => setContactId(e.target.value)}
                      placeholder="+44 7123 456789 / wechat_user"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Day Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{currentText.booking.day}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => { setSelectedDay('sat'); setSelectedTime('SAT 06:00 AM GMT+7'); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDay === 'sat' ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 font-bold' : 'border-slate-200 text-slate-600 font-medium'}`}
                  >
                    <Calendar className="w-5 h-5 mb-1" />
                    <span className="text-sm">{currentText.booking.sat}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedDay('sun'); setSelectedTime('SUN 07:00 AM GMT+7'); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDay === 'sun' ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 font-bold' : 'border-slate-200 text-slate-600 font-medium'}`}
                  >
                    <Calendar className="w-5 h-5 mb-1" />
                    <span className="text-sm">{currentText.booking.sun}</span>
                  </button>
                </div>
              </div>

              {/* Row 3: Half-Hour Dynamic Time Slots Selection Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentText.booking.time}</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                >
                  {timeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.99]"
              >
                {currentText.booking.submit}
              </button>
            </form>
          ) : (
            /* SUCCESS STATE CONTAINER */
            <div className="py-12 px-4 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">✨ Thanks, {name}!</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-md mx-auto">
                {currentText.booking.success}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT & FOOTER */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 px-6 text-center border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-white text-base font-black tracking-widest uppercase mb-8">{currentText.nav.contact}</h3>
          <div className="flex justify-center space-x-12 mb-10">
            
            {/* WHATSAPP CLICKABLE ROUTE LINK */}
            <a 
              href="https://wa.me/642041192164"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-transform duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-slate-900 group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-slate-700 rounded-2xl flex items-center justify-center text-green-500 mb-2 shadow-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">WhatsApp</span>
              <span className="text-xs text-slate-600 font-medium group-hover:text-slate-400 transition-colors">+64 20 4119 2164</span>
            </a>
            
            {/* WECHAT CLIENT-SIDE CLICK TO COPY BUTTON */}
            <button 
              onClick={handleWeChatCopy}
              className="flex flex-col items-center group focus:outline-none transition-transform duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-slate-900 group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-slate-700 rounded-2xl flex items-center justify-center text-emerald-400 mb-2 shadow-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">WeChat</span>
              <span className={`text-xs font-medium transition-colors ${wechatCopied ? 'text-emerald-400 font-bold animate-pulse' : 'text-slate-600 group-hover:text-slate-400'}`}>
                {wechatCopied ? currentText.booking.copied : 'mumula265'}
              </span>
            </button>

          </div>
          <div className="border-t border-slate-900 pt-8 max-w-md mx-auto">
            <p className="text-xs text-slate-600 font-medium">{currentText.footer.text}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}