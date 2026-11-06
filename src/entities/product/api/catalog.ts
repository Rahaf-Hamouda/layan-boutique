import { normalizeText } from '@shared/lib/format';
import type {
  Category,
  CategoryId,
  CategoryWithCount,
  Product,
} from '../model/types';

export const categories: Category[] = [
  {
    id: 'dresses',
    label: 'فساتين',
    latinLabel: 'Dresses',
    description: 'قصّات أنثوية بخطوط ناعمة',
    image: '/images/dress-gown.jpg',
  },
  {
    id: 'abayas',
    label: 'عبايات',
    latinLabel: 'Abayas',
    description: 'فخامة محتشمة بتفاصيل ذهبية',
    image: '/images/abaya-sand.jpg',
  },
  {
    id: 'bags',
    label: 'حقائب',
    latinLabel: 'Bags',
    description: 'جلود ناعمة وحِرفية مدروسة',
    image: '/images/bag-nude.jpg',
  },
  {
    id: 'perfumes',
    label: 'عطور',
    latinLabel: 'Fragrance',
    description: 'روائح تُخلّد الأثر',
    image: '/images/perfume-amber.jpg',
  },
  {
    id: 'jewelry',
    label: 'مجوهرات',
    latinLabel: 'Jewelry',
    description: 'لمعات صغيرة تُكمل الإطلالة',
    image: '/images/jewelry-gold.jpg',
  },
  {
    id: 'beauty',
    label: 'العناية والجمال',
    latinLabel: 'Beauty',
    description: 'روتين بملمس حريري',
    image: '/images/beauty-makeup.jpg',
  },
  {
    id: 'shoes',
    label: 'أحذية',
    latinLabel: 'Shoes',
    description: 'خطوات واثقة بكعب أنيق',
    image: '/images/shoes-black.jpg',
  },
];

const apparelSizes = ['XS', 'S', 'M', 'L', 'XL'];
const abayaSizes = ['50', '52', '54', '56', '58'];
const shoeSizes = ['36', '37', '38', '39', '40', '41'];

