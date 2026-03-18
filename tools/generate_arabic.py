#!/usr/bin/env python3
"""
Generate all 65 Arabic tool files for 205 Tools website
"""

import os
import re

BASE_DIR = "/root/.openclaw/workspace/demo-site/tools"

# Translation dictionaries
TRANSLATIONS = {
    # Common UI
    "English": "English",
    "中文": "中文",
    "Español": "Español",
    "Français": "Français",
    "Deutsch": "Deutsch",
    "العربية": "العربية",
    "Part of 205 Tools Collection": "جزء من مجموعة أدوات 205",
    "205 Tools": "205 أدوات",
    
    # Buttons
    "Convert": "تحويل",
    "Generate": "إنشاء",
    "Check": "فحص",
    "Simulate": "محاكاة",
    "Extract": "استخراج",
    "Copy": "نسخ",
    "Calculate": "حساب",
    "Encode": "تشفير",
    "Decode": "فك التشفير",
    "Generate Password": "إنشاء كلمة مرور",
    "Check Strength": "فحص القوة",
    
    # Labels
    "Background Color": "لون الخلفية",
    "Text Color": "لون النص",
    "Pick a Color": "اختيار لون",
    "Base Color": "اللون الأساسي",
    "Input": "إدخال",
    "Output": "إخراج",
    "Result": "النتيجة",
    "Preview": "معاينة",
    
    # Color tool labels
    "C (0-100)": "س (0-100)",
    "M (0-100)": "م (0-100)",
    "Y (0-100)": "ص (0-100)",
    "K (0-100)": "ك (0-100)",
    "H (0-360)": "ت (0-360)",
    "S (0-100)": "ش (0-100)",
    "L (0-100)": "إ (0-100)",
    "R (0-255)": "أ (0-255)",
    "G (0-255)": "أخ (0-255)",
    "B (0-255)": "أز (0-255)",
    "HEX Color": "لون HEX",
    "Enter HEX Color": "أدخل لون HEX",
    "Palette Type": "نوع اللوحة",
    "Direction": "الاتجاه",
    "Type": "النوع",
    "Color": "اللون",
    "Pantone Code": "كود Pantone",
    
    # Palette types
    "Complementary": "تكميلي",
    "Analogous": "م analog",
    "Triadic": "ثلاثي",
    "Split Complementary": "تكميلي منقسم",
    "Tetradic": "رباعي",
    
    # Color blindness types
    "Protanopia (Red-blind)": "بروتانوبيا (عمى الأحمر)",
    "Deuteranopia (Green-blind)": "ديوتيرانوبيا (عمى الأخضر)",
    "Tritanopia (Blue-blind)": "تريتانوبيا (عمى الأزرق)",
    "Achromatopsia (Monochromacy)": "أكروماتوبسيا (أحادي اللون)",
    
    # Results
    "RGB": "RGB",
    "HSL": "HSL",
    "CMYK": "CMYK",
    "HEX": "HEX",
    "Contrast Ratio": "نسبة التباين",
    "CSS Code": "كود CSS",
    "Original": "الأصلي",
    "Simulated": "المحاكى",
    "Lighter Shades": "درجات أفتح",
    "Darker Shades": "درجات أغمق",
    "Sample Text": "نص عينة",
    
    # Data conversion labels
    "First row is header": "الصف الأول هو العنوان",
    "Input CSV": "إدخال CSV",
    "Output JSON": "إخراج JSON",
    "Input JSON": "إدخال JSON",
    "Output CSV": "إخراج CSV",
    "Input SQL": "إدخال SQL",
    "Output SQL": "إخراج SQL",
    "Input XML": "إدخال XML",
    "Output XML": "إخراج XML",
    "Input YAML": "إدخال YAML",
    "Output YAML": "إخراج YAML",
    "Input Excel": "إدخال Excel",
    "Output Excel": "إخراج Excel",
    
    # Date labels
    "Month": "الشهر",
    "Year": "السنة",
    "Date": "التاريخ",
    "Time": "الوقت",
    "Timezone": "المنطقة الزمنية",
    "Birth Date": "تاريخ الميلاد",
    "Target Date": "التاريخ المستهدف",
    "Start Date": "تاريخ البدء",
    "End Date": "تاريخ الانتهاء",
    "Calculate Age": "حساب العمر",
    "Calculate Difference": "حساب الفرق",
    "Generate Calendar": "إنشاء التقويم",
    
    # Months
    "January": "يناير",
    "February": "فبراير",
    "March": "مارس",
    "April": "أبريل",
    "May": "مايو",
    "June": "يونيو",
    "July": "يوليو",
    "August": "أغسطس",
    "September": "سبتمبر",
    "October": "أكتوبر",
    "November": "نوفمبر",
    "December": "ديسمبر",
    
    # Days
    "Sun": "أح",
    "Mon": "إث",
    "Tue": "ثل",
    "Wed": "أر",
    "Thu": "خم",
    "Fri": "جم",
    "Sat": "سب",
    
    # Math labels
    "Number": "الرقم",
    "Enter Number": "أدخل الرقم",
    "Binary": "ثنائي",
    "Hexadecimal": "ست عشري",
    "Decimal": "عشري",
    "Octal": "ثماني",
    "Percentage": "النسبة المئوية",
    "Value": "القيمة",
    "Total": "المجموع",
    "Part": "الجزء",
    "From": "من",
    "To": "إلى",
    "Amount": "المبلغ",
    "Currency": "العملة",
    "Roman Numeral": "الرقم الروماني",
    "Ratio": "النسبة",
    "Width": "العرض",
    "Height": "الارتفاع",
    "Min": "الحد الأدنى",
    "Max": "الحد الأقصى",
    
    # Security labels
    "Text": "النص",
    "Enter text to encode": "أدخل النص للتشفير",
    "Enter Base64 to decode": "أدخل Base64 لفك التشفير",
    "Result will appear here": "ستظهر النتيجة هنا",
    "Password Length": "طول كلمة المرور",
    "Include Uppercase": "تضمين حروف كبيرة",
    "Include Lowercase": "تضمين حروف صغيرة",
    "Include Numbers": "تضمين أرقام",
    "Include Symbols": "تضمين رموز",
    "Generated Password": "كلمة المرور المُنشأة",
    "Enter Password": "أدخل كلمة المرور",
    "Strength": "القوة",
    "Weak": "ضعيفة",
    "Medium": "متوسطة",
    "Strong": "قوية",
    "Very Strong": "قوية جداً",
    "Rounds": "الجولات",
    
    # Special labels
    "ASCII": "ASCII",
    "Text to Convert": "النص للتحويل",
    "Question": "السؤال",
    "Options": "الخواص",
    "Add Option": "إضافة خيار",
    "Flip": "قلب",
    "Coin Result": "نتيجة العملة",
    "Heads": "وجه",
    "Tails": "كتف",
    "Roll": "رمي",
    "Dice Result": "نتيجة النرد",
    "Text for QR": "النص لرمز QR",
    "Width (px)": "العرض (بكسل)",
    "Height (px)": "الارتفاع (بكسل)",
    "Upload Image": "رفع صورة",
    "First Name": "الاسم الأول",
    "Last Name": "الاسم الأخير",
    "Gender": "الجنس",
    "Male": "ذكر",
    "Female": "أنثى",
    "Generated Name": "الاسم المُنشأ",
    "Top Text": "النص العلوي",
    "Bottom Text": "النص السفلي",
    "Generate Meme": "إنشاء ميم",
}

