/**
 * SHAHRAVA — Global Curated City Database
 * Authentic geographic coordinates, historical censuses, climate normals, and authentic landmark photography.
 */

export const CITIES = [
  {
    id: "tehran",
    nameFa: "تهران",
    nameEn: "Tehran",
    countryCode: "IR",
    countryFa: "ایران",
    countryEn: "Iran",
    continent: "middleEast",
    taglineFa:
      "کلان‌شهر هزاررنگ در دامنه البرز سپیدپوش و پایتخت دویست‌ساله ایران",
    taglineEn:
      "The vibrant metropolis at the foot of snow-capped Mount Damavand",
    coordinates: [35.6892, 51.389],
    population: 9039000,
    area: 730,
    elevation: 1189,
    density: 12382,
    timezone: "Asia/Tehran",
    themeId: "tehran",
    heroImage:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=2400&q=85",
    overviewFa:
      "تهران، پایتخت پهناور ایران و بزرگ‌ترین شهر غرب آسیا، با آمیزه‌ای شگفت‌انگیز از کاخ‌های دوران قاجار، برج‌های مدرن، بوستان‌های کوهپایه‌ای و بازارهای سنتی خود، قلب تپنده تمدن، اقتصاد و فرهنگ معاصر این سرزمین است.",
    overviewEn:
      "Tehran, the sprawling capital of Iran and the largest metropolis in Western Asia, bridges centuries of history from Qajar royal palaces to contemporary architectural icons against the majestic Alborz mountain range.",
    climate: {
      highs: [8, 11, 16, 22, 28, 34, 37, 36, 32, 24, 16, 10],
      lows: [-1, 1, 5, 11, 16, 21, 24, 23, 19, 13, 6, 1],
      rainfall: [35, 38, 40, 30, 15, 3, 2, 1, 2, 12, 26, 32],
    },
    populationHistory: [
      { year: 1950, pop: 1.04 },
      { year: 1960, pop: 1.95 },
      { year: 1970, pop: 3.25 },
      { year: 1980, pop: 5.06 },
      { year: 1990, pop: 6.48 },
      { year: 2000, pop: 7.02 },
      { year: 2010, pop: 8.15 },
      { year: 2020, pop: 8.92 },
      { year: 2024, pop: 9.04 },
    ],
    attractions: [
      {
        id: "azadi-tower",
        nameFa: "برج آزادی",
        nameEn: "Azadi Tower",
        category: "architectural",
        categoryFa: "معماری و نمادها",
        coordinates: [35.6997, 51.338],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Azadi_Tower_%2829358497718%29.jpg/1280px-Azadi_Tower_%2829358497718%29.jpg",
        descFa:
          "شاهکار ماندگار معماری معاصر ایران اثر حسین امانت با تلفیق طاق‌های دوران ساسانی، نقوش اسلامی و بتن مسلح سفید با سنگ مرمر اصفهان.",
        descEn:
          "The monumental gateway designed by Hossein Amanat blending Sassanid arches and Islamic geometric vaulting.",
        yearBuilt: "۱۹۷۱ میلادی",
      },
      {
        id: "golestan-palace",
        nameFa: "کاخ گلستان",
        nameEn: "Golestan Palace",
        category: "historical",
        categoryFa: "تاریخی و میراث جهانی",
        coordinates: [35.6797, 51.4203],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Palais_du_Golestan%2C_T%C3%A9h%C3%A9ran_%285%29.jpg/1280px-Palais_du_Golestan%2C_T%C3%A9h%C3%A9ran_%285%29.jpg",
        descFa:
          "مجموعه سلطنتی ثبت‌شده در میراث جهانی یونسکو، مزین به آینه‌کاری‌های خیره‌کننده، کاشی‌کاری‌های هفت‌رنگ و تالار سلام.",
        descEn:
          "UNESCO World Heritage royal palace complex showcasing exquisite Qajar tilework, mirror halls, and royal gardens.",
        yearBuilt: "دوران صفوی و قاجار",
      },
      {
        id: "milad-tower",
        nameFa: "برج میلاد",
        nameEn: "Milad Tower",
        category: "architectural",
        categoryFa: "معماری مدرن",
        coordinates: [35.7448, 51.3753],
        image:
          "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1280&q=80",
        descFa:
          "ششمین برج مخابراتی بلند جهان با ارتفاع ۴۳۵ متر، سکوی دید باز، رستوران گردان و چشم‌انداز ۳۶۰ درجه از کلان‌شهر تهران.",
        descEn:
          "At 435 meters tall, the telecommunication tower offers 360-degree panoramic vistas over Greater Tehran.",
        yearBuilt: "۲۰۰۸ میلادی",
      },
      {
        id: "tabiat-bridge",
        nameFa: "پل طبیعت",
        nameEn: "Tabiat Bridge",
        category: "nature",
        categoryFa: "طبیعت و بوستان‌ها",
        coordinates: [35.7547, 51.4243],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%D9%BE%D9%84_%D8%B7%D8%A8%DB%8C%D8%B9%D8%AA_%D8%AA%D9%87%D8%B1%D8%A7%D9%86.jpg/1280px-%D9%BE%D9%84_%D8%B7%D8%A8%DB%8C%D8%B9%D8%AA_%D8%AA%D9%87%D8%B1%D8%A7%D9%86.jpg",
        descFa:
          "پل پیاده‌راه سه‌طبقه برنده جایزه بین‌المللی معماری آقاخان، پیونددهنده بوستان طالقانی و آب‌وآتش برفراز بزرگراه مدرس.",
        descEn:
          "Award-winning multi-level pedestrian bridge designed by Leila Araghian connecting Taleghani and Abo-Atash parks.",
        yearBuilt: "۲۰۱۴ میلادی",
      },
      {
        id: "grand-bazaar-tehran",
        nameFa: "بازار بزرگ تهران",
        nameEn: "Tehran Grand Bazaar",
        category: "cultural",
        categoryFa: "بازارها و مراکز فرهنگی",
        coordinates: [35.675, 51.4208],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Grand_Bazaar%2C_Tehran.jpg/1280px-Grand_Bazaar%2C_Tehran.jpg",
        descFa:
          "راهروهای سرپوشیده و پرپیچ‌وخم آجری به طول بیش از ۱۰ کیلومتر؛ نبض اقتصادی و تاریخی سنتی پایتخت.",
        descEn:
          "Over 10 kilometers of labyrinthine covered corridors trading spices, carpets, copper, and gold.",
        yearBuilt: "قرن هفدهم میلادی",
      },
      {
        id: "saadabad-complex",
        nameFa: "کاخ‌موزه سعدآباد و دربند",
        nameEn: "Sa'dabad Complex & Darband",
        category: "nature",
        categoryFa: "طبیعت و موزه‌ها",
        coordinates: [35.8164, 51.4255],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/1/19/Saadabad_historical_cultural_complex_%281%29_-_December_2018.jpg",
        descFa:
          "مجموعه‌ای با وسعت ۱۱۰ هکتار در پای کوهستان دربند با باغ‌های چنار کهنسال، کاخ‌های تاریخی و هوای خنک کوهپایه.",
        descEn:
          "Historical 110-hectare cultural estate nestled in Darband foothills with lush royal gardens and palace museums.",
        yearBuilt: "اوایل قرن نوزدهم",
      },
    ],
  },

  {
    id: "tokyo",
    nameFa: "توکیو",
    nameEn: "Tokyo",
    countryCode: "JP",
    countryFa: "ژاپن",
    countryEn: "Japan",
    continent: "asia",
    taglineFa:
      "تقاطع مسحورکننده سنت‌های کهن سامورایی و شکوه سایبرپانک نئونی آینده",
    taglineEn:
      "The captivating crossroads of timeless Shinto shrines and futuristic cyberpunk neon",
    coordinates: [35.6762, 139.6503],
    population: 14094034,
    area: 2194,
    elevation: 40,
    density: 6423,
    timezone: "Asia/Tokyo",
    themeId: "tokyo",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Tokyo_Tower_and_around_Skyscrapers.jpg/1280px-Tokyo_Tower_and_around_Skyscrapers.jpg",
    overviewFa:
      "توکیو، پایتخت فوق‌پیشرفته ژاپن، پویاترین کلان‌شهر جهان است؛ جایی که معابد بودایی هزارساله در جوار آسمان‌خراش‌های شیشه‌ای و چهارراه‌های شلوغ چون شیبویا با آرامشی بی‌بدیل همزیستی دارند.",
    overviewEn:
      "Tokyo embodies the ultimate harmony of ancient Japanese spirituality and dizzying high-tech innovation, from tranquil Meiji shrines to glowing Akihabara towers.",
    climate: {
      highs: [10, 10, 14, 19, 23, 26, 30, 31, 27, 22, 17, 12],
      lows: [2, 3, 6, 11, 16, 20, 24, 25, 21, 16, 10, 5],
      rainfall: [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51],
    },
    populationHistory: [
      { year: 1950, pop: 6.28 },
      { year: 1960, pop: 9.68 },
      { year: 1970, pop: 11.41 },
      { year: 1980, pop: 11.62 },
      { year: 1990, pop: 11.86 },
      { year: 2000, pop: 12.06 },
      { year: 2010, pop: 13.16 },
      { year: 2020, pop: 14.05 },
      { year: 2024, pop: 14.09 },
    ],
    attractions: [
      {
        id: "senso-ji",
        nameFa: "معبد سنسو-جی",
        nameEn: "Sensō-ji Temple",
        category: "historical",
        categoryFa: "تاریخی و کهن",
        coordinates: [35.7148, 139.7967],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Sens%C5%8D-ji%2C_2022-11-20.jpg/1280px-Sens%C5%8D-ji%2C_2022-11-20.jpg",
        descFa:
          "قدیمی‌ترین معبد بودایی توکیو متعلق به قرن هفتم میلادی با دروازه نمادین کامیناریمون و فانوس عظیم سرخ‌رنگ.",
        descEn:
          "Tokyo’s oldest Buddhist temple founded in 645 AD featuring the iconic Thunder Gate (Kaminarimon).",
        yearBuilt: "۶۴۵ میلادی",
      },
      {
        id: "shibuya-crossing",
        nameFa: "چهارراه شیبویا",
        nameEn: "Shibuya Crossing",
        category: "cultural",
        categoryFa: "فرهنگی و مدرن",
        coordinates: [35.6595, 139.7005],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Shibuya_Night_%2831814620022%29.jpg/1280px-Shibuya_Night_%2831814620022%29.jpg",
        descFa:
          "شلوغ‌ترین تقاطع عابر پیاده جهان، غرق در نور تابلوهای غول‌پیکر تبلیغاتی نئونی و انرژی خستگی‌ناپذیر جوانان.",
        descEn:
          "The world’s busiest pedestrian crossing, an electrifying storm of neon billboards and bustling humanity.",
        yearBuilt: "قرن بیستم",
      },
      {
        id: "tokyo-skytree",
        nameFa: "برج توکیو اسکای‌تری",
        nameEn: "Tokyo Skytree",
        category: "architectural",
        categoryFa: "معماری مدرن",
        coordinates: [35.7101, 139.8107],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Tokyo_Skytree_at_night_%281%29.jpg/1280px-Tokyo_Skytree_at_night_%281%29.jpg",
        descFa:
          "بلندترین سازه ژاپن با ارتفاع ۶۳۴ متر با دید پانوراما تا قله برفی فوجی در روزهای صاف.",
        descEn:
          "Towering at 634 meters, this broadcast tower offers unmatched views of Greater Tokyo and Mount Fuji.",
        yearBuilt: "۲۰۱۲ میلادی",
      },
    ],
  },

  {
    id: "paris",
    nameFa: "پاریس",
    nameEn: "Paris",
    countryCode: "FR",
    countryFa: "فرانسه",
    countryEn: "France",
    continent: "europe",
    taglineFa:
      "شهر نور، پایتخت جاودان هنر، مد، معماری اشرافی و عاشقانه‌های رود سن",
    taglineEn:
      "The City of Light, timeless capital of romance, haute couture and fine arts",
    coordinates: [48.8566, 2.3522],
    population: 2161000,
    area: 105,
    elevation: 35,
    density: 20580,
    timezone: "Europe/Paris",
    themeId: "paris",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg/1280px-Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg",
    overviewFa:
      "پاریس، پایتخت فرهنگی و هنری اروپا، با بلوارهای باشکوه هوسمان، کافه‌های خاطره‌انگیز حاشیه رود سن، موزه‌های بی‌همتا چون لوور و نماد ابدی برج ایفل، رؤیای هر جهانگردی است.",
    overviewEn:
      "Paris enchants with grand Haussmannian boulevards, iconic cafés lining the River Seine, world-class treasures at the Louvre, and the soaring iron lace of the Eiffel Tower.",
    climate: {
      highs: [7, 8, 12, 16, 20, 23, 25, 25, 21, 16, 11, 8],
      lows: [3, 3, 5, 7, 11, 14, 16, 16, 13, 9, 6, 3],
      rainfall: [51, 41, 48, 53, 65, 54, 63, 43, 50, 60, 52, 58],
    },
    populationHistory: [
      { year: 1950, pop: 2.85 },
      { year: 1960, pop: 2.79 },
      { year: 1970, pop: 2.6 },
      { year: 1980, pop: 2.18 },
      { year: 1990, pop: 2.15 },
      { year: 2000, pop: 2.13 },
      { year: 2010, pop: 2.24 },
      { year: 2020, pop: 2.18 },
      { year: 2024, pop: 2.16 },
    ],
    attractions: [
      {
        id: "eiffel-tower",
        nameFa: "برج ایفل",
        nameEn: "Eiffel Tower",
        category: "architectural",
        categoryFa: "معماری و نمادها",
        coordinates: [48.8584, 2.2945],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg/1280px-Eiffel_Tower_from_the_Tour_Montparnasse_3%2C_Paris_May_2014.jpg",
        descFa:
          "سازه مشبک فلزی ۳۳۰ متری گوستاو ایفل، نماد بلامنازع فرانسه و پربازدیدترین اثر دارای بلیت در سراسر کره زمین.",
        descEn:
          "The 330-meter puddle-iron lattice tower engineered by Gustave Eiffel for the 1889 World’s Fair.",
        yearBuilt: "۱۸۸۹ میلادی",
      },
      {
        id: "louvre-museum",
        nameFa: "موزه لوور",
        nameEn: "Louvre Museum",
        category: "museums",
        categoryFa: "موزه‌ها و گنجینه‌ها",
        coordinates: [48.8606, 2.3376],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1280px-Louvre_Museum_Wikimedia_Commons.jpg",
        descFa:
          "بزرگ‌ترین موزه هنر و تاریخ جهان، خانه شاهکار مونالیزا، تندیس ونوس میلو و هرم شیشه‌ای آی. ام. پی.",
        descEn:
          "The world’s largest art museum holding over 380,000 objects including Da Vinci’s Mona Lisa.",
        yearBuilt: "۱۷۹۳ میلادی",
      },
      {
        id: "notre-dame",
        nameFa: "کلیسای نتردام پاریس",
        nameEn: "Notre-Dame Cathedral",
        category: "historical",
        categoryFa: "تاریخی و میراث",
        coordinates: [48.853, 2.3499],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Fa%C3%A7ade_ouest_de_la_cath%C3%A9drale_Notre-Dame_de_Paris_2014-02-17_n02.jpg/1280px-Fa%C3%A7ade_ouest_de_la_cath%C3%A9drale_Notre-Dame_de_Paris_2014-02-17_n02.jpg",
        descFa:
          "شاهکار گوتیک فرانسوی واقع در جزیره سیته با طاق‌های نوک‌تیز، پنجره‌های گل‌سرخی رز و مجسمه‌های گارگویل.",
        descEn:
          "Medieval French Gothic cathedral on Île de la Cité renowned for its flying buttresses and stained-glass roses.",
        yearBuilt: "۱۱۶۳ میلادی",
      },
      {
        id: "arc-de-triomphe",
        nameFa: "طاق پیروزی (شارل دوگل)",
        nameEn: "Arc de Triomphe",
        category: "architectural",
        categoryFa: "معماری و یادمان‌ها",
        coordinates: [48.8738, 2.295],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/1280px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
        descFa:
          "بنای یادبود پیروزی‌های ناپلئون بناپارت در انتهای غربی خیابان شانزلیزه و آرامگاه سرباز گمنام.",
        descEn:
          "Monumental triumphal arch commissioned by Napoleon standing at the western end of the Champs-Élysées.",
        yearBuilt: "۱۸۳۶ میلادی",
      },
    ],
  },

  {
    id: "dubai",
    nameFa: "دبی",
    nameEn: "Dubai",
    countryCode: "AE",
    countryFa: "امارات متحده عربی",
    countryEn: "United Arab Emirates",
    continent: "middleEast",
    taglineFa:
      "معجزه معماری و فناوری در ساحل خلیج فارس با بلندترین برج‌های جهان",
    taglineEn:
      "The architectural oasis of tomorrow where desert meets futuristic ambition",
    coordinates: [25.2048, 55.2708],
    population: 3550000,
    area: 4114,
    elevation: 11,
    density: 863,
    timezone: "Asia/Dubai",
    themeId: "dubai",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/1280px-Burj_Khalifa.jpg",
    overviewFa:
      "دبی، مرکز درخشان تجارت و نوآوری جهان، شهری است که غیرممکن‌ها را به واقعیت بدل کرده است؛ از برج خلیفه سر به فلک کشیده تا جزایر نخل مصنوعی و موزه آینده با خطوط خوشنویسی عربی.",
    overviewEn:
      "Dubai stands as a hyper-modern global hub defined by daring engineering feats, luxury hospitality, and breathtaking architectural boundaries.",
    climate: {
      highs: [24, 26, 29, 34, 39, 42, 43, 44, 40, 36, 31, 26],
      lows: [15, 17, 19, 23, 27, 29, 32, 32, 29, 25, 21, 17],
      rainfall: [11, 25, 22, 7, 0, 0, 0, 0, 0, 0, 3, 15],
    },
    populationHistory: [
      { year: 1950, pop: 0.02 },
      { year: 1970, pop: 0.06 },
      { year: 1980, pop: 0.28 },
      { year: 1990, pop: 0.5 },
      { year: 2000, pop: 0.86 },
      { year: 2010, pop: 1.91 },
      { year: 2020, pop: 3.41 },
      { year: 2024, pop: 3.55 },
    ],
    attractions: [
      {
        id: "burj-khalifa",
        nameFa: "برج خلیفه",
        nameEn: "Burj Khalifa",
        category: "architectural",
        categoryFa: "معماری و آسمان‌خراش",
        coordinates: [25.1972, 55.2744],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/1280px-Burj_Khalifa.jpg",
        descFa:
          "بلندترین آسمان‌خراش ساخت دست بشر به ارتفاع ۸۲۸ متر و ۱۶۳ طبقه با سکوهای رصد برفراز ابرها.",
        descEn:
          "The world’s tallest freestanding structure rising 828 meters above the downtown Dubai desert skyline.",
        yearBuilt: "۲۰۱۰ میلادی",
      },
      {
        id: "museum-of-future",
        nameFa: "موزه آینده",
        nameEn: "Museum of the Future",
        category: "cultural",
        categoryFa: "فرهنگی و نوآوری",
        coordinates: [25.2192, 55.2819],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Museum_of_the_future.jpg/1280px-Museum_of_the_future.jpg",
        descFa:
          "سازه بیضوی تورس با پوشش خوشنویسی شعر عربی بر پوسته استیل ضدزنگ و ویترینی از علم ۵۰ سال آینده.",
        descEn:
          "An architectural marvel inscribed with Arabic poetic calligraphy exploring AI, space travel, and climate resilience.",
        yearBuilt: "۲۰۲۲ میلادی",
      },
      {
        id: "burj-al-arab",
        nameFa: "برج‌العرب",
        nameEn: "Burj Al Arab",
        category: "architectural",
        categoryFa: "معماری و نمادها",
        coordinates: [25.1412, 55.1852],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Burj_Al_Arab%2C_Dubai%2C_by_Joi_Ito_Dec2007.jpg/1280px-Burj_Al_Arab%2C_Dubai%2C_by_Joi_Ito_Dec2007.jpg",
        descFa:
          "هتل نمادین به شکل بادبان کشتی بر روی جزیره‌ای مصنوعی، مظهر مهمان‌نوازی اشرافی و مهندسی مدرن دریایی.",
        descEn:
          "The iconic sail-shaped luxury architectural masterpiece standing on an artificial island in the Arabian Gulf.",
        yearBuilt: "۱۹۹۹ میلادی",
      },
    ],
  },

  {
    id: "istanbul",
    nameFa: "استانبول",
    nameEn: "Istanbul",
    countryCode: "TR",
    countryFa: "ترکیه",
    countryEn: "Türkiye",
    continent: "europe",
    taglineFa: "پل تاریخی دو قاره آسیا و اروپا برفراز آب‌های نیلگون تنگه بسفر",
    taglineEn:
      "The transcontinental empire bridging Asia and Europe across the sapphire Bosphorus",
    coordinates: [41.0082, 28.9784],
    population: 15655924,
    area: 5343,
    elevation: 39,
    density: 2930,
    timezone: "Europe/Istanbul",
    themeId: "istanbul",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hagia_Sophia_in_the_evening.jpg/1280px-Hagia_Sophia_in_the_evening.jpg",
    overviewFa:
      "استانبول، پایتخت پیشین سه امپراتوری بزرگ روم شرقی، بیزانس و عثمانی، شهری سرشار از جادوی تاریخ است؛ با مساجد گنبددار باشکوه، بازارهای تاریخی ادویه و کشتی‌های مسافربری در پهنه بسفر.",
    overviewEn:
      "Istanbul mesmerizes as the crossroads of empires, where East meets West through majestic domed mosques, bustling Grand Bazaar aisles, and sweeping sea vistas.",
    climate: {
      highs: [9, 9, 12, 17, 22, 27, 29, 29, 25, 20, 15, 11],
      lows: [4, 4, 6, 9, 14, 18, 21, 21, 17, 14, 9, 6],
      rainfall: [100, 75, 68, 48, 38, 32, 24, 25, 52, 75, 90, 115],
    },
    populationHistory: [
      { year: 1950, pop: 1.16 },
      { year: 1960, pop: 1.88 },
      { year: 1970, pop: 3.02 },
      { year: 1980, pop: 4.74 },
      { year: 1990, pop: 7.3 },
      { year: 2000, pop: 11.08 },
      { year: 2010, pop: 13.26 },
      { year: 2020, pop: 15.46 },
      { year: 2024, pop: 15.66 },
    ],
    attractions: [
      {
        id: "hagia-sophia",
        nameFa: "مسجد و موزه ایاصوفیه",
        nameEn: "Hagia Sophia",
        category: "historical",
        categoryFa: "تاریخی و میراث کهن",
        coordinates: [41.0086, 28.9802],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hagia_Sophia_in_the_evening.jpg/1280px-Hagia_Sophia_in_the_evening.jpg",
        descFa:
          "بنای بی‌نظیر بیزانسی متعلق به سال ۵۳۷ میلادی با گنبد عظیم معلق و موزاییک‌های زرین قرون‌وسطایی.",
        descEn:
          "A masterpiece of Byzantine architecture built in 537 AD famed for its massive hovering central dome.",
        yearBuilt: "۵۳۷ میلادی",
      },
      {
        id: "blue-mosque",
        nameFa: "مسجد سلطان احمد (مسجد آبی)",
        nameEn: "Blue Mosque",
        category: "cultural",
        categoryFa: "فرهنگی و مذهبی",
        coordinates: [41.0054, 28.9768],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sultan_Ahmed_Mosque%2C_Istanbul.jpg/1280px-Sultan_Ahmed_Mosque%2C_Istanbul.jpg",
        descFa:
          "مسجد باشکوه عثمانی با ۶ مناره بلند و بیش از ۲۰ هزار کاشی سرامیکی دست‌ساز آبی ایزنیک.",
        descEn:
          "Ottoman imperial mosque with six soaring minarets and 20,000 handmade Iznik turquoise ceramic tiles.",
        yearBuilt: "۱۶۱۶ میلادی",
      },
      {
        id: "galata-tower",
        nameFa: "برج گالاتا",
        nameEn: "Galata Tower",
        category: "architectural",
        categoryFa: "معماری و دیدبانی",
        coordinates: [41.0256, 28.9744],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Galata_Tower_%281%29.jpg/1280px-Galata_Tower_%281%29.jpg",
        descFa:
          "برج سنگی دیده‌بانی قرون‌وسطایی جنوایی‌ها در کرانه شمالی خلیج شاخ طلایی با نمای ۳۶۰ درجه از استانبول.",
        descEn:
          "Medieval Genoese stone watchtower crowning the hills of Karaköy overlooking the Golden Horn.",
        yearBuilt: "۱۳۴۸ میلادی",
      },
    ],
  },

  {
    id: "newyork",
    nameFa: "نیویورک",
    nameEn: "New York City",
    countryCode: "US",
    countryFa: "ایالات متحده آمریکا",
    countryEn: "United States",
    continent: "americas",
    taglineFa:
      "شهر بیدار جهان؛ پایتخت مالی، هنر معاصر، تئاتر و رؤیاهای بزرگ انسانی",
    taglineEn:
      "The city that never sleeps; global epicenter of finance, theater, and bold dreams",
    coordinates: [40.7128, -74.006],
    population: 8336817,
    area: 783,
    elevation: 10,
    density: 10647,
    timezone: "America/New_York",
    themeId: "newyork",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
    overviewFa:
      "نیویورک، نماد سرزندگی بی‌پایان شهری، با افق آسمان‌خراش‌های منهتن، مجسمه آزادی در خلیج، پارک مرکزی ۸۴۰ هکتاری و تنوع فرهنگی بیش از ۸۰۰ زبان زنده، چهارراه واقعی تمدن معاصر است.",
    overviewEn:
      "New York City pulses with unmistakable momentum across its five boroughs, from the iconic Empire State skyline to Broadway and Central Park.",
    climate: {
      highs: [4, 6, 10, 16, 22, 26, 29, 28, 24, 18, 12, 7],
      lows: [-3, -2, 2, 7, 12, 18, 21, 20, 16, 10, 5, 0],
      rainfall: [92, 79, 109, 104, 102, 114, 117, 113, 109, 111, 91, 111],
    },
    populationHistory: [
      { year: 1950, pop: 7.89 },
      { year: 1960, pop: 7.78 },
      { year: 1970, pop: 7.89 },
      { year: 1980, pop: 7.07 },
      { year: 1990, pop: 7.32 },
      { year: 2000, pop: 8.01 },
      { year: 2010, pop: 8.18 },
      { year: 2020, pop: 8.8 },
      { year: 2024, pop: 8.34 },
    ],
    attractions: [
      {
        id: "empire-state",
        nameFa: "برج امپایر استیت",
        nameEn: "Empire State Building",
        category: "architectural",
        categoryFa: "معماری آرت‌دکو",
        coordinates: [40.7484, -73.9857],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/1280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        descFa:
          "نماد جهانی معماری آرت‌دکو با ارتفاع ۳۸۱ متر که در اوج بحران اقتصادی ۱۹۳۱ با مهارت خیره‌کننده برپا شد.",
        descEn:
          "The 102-story Art Deco masterpiece towering over Midtown Manhattan since 1931.",
        yearBuilt: "۱۹۳۱ میلادی",
      },
      {
        id: "central-park",
        nameFa: "سنترال پارک",
        nameEn: "Central Park",
        category: "nature",
        categoryFa: "طبیعت و بوستان شهری",
        coordinates: [40.7829, -73.9654],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_NYC_2016-10-09_%2830870950666%29.jpg/1280px-Central_Park_NYC_2016-10-09_%2830870950666%29.jpg",
        descFa:
          "ریه تنفسی سرسبز منهتن به وسعت ۳.۴ کیلومتر مربع با برکه‌ها، قلعه بلفیدیر و مسیرهای پیاده‌روی دل‌انگیز.",
        descEn:
          "An 843-acre urban oasis in the center of Manhattan designed by Frederick Law Olmsted.",
        yearBuilt: "۱۸۵۸ میلادی",
      },
      {
        id: "brooklyn-bridge",
        nameFa: "پل بروکلین",
        nameEn: "Brooklyn Bridge",
        category: "architectural",
        categoryFa: "معماری و پل تاریخی",
        coordinates: [40.7061, -73.9969],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brooklyn_Bridge_Manhattan_May_2017_002.jpg/1280px-Brooklyn_Bridge_Manhattan_May_2017_002.jpg",
        descFa:
          "پل معلق تاریخی با طاق‌های نئوگوتیک سنگی برفراز رود ایست که منهتن را به بروکلین متصل می‌کند.",
        descEn:
          "Historic neo-Gothic limestone suspension bridge spanning the East River between Manhattan and Brooklyn.",
        yearBuilt: "۱۸۸۳ میلادی",
      },
      {
        id: "statue-of-liberty",
        nameFa: "تندیس آزادی",
        nameEn: "Statue of Liberty",
        category: "historical",
        categoryFa: "تاریخی و نمادها",
        coordinates: [40.6892, -74.0445],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1280px-Statue_of_Liberty_7.jpg",
        descFa:
          "تندیس مسی اهدایی فرانسه به آمریکا به عنوان نماد جهانی آزادی و خوش‌آمدگویی به مهاجران در خلیج نیویورک.",
        descEn:
          "Colossal neoclassical copper sculpture on Liberty Island designed by Frédéric-Auguste Bartholdi.",
        yearBuilt: "۱۸۸۶ میلادی",
      },
    ],
  },

  {
    id: "london",
    nameFa: "لندن",
    nameEn: "London",
    countryCode: "GB",
    countryFa: "بریتانیا",
    countryEn: "United Kingdom",
    continent: "europe",
    taglineFa:
      "میراث هزاره سلطنتی در کنار نبض نوآوری، تئاتر وست‌اند و کرانه‌های تاریخی تایمز",
    taglineEn:
      "Millenniums of royal heritage meeting innovation along the historic River Thames",
    coordinates: [51.5074, -0.1278],
    population: 8982000,
    area: 1572,
    elevation: 11,
    density: 5713,
    timezone: "Europe/London",
    themeId: "london",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/1280px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg",
    overviewFa:
      "لندن، پایتخت کهن بریتانیا، با کاخ‌های سلطنتی چون باکینگهام، موزه بریتانیا، برج ساعت بیگ‌بن و چرخ‌وفلک چشم لندن، آمیزه‌ای بی‌همتا از سنت و پویایی روز جهان است.",
    overviewEn:
      "London captivates with timeless royal pageantry, world-class theatre in the West End, and iconic landmarks framing the River Thames.",
    climate: {
      highs: [9, 9, 12, 15, 18, 22, 24, 24, 20, 16, 12, 9],
      lows: [4, 4, 6, 7, 10, 13, 15, 15, 12, 10, 6, 4],
      rainfall: [55, 41, 42, 44, 49, 45, 45, 50, 52, 69, 59, 55],
    },
    populationHistory: [
      { year: 1950, pop: 8.36 },
      { year: 1960, pop: 8.22 },
      { year: 1970, pop: 7.7 },
      { year: 1980, pop: 6.81 },
      { year: 1990, pop: 6.83 },
      { year: 2000, pop: 7.27 },
      { year: 2010, pop: 8.04 },
      { year: 2020, pop: 8.9 },
      { year: 2024, pop: 8.98 },
    ],
    attractions: [
      {
        id: "big-ben",
        nameFa: "بیگ بن و پارلمان بریتانیا",
        nameEn: "Big Ben & Houses of Parliament",
        category: "architectural",
        categoryFa: "معماری و نمادها",
        coordinates: [51.5007, -0.1246],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/1280px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg",
        descFa:
          "برج ساعت الیزابت و کاخ وست‌مینستر به سبک نئوگوتیک، نماد تاریخی دموکراسی و هویت شهری لندن.",
        descEn:
          "The iconic Elizabeth Tower clock dial and neo-Gothic Westminster palace lining the River Thames.",
        yearBuilt: "۱۸۵۹ میلادی",
      },
      {
        id: "tower-bridge",
        nameFa: "تاور بریج (پل برج لندن)",
        nameEn: "Tower Bridge",
        category: "architectural",
        categoryFa: "معماری و پل تاریخی",
        coordinates: [51.5055, -0.0754],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tower_Bridge_London_Feb_2006.jpg/1280px-Tower_Bridge_London_Feb_2006.jpg",
        descFa:
          "پل متحرک و معلق ویکتوریایی با دو برج سنگ‌تراش خورده بر رود تایمز و گذرگاه شیشه‌ای هوایی.",
        descEn:
          "Victorian bascule and suspension bridge featuring twin Gothic stone towers and high-level glass walkways.",
        yearBuilt: "۱۸۹۴ میلادی",
      },
    ],
  },

  {
    id: "isfahan",
    nameFa: "اصفهان",
    nameEn: "Isfahan",
    countryCode: "IR",
    countryFa: "ایران",
    countryEn: "Iran",
    continent: "middleEast",
    taglineFa:
      "نصف جهان؛ پایتخت شکوه عصر صفوی با گنبدهای فیروزه‌ای و پل‌های تاریخی زاینده‌رود",
    taglineEn:
      "Half the World; timeless jewel of Safavid turquoise domes and arched river bridges",
    coordinates: [32.6546, 51.668],
    population: 2247000,
    area: 550,
    elevation: 1574,
    density: 4085,
    timezone: "Asia/Tehran",
    themeId: "isfahan",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Naqsh-e_Jahan_Square%2C_Isfahan%2C_Iran.jpg/1280px-Naqsh-e_Jahan_Square%2C_Isfahan%2C_Iran.jpg",
    overviewFa:
      "اصفهان، مروارید معماری جهان اسلام، با میدان نقش‌جهان (دومین میدان بزرگ جهان)، کاخ چهل‌ستون، پل‌های تاریخی سی‌وسه‌پل و خواجو و کاشی‌کاری‌های هفت‌رنگ لاجوردی، نگین درخشان فرهنگ و هنر ایران زمین است.",
    overviewEn:
      'Isfahan, historically renowned as "Half the World", features the UNESCO Naqsh-e Jahan square, turquoise tiled mosques, and historic vaulted stone bridges spanning the Zayandeh Rood.',
    climate: {
      highs: [9, 12, 17, 23, 29, 35, 37, 36, 32, 25, 17, 11],
      lows: [-2, 0, 4, 9, 14, 19, 22, 20, 15, 9, 3, -1],
      rainfall: [20, 16, 23, 19, 9, 1, 1, 0, 0, 4, 12, 18],
    },
    populationHistory: [
      { year: 1950, pop: 0.25 },
      { year: 1960, pop: 0.35 },
      { year: 1970, pop: 0.52 },
      { year: 1980, pop: 0.95 },
      { year: 1990, pop: 1.28 },
      { year: 2000, pop: 1.58 },
      { year: 2010, pop: 1.95 },
      { year: 2020, pop: 2.18 },
      { year: 2024, pop: 2.25 },
    ],
    attractions: [
      {
        id: "naghsh-e-jahan",
        nameFa: "میدان نقش جهان",
        nameEn: "Naqsh-e Jahan Square",
        category: "historical",
        categoryFa: "تاریخی و میراث جهانی",
        coordinates: [32.6572, 51.6775],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Naqsh-e_Jahan_Square%2C_Isfahan%2C_Iran.jpg/1280px-Naqsh-e_Jahan_Square%2C_Isfahan%2C_Iran.jpg",
        descFa:
          "شاهکار شهرسازی عصر صفوی به ابعاد ۵۶۰ در ۱۶۰ متر با مسجد جامع عباسی، کاخ عالی‌قاپو و مسجد شیخ لطف‌الله.",
        descEn:
          "One of the largest city squares in the world flanked by Safavid architectural crown jewels.",
        yearBuilt: "۱۶۰۲ میلادی",
      },
      {
        id: "siosepol",
        nameFa: "پل سی‌وسه‌پل (پل الله‌وردی‌خان)",
        nameEn: "Si-o-se-pol",
        category: "architectural",
        categoryFa: "معماری و پل تاریخی",
        coordinates: [32.6447, 51.6675],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Si-o-se_Pol_in_the_evening.jpg/1280px-Si-o-se_Pol_in_the_evening.jpg",
        descFa:
          "پل تاریخی با ۳۳ دهانه سنگی به طول ۲۹۷ متر بر بستر زاینده‌رود؛ تجلی پیوند طبیعت و نبوغ مهندسی عصر شاه عباس.",
        descEn:
          "The famous bridge of 33 stone arches spanning 297 meters across the historic Zayandeh Rood.",
        yearBuilt: "۱۶۰۲ میلادی",
      },
    ],
  },

  {
    id: "rome",
    nameFa: "رم",
    nameEn: "Rome",
    countryCode: "IT",
    countryFa: "ایتالیا",
    countryEn: "Italy",
    continent: "europe",
    taglineFa:
      "شهر ابدی؛ مهد تمدن روم باستان، شاهکارهای رنسانس و آب‌نماهای باروک",
    taglineEn:
      "The Eternal City; cradle of Western civilization, Renaissance art, and Baroque fountains",
    coordinates: [41.9028, 12.4964],
    population: 2873000,
    area: 1285,
    elevation: 21,
    density: 2236,
    timezone: "Europe/Rome",
    themeId: "rome",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    overviewFa:
      "رم با بیش از سه هزار سال پیشینه زنده، موزه‌ای روباز به وسعت یک شهر است؛ با کولوسئوم نبرد گلادیاتورها، پانتئون خدایان، فواره تروی و دولت‌شهر واتیکان.",
    overviewEn:
      "Rome unfolds three millennia of human history in open air, from the mighty Colosseum to Trevi Fountain and the Vatican.",
    climate: {
      highs: [12, 13, 16, 19, 24, 28, 31, 31, 27, 22, 17, 13],
      lows: [3, 4, 6, 9, 13, 17, 19, 20, 16, 12, 8, 4],
      rainfall: [67, 73, 58, 62, 48, 34, 19, 29, 68, 94, 110, 89],
    },
    populationHistory: [
      { year: 1950, pop: 1.65 },
      { year: 1960, pop: 2.19 },
      { year: 1970, pop: 2.78 },
      { year: 1980, pop: 2.84 },
      { year: 1990, pop: 2.78 },
      { year: 2000, pop: 2.66 },
      { year: 2010, pop: 2.76 },
      { year: 2020, pop: 2.86 },
      { year: 2024, pop: 2.87 },
    ],
    attractions: [
      {
        id: "colosseum",
        nameFa: "کولوسئوم",
        nameEn: "Colosseum",
        category: "historical",
        categoryFa: "تاریخی و باستانی",
        coordinates: [41.8902, 12.4922],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
        descFa:
          "بزرگ‌ترین تماشاخانه دنیای باستان با ظرفیت بیش از ۵۰ هزار تماشاگر در دوران امپراتوری فلاویان.",
        descEn:
          "The monumental stone amphitheater holding 50,000 spectators commissioned around 70-72 AD.",
        yearBuilt: "۸۰ میلادی",
      },
      {
        id: "trevi-fountain",
        nameFa: "فواره تروی",
        nameEn: "Trevi Fountain",
        category: "architectural",
        categoryFa: "معماری باروک",
        coordinates: [41.9009, 12.4833],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/1280px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg",
        descFa:
          "آب‌نمای پرآوازه باروک قرن هجدهم اثر نیکولا سالوی؛ محل سنتی پرتاب سکه برای بازگشت دوباره به رم.",
        descEn:
          "The largest Baroque fountain in the city completed in 1762, immortalized in classic cinema.",
        yearBuilt: "۱۷۶۲ میلادی",
      },
    ],
  },

  {
    id: "barcelona",
    nameFa: "بارسلون",
    nameEn: "Barcelona",
    countryCode: "ES",
    countryFa: "اسپانیا",
    countryEn: "Spain",
    continent: "europe",
    taglineFa:
      "شور و رنگ در ساحل مدیترانه؛ زادگاه شاهکارهای سوررئال آنتونی گائودی",
    taglineEn:
      "Mediterranean warmth, Catalan passion, and surreal architectural wonders of Antoni Gaudí",
    coordinates: [41.3879, 2.1699],
    population: 1664182,
    area: 101,
    elevation: 12,
    density: 16477,
    timezone: "Europe/Madrid",
    themeId: "barcelona",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sagrada_Fam%C3%ADlia_2023.jpg/1280px-Sagrada_Fam%C3%ADlia_2023.jpg",
    overviewFa:
      "بارسلون، پایتخت خودمختار کاتالونیا، با تلفیق بی‌نظیر فرهنگ مدیترانه‌ای، سواحل شنی، کوچه پس‌کوچه‌های گوتیک و شاهکارهای معماری ارگانیک گائودی، شهری جادویی برای کشف هنر و زندگی است.",
    overviewEn:
      "Barcelona seduces travellers with sun-drenched Mediterranean beaches, vibrant Gothic quarters, and the fantastical Modernist architecture of Antoni Gaudí.",
    climate: {
      highs: [14, 15, 17, 19, 23, 26, 29, 29, 26, 22, 17, 14],
      lows: [5, 6, 8, 11, 14, 18, 21, 21, 18, 14, 9, 6],
      rainfall: [43, 35, 36, 40, 47, 30, 21, 62, 81, 91, 59, 40],
    },
    populationHistory: [
      { year: 1950, pop: 1.28 },
      { year: 1970, pop: 1.74 },
      { year: 1990, pop: 1.64 },
      { year: 2010, pop: 1.62 },
      { year: 2024, pop: 1.66 },
    ],
    attractions: [
      {
        id: "sagrada-familia",
        nameFa: "کلیسای ساگرادا فامیلیا",
        nameEn: "Basílica de la Sagrada Família",
        category: "architectural",
        categoryFa: "معماری و شاهکار جهانی",
        coordinates: [41.4036, 2.1744],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sagrada_Fam%C3%ADlia_2023.jpg/1280px-Sagrada_Fam%C3%ADlia_2023.jpg",
        descFa:
          "شاهکار ناتمام آنتونی گائودی با ستون‌های شبیه به درختان جنگل، شیشه‌های رنگی جادویی و برج‌های افسانه‌ای.",
        descEn:
          "Antoni Gaudí’s uncompleted Gothic-Art Nouveau basilica renowned for its stone forest interior.",
        yearBuilt: "از ۱۸۸۲ میلادی",
      },
    ],
  },

  {
    id: "cairo",
    nameFa: "قاهره",
    nameEn: "Cairo",
    countryCode: "EG",
    countryFa: "مصر",
    countryEn: "Egypt",
    continent: "africa",
    taglineFa:
      "شهر هزار مناره و دروازه ابدی به اهرام خمسه و شگفتی‌های تمدن باستان نیل",
    taglineEn:
      "City of a Thousand Minarets and gateway to the timeless Pyramids of Giza",
    coordinates: [30.0444, 31.2357],
    population: 10100000,
    area: 3085,
    elevation: 23,
    density: 3274,
    timezone: "Africa/Cairo",
    themeId: "cairo",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1280px-All_Gizah_Pyramids.jpg",
    overviewFa:
      "قاهره، مهد تمدن چندهزارساله بشر در کرانه رود نیل، با اهرام باستانی جیزه، مجسمه ابوالهول، قلعه صلاح‌الدین ایوبی و بازارهای پرهیاهوی خان‌الخلیلی، تجربه‌ای بیابانی و اساطیری خلق می‌کند.",
    overviewEn:
      "Cairo unites ancient Egyptian pharaonic wonders with historic Islamic architecture along the banks of the life-giving River Nile.",
    climate: {
      highs: [19, 21, 24, 28, 33, 35, 36, 36, 33, 30, 25, 20],
      lows: [9, 10, 12, 15, 18, 21, 23, 23, 21, 18, 14, 10],
      rainfall: [5, 4, 3, 1, 1, 0, 0, 0, 0, 1, 3, 6],
    },
    populationHistory: [
      { year: 1950, pop: 2.41 },
      { year: 1970, pop: 5.58 },
      { year: 1990, pop: 9.12 },
      { year: 2010, pop: 16.8 },
      { year: 2024, pop: 22.1 },
    ],
    attractions: [
      {
        id: "giza-pyramids",
        nameFa: "اهرام ثلاثه جیزه",
        nameEn: "Great Pyramids of Giza",
        category: "historical",
        categoryFa: "تاریخی و عجایب باستان",
        coordinates: [29.9792, 31.1342],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1280px-All_Gizah_Pyramids.jpg",
        descFa:
          "تنها بازمانده عجایب هفت‌گانه دنیای باستان با هرم بزرگ خوفو که بیش از ۴۵۰۰ سال در برابر بادهای صحرا ایستاده است.",
        descEn:
          "The oldest of the Seven Wonders of the Ancient World standing tall on the Giza plateau for 4,500 years.",
        yearBuilt: "۲۵۶۰ پیش از میلاد",
      },
    ],
  },

  {
    id: "sydney",
    nameFa: "سیدنی",
    nameEn: "Sydney",
    countryCode: "AU",
    countryFa: "استرالیا",
    countryEn: "Australia",
    continent: "oceania",
    taglineFa:
      "بندرگاه درخشان قاره اقیانوسیه؛ بادبان‌های سفید اپراهاوس و سواحل زرین اقیانوس آرام",
    taglineEn:
      "The glittering jewel of the South Pacific; iconic sails of the Opera House and golden surf",
    coordinates: [-33.8688, 151.2093],
    population: 5312000,
    area: 12368,
    elevation: 19,
    density: 430,
    timezone: "Australia/Sydney",
    themeId: "sydney",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/1280px-Sydney_Opera_House_Sails.jpg",
    overviewFa:
      "سیدنی، نگین بندری استرالیا، با خلیج دیدنی جکسون، پل نمادین هاربر، خانه اپرا با معماری بادبانی بتنی و فرهنگ موج‌سواری در ساحل بوندی، تجربه‌ای انرژی‌بخش از زندگی در جوار اقیانوس است.",
    overviewEn:
      "Sydney embraces visitors with its world-famous natural harbour, dramatic coastal walks, Bondi beach surf, and iconic shell-vaulted Opera House.",
    climate: {
      highs: [26, 26, 25, 23, 20, 18, 17, 18, 20, 22, 24, 25],
      lows: [19, 19, 18, 15, 12, 10, 9, 9, 11, 14, 16, 18],
      rainfall: [101, 118, 129, 126, 100, 132, 96, 80, 68, 77, 84, 77],
    },
    populationHistory: [
      { year: 1950, pop: 1.7 },
      { year: 1970, pop: 2.8 },
      { year: 1990, pop: 3.65 },
      { year: 2010, pop: 4.58 },
      { year: 2024, pop: 5.31 },
    ],
    attractions: [
      {
        id: "sydney-opera-house",
        nameFa: "تالار اپرای سیدنی",
        nameEn: "Sydney Opera House",
        category: "architectural",
        categoryFa: "معماری و میراث جهانی",
        coordinates: [-33.8568, 151.2153],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/1280px-Sydney_Opera_House_Sails.jpg",
        descFa:
          "شاهکار اکسپرسیونیستی یورن اوتزون در فهرست میراث جهانی با طاق‌های بتنی صدف‌مانند در ساحل خلیج سیدنی.",
        descEn:
          "Jørn Utzon’s multi-venue performing arts centre conceived as billowing sails above Sydney Harbour.",
        yearBuilt: "۱۹۷۳ میلادی",
      },
    ],
  },

  {
    id: "rio",
    nameFa: "ریو دو ژانیرو",
    nameEn: "Rio de Janeiro",
    countryCode: "BR",
    countryFa: "برزیل",
    countryEn: "Brazil",
    continent: "americas",
    taglineFa:
      "شهر شگفت‌انگیز؛ آغوش گشوده تندیس مسیح برفراز جنگل‌های بارانی و سواحل کوپاکابانا",
    taglineEn:
      "The Marvelous City; Christ the Redeemer soaring over Atlantic rainforests and Copacabana sands",
    coordinates: [-22.9068, -43.1729],
    population: 6748000,
    area: 1200,
    elevation: 31,
    density: 5623,
    timezone: "America/Sao_Paulo",
    themeId: "rio",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg/1280px-Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg",
    overviewFa:
      "ریو دو ژانیرو، شهر شگفت‌انگیز برزیل، با تندیس ۳۸ متری عیسی مسیح برفراز قله کورکووادو، کوه کله‌قندی در دل اقیانوس اطلس، کارناوال‌های پرشور سامبا و سواحل نمادین ایپانما، جشن بی‌انتهای رنگ و زندگی است.",
    overviewEn:
      "Rio de Janeiro seduces with soaring granite peaks, lush tropical Tijuca rainforests, white crescent beaches, and the warm beats of Bossa Nova.",
    climate: {
      highs: [30, 31, 30, 28, 26, 25, 25, 26, 26, 27, 28, 29],
      lows: [23, 24, 23, 22, 20, 19, 18, 19, 19, 21, 22, 23],
      rainfall: [114, 105, 103, 137, 86, 80, 56, 50, 87, 88, 96, 169],
    },
    populationHistory: [
      { year: 1950, pop: 3.0 },
      { year: 1970, pop: 5.0 },
      { year: 1990, pop: 5.48 },
      { year: 2010, pop: 6.32 },
      { year: 2024, pop: 6.75 },
    ],
    attractions: [
      {
        id: "christ-the-redeemer",
        nameFa: "تندیس مسیح نجات‌بخش",
        nameEn: "Christ the Redeemer",
        category: "historical",
        categoryFa: "تاریخی و عجایب هفتگانه نو",
        coordinates: [-22.9519, -43.2105],
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg/1280px-Christ_the_Redeemer_-_Rio_de_Janeiro%2C_Brazil.jpg",
        descFa:
          "تندیس ۳۸ متری سبک آرت‌دکو از بتن مسلح و سنگ صابون بر فراز قله ۷۱۰ متری کوه کورکووادو.",
        descEn:
          "Art Deco statue of Jesus Christ rising 30 meters atop Mount Corcovado in the Tijuca National Park.",
        yearBuilt: "۱۹۳۱ میلادی",
      },
    ],
  },
];

/**
 * Searches curated cities by query string (matching Persian name, English name, country, etc.)
 */
export function searchCities(query = "", continent = "all") {
  const q = String(query).toLowerCase().trim();

  return CITIES.filter((city) => {
    // Continent filter
    if (continent !== "all" && city.continent !== continent) {
      return false;
    }

    if (!q) return true;

    return (
      city.nameFa.toLowerCase().includes(q) ||
      city.nameEn.toLowerCase().includes(q) ||
      city.countryFa.toLowerCase().includes(q) ||
      city.countryEn.toLowerCase().includes(q) ||
      city.taglineFa.toLowerCase().includes(q)
    );
  });
}

/**
 * Finds a curated city by ID or returns Tehran by default
 */
export function getCityById(cityId = "tehran") {
  const found = CITIES.find(
    (c) => c.id.toLowerCase() === String(cityId).toLowerCase(),
  );
  return found || CITIES[0];
}