export const products: Product[] = [
  {
    id: 'p-yasmin',
    slug: 'fustan-yasmin',
    name: 'فستان «ياسمين» المسائي',
    latinName: 'Yasmin Evening Gown',
    category: 'dresses',
    price: 1150,
    compareAtPrice: 1350,
    image: '/images/dress-gown.jpg',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 86,
    shortDescription:
      'قصة أوف شولدر بلون التوت الداكن، تنساب بهدوء لتمنحكِ حضورًا لا يُنسى.',
    description:
      'من سهرات الرياض إلى أمسيات جدة، صُمم فستان «ياسمين» ليكون قطعة تُلبس مرة وتبقى في الذاكرة. كريب مخملي بلمسة مطفأة، وثنيات مدروسة تنساب مع الحركة، وقصة أوف شولدر تبرز خط الكتفين بأناقة هادئة.',
    details: [
      'كريب مخملي مرن بلمسة مطفأة',
      'قصة أوف شولدر بثنيات أمامية ناعمة',
      'سحّاب خفي وجانب مطاطي مريح',
      'تنظيف جاف فقط',
    ],
    sizes: apparelSizes,
    material: 'كريب مخملي',
  },
  {
    id: 'p-lujain',
    slug: 'fustan-lujain',
    name: 'فستان «لُجين» الحريري',
    latinName: 'Lujain Silk Gown',
    category: 'dresses',
    price: 1390,
    image: '/images/dress-champagne.jpg',
    badge: 'new',
    rating: 5,
    reviews: 24,
    shortDescription:
      'ساتان بلون الشمبانيا مع ظهر منسدل وذيل خفيف، للمناسبات التي تعنين فيها الكثير.',
    description:
      'قطعة استثنائية من الساتان الحريري بلون الشمبانيا الدافئ. صُممت بقصة تُبرز الخصر وظهر منسدل بثنيات عريضة، وذيل طويل يمنح كل خطوة حضورًا مسرحيًا. تُخاط بكميات محدودة.',
    details: [
      'ساتان حريري بلمعة ناعمة',
      'ظهر مفتوح بثنيات درابيه',
      'ذيل طويل قابل للتنظيف الجاف فقط',
      'إصدار محدود لهذا الموسم',
    ],
    sizes: apparelSizes,
    material: 'ساتان حريري',
  },
  {
    id: 'p-qamar',
    slug: 'fustan-qamar',
    name: 'فستان «قُمر» المخملي',
    latinName: 'Qamar Velvet Gown',
    category: 'dresses',
    price: 980,
    compareAtPrice: 1200,
    image: '/images/dress-red.jpg',
    badge: 'sale',
    rating: 4.8,
    reviews: 112,
    shortDescription:
      'أحمر دافئ يتنفّس مع الحركة، بقصة كلاسيكية تحتضن الخصر بلمسة ملكية.',
    description:
      'فستان سهرة بقصة A-line من المخمل الطري، بلون أحمر دافئ يليق بالمناسبات الكبرى. تنورة واسعة تمنح حرية الحركة، وحزام خصر مخفي يحدد القوام برقة.',
    details: [
      'مخمل طري بوزن متوسط',
      'قصة A-line بتنورة كاملة',
      'بطانة ساتان مريحة',
      'تنظيف جاف فقط',
    ],
    sizes: apparelSizes,
    material: 'مخمل',
  },
  {
    id: 'p-zahra',
    slug: 'fustan-zahra',
    name: 'فستان «زهرة» المطبوع',
    latinName: 'Zahra Wrap Dress',
    category: 'dresses',
    price: 520,
    compareAtPrice: 620,
    image: '/images/dress-floral.jpg',
    badge: 'sale',
    rating: 4.7,
    reviews: 64,
    shortDescription:
      'طبعة ورد ناعمة على قماش خفيف، مثالي لقُدوم الصباح وقهوة المساء.',
    description:
      'طبعة ورد مرسومة بعناية على قماش فيسكوز خفيف. بقصة لف متقاطعة وحزام رفيع، يمنحكِ خصرًا محددًا وإطلالة صيفية راقية. يُلبس مع صندل بسيط أو حذاء بكعب دقيق.',
    details: [
      'فيسكوز خفيف قابل للتنفّس',
      'قصة لف متقاطعة بحزام قابل للربط',
      'أكمام قصيرة منسدلة',
      'غسيل لطيف على البارد',
    ],
    sizes: apparelSizes,
    material: 'فيسكوز',
  },
  {
    id: 'p-lina',
    slug: 'fustan-lina',
    name: 'فستان «لينا» الصيفي',
    latinName: 'Lina Summer Dress',
    category: 'dresses',
    price: 460,
    image: '/images/dress-white.jpg',
    badge: 'new',
    rating: 4.6,
    reviews: 38,
    shortDescription:
      'أبيض نقي وتطريز خفيف، قصّة تتنفّس مع كل خطوة في أيام الصيف.',
    description:
      'فستان صيفي من القطن المطرز بخيوط بيضاء، بقصة أوف شولدر وتنورة بطبقات ناعمة. خفيف على الجسم، ومثالي للرحلات والأيام المشمسة.',
    details: [
      'قطن مطرز بخيوط قطنية',
      'قصة أوف شولدر بمرونة مريحة',
      'تنورة بطبقتين مبطنة',
      'غسيل يدوي أو برنامج لطيف',
    ],
    sizes: apparelSizes,
    material: 'قطن مطرز',
  },
  {
    id: 'p-suha',
    slug: 'abaya-suha',
    name: 'عباية «سُهى» المطرزة',
    latinName: 'Suha Embroidered Abaya',
    category: 'abayas',
    price: 890,
    image: '/images/abaya-noir.jpg',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 73,
    shortDescription:
      'تطريز ذهبي مرسوم على كريب أسود فاخر، ينساب كظل خفيف عند كل خطوة.',
    description:
      'عباية من الكريب الياباني الفاخر، بتطريز ذهبي دقيق على الأكمام والحاشية. قصتها الواسعة تمنح حركة انسيابية، وقطبتها الخفية تحافظ على نظافة الخط. تُهدى بعلبة لَيان الفاخرة.',
    details: [
      'كريب ياباني عالي الجودة',
      'تطريز ذهبي يدوي على الأكمام والحافة',
      'قصة واسعة بأكمام منسدلة',
      'تُغسل يدويًا أو تنظيف جاف',
    ],
    sizes: abayaSizes,
    material: 'كريب ياباني',
  },
  {
    id: 'p-razan',
    slug: 'abaya-razan',
    name: 'عباية «رَزان» الرملية',
    latinName: 'Razan Sand Abaya',
    category: 'abayas',
    price: 760,
    image: '/images/abaya-sand.jpg',
    badge: 'new',
    rating: 4.8,
    reviews: 29,
    shortDescription:
      'درجة رملية هادئة مع تطريز بلون الشمبانيا، لفخامة محتشمة وأنيقة.',
    description:
      'عباية بلون الرمل الدافئ من الشيفون المبطّن، بتطريز متناغم على الأكمام. خفيفة على الكتفين، وتمنح إطلالة راقية تناسب المناسبات النهارية والدعوات الصغيرة.',
    details: [
      'شيفون مبطّن بلمسة حريرية',
      'تطريز متناغم بلون الشمبانيا',
      'أكمام واسعة وحاشية مستقيمة',
      'تنظيف جاف فقط',
    ],
    sizes: abayaSizes,
    material: 'شيفون مبطّن',
  },
  {
    id: 'p-layan-bag',
    slug: 'haqibat-layan',
    name: 'حقيبة «لَيان» الجلدية',
    latinName: 'Layan Top-Handle Bag',
    category: 'bags',
    price: 720,
    image: '/images/bag-nude.jpg',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 95,
    shortDescription:
      'جلد بلون النود مع إبزيم ذهبي منحوت، حقيبة تكبر معكِ في كل مناسبة.',
    description:
      'حقيبة يد بقصة صندوقية أنيقة من جلد الحبوب الدقيقة بلون النود. إبزيم ذهبي منحوت يدويًا، ومساحة داخلية مبطنة تتسع لأساسياتك، مع جيب خلفي صغير للبطاقات.',
    details: [
      'جلد طبيعي بحبوب دقيقة',
      'إبزيم ذهبي مصقول',
      'بطانة قطنية وجيب داخلي',
      'مشتملة على حقيبة قماشية للحفظ',
    ],
    material: 'جلد طبيعي',
  },
  {
    id: 'p-warda',
    slug: 'haqibat-warda',
    name: 'حقيبة «وردة» بسلسلة',
    latinName: 'Warda Chain Bag',
    category: 'bags',
    price: 640,
    image: '/images/bag-rose.jpg',
    badge: 'new',
    rating: 4.8,
    reviews: 41,
    shortDescription:
      'لون وردي دافئ مع سلسلة ذهبية رفيعة، قطعة صغيرة تُلفت النظر بهدوء.',
    description:
      'حقيبة كتف صغيرة بلون الورد الدافئ، مبطنة بمربعات مخيطة يدويًا وسلسلة ذهبية رفيعة. خفيفة وعملية، تُلبس على الكتف أو عبر الجسم، وتليق بإطلالات المساء والنهار.',
    details: [
      'جلد صناعي عالي الجودة',
      'سلسلة ذهبية قابلة للتعديل',
      'بطانة داخلية ناعمة',
      'إغلاق مغناطيسي خفي',
    ],
    material: 'جلد صناعي',
  },
  {
    id: 'p-bayda',
    slug: 'haqibat-bayda',
    name: 'حقيبة «بيضاء» الكتف',
    latinName: 'Bayda Shoulder Bag',
    category: 'bags',
    price: 580,
    image: '/images/bag-ivory.jpg',
    rating: 4.7,
    reviews: 33,
    shortDescription:
      'عاجية هادئة وخطوط نظيفة؛ حقيبة يومية تُكمل إطلالاتك بلا مجهود.',
    description:
      'حقيبة كتف بسعة مدروسة من الجلد الناعم بلون العاج. مقابض رفيعة وخطوط بسيطة تجعلها رفيقة يومك، مع جيوب داخلية تنظم هاتفك وأساسياتك.',
    details: [
      'جلد ناعم بلون العاج',
      'حزام كتف قابل للفصل',
      'جيبان داخليان منظمّان',
      'أقدام معدنية تحافظ على القاعدة',
    ],
    material: 'جلد ناعم',
  },
  {
    id: 'p-fajr',
    slug: 'itr-fajr',
    name: 'عطر «وردة الفجر»',
    latinName: 'Fajr Rose Eau de Parfum',
    category: 'perfumes',
    price: 420,
    image: '/images/perfume-rose.jpg',
    badge: 'bestseller',
    rating: 4.9,
    reviews: 208,
    shortDescription:
      'ورد دمشقي، بتلات ناعمة ولمسة مسك أبيض؛ عطر يُشبه صباحًا هادئًا.',
    description:
      'افتتاحية من الورد الدمشقي والليتشي، قلب من الفاوانيا والياسمين، وقاعدة من المسك الأبيض وخشب الصندل. عطر أنثوي هادئ، يبقى على الملابس لساعات طويلة.',
    details: [
      'أوكس دي بارفان — تركيز عالٍ',
      '100 مل',
      'ورد دمشقي، فاوانيا، مسك أبيض',
      'عبوة زجاجية بغطاء ذهبي مصقول',
    ],
    material: 'أوكس دي بارفان',
  },
  {
    id: 'p-anbar',
    slug: 'itr-anbar',
    name: 'عطر «عنبر الليل»',
    latinName: 'Anbar Noir Eau de Parfum',
    category: 'perfumes',
    price: 480,
    image: '/images/perfume-amber.jpg',
    badge: 'new',
    rating: 4.8,
    reviews: 147,
    shortDescription:
      'عنبر دافئ وعود ناعم، عطر مسائي يترك أثرًا يشبه الحكايات القديمة.',
    description:
      'مزيج شرقي دافئ من العنبر، العود، والفانيليا، يفتح بلمسة من البرغموت. عطر مسائي بتركيز عالٍ، مثالي لأمسيات الشتاء والمناسبات الخاصة.',
    details: [
      'أوكس دي بارفان — تركيز عالٍ',
      '100 مل',
      'عنبر، عود، فانيليا، برغموت',
      'صُنع في فرنسا',
    ],
    material: 'أوكس دي بارفان',
  },
  {
    id: 'p-khamra',
    slug: 'itr-khamra',
    name: 'عطر «خمرة»',
    latinName: 'Khamra Eau de Parfum',
    category: 'perfumes',
    price: 510,
    image: '/images/perfume-noir.jpg',
    badge: 'new',
    rating: 4.9,
    reviews: 56,
    shortDescription:
      'ورد داكن وتوابل هادئة في زجاجة بلون الخمرة؛ حضور دافئ لا يُنسى.',
    description:
      'عطر استثنائي يفتح بالورد الأسود والتوابل، ليستقر على قاعدة من العنبر والصندل. زجاجة بلون الخمرة الداكن، وغطاء ذهبي يعكس ضوء المساء.',
    details: [
      'أوكس دي بارفان — تركيز عالٍ',
      '100 مل',
      'ورد أسود، توابل، عنبر، صندل',
      'إصدار محدود بكمية 300 زجاجة',
    ],
    material: 'أوكس دي بارفان',
  },
  {
    id: 'p-shams',
    slug: 'siwar-shams',
    name: 'سوار «شمس» المرصّع',
    latinName: 'Shams Pave Bracelet',
    category: 'jewelry',
    price: 350,
    image: '/images/jewelry-gold.jpg',
    badge: 'bestseller',
    rating: 4.8,
    reviews: 72,
    shortDescription:
      'حلقات ذهبية متداخلة تستقبل الضوء من كل زاوية، قطع صغيرة تُكمل كل إطلالة.',
    description:
      'سوار من الذهب المطلي عيار ١٨ قيراط، بحلقات متداخلة مرصّعة بحجر الزركون. خفيف ومريح، يُلبس وحده أو مع أساور رفيعة أخرى.',
    details: [
      'ذهب مطلي عيار ١٨ قيراط',
      'زركون مرصّع يدويًا',
      'مقاس مرن يناسب معظم المعصمين',
      'يُقدّم بعلبة مجوهرات مخملية',
    ],
    material: 'ذهب مطلي — زركون',
  },
  {
    id: 'p-lulua',
    slug: 'iqd-lulua',
    name: 'عقد «لؤلؤة» الطبيعي',
    latinName: 'Lulua Pearl Necklace',
    category: 'jewelry',
    price: 460,
    image: '/images/jewelry-pearl.jpg',
    rating: 4.9,
    reviews: 48,
    shortDescription:
      'لؤلؤ طبيعي بلمعة ناعمة وإغلاق فضي، كلاسيكية ترافقك لسنوات.',
    description:
      'عقد من اللؤلؤ الطبيعي بلمعة هادئة ولون عاجي دافئ، مع إغلاق من الفضة الإسترليني. قطعة لا تخضع للموضة، تُلبس في الأعراس والدعوات وتبقى.',
    details: [
      'لؤلؤ طبيعي مزروع',
      'إغلاق من الفضة الإسترليني 925',
      'الطول 45 سم',
      'تُحفظ بعيدًا عن العطور',
    ],
    material: 'لؤلؤ طبيعي — فضة',
  },
  {
    id: 'p-najma',
    slug: 'siwar-najma',
    name: 'سوار «نجمة» الألماس',
    latinName: 'Najma Diamond Bracelet',
    category: 'jewelry',
    price: 590,
    image: '/images/jewelry-diamond.jpg',
    badge: 'new',
    rating: 5,
    reviews: 19,
    shortDescription:
      'ألماس صغير يلمع في الظلام، بخط عريض يلفّ المعصم بفخامة صامتة.',
    description:
      'سوار بخط عريض مرصّع بأحجار الألماس في إطار من الفضة المطلية بالروديوم. صُمم ليخطف الضوء بهدوء، ويليق بالإطلالات المسائية والمناسبات.',
    details: [
      'ألماس طبيعي بقطع مستدير',
      'إطار فضة مطلية بالروديوم',
      'قفل أمان مزدوج',
      'شهادة أصالة مرفقة',
    ],
    material: 'ألماس — فضة روديوم',
  },
  {
    id: 'p-nudara',
    slug: 'serum-nudara',
    name: 'سيروم «نُضارة» المرمّم',
    latinName: 'Nudara Repair Serum',
    category: 'beauty',
    price: 240,
    image: '/images/beauty-serum.jpg',
    badge: 'bestseller',
    rating: 4.7,
    reviews: 310,
    shortDescription:
      'تركيبة خفيفة بالنياسيناميد حمض الهيالورونيك لبشرة ناعمة ومشرقة.',
    description:
      'سيروم خفيف القوام يجمع النياسيناميد وحمض الهيالورونيك ومستخلص الورد. يعمل على توحيد لون البشرة وترطيبها العميق، ويُمتص سريعًا دون لزوجة.',
    details: [
      '30 مل',
      'نياسيناميد 5٪ + هيالورونيك',
      'خالٍ من العطور الصناعية',
      'مناسب لجميع أنواع البشرة',
    ],
    material: 'سيروم',
  },
  {
    id: 'p-lamsa',
    slug: 'majmuat-lamsa',
    name: 'مجموعة «لمسة» للمكياج',
    latinName: 'Lamsa Makeup Set',
    category: 'beauty',
    price: 320,
    compareAtPrice: 380,
    image: '/images/beauty-makeup.jpg',
    badge: 'sale',
    rating: 4.6,
    reviews: 87,
    shortDescription:
      'أساسيات مكياج بدرجات ناعمة وفرش وردية، لمظهر يومي يشبهكِ.',
    description:
      'مجموعة من أساسيات المكياج اليومي: فرشاة كبيرة وفرشاة عيون، ملمع شفاه، أحمر خدود، ومسكارا. كلها بدرجات ترابية ناعمة وأغلفة وردية تُبهج التفاصيل.',
    details: [
      '٦ قطع أساسية',
      'درجات ترابية تناسب البشرة العربية',
      'غير مختبرة على الحيوانات',
      'تُقدَّم بحقيبة تخزين وردية',
    ],
    material: 'مجموعة مكياج',
  },
  {
    id: 'p-sihr',
    slug: 'hidhaa-sihr',
    name: 'حذاء «سحر» الكعب',
    latinName: 'Sihr Nude Heels',
    category: 'shoes',
    price: 480,
    image: '/images/shoes-nude.jpg',
    badge: 'bestseller',
    rating: 4.8,
    reviews: 64,
    shortDescription:
      'كعب دقيق بلون الشمبانيا وحزام كاحل رفيع؛ أناقة تُطيل الخط بهدوء.',
    description:
      'حذاء بكعب ٨.٥ سم من الساتان بلون الشمبانيا، بحزام كاحل رفيع ومقدمة مدببة. بطانة جلدية ناعمة توسّد القدم، وثبات مريح لساعات المناسبة.',
    details: [
      'ساتان بلمعة ناعمة',
      'كعب ٨.٥ سم',
      'بطانة ونعل داخلي جلدي',
      'نعل خارجي مضاد للانزلاق',
    ],
    sizes: shoeSizes,
    material: 'ساتان',
  },
  {
    id: 'p-layl',
    slug: 'hidhaa-layl',
    name: 'حذاء «ليل» الساتان',
    latinName: 'Layl Satin Pumps',
    category: 'shoes',
    price: 460,
    image: '/images/shoes-black.jpg',
    badge: 'new',
    rating: 4.7,
    reviews: 27,
    shortDescription:
      'ساتان أسود بكعب رفيع وحزام دقيق، الحذاء الذي يكمل كل إطلالة مسائية.',
    description:
      'حذاء ساتان أسود بقصة كلاسيكية وكعب رفيع ٩ سم. حزام كاحل دقيق مع إبزيم ذهبي، ومقدمة مدببة تمنح القدم امتدادًا أنيقًا. رفيق السهرات بلا منافس.',
    details: [
      'ساتان أسود فاخر',
      'كعب ٩ سم',
      'إبزيم ذهبي قابل للتعديل',
      'بطانة جلدية مريحة',
    ],
    sizes: shoeSizes,
    material: 'ساتان',
  },
];

export const getProducts = (): Product[] => products;

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  products.find((product) => product.id === id);

export const getProductsByCategory = (category: CategoryId): Product[] =>
  products.filter((product) => product.category === category);

export const getCategories = (): CategoryWithCount[] =>
  categories.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.id).length,
  }));

export const getCategory = (id: CategoryId): Category | undefined =>
  categories.find((category) => category.id === id);

export const getCategoryLabel = (id: CategoryId): string =>
  categories.find((category) => category.id === id)?.label ?? '';

export const getNewArrivals = (limit = 8): Product[] => {
  const newProducts = products.filter((product) => product.badge === 'new');
  return newProducts.slice(0, limit);
};

export const getBestsellers = (limit = 8): Product[] => {
  const bestsellers = products.filter((product) => product.badge === 'bestseller');
  return bestsellers.slice(0, limit);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const fillers = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );
  return [...sameCategory, ...fillers].slice(0, limit);
};

export const searchProducts = (query: string, limit = 6): Product[] => {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  return products
    .filter((product) => {
      const haystack = normalizeText(
        `${product.name} ${product.latinName} ${getCategoryLabel(product.category)} ${product.material}`,
      );
      return haystack.includes(normalized);
    })
    .slice(0, limit);
};