# Tool titles and descriptions
TOOL_CONTENT = {
    # Color tools (15)
    "color/cmyk-to-rgb.html": {
        "title": "CMYK إلى RGB - 205 أدوات",
        "tool_title": "محول CMYK إلى RGB",
        "description": "تحويل قيم الألوان CMYK إلى RGB",
    },
    "color/color-blindness.html": {
        "title": "محاكي عمى الألوان - 205 أدوات",
        "tool_title": "محاكي عمى الألوان",
        "description": "محاكاة كيف تظهر الألوان للأشخاص المصابين بعمى الألوان",
    },
    "color/color-contrast.html": {
        "title": "فاحص تباين الألوان - 205 أدوات",
        "tool_title": "فاحص تباين الألوان",
        "description": "فحص نسبة التباين بين لونين لسهولة الوصول",
    },
    "color/color-palette.html": {
        "title": "مولد لوحات الألوان - 205 أدوات",
        "tool_title": "مولد لوحات الألوان",
        "description": "إنشاء لوحات ألوان متناسقة",
    },
    "color/color-picker.html": {
        "title": "منتقي الألوان - 205 أدوات",
        "tool_title": "منتقي الألوان",
        "description": "اختيار الألوان والتحويل بين الصيغ",
    },
    "color/color-shades.html": {
        "title": "مولد درجات الألوان - 205 أدوات",
        "tool_title": "مولد درجات الألوان",
        "description": "إنشاء درجات أفتح وأغمق لأي لون",
    },
    "color/gradient-generator.html": {
        "title": "مولد التدرجات CSS - 205 أدوات",
        "tool_title": "مولد التدرجات CSS",
        "description": "إنشاء تدرجات CSS جميلة",
    },
    "color/hex-to-hsl.html": {
        "title": "HEX إلى HSL - 205 أدوات",
        "tool_title": "محول HEX إلى HSL",
        "description": "تحويل أكواد HEX إلى قيم HSL",
    },
    "color/hex-to-rgb.html": {
        "title": "HEX إلى RGB - 205 أدوات",
        "tool_title": "محول HEX إلى RGB",
        "description": "تحويل أكواد HEX إلى قيم RGB",
    },
    "color/hsl-to-hex.html": {
        "title": "HSL إلى HEX - 205 أدوات",
        "tool_title": "محول HSL إلى HEX",
        "description": "تحويل قيم HSL إلى أكواد HEX",
    },
    "color/hsl-to-rgb.html": {
        "title": "HSL إلى RGB - 205 أدوات",
        "tool_title": "محول HSL إلى RGB",
        "description": "تحويل قيم HSL إلى صيغة RGB",
    },
    "color/image-colors.html": {
        "title": "مستخرج ألوان الصور - 205 أدوات",
        "tool_title": "مستخرج ألوان الصور",
        "description": "استخراج الألوان السائدة من الصور",
    },
    "color/pantone-to-hex.html": {
        "title": "Pantone إلى HEX - 205 أدوات",
        "tool_title": "محول Pantone إلى HEX",
        "description": "تحويل ألوان Pantone إلى أكواد HEX (تقريبي)",
    },
    "color/rgb-to-hex.html": {
        "title": "RGB إلى HEX - 205 أدوات",
        "tool_title": "محول RGB إلى HEX",
        "description": "تحويل قيم RGB إلى أكواد HEX",
    },
    "color/rgb-to-hsl.html": {
        "title": "RGB إلى HSL - 205 أدوات",
        "tool_title": "محول RGB إلى HSL",
        "description": "تحويل قيم RGB إلى صيغة HSL",
    },
    
    # Data tools (10)
    "data/csv-to-excel.html": {
        "title": "محول CSV إلى Excel",
        "tool_title": "محول CSV إلى Excel",
        "description": "تحويل ملفات CSV إلى Excel",
    },
    "data/csv-to-json.html": {
        "title": "محول CSV إلى JSON",
        "tool_title": "محول CSV إلى JSON",
        "description": "تحويل بيانات CSV إلى JSON",
    },
    "data/csv-to-sql.html": {
        "title": "محول CSV إلى SQL",
        "tool_title": "محول CSV إلى SQL",
        "description": "تحويل بيانات CSV إلى SQL",
    },
    "data/excel-to-csv.html": {
        "title": "محول Excel إلى CSV",
        "tool_title": "محول Excel إلى CSV",
        "description": "تحويل ملفات Excel إلى CSV",
    },
    "data/json-to-csv.html": {
        "title": "محول JSON إلى CSV",
        "tool_title": "محول JSON إلى CSV",
        "description": "تحويل بيانات JSON إلى CSV",
    },
    "data/json-to-xml.html": {
        "title": "محول JSON إلى XML",
        "tool_title": "محول JSON إلى XML",
        "description": "تحويل بيانات JSON إلى XML",
    },
    "data/json-to-yaml.html": {
        "title": "محول JSON إلى YAML",
        "tool_title": "محول JSON إلى YAML",
        "description": "تحويل بيانات JSON إلى YAML",
    },
    "data/sql-to-csv.html": {
        "title": "محول SQL إلى CSV",
        "tool_title": "محول SQL إلى CSV",
        "description": "تحويل بيانات SQL إلى CSV",
    },
    "data/xml-to-json.html": {
        "title": "محول XML إلى JSON",
        "tool_title": "محول XML إلى JSON",
        "description": "تحويل بيانات XML إلى JSON",
    },
    "data/yaml-to-json.html": {
        "title": "محول YAML إلى JSON",
        "tool_title": "محول YAML إلى JSON",
        "description": "تحويل بيانات YAML إلى JSON",
    },
    
    # Date tools (10)
    "date/age-calculator.html": {
        "title": "حاسبة العمر - 205 أدوات",
        "tool_title": "حاسبة العمر",
        "description": "حساب العمر من تاريخ الميلاد",
    },
    "date/birthday-calculator.html": {
        "title": "حاسبة عيد الميلاد - 205 أدوات",
        "tool_title": "حاسبة عيد الميلاد",
        "description": "حساب الوقت المتبقي حتى عيد الميلاد القادم",
    },
    "date/calendar.html": {
        "title": "مولد التقويم - 205 أدوات",
        "tool_title": "مولد التقويم",
        "description": "إنشاء تقويم شهري",
    },
    "date/countdown.html": {
        "title": "العد التنازلي - 205 أدوات",
        "tool_title": "العد التنازلي",
        "description": "إنشاء عد تنازلي للأحداث المهمة",
    },
    "date/date-difference.html": {
        "title": "فرق التواريخ - 205 أدوات",
        "tool_title": "حاسبة فرق التواريخ",
        "description": "حساب الفرق بين تاريخين",
    },
    "date/day-of-week.html": {
        "title": "يوم الأسبوع - 205 أدوات",
        "tool_title": "حاسبة يوم الأسبوع",
        "description": "معرفة يوم الأسبوع لأي تاريخ",
    },
    "date/stopwatch.html": {
        "title": "ساعة التوقيف - 205 أدوات",
        "tool_title": "ساعة التوقيف",
        "description": "ساعة توقيف بسيطة",
    },
    "date/timezone.html": {
        "title": "محول المناطق الزمنية - 205 أدوات",
        "tool_title": "محول المناطق الزمنية",
        "description": "تحويل الوقت بين المناطق الزمنية المختلفة",
    },
    "date/unix-timestamp.html": {
        "title": "محول Unix Timestamp - 205 أدوات",
        "tool_title": "محول Unix Timestamp",
        "description": "تحويل بين Unix timestamp والتاريخ",
    },
    "date/working-days.html": {
        "title": "حاسبة أيام العمل - 205 أدوات",
        "tool_title": "حاسبة أيام العمل",
        "description": "حساب أيام العمل بين تاريخين",
    },
    
    # Math tools (12)
    "math/binary.html": {
        "title": "محول النظام الثنائي - 205 أدوات",
        "tool_title": "محول النظام الثنائي",
        "description": "تحويل بين الثنائي والعشري والست عشري",
    },
    "math/calculator.html": {
        "title": "آلة حاسبة - 205 أدوات",
        "tool_title": "الآلة الحاسبة",
        "description": "آلة حاسبة أساسية",
    },
    "math/currency.html": {
        "title": "محول العملات - 205 أدوات",
        "tool_title": "محول العملات",
        "description": "تحويل بين العملات المختلفة",
    },
    "math/factorial.html": {
        "title": "حاسبة العاملي - 205 أدوات",
        "tool_title": "حاسبة العاملي",
        "description": "حساب مضروب الأعداد",
    },
    "math/fibonacci.html": {
        "title": "حاسبة فيبوناتشي - 205 أدوات",
        "tool_title": "حاسبة فيبوناتشي",
        "description": "إنشاء متتالية فيبوناتشي",
    },
    "math/hex-calculator.html": {
        "title": "آلة حاسبة ست عشرية - 205 أدوات",
        "tool_title": "الآلة الحاسبة الست عشرية",
        "description": "آلة حاسبة للأرقام الست عشرية",
    },
    "math/percentage.html": {
        "title": "حاسبة النسبة المئوية - 205 أدوات",
        "tool_title": "حاسبة النسبة المئوية",
        "description": "حساب النسب المئوية",
    },
    "math/prime-checker.html": {
        "title": "فاحص الأعداد الأولية - 205 أدوات",
        "tool_title": "فاحص الأعداد الأولية",
        "description": "التحقق مما إذا كان الرقم أولياً",
    },
    "math/random-number.html": {
        "title": "مولد الأرقام العشوائية - 205 أدوات",
        "tool_title": "مولد الأرقام العشوائية",
        "description": "توليد أرقام عشوائية",
    },
    "math/ratio.html": {
        "title": "حاسبة النسب - 205 أدوات",
        "tool_title": "حاسبة النسب",
        "description": "حساب النسب وتبسيطها",
    },
    "math/roman-numerals.html": {
        "title": "الأرقام الرومانية - 205 أدوات",
        "tool_title": "محول الأرقام الرومانية",
        "description": "التحويل بين الأرقام العربية والرومانية",
    },
    "math/scientific-calculator.html": {
        "title": "الآلة الحاسبة العلمية - 205 أدوات",
        "tool_title": "الآلة الحاسبة العلمية",
        "description": "آلة حاسبة علمية متقدمة",
    },
    
    # Security tools (8)
    "security/base64.html": {
        "title": "Base64 تشفير/فك تشفير",
        "tool_title": "Base64 تشفير/فك تشفير",
        "description": "تشفير وفك تشفير النصوص باستخدام Base64",
    },
    "security/bcrypt-generator.html": {
        "title": "مولد Bcrypt",
        "tool_title": "مولد Bcrypt",
        "description": "إنشاء تجزئات Bcrypt لكلمات المرور",
    },
    "security/html-entity.html": {
        "title": "محول كيانات HTML",
        "tool_title": "محول كيانات HTML",
        "description": "تحويل النص إلى كيانات HTML",
    },
    "security/md5-generator.html": {
        "title": "مولد MD5",
        "tool_title": "مولد MD5",
        "description": "إنشاء تجزئات MD5",
    },
    "security/password-generator.html": {
        "title": "مولد كلمات المرور",
        "tool_title": "مولد كلمات المرور",
        "description": "إنشاء كلمات مرور آمنة وعشوائية",
    },
    "security/password-strength.html": {
        "title": "فاحص قوة كلمة المرور",
        "tool_title": "فاحص قوة كلمة المرور",
        "description": "فحص قوة كلمة المرور",
    },
    "security/sha256-generator.html": {
        "title": "مولد SHA256",
        "tool_title": "مولد SHA256",
        "description": "إنشاء تجزئات SHA256",
    },
    "security/url-encode.html": {
        "title": "ترميز/فك ترميز URL",
        "tool_title": "ترميز/فك ترميز URL",
        "description": "ترميز وفك ترميز عناوين URL",
    },
    
    # Special tools (10)
    "special/ascii-to-text.html": {
        "title": "ASCII إلى نص - 205 أدوات",
        "tool_title": "محول ASCII إلى نص",
        "description": "تحويل أكواد ASCII إلى نص",
    },
    "special/barcode-generator.html": {
        "title": "مولد الباركود - 205 أدوات",
        "tool_title": "مولد الباركود",
        "description": "إنشاء باركود من النص",
    },
    "special/decision-maker.html": {
        "title": "صانع القرار - 205 أدوات",
        "tool_title": "صانع القرار",
        "description": "اتخاذ قرارات عشوائية",
    },
    "special/flip-coin.html": {
        "title": "قلب العملة - 205 أدوات",
        "tool_title": "قلب العملة",
        "description": "قلب عملة عشوائي",
    },
    "special/meme-generator.html": {
        "title": "مولد الميمات - 205 أدوات",
        "tool_title": "مولد الميمات",
        "description": "إنشاء صور ميم",
    },
    "special/name-generator.html": {
        "title": "مولد الأسماء - 205 أدوات",
        "tool_title": "مولد الأسماء",
        "description": "إنشاء أسماء عشوائية",
    },
    "special/qr-generator.html": {
        "title": "مولد رموز QR - 205 أدوات",
        "tool_title": "مولد رموز QR",
        "description": "إنشاء رموز QR من النصوص",
    },
    "special/qr-reader.html": {
        "title": "قارئ رموز QR - 205 أدوات",
        "tool_title": "قارئ رموز QR",
        "description": "قراءة وفك رموز QR",
    },
    "special/roll-dice.html": {
        "title": "رمي النرد - 205 أدوات",
        "tool_title": "رمي النرد",
        "description": "رمي نرد عشوائي",
    },
    "special/text-to-ascii.html": {
        "title": "نص إلى ASCII - 205 أدوات",
        "tool_title": "محول النص إلى ASCII",
        "description": "تحويل النص إلى أكواد ASCII",
    },
}

def translate_text(text):
    """Translate text using the translation dictionary"""
    for en, ar in TRANSLATIONS.items():
        text = text.replace(en, ar)
    return text

def create_arabic_version(en_path, ar_path):
    """Create Arabic version of an HTML file"""
    with open(en_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Get relative path for the tool
    rel_path = os.path.relpath(ar_path, BASE_DIR)
    tool_key = rel_path.replace('ar/', '').replace('.html', '') + '.html'
    
    # Get tool info
    tool_info = TOOL_CONTENT.get(tool_key, {
        "title": "205 أدوات",
        "tool_title": "أداة",
        "description": "أداة مساعدة",
    })
    
    # Update HTML lang
    content = content.replace('lang="en"', 'lang="ar" dir="rtl"')
    
    # Update title
    if '<title>' in content:
        content = re.sub(r'<title>.*?</title>', f'<title>{tool_info["title"]}</title>', content)
    
    # Update tool title and description
    if 'tool-title' in content:
        content = re.sub(r'<h2 class="tool-title">.*?</h2>', f'<h2 class="tool-title">{tool_info["tool_title"]}</h2>', content)
    if 'tool-description' in content:
        content = re.sub(r'<p class="tool-description">.*?</p>', f'<p class="tool-description">{tool_info["description"]}</p>', content)
    
    # Update language selector - replace existing one with one that includes Arabic
    lang_selector_pattern = r'<div class="language-selector">.*?</div>'
    new_selector = '''<div class="language-selector">
        <select onchange="changeLang(this.value)">
            <option value="ar" selected>العربية</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
        </select>
    </div>'''
    content = re.sub(lang_selector_pattern, new_selector, content, flags=re.DOTALL)
    
    # Update lang switch for standalone tools
    lang_switch_pattern = r'<div class="lang-switch">.*?</div>'
    new_switch = '''<div class="lang-switch">
        <a href="ar/{filename}" class="active">AR</a>
        <a href="en/{filename}">EN</a>
        <a href="zh/{filename}">中文</a>
        <a href="es/{filename}">ES</a>
        <a href="fr/{filename}">FR</a>
        <a href="de/{filename}">DE</a>
    </div>'''
    
    filename = os.path.basename(ar_path)
    new_switch = new_switch.format(filename=filename)
    content = re.sub(lang_switch_pattern, new_switch, content, flags=re.DOTALL)
    
    # Update changeLang function to include ar
    content = content.replace(
        "path.replace(/\\/(en|zh|es|fr|de)\\//, '/' + lang + '/')",
        "path.replace(/\\/(en|zh|es|fr|de|ar)\\//, '/' + lang + '/')"
    )
    
    # Translate labels and buttons
    content = translate_text(content)
    
    # Write Arabic file
    os.makedirs(os.path.dirname(ar_path), exist_ok=True)
    with open(ar_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """Generate all Arabic tool files"""
    categories = {
        "color": 15,
        "data": 10,
        "date": 10,
        "math": 12,
        "security": 8,
        "special": 10,
    }
    
    created = 0
    errors = []
    
    for category, count in categories.items():
        en_dir = os.path.join(BASE_DIR, category, "en")
        ar_dir = os.path.join(BASE_DIR, "ar", category)
        
        if not os.path.exists(en_dir):
            errors.append(f"Missing English directory: {en_dir}")
            continue
        
        for filename in os.listdir(en_dir):
            if filename.endswith('.html'):
                en_path = os.path.join(en_dir, filename)
                ar_path = os.path.join(ar_dir, filename)
                
                try:
                    if create_arabic_version(en_path, ar_path):
                        created += 1
                        print(f"✓ Created: ar/{category}/{filename}")
                except Exception as e:
                    errors.append(f"Error creating ar/{category}/{filename}: {str(e)}")
    
    print(f"\n{'='*50}")
    print(f"Total files created: {created}")
    if errors:
        print(f"Errors: {len(errors)}")
        for err in errors[:5]:
            print(f"  - {err}")
    
    return created, errors

if __name__ == "__main__":
    main()
