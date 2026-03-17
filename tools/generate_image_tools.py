#!/usr/bin/env python3
"""
205-tools Image Conversion Suite Generator
Generates 160 HTML files (32 tools × 5 languages)
"""

import os

# Language configurations
LANGUAGES = {
    'en': {
        'name': 'English',
        'dir': 'ltr',
        'font': 'DM Sans',
        'translations': {
            'home': 'Home',
            'tools': 'Tools',
            'about': 'About',
            'contact': 'Contact',
            'upload_drop': 'Drop your image here or click to browse',
            'upload_hint': 'Supports various image formats',
            'convert': 'Convert',
            'processing': 'Processing...',
            'download': 'Download',
            'reset': 'Reset',
            'quality': 'Quality',
            'size': 'Size',
            'format': 'Format',
            'width': 'Width',
            'height': 'Height',
            'remove_file': 'Remove file',
            'drag_drop_hint': 'Drag & drop files here',
            'choose_file': 'Choose File',
            'result': 'Result',
            'success': 'Success!',
            'error': 'Error',
            'preview': 'Preview',
            'options': 'Options',
            'text': 'Text',
            'position': 'Position',
            'top_left': 'Top Left',
            'top_right': 'Top Right',
            'bottom_left': 'Bottom Left',
            'bottom_right': 'Bottom Right',
            'center': 'Center',
            'opacity': 'Opacity',
            'color': 'Color',
            'angle': 'Angle',
            'horizontal': 'Horizontal',
            'vertical': 'Vertical',
            'crop': 'Crop',
            'rotate': 'Rotate',
            'flip': 'Flip',
            'resize': 'Resize',
            'original': 'Original',
            'output': 'Output',
            'rows': 'Rows',
            'columns': 'Columns',
            'split': 'Split',
            'compress': 'Compress',
            'compressing': 'Compressing...',
            'select_files': 'Select Files',
            'files_selected': 'files selected',
            'clear_all': 'Clear All',
            'convert_all': 'Convert All',
            'processing_file': 'Processing file',
            'of': 'of',
            'target_color': 'Target Color',
            'replacement_color': 'Replacement Color',
            'tolerance': 'Tolerance',
            'replace': 'Replace',
            'background_color': 'Background Color',
            'auto_detect': 'Auto Detect',
            'remove_bg': 'Remove Background',
            'removing': 'Removing...',
            'watermark_text': 'Watermark Text',
            'font_size': 'Font Size',
            'add_watermark': 'Add Watermark',
            'base64_output': 'Base64 Output',
            'copy': 'Copy',
            'copied': 'Copied!',
            'paste_base64': 'Paste Base64 here',
            'decode': 'Decode',
            'privacy_notice': 'Your images are processed locally in your browser.',
            'footer_copyright': '© 2025 205-tools. All rights reserved.',
            'footer_privacy': 'Privacy Policy',
            'footer_terms': 'Terms of Service',
        }
    },
    'ar': {
        'name': 'العربية',
        'dir': 'rtl',
        'font': 'Tajawal',
        'translations': {
            'home': 'الرئيسية',
            'tools': 'الأدوات',
            'about': 'عن الموقع',
            'contact': 'اتصل بنا',
            'upload_drop': 'اسحب الصورة هنا أو انقر للتصفح',
            'upload_hint': 'يدعم تنسيقات الصور المختلفة',
            'convert': 'تحويل',
            'processing': 'جاري المعالجة...',
            'download': 'تحميل',
            'reset': 'إعادة تعيين',
            'quality': 'الجودة',
            'size': 'الحجم',
            'format': 'التنسيق',
            'width': 'العرض',
            'height': 'الارتفاع',
            'remove_file': 'إزالة الملف',
            'drag_drop_hint': 'اسحب الملفات وأفلتها هنا',
            'choose_file': 'اختيار ملف',
            'result': 'النتيجة',
            'success': 'تم بنجاح!',
            'error': 'خطأ',
            'preview': 'معاينة',
            'options': 'الخيارات',
            'text': 'النص',
            'position': 'الموقع',
            'top_left': 'أعلى اليسار',
            'top_right': 'أعلى اليمين',
            'bottom_left': 'أسفل اليسار',
            'bottom_right': 'أسفل اليمين',
            'center': 'الوسط',
            'opacity': 'الشفافية',
            'color': 'اللون',
            'angle': 'الزاوية',
            'horizontal': 'أفقي',
            'vertical': 'عمودي',
            'crop': 'قص',
            'rotate': 'تدوير',
            'flip': 'قلب',
            'resize': 'تغيير الحجم',
            'original': 'الأصلي',
            'output': 'المخرج',
            'rows': 'الصفوف',
            'columns': 'الأعمدة',
            'split': 'تقسيم',
            'compress': 'ضغط',
            'compressing': 'جاري الضغط...',
            'select_files': 'اختيار الملفات',
            'files_selected': 'ملفات محددة',
            'clear_all': 'مسح الكل',
            'convert_all': 'تحويل الكل',
            'processing_file': 'جاري معالجة الملف',
            'of': 'من',
            'target_color': 'اللون المستهدف',
            'replacement_color': 'لون الاستبدال',
            'tolerance': 'التسامح',
            'replace': 'استبدال',
            'background_color': 'لون الخلفية',
            'auto_detect': 'اكتشاف تلقائي',
            'remove_bg': 'إزالة الخلفية',
            'removing': 'جاري الإزالة...',
            'watermark_text': 'نص العلامة المائية',
            'font_size': 'حجم الخط',
            'add_watermark': 'إضافة علامة مائية',
            'base64_output': 'مخرج Base64',
            'copy': 'نسخ',
            'copied': 'تم النسخ!',
            'paste_base64': 'ألصق Base64 هنا',
            'decode': 'فك التشفير',
            'privacy_notice': 'تتم معالجة صورك محلياً في متصفحك.',
            'footer_copyright': '© 2025 205-tools. جميع الحقوق محفوظة.',
            'footer_privacy': 'سياسة الخصوصية',
            'footer_terms': 'شروط الخدمة',
        }
    },
    'fr': {
        'name': 'Français',
        'dir': 'ltr',
        'font': 'DM Sans',
        'translations': {
            'home': 'Accueil',
            'tools': 'Outils',
            'about': 'À propos',
            'contact': 'Contact',
            'upload_drop': 'Déposez votre image ici ou cliquez pour parcourir',
            'upload_hint': 'Prend en charge divers formats d\'image',
            'convert': 'Convertir',
            'processing': 'Traitement...',
            'download': 'Télécharger',
            'reset': 'Réinitialiser',
            'quality': 'Qualité',
            'size': 'Taille',
            'format': 'Format',
            'width': 'Largeur',
            'height': 'Hauteur',
            'remove_file': 'Supprimer le fichier',
            'drag_drop_hint': 'Glissez-déposez les fichiers ici',
            'choose_file': 'Choisir un fichier',
            'result': 'Résultat',
            'success': 'Succès!',
            'error': 'Erreur',
            'preview': 'Aperçu',
            'options': 'Options',
            'text': 'Texte',
            'position': 'Position',
            'top_left': 'Haut Gauche',
            'top_right': 'Haut Droite',
            'bottom_left': 'Bas Gauche',
            'bottom_right': 'Bas Droite',
            'center': 'Centre',
            'opacity': 'Opacité',
            'color': 'Couleur',
            'angle': 'Angle',
            'horizontal': 'Horizontal',
            'vertical': 'Vertical',
            'crop': 'Recadrer',
            'rotate': 'Pivoter',
            'flip': 'Retourner',
            'resize': 'Redimensionner',
            'original': 'Original',
            'output': 'Sortie',
            'rows': 'Lignes',
            'columns': 'Colonnes',
            'split': 'Diviser',
            'compress': 'Compresser',
            'compressing': 'Compression...',
            'select_files': 'Sélectionner des fichiers',
            'files_selected': 'fichiers sélectionnés',
            'clear_all': 'Tout effacer',
            'convert_all': 'Tout convertir',
            'processing_file': 'Traitement du fichier',
            'of': 'sur',
            'target_color': 'Couleur cible',
            'replacement_color': 'Couleur de remplacement',
            'tolerance': 'Tolérance',
            'replace': 'Remplacer',
            'background_color': 'Couleur d\'arrière-plan',
            'auto_detect': 'Détection auto',
            'remove_bg': 'Supprimer l\'arrière-plan',
            'removing': 'Suppression...',
            'watermark_text': 'Texte du filigrane',
            'font_size': 'Taille de police',
            'add_watermark': 'Ajouter un filigrane',
            'base64_output': 'Sortie Base64',
            'copy': 'Copier',
            'copied': 'Copié!',
            'paste_base64': 'Collez Base64 ici',
            'decode': 'Décoder',
            'privacy_notice': 'Vos images sont traitées localement dans votre navigateur.',
            'footer_copyright': '© 2025 205-tools. Tous droits réservés.',
            'footer_privacy': 'Politique de confidentialité',
            'footer_terms': 'Conditions d\'utilisation',
        }
    },
    'es': {
        'name': 'Español',
        'dir': 'ltr',
        'font': 'DM Sans',
        'translations': {
            'home': 'Inicio',
            'tools': 'Herramientas',
            'about': 'Acerca de',
            'contact': 'Contacto',
            'upload_drop': 'Arrastra tu imagen aquí o haz clic para buscar',
            'upload_hint': 'Soporta varios formatos de imagen',
            'convert': 'Convertir',
            'processing': 'Procesando...',
            'download': 'Descargar',
            'reset': 'Reiniciar',
            'quality': 'Calidad',
            'size': 'Tamaño',
            'format': 'Formato',
            'width': 'Ancho',
            'height': 'Altura',
            'remove_file': 'Eliminar archivo',
            'drag_drop_hint': 'Arrastra y suelta archivos aquí',
            'choose_file': 'Elegir archivo',
            'result': 'Resultado',
            'success': '¡Éxito!',
            'error': 'Error',
            'preview': 'Vista previa',
            'options': 'Opciones',
            'text': 'Texto',
            'position': 'Posición',
            'top_left': 'Arriba Izquierda',
            'top_right': 'Arriba Derecha',
            'bottom_left': 'Abajo Izquierda',
            'bottom_right': 'Abajo Derecha',
            'center': 'Centro',
            'opacity': 'Opacidad',
            'color': 'Color',
            'angle': 'Ángulo',
            'horizontal': 'Horizontal',
            'vertical': 'Vertical',
            'crop': 'Recortar',
            'rotate': 'Rotar',
            'flip': 'Voltear',
            'resize': 'Redimensionar',
            'original': 'Original',
            'output': 'Salida',
            'rows': 'Filas',
            'columns': 'Columnas',
            'split': 'Dividir',
            'compress': 'Comprimir',
            'compressing': 'Comprimiendo...',
            'select_files': 'Seleccionar archivos',
            'files_selected': 'archivos seleccionados',
            'clear_all': 'Borrar todo',
            'convert_all': 'Convertir todo',
            'processing_file': 'Procesando archivo',
            'of': 'de',
            'target_color': 'Color objetivo',
            'replacement_color': 'Color de reemplazo',
            'tolerance': 'Tolerancia',
            'replace': 'Reemplazar',
            'background_color': 'Color de fondo',
            'auto_detect': 'Detección automática',
            'remove_bg': 'Eliminar fondo',
            'removing': 'Eliminando...',
            'watermark_text': 'Texto de marca de agua',
            'font_size': 'Tamaño de fuente',
            'add_watermark': 'Agregar marca de agua',
            'base64_output': 'Salida Base64',
            'copy': 'Copiar',
            'copied': '¡Copiado!',
            'paste_base64': 'Pega Base64 aquí',
            'decode': 'Decodificar',
            'privacy_notice': 'Tus imágenes se procesan localmente en tu navegador.',
            'footer_copyright': '© 2025 205-tools. Todos los derechos reservados.',
            'footer_privacy': 'Política de privacidad',
            'footer_terms': 'Términos de servicio',
        }
    },
    'de': {
        'name': 'Deutsch',
        'dir': 'ltr',
        'font': 'DM Sans',
        'translations': {
            'home': 'Startseite',
            'tools': 'Werkzeuge',
            'about': 'Über uns',
            'contact': 'Kontakt',
            'upload_drop': 'Bild hier ablegen oder zum Durchsuchen klicken',
            'upload_hint': 'Unterstützt verschiedene Bildformate',
            'convert': 'Konvertieren',
            'processing': 'Verarbeitung...',
            'download': 'Herunterladen',
            'reset': 'Zurücksetzen',
            'quality': 'Qualität',
            'size': 'Größe',
            'format': 'Format',
            'width': 'Breite',
            'height': 'Höhe',
            'remove_file': 'Datei entfernen',
            'drag_drop_hint': 'Dateien hier ablegen',
            'choose_file': 'Datei wählen',
            'result': 'Ergebnis',
            'success': 'Erfolg!',
            'error': 'Fehler',
            'preview': 'Vorschau',
            'options': 'Optionen',
            'text': 'Text',
            'position': 'Position',
            'top_left': 'Oben Links',
            'top_right': 'Oben Rechts',
            'bottom_left': 'Unten Links',
            'bottom_right': 'Unten Rechts',
            'center': 'Mitte',
            'opacity': 'Deckkraft',
            'color': 'Farbe',
            'angle': 'Winkel',
            'horizontal': 'Horizontal',
            'vertical': 'Vertikal',
            'crop': 'Zuschneiden',
            'rotate': 'Drehen',
            'flip': 'Spiegeln',
            'resize': 'Größe ändern',
            'original': 'Original',
            'output': 'Ausgabe',
            'rows': 'Zeilen',
            'columns': 'Spalten',
            'split': 'Teilen',
            'compress': 'Komprimieren',
            'compressing': 'Komprimierung...',
            'select_files': 'Dateien auswählen',
            'files_selected': 'Dateien ausgewählt',
            'clear_all': 'Alle löschen',
            'convert_all': 'Alle konvertieren',
            'processing_file': 'Verarbeite Datei',
            'of': 'von',
            'target_color': 'Zielfarbe',
            'replacement_color': 'Ersatzfarbe',
            'tolerance': 'Toleranz',
            'replace': 'Ersetzen',
            'background_color': 'Hintergrundfarbe',
            'auto_detect': 'Automatisch erkennen',
            'remove_bg': 'Hintergrund entfernen',
            'removing': 'Entfernung...',
            'watermark_text': 'Wasserzeichentext',
            'font_size': 'Schriftgröße',
            'add_watermark': 'Wasserzeichen hinzufügen',
            'base64_output': 'Base64-Ausgabe',
            'copy': 'Kopieren',
            'copied': 'Kopiert!',
            'paste_base64': 'Base64 hier einfügen',
            'decode': 'Dekodieren',
            'privacy_notice': 'Ihre Bilder werden lokal in Ihrem Browser verarbeitet.',
            'footer_copyright': '© 2025 205-tools. Alle Rechte vorbehalten.',
            'footer_privacy': 'Datenschutzrichtlinie',
            'footer_terms': 'Nutzungsbedingungen',
        }
    }
}

# Tool definitions with their specific configurations
TOOLS = [
    {
        'id': 'jpg-to-png',
        'icon': '🖼️',
        'title': {
            'en': 'JPG to PNG Converter',
            'ar': 'محول JPG إلى PNG',
            'fr': 'Convertisseur JPG vers PNG',
            'es': 'Convertidor JPG a PNG',
            'de': 'JPG zu PNG Konverter'
        },
        'description': {
            'en': 'Convert JPG images to PNG format with transparency support.',
            'ar': 'تحويل صور JPG إلى تنسيق PNG مع دعم الشفافية.',
            'fr': 'Convertissez les images JPG au format PNG avec support de la transparence.',
            'es': 'Convierte imágenes JPG a formato PNG con soporte de transparencia.',
            'de': 'Konvertieren Sie JPG-Bilder in das PNG-Format mit Transparenzunterstützung.'
        },
        'accepted_types': 'image/jpeg,image/jpg',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'jpg-to-webp',
        'icon': '🌐',
        'title': {
            'en': 'JPG to WebP Converter',
            'ar': 'محول JPG إلى WebP',
            'fr': 'Convertisseur JPG vers WebP',
            'es': 'Convertidor JPG a WebP',
            'de': 'JPG zu WebP Konverter'
        },
        'description': {
            'en': 'Convert JPG images to WebP for smaller file sizes.',
            'ar': 'تحويل صور JPG إلى WebP لأحجام ملفات أصغر.',
            'fr': 'Convertissez les images JPG en WebP pour des fichiers plus petits.',
            'es': 'Convierte imágenes JPG a WebP para tamaños de archivo más pequeños.',
            'de': 'Konvertieren Sie JPG-Bilder in WebP für kleinere Dateigrößen.'
        },
        'accepted_types': 'image/jpeg,image/jpg',
        'output_format': 'webp',
        'mime_type': 'image/webp'
    },
    {
        'id': 'png-to-jpg',
        'icon': '📷',
        'title': {
            'en': 'PNG to JPG Converter',
            'ar': 'محول PNG إلى JPG',
            'fr': 'Convertisseur PNG vers JPG',
            'es': 'Convertidor PNG a JPG',
            'de': 'PNG zu JPG Konverter'
        },
        'description': {
            'en': 'Convert PNG images to JPG format.',
            'ar': 'تحويل صور PNG إلى تنسيق JPG.',
            'fr': 'Convertissez les images PNG au format JPG.',
            'es': 'Convierte imágenes PNG a formato JPG.',
            'de': 'Konvertieren Sie PNG-Bilder in das JPG-Format.'
        },
        'accepted_types': 'image/png',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'png-to-webp',
        'icon': '🌐',
        'title': {
            'en': 'PNG to WebP Converter',
            'ar': 'محول PNG إلى WebP',
            'fr': 'Convertisseur PNG vers WebP',
            'es': 'Convertidor PNG a WebP',
            'de': 'PNG zu WebP Konverter'
        },
        'description': {
            'en': 'Convert PNG images to WebP with transparency.',
            'ar': 'تحويل صور PNG إلى WebP مع الشفافية.',
            'fr': 'Convertissez les images PNG en WebP avec transparence.',
            'es': 'Convierte imágenes PNG a WebP con transparencia.',
            'de': 'Konvertieren Sie PNG-Bilder in WebP mit Transparenz.'
        },
        'accepted_types': 'image/png',
        'output_format': 'webp',
        'mime_type': 'image/webp'
    },
    {
        'id': 'webp-to-jpg',
        'icon': '📷',
        'title': {
            'en': 'WebP to JPG Converter',
            'ar': 'محول WebP إلى JPG',
            'fr': 'Convertisseur WebP vers JPG',
            'es': 'Convertidor WebP a JPG',
            'de': 'WebP zu JPG Konverter'
        },
        'description': {
            'en': 'Convert WebP images to JPG format.',
            'ar': 'تحويل صور WebP إلى تنسيق JPG.',
            'fr': 'Convertissez les images WebP au format JPG.',
            'es': 'Convierte imágenes WebP a formato JPG.',
            'de': 'Konvertieren Sie WebP-Bilder in das JPG-Format.'
        },
        'accepted_types': 'image/webp',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'webp-to-png',
        'icon': '🖼️',
        'title': {
            'en': 'WebP to PNG Converter',
            'ar': 'محول WebP إلى PNG',
            'fr': 'Convertisseur WebP vers PNG',
            'es': 'Convertidor WebP a PNG',
            'de': 'WebP zu PNG Konverter'
        },
        'description': {
            'en': 'Convert WebP images to PNG format with transparency.',
            'ar': 'تحويل صور WebP إلى تنسيق PNG مع الشفافية.',
            'fr': 'Convertissez les images WebP au format PNG avec transparence.',
            'es': 'Convierte imágenes WebP a formato PNG con transparencia.',
            'de': 'Konvertieren Sie WebP-Bilder in das PNG-Format mit Transparenz.'
        },
        'accepted_types': 'image/webp',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'heic-to-jpg',
        'icon': '📱',
        'title': {
            'en': 'HEIC to JPG Converter',
            'ar': 'محول HEIC إلى JPG',
            'fr': 'Convertisseur HEIC vers JPG',
            'es': 'Convertidor HEIC a JPG',
            'de': 'HEIC zu JPG Konverter'
        },
        'description': {
            'en': 'Convert iPhone HEIC photos to JPG format.',
            'ar': 'تحويل صور HEIC من iPhone إلى تنسيق JPG.',
            'fr': 'Convertissez les photos HEIC de l\'iPhone au format JPG.',
            'es': 'Convierte fotos HEIC de iPhone a formato JPG.',
            'de': 'Konvertieren Sie iPhone-HEIC-Fotos in das JPG-Format.'
        },
        'accepted_types': 'image/heic,image/heif',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'avif-to-jpg',
        'icon': '📷',
        'title': {
            'en': 'AVIF to JPG Converter',
            'ar': 'محول AVIF إلى JPG',
            'fr': 'Convertisseur AVIF vers JPG',
            'es': 'Convertidor AVIF a JPG',
            'de': 'AVIF zu JPG Konverter'
        },
        'description': {
            'en': 'Convert AVIF images to JPG format.',
            'ar': 'تحويل صور AVIF إلى تنسيق JPG.',
            'fr': 'Convertissez les images AVIF au format JPG.',
            'es': 'Convierte imágenes AVIF a formato JPG.',
            'de': 'Konvertieren Sie AVIF-Bilder in das JPG-Format.'
        },
        'accepted_types': 'image/avif',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'bmp-to-png',
        'icon': '🖼️',
        'title': {
            'en': 'BMP to PNG Converter',
            'ar': 'محول BMP إلى PNG',
            'fr': 'Convertisseur BMP vers PNG',
            'es': 'Convertidor BMP a PNG',
            'de': 'BMP zu PNG Konverter'
        },
        'description': {
            'en': 'Convert BMP images to PNG format.',
            'ar': 'تحويل صور BMP إلى تنسيق PNG.',
            'fr': 'Convertissez les images BMP au format PNG.',
            'es': 'Convierte imágenes BMP a formato PNG.',
            'de': 'Konvertieren Sie BMP-Bilder in das PNG-Format.'
        },
        'accepted_types': 'image/bmp',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'tiff-to-jpg',
        'icon': '📷',
        'title': {
            'en': 'TIFF to JPG Converter',
            'ar': 'محول TIFF إلى JPG',
            'fr': 'Convertisseur TIFF vers JPG',
            'es': 'Convertidor TIFF a JPG',
            'de': 'TIFF zu JPG Konverter'
        },
        'description': {
            'en': 'Convert TIFF images to JPG format.',
            'ar': 'تحويل صور TIFF إلى تنسيق JPG.',
            'fr': 'Convertissez les images TIFF au format JPG.',
            'es': 'Convierte imágenes TIFF a formato JPG.',
            'de': 'Konvertieren Sie TIFF-Bilder in das JPG-Format.'
        },
        'accepted_types': 'image/tiff',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'gif-to-mp4',
        'icon': '🎬',
        'title': {
            'en': 'GIF to MP4 Converter',
            'ar': 'محول GIF إلى MP4',
            'fr': 'Convertisseur GIF vers MP4',
            'es': 'Convertidor GIF a MP4',
            'de': 'GIF zu MP4 Konverter'
        },
        'description': {
            'en': 'Convert animated GIFs to MP4 video format.',
            'ar': 'تحويل صور GIF المتحركة إلى تنسيق فيديو MP4.',
            'fr': 'Convertissez les GIFs animés en format vidéo MP4.',
            'es': 'Convierte GIFs animados a formato de video MP4.',
            'de': 'Konvertieren Sie animierte GIFs in das MP4-Videoformat.'
        },
        'accepted_types': 'image/gif',
        'output_format': 'mp4',
        'mime_type': 'video/mp4'
    },
    {
        'id': 'image-to-base64',
        'icon': '🔢',
        'title': {
            'en': 'Image to Base64',
            'ar': 'صورة إلى Base64',
            'fr': 'Image vers Base64',
            'es': 'Imagen a Base64',
            'de': 'Bild zu Base64'
        },
        'description': {
            'en': 'Convert images to Base64 encoded strings.',
            'ar': 'تحويل الصور إلى سلاسل مشفرة Base64.',
            'fr': 'Convertissez les images en chaînes encodées Base64.',
            'es': 'Convierte imágenes a cadenas codificadas Base64.',
            'de': 'Konvertieren Sie Bilder in Base64-codierte Zeichenfolgen.'
        },
        'accepted_types': 'image/*',
        'output_format': 'txt',
        'mime_type': 'text/plain'
    },
    {
        'id': 'base64-to-image',
        'icon': '🖼️',
        'title': {
            'en': 'Base64 to Image',
            'ar': 'Base64 إلى صورة',
            'fr': 'Base64 vers Image',
            'es': 'Base64 a Imagen',
            'de': 'Base64 zu Bild'
        },
        'description': {
            'en': 'Decode Base64 strings back to images.',
            'ar': 'فك تشفير سلاسل Base64 إلى صور.',
            'fr': 'Décodez les chaînes Base64 en images.',
            'es': 'Decodifica cadenas Base64 a imágenes.',
            'de': 'Dekodieren Sie Base64-Zeichenfolgen zurück zu Bildern.'
        },
        'accepted_types': 'text/plain',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'svg-to-png',
        'icon': '🎨',
        'title': {
            'en': 'SVG to PNG Converter',
            'ar': 'محول SVG إلى PNG',
            'fr': 'Convertisseur SVG vers PNG',
            'es': 'Convertidor SVG a PNG',
            'de': 'SVG zu PNG Konverter'
        },
        'description': {
            'en': 'Convert SVG vector graphics to PNG raster images.',
            'ar': 'تحويل رسومات SVG المتجهة إلى صور PNG نقطية.',
            'fr': 'Convertissez les graphiques vectoriels SVG en images matricielles PNG.',
            'es': 'Convierte gráficos vectoriales SVG a imágenes raster PNG.',
            'de': 'Konvertieren Sie SVG-Vektorgrafiken in PNG-Rasterbilder.'
        },
        'accepted_types': 'image/svg+xml',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'png-to-svg',
        'icon': '✏️',
        'title': {
            'en': 'PNG to SVG (Trace)',
            'ar': 'PNG إلى SVG (تتبع)',
            'fr': 'PNG vers SVG (Tracer)',
            'es': 'PNG a SVG (Trazar)',
            'de': 'PNG zu SVG (Nachzeichnen)'
        },
        'description': {
            'en': 'Trace PNG images and convert to SVG format.',
            'ar': 'تتبع صور PNG وتحويلها إلى تنسيق SVG.',
            'fr': 'Tracez les images PNG et convertissez-les au format SVG.',
            'es': 'Traza imágenes PNG y conviértelas a formato SVG.',
            'de': 'Nachzeichnen von PNG-Bildern und Konvertierung in SVG-Format.'
        },
        'accepted_types': 'image/png',
        'output_format': 'svg',
        'mime_type': 'image/svg+xml'
    },
    {
        'id': 'ico-to-png',
        'icon': '🎯',
        'title': {
            'en': 'ICO to PNG Converter',
            'ar': 'محول ICO إلى PNG',
            'fr': 'Convertisseur ICO vers PNG',
            'es': 'Convertidor ICO a PNG',
            'de': 'ICO zu PNG Konverter'
        },
        'description': {
            'en': 'Extract PNG images from ICO icon files.',
            'ar': 'استخراج صور PNG من ملفات أيقونات ICO.',
            'fr': 'Extrayez les images PNG des fichiers d\'icônes ICO.',
            'es': 'Extrae imágenes PNG de archivos de iconos ICO.',
            'de': 'Extrahieren Sie PNG-Bilder aus ICO-Symboldateien.'
        },
        'accepted_types': 'image/x-icon,image/vnd.microsoft.icon',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'png-to-ico',
        'icon': '🎯',
        'title': {
            'en': 'PNG to ICO Converter',
            'ar': 'محول PNG إلى ICO',
            'fr': 'Convertisseur PNG vers ICO',
            'es': 'Convertidor PNG a ICO',
            'de': 'PNG zu ICO Konverter'
        },
        'description': {
            'en': 'Convert PNG images to ICO icon format.',
            'ar': 'تحويل صور PNG إلى تنسيق أيقونة ICO.',
            'fr': 'Convertissez les images PNG au format d\'icône ICO.',
            'es': 'Convierte imágenes PNG a formato de icono ICO.',
            'de': 'Konvertieren Sie PNG-Bilder in das ICO-Symbolformat.'
        },
        'accepted_types': 'image/png',
        'output_format': 'ico',
        'mime_type': 'image/x-icon'
    },
    {
        'id': 'image-compressor',
        'icon': '📦',
        'title': {
            'en': 'Image Compressor',
            'ar': 'ضاغط الصور',
            'fr': 'Compresseur d\'images',
            'es': 'Compresor de imágenes',
            'de': 'Bildkompressor'
        },
        'description': {
            'en': 'Compress images to reduce file size while maintaining quality.',
            'ar': 'ضغط الصور لتقليل حجم الملف مع الحفاظ على الجودة.',
            'fr': 'Compressez les images pour réduire la taille des fichiers tout en maintenant la qualité.',
            'es': 'Comprime imágenes para reducir el tamaño del archivo manteniendo la calidad.',
            'de': 'Komprimieren Sie Bilder, um die Dateigröße bei gleichbleibender Qualität zu reduzieren.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'bulk-image-converter',
        'icon': '📁',
        'title': {
            'en': 'Bulk Image Converter',
            'ar': 'محول الصور بالجملة',
            'fr': 'Convertisseur d\'images en masse',
            'es': 'Convertidor de imágenes masivo',
            'de': 'Massenbildkonverter'
        },
        'description': {
            'en': 'Convert multiple images at once to your desired format.',
            'ar': 'تحويل عدة صور مرة واحدة إلى التنسيق المطلوب.',
            'fr': 'Convertissez plusieurs images à la fois dans le format souhaité.',
            'es': 'Convierte múltiples imágenes a la vez al formato deseado.',
            'de': 'Konvertieren Sie mehrere Bilder auf einmal in das gewünschte Format.'
        },
        'accepted_types': 'image/*',
        'output_format': 'various',
        'mime_type': 'image/*'
    },
    {
        'id': 'raw-to-jpg',
        'icon': '📸',
        'title': {
            'en': 'RAW to JPG Converter',
            'ar': 'محول RAW إلى JPG',
            'fr': 'Convertisseur RAW vers JPG',
            'es': 'Convertidor RAW a JPG',
            'de': 'RAW zu JPG Konverter'
        },
        'description': {
            'en': 'Convert camera RAW files (CR2, NEF, ARW) to JPG.',
            'ar': 'تحويل ملفات RAW للكاميرا (CR2، NEF، ARW) إلى JPG.',
            'fr': 'Convertissez les fichiers RAW de l\'appareil photo (CR2, NEF, ARW) en JPG.',
            'es': 'Convierte archivos RAW de cámara (CR2, NEF, ARW) a JPG.',
            'de': 'Konvertieren Sie Kamera-RAW-Dateien (CR2, NEF, ARW) in JPG.'
        },
        'accepted_types': 'image/x-canon-cr2,image/x-nikon-nef,image/x-sony-arw,image/x-adobe-dng',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'psd-to-jpg',
        'icon': '🎨',
        'title': {
            'en': 'PSD to JPG Converter',
            'ar': 'محول PSD إلى JPG',
            'fr': 'Convertisseur PSD vers JPG',
            'es': 'Convertidor PSD a JPG',
            'de': 'PSD zu JPG Konverter'
        },
        'description': {
            'en': 'Convert Photoshop PSD files to JPG format.',
            'ar': 'تحويل ملفات Photoshop PSD إلى تنسيق JPG.',
            'fr': 'Convertissez les fichiers Photoshop PSD au format JPG.',
            'es': 'Convierte archivos Photoshop PSD a formato JPG.',
            'de': 'Konvertieren Sie Photoshop-PSD-Dateien in das JPG-Format.'
        },
        'accepted_types': 'image/vnd.adobe.photoshop',
        'output_format': 'jpg',
        'mime_type': 'image/jpeg'
    },
    {
        'id': 'eps-to-png',
        'icon': '📄',
        'title': {
            'en': 'EPS to PNG Converter',
            'ar': 'محول EPS إلى PNG',
            'fr': 'Convertisseur EPS vers PNG',
            'es': 'Convertidor EPS a PNG',
            'de': 'EPS zu PNG Konverter'
        },
        'description': {
            'en': 'Convert EPS vector files to PNG raster images.',
            'ar': 'تحويل ملفات EPS المتجهة إلى صور PNG نقطية.',
            'fr': 'Convertissez les fichiers vectoriels EPS en images matricielles PNG.',
            'es': 'Convierte archivos vectoriales EPS a imágenes raster PNG.',
            'de': 'Konvertieren Sie EPS-Vektordateien in PNG-Rasterbilder.'
        },
        'accepted_types': 'application/postscript',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'pdf-to-image',
        'icon': '📄',
        'title': {
            'en': 'PDF to Image Converter',
            'ar': 'محول PDF إلى صورة',
            'fr': 'Convertisseur PDF vers Image',
            'es': 'Convertidor PDF a Imagen',
            'de': 'PDF zu Bild Konverter'
        },
        'description': {
            'en': 'Convert PDF pages to PNG or JPG images.',
            'ar': 'تحويل صفحات PDF إلى صور PNG أو JPG.',
            'fr': 'Convertissez les pages PDF en images PNG ou JPG.',
            'es': 'Convierte páginas PDF a imágenes PNG o JPG.',
            'de': 'Konvertieren Sie PDF-Seiten in PNG- oder JPG-Bilder.'
        },
        'accepted_types': 'application/pdf',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'image-to-pdf',
        'icon': '📑',
        'title': {
            'en': 'Image to PDF Converter',
            'ar': 'محول الصور إلى PDF',
            'fr': 'Convertisseur Image vers PDF',
            'es': 'Convertidor Imagen a PDF',
            'de': 'Bild zu PDF Konverter'
        },
        'description': {
            'en': 'Combine multiple images into a single PDF document.',
            'ar': 'دمج صور متعددة في مستند PDF واحد.',
            'fr': 'Combinez plusieurs images en un seul document PDF.',
            'es': 'Combina múltiples imágenes en un solo documento PDF.',
            'de': 'Kombinieren Sie mehrere Bilder zu einem einzigen PDF-Dokument.'
        },
        'accepted_types': 'image/*',
        'output_format': 'pdf',
        'mime_type': 'application/pdf'
    },
    {
        'id': 'image-watermarker',
        'icon': '💧',
        'title': {
            'en': 'Image Watermarker',
            'ar': 'واضع علامة مائية على الصور',
            'fr': 'Filigrane d\'images',
            'es': 'Marcador de agua de imágenes',
            'de': 'Bild-Wasserzeichen'
        },
        'description': {
            'en': 'Add text watermarks to your images.',
            'ar': 'إضافة علامات مائية نصية إلى صورك.',
            'fr': 'Ajoutez des filigranes texte à vos images.',
            'es': 'Agrega marcas de agua de texto a tus imágenes.',
            'de': 'Fügen Sie Ihren Bildern Text-Wasserzeichen hinzu.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'image-cropper',
        'icon': '✂️',
        'title': {
            'en': 'Image Cropper',
            'ar': 'قص الصور',
            'fr': 'Recadrage d\'images',
            'es': 'Recortador de imágenes',
            'de': 'Bildzuschneider'
        },
        'description': {
            'en': 'Crop images to your desired dimensions.',
            'ar': 'قص الصور إلى الأبعاد المطلوبة.',
            'fr': 'Recadrez les images aux dimensions souhaitées.',
            'es': 'Recorta imágenes a las dimensiones deseadas.',
            'de': 'Schneiden Sie Bilder auf die gewünschten Abmessungen zu.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'image-rotator',
        'icon': '🔄',
        'title': {
            'en': 'Image Rotator',
            'ar': 'مدوّر الصور',
            'fr': 'Rotation d\'images',
            'es': 'Rotador de imágenes',
            'de': 'Bilddreher'
        },
        'description': {
            'en': 'Rotate images by any angle.',
            'ar': 'تدوير الصور بأي زاوية.',
            'fr': 'Faites pivoter les images selon n\'importe quel angle.',
            'es': 'Rota imágenes por cualquier ángulo.',
            'de': 'Drehen Sie Bilder um jeden Winkel.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'image-flipper',
        'icon': '↔️',
        'title': {
            'en': 'Image Flipper',
            'ar': 'قلاب الصور',
            'fr': 'Retournement d\'images',
            'es': 'Volteador de imágenes',
            'de': 'Bildspiegelung'
        },
        'description': {
            'en': 'Flip images horizontally or vertically.',
            'ar': 'قلب الصور أفقياً أو رأسياً.',
            'fr': 'Retournez les images horizontalement ou verticalement.',
            'es': 'Voltea imágenes horizontal o verticalmente.',
            'de': 'Spiegeln Sie Bilder horizontal oder vertikal.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'image-resizer',
        'icon': '📐',
        'title': {
            'en': 'Image Resizer',
            'ar': 'مغيّر حجم الصور',
            'fr': 'Redimensionnement d\'images',
            'es': 'Redimensionador de imágenes',
            'de': 'Bildgrößenänderer'
        },
        'description': {
            'en': 'Resize images to specific dimensions.',
            'ar': 'تغيير حجم الصور إلى أبعاد محددة.',
            'fr': 'Redimensionnez les images aux dimensions spécifiques.',
            'es': 'Redimensiona imágenes a dimensiones específicas.',
            'de': 'Ändern Sie die Bildgröße auf bestimmte Abmessungen.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'color-replacer',
        'icon': '🎨',
        'title': {
            'en': 'Color Replacer',
            'ar': 'بديل الألوان',
            'fr': 'Remplacement de couleurs',
            'es': 'Reemplazador de colores',
            'de': 'Farbersetzer'
        },
        'description': {
            'en': 'Replace specific colors in your images.',
            'ar': 'استبدال ألوان محددة في صورك.',
            'fr': 'Remplacez des couleurs spécifiques dans vos images.',
            'es': 'Reemplaza colores específicos en tus imágenes.',
            'de': 'Ersetzen Sie bestimmte Farben in Ihren Bildern.'
        },
        'accepted_types': 'image/*',
        'output_format': 'auto',
        'mime_type': 'image/*'
    },
    {
        'id': 'background-remover',
        'icon': '👻',
        'title': {
            'en': 'Background Remover',
            'ar': 'مزيل الخلفية',
            'fr': 'Suppresseur d\'arrière-plan',
            'es': 'Removedor de fondo',
            'de': 'Hintergrundentferner'
        },
        'description': {
            'en': 'Remove backgrounds from images automatically.',
            'ar': 'إزالة الخلفيات من الصور تلقائياً.',
            'fr': 'Supprimez automatiquement les arrière-plans des images.',
            'es': 'Elimina fondos de imágenes automáticamente.',
            'de': 'Entfernen Sie automatisch Hintergründe von Bildern.'
        },
        'accepted_types': 'image/*',
        'output_format': 'png',
        'mime_type': 'image/png'
    },
    {
        'id': 'image-splitter',
        'icon': '✂️',
        'title': {
            'en': 'Image Splitter',
            'ar': 'مقسم الصور',
            'fr': 'Diviseur d\'images',
            'es': 'Divisor de imágenes',
            'de': 'Bildteiler'
        },
        'description': {
            'en': 'Split images into multiple tiles or slices.',
            'ar': 'تقسيم الصور إلى مربعات أو شرائح متعددة.',
            'fr': 'Divisez les images en plusieurs tuiles ou tranches.',
            'es': 'Divide imágenes en múltiples mosaicos o rebanadas.',
            'de': 'Teilen Sie Bilder in mehrere Kacheln oder Scheiben auf.'
        },
        'accepted_types': 'image/*',
        'output_format': 'zip',
        'mime_type': 'application/zip'
    }
]

# HTML Template
def get_html_template(tool, lang, lang_config):
    t = lang_config['translations']
    dir_attr = f'dir="{lang_config["dir"]}"' if lang_config['dir'] == 'rtl' else ''
    
    # Get accepted file types text
    accepted_ext = tool['accepted_types'].replace('image/', '.').replace(',', ', ')
    
    html = f'''<!DOCTYPE html>
<html lang="{lang}" {dir_attr}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{tool['title'][lang]} | 205-tools</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        body[lang="ar"] {{ font-family: 'Tajawal', 'DM Sans', sans-serif; }}
    </style>
</head>
<body lang="{lang}">
    <!-- Header -->
    <header class="main-header">
        <div class="header-container">
            <a href="/" class="logo">
                <div class="logo-icon">🛠️</div>
                <span>205-tools</span>
            </a>
            <nav class="nav-links">
                <a href="/{lang}/">{t['home']}</a>
                <a href="/{lang}/tools.html">{t['tools']}</a>
                <a href="/{lang}/about.html">{t['about']}</a>
                <a href="/{lang}/contact.html">{t['contact']}</a>
            </nav>
            <div class="language-selector">
                <select id="languageSelector">
                    <option value="en" {'selected' if lang == 'en' else ''}>English</option>
                    <option value="ar" {'selected' if lang == 'ar' else ''}>العربية</option>
                    <option value="fr" {'selected' if lang == 'fr' else ''}>Français</option>
                    <option value="es" {'selected' if lang == 'es' else ''}>Español</option>
                    <option value="de" {'selected' if lang == 'de' else ''}>Deutsch</option>
                </select>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-container">
        <!-- Tool Header -->
        <section class="tool-header-section">
            <div class="tool-icon">{tool['icon']}</div>
            <h1 class="tool-title">{tool['title'][lang]}</h1>
            <p class="tool-description">{tool['description'][lang]}</p>
        </section>

        <!-- Tool Container -->
        <div class="tool-container">
            <!-- Upload Area -->
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <div class="upload-text">{t['upload_drop']}</div>
                <div class="upload-hint">{t['upload_hint']} ({accepted_ext})</div>
                <input type="file" class="upload-input" id="uploadInput" accept="{tool['accepted_types']}">
            </div>

            <!-- File Info -->
            <div class="file-info hidden" id="fileInfo">
                <span class="file-info-icon">📄</span>
                <div class="file-info-details">
                    <div class="file-info-name"></div>
                    <div class="file-info-size"></div>
                </div>
                <button class="file-remove" onclick="removeFile()" title="{t['remove_file']}">✕</button>
            </div>

            <!-- Preview Area -->
            <div class="preview-area hidden" id="previewArea">
                <div class="preview-title">{t['preview']}</div>
            </div>

            <!-- Controls Section -->
            <div class="controls-section" id="controlsSection">
                <div class="controls-title">{t['options']}</div>
                {get_tool_controls(tool['id'], t)}
            </div>

            <!-- Progress Bar -->
            <div class="progress-container" id="progressContainer">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text" id="progressText">0%</div>
            </div>

            <!-- Action Buttons -->
            <div class="btn-group">
                <button class="btn btn-primary" id="convertBtn" disabled onclick="processImage()">
                    <span>{t['convert']}</span>
                </button>
                <button class="btn btn-secondary" onclick="resetTool()">
                    <span>{t['reset']}</span>
                </button>
            </div>

            <!-- Result Area -->
            <div class="result-area" id="resultArea">
                <div class="result-title">
                    <span>✓</span> {t['success']}
                </div>
                <div id="resultContent"></div>
                <div class="btn-group">
                    <button class="btn btn-success" id="downloadBtn" onclick="downloadResult()">
                        <span>💾 {t['download']}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Info Section -->
        <section class="info-section">
            <h2 class="info-title">{tool['title'][lang]}</h2>
            <div class="info-content">
                <p>{tool['description'][lang]}</p>
                <p>{t['privacy_notice']}</p>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-links">
                <a href="/{lang}/">{t['home']}</a>
                <a href="/{lang}/tools.html">{t['tools']}</a>
                <a href="/{lang}/privacy.html">{t['footer_privacy']}</a>
                <a href="/{lang}/terms.html">{t['footer_terms']}</a>
            </div>
            <div class="footer-copyright">{t['footer_copyright']}</div>
        </div>
    </footer>

    <!-- Toast Container -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
    <script>
        // Tool-specific configuration
        const TOOL_CONFIG = {{
            id: '{tool['id']}',
            acceptedTypes: '{tool['accepted_types']}',
            outputFormat: '{tool['output_format']}',
            mimeType: '{tool['mime_type']}',
            outputExtension: '{tool['output_format']}'
        }};

        // Translations
        const TRANSLATIONS = {{
            convert: '{t['convert']}',
            processing: '{t['processing']}',
            download: '{t['download']}',
            success: '{t['success']}',
            error: '{t['error']}',
            original: '{t['original']}',
            output: '{t['output']}'
        }};

        // Store result for download
        let processedResult = null;
        let processedFileName = null;

        // Tool-specific processing function
        async function processImage() {{
            if (!currentFile) {{
                showToast('{t['error']}: No file selected', 'error');
                return;
            }}

            const convertBtn = document.getElementById('convertBtn');
            convertBtn.disabled = true;
            convertBtn.innerHTML = '<span class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></span> ' + TRANSLATIONS.processing;
            
            showProgress();
            updateProgress(10);

            try {{
                {get_tool_javascript(tool['id'], t)}
            }} catch (error) {{
                console.error('Processing error:', error);
                showToast(TRANSLATIONS.error + ': ' + error.message, 'error');
                convertBtn.disabled = false;
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
            }} finally {{
                hideProgress();
            }}
        }}

        function resetTool() {{
            removeFile();
            hideResult();
            const convertBtn = document.getElementById('convertBtn');
            convertBtn.disabled = true;
            convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
            processedResult = null;
            processedFileName = null;
        }}

        function downloadResult() {{
            if (processedResult) {{
                downloadFile(processedResult, processedFileName || 'converted.' + TOOL_CONFIG.outputExtension);
            }}
        }}
    </script>
</body>
</html>'''
    return html

def get_tool_controls(tool_id, t):
    """Generate tool-specific controls HTML"""
    if tool_id == 'image-compressor':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['quality']}</label>
                    <input type="range" class="control-range" id="qualityRange" min="1" max="100" value="80">
                    <span class="range-value" id="qualityValue">80%</span>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                    </select>
                </div>'''
    elif tool_id == 'bulk-image-converter':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['quality']}</label>
                    <input type="range" class="control-range" id="qualityRange" min="1" max="100" value="90">
                    <span class="range-value" id="qualityValue">90%</span>
                </div>'''
    elif tool_id == 'image-watermarker':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['watermark_text']}</label>
                    <input type="text" class="control-input" id="watermarkText" value="© 205-tools" placeholder="Enter watermark text">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['position']}</label>
                    <select class="control-select" id="watermarkPosition">
                        <option value="bottom-right">{t['bottom_right']}</option>
                        <option value="bottom-left">{t['bottom_left']}</option>
                        <option value="top-right">{t['top_right']}</option>
                        <option value="top-left">{t['top_left']}</option>
                        <option value="center">{t['center']}</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['font_size']}</label>
                    <input type="range" class="control-range" id="fontSizeRange" min="10" max="100" value="30">
                    <span class="range-value" id="fontSizeValue">30px</span>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['opacity']}</label>
                    <input type="range" class="control-range" id="opacityRange" min="0" max="100" value="70">
                    <span class="range-value" id="opacityValue">70%</span>
                </div>'''
    elif tool_id == 'image-cropper':
        return f'''
                <div class="control-group">
                    <label class="control-label">X Position</label>
                    <input type="number" class="control-input" id="cropX" value="0" min="0">
                </div>
                <div class="control-group">
                    <label class="control-label">Y Position</label>
                    <input type="number" class="control-input" id="cropY" value="0" min="0">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['width']}</label>
                    <input type="number" class="control-input" id="cropWidth" value="100" min="1">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['height']}</label>
                    <input type="number" class="control-input" id="cropHeight" value="100" min="1">
                </div>'''
    elif tool_id == 'image-rotator':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['angle']} (0-360°)</label>
                    <input type="range" class="control-range" id="rotateAngle" min="0" max="360" value="90">
                    <span class="range-value" id="rotateValue">90°</span>
                </div>'''
    elif tool_id == 'image-flipper':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['flip']}</label>
                    <select class="control-select" id="flipDirection">
                        <option value="horizontal">{t['horizontal']}</option>
                        <option value="vertical">{t['vertical']}</option>
                    </select>
                </div>'''
    elif tool_id == 'image-resizer':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['width']} (px)</label>
                    <input type="number" class="control-input" id="resizeWidth" value="800" min="1">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['height']} (px)</label>
                    <input type="number" class="control-input" id="resizeHeight" value="600" min="1">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WebP</option>
                    </select>
                </div>'''
    elif tool_id == 'color-replacer':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['target_color']}</label>
                    <input type="color" class="control-input" id="targetColor" value="#ffffff">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['replacement_color']}</label>
                    <input type="color" class="control-input" id="replacementColor" value="#ff0000">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['tolerance']}</label>
                    <input type="range" class="control-range" id="toleranceRange" min="0" max="100" value="30">
                    <span class="range-value" id="toleranceValue">30</span>
                </div>'''
    elif tool_id == 'background-remover':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['background_color']}</label>
                    <select class="control-select" id="bgColor">
                        <option value="auto">{t['auto_detect']}</option>
                        <option value="#ffffff">White</option>
                        <option value="#000000">Black</option>
                        <option value="#00ff00">Green</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['tolerance']}</label>
                    <input type="range" class="control-range" id="toleranceRange" min="0" max="100" value="50">
                    <span class="range-value" id="toleranceValue">50</span>
                </div>'''
    elif tool_id == 'image-splitter':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['rows']}</label>
                    <input type="number" class="control-input" id="splitRows" value="2" min="1" max="10">
                </div>
                <div class="control-group">
                    <label class="control-label">{t['columns']}</label>
                    <input type="number" class="control-input" id="splitCols" value="2" min="1" max="10">
                </div>'''
    elif tool_id == 'base64-to-image':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['paste_base64']}</label>
                    <textarea class="text-area" id="base64Input" rows="6" placeholder="data:image/png;base64,iVBORw0KGgo..."></textarea>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="webp">WebP</option>
                    </select>
                </div>'''
    elif tool_id in ['image-to-base64', 'image-to-pdf']:
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['select_files']}</label>
                    <input type="file" class="control-input" id="bulkUploadInput" accept="image/*" multiple onchange="handleBulkFiles(this.files)">
                </div>
                <div class="control-group" id="fileListContainer" style="display: none;">
                    <label class="control-label">{t['files_selected']}: <span id="fileCount">0</span></label>
                    <button class="btn btn-danger" onclick="clearBulkFiles()">{t['clear_all']}</button>
                </div>'''
    elif tool_id == 'pdf-to-image':
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPG</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['quality']}</label>
                    <input type="range" class="control-range" id="qualityRange" min="1" max="100" value="90">
                    <span class="range-value" id="qualityValue">90%</span>
                </div>'''
    else:
        return f'''
                <div class="control-group">
                    <label class="control-label">{t['format']}</label>
                    <select class="control-select" id="outputFormat">
                        <option value="{tool_id.split('-')[-1].replace('jpg', 'image/jpeg').replace('png', 'image/png').replace('webp', 'image/webp')}">{tool_id.split('-')[-1].upper()}</option>
                    </select>
                </div>
                <div class="control-group">
                    <label class="control-label">{t['quality']}</label>
                    <input type="range" class="control-range" id="qualityRange" min="1" max="100" value="90">
                    <span class="range-value" id="qualityValue">90%</span>
                </div>'''

def get_tool_javascript(tool_id, t):
    """Generate tool-specific JavaScript"""
    
    if tool_id in ['jpg-to-png', 'jpg-to-webp', 'png-to-jpg', 'png-to-webp', 'webp-to-jpg', 'webp-to-png', 'heic-to-jpg', 'avif-to-jpg', 'bmp-to-png', 'tiff-to-jpg']:
        return f'''
                updateProgress(50);
                const quality = document.getElementById('qualityRange')?.value / 100 || 0.9;
                const dataUrl = convertImageFormat(originalImage, TOOL_CONFIG.mimeType, quality);
                updateProgress(100);
                
                processedResult = dataUrl;
                processedFileName = currentFile.name.replace(/\\.[^/.]+$/, '') + '.' + TOOL_CONFIG.outputExtension;
                
                document.getElementById('resultContent').innerHTML = '<img src="' + dataUrl + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-compressor':
        return f'''
                updateProgress(30);
                const quality = document.getElementById('qualityRange').value / 100;
                const format = document.getElementById('outputFormat').value;
                updateProgress(60);
                
                const dataUrl = compressImage(originalImage, null, null, quality, format);
                updateProgress(100);
                
                processedResult = dataUrl;
                processedFileName = 'compressed_' + currentFile.name.replace(/\\.[^/.]+$/, '') + '.' + getExtensionFromMimeType(format);
                
                document.getElementById('resultContent').innerHTML = '<img src="' + dataUrl + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-to-base64':
        return f'''
                updateProgress(50);
                const reader = new FileReader();
                reader.onload = function(e) {{
                    updateProgress(100);
                    processedResult = e.target.result;
                    processedFileName = currentFile.name + '.txt';
                    
                    document.getElementById('resultContent').innerHTML = '<textarea class="text-area" rows="8" readonly>' + e.target.result + '</textarea>';
                    showResult();
                    showToast(TRANSLATIONS.success, 'success');
                    convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                    convertBtn.disabled = false;
                }};
                reader.readAsDataURL(currentFile);'''
    
    elif tool_id == 'base64-to-image':
        return f'''
                updateProgress(30);
                const base64Input = document.getElementById('base64Input').value;
                const format = document.getElementById('outputFormat').value;
                updateProgress(60);
                
                if (!base64Input) {{
                    throw new Error('Please enter Base64 data');
                }}
                
                processedResult = base64Input;
                processedFileName = 'decoded_image.' + format;
                
                updateProgress(100);
                document.getElementById('resultContent').innerHTML = '<img src="' + base64Input + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-watermarker':
        return f'''
                updateProgress(30);
                const text = document.getElementById('watermarkText').value || '© 205-tools';
                const position = document.getElementById('watermarkPosition').value;
                const fontSize = parseInt(document.getElementById('fontSizeRange').value);
                const opacity = document.getElementById('opacityRange').value / 100;
                updateProgress(60);
                
                const canvas = addWatermark(originalImage, text, {{
                    position: position,
                    fontSize: fontSize,
                    color: 'rgba(255, 255, 255, ' + opacity + ')'
                }});
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'watermarked_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-cropper':
        return f'''
                updateProgress(30);
                const x = parseInt(document.getElementById('cropX').value) || 0;
                const y = parseInt(document.getElementById('cropY').value) || 0;
                const width = parseInt(document.getElementById('cropWidth').value) || 100;
                const height = parseInt(document.getElementById('cropHeight').value) || 100;
                updateProgress(60);
                
                const canvas = cropImage(originalImage, x, y, width, height);
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'cropped_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-rotator':
        return f'''
                updateProgress(30);
                const angle = parseInt(document.getElementById('rotateAngle').value) || 90;
                updateProgress(60);
                
                const canvas = rotateImage(originalImage, angle);
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'rotated_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-flipper':
        return f'''
                updateProgress(30);
                const direction = document.getElementById('flipDirection').value;
                updateProgress(60);
                
                const canvas = flipImage(originalImage, direction);
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'flipped_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-resizer':
        return f'''
                updateProgress(30);
                const width = parseInt(document.getElementById('resizeWidth').value) || 800;
                const height = parseInt(document.getElementById('resizeHeight').value) || 600;
                const format = document.getElementById('outputFormat').value;
                updateProgress(60);
                
                const dataUrl = compressImage(originalImage, width, height, 0.9, format);
                updateProgress(100);
                
                processedResult = dataUrl;
                processedFileName = 'resized_' + currentFile.name.replace(/\\.[^/.]+$/, '.') + getExtensionFromMimeType(format);
                
                document.getElementById('resultContent').innerHTML = '<img src="' + dataUrl + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'color-replacer':
        return f'''
                updateProgress(30);
                const targetColor = document.getElementById('targetColor').value;
                const replacementColor = document.getElementById('replacementColor').value;
                const tolerance = parseInt(document.getElementById('toleranceRange').value);
                updateProgress(60);
                
                const canvas = replaceColor(originalImage, targetColor, replacementColor, tolerance);
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'color_replaced_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'background-remover':
        return f'''
                updateProgress(30);
                const bgColor = document.getElementById('bgColor').value;
                const tolerance = parseInt(document.getElementById('toleranceRange').value);
                updateProgress(60);
                
                const canvas = removeBackground(originalImage, bgColor, tolerance);
                updateProgress(90);
                
                processedResult = canvas.toDataURL('image/png');
                processedFileName = 'bg_removed_' + currentFile.name.replace(/\\.[^/.]+$/, '.png');
                
                document.getElementById('resultContent').innerHTML = '<img src="' + processedResult + '" class="preview-image">';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'image-splitter':
        return f'''
                updateProgress(30);
                const rows = parseInt(document.getElementById('splitRows').value) || 2;
                const cols = parseInt(document.getElementById('splitCols').value) || 2;
                updateProgress(60);
                
                const pieces = splitImage(originalImage, rows, cols);
                let html = '<div class="split-grid" style="grid-template-columns: repeat(' + cols + ', 1fr);">';
                
                pieces.forEach((canvas, index) => {{
                    html += '<img src="' + canvas.toDataURL('image/png') + '" alt="Part ' + (index + 1) + '">';
                }});
                html += '</div>';
                
                processedResult = pieces[0].toDataURL('image/png');
                processedFileName = 'split_part_1.png';
                
                updateProgress(100);
                document.getElementById('resultContent').innerHTML = html;
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    elif tool_id == 'png-to-svg':
        return f'''
                updateProgress(50);
                const svg = imageToSvg(originalImage);
                updateProgress(100);
                
                processedResult = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
                processedFileName = currentFile.name.replace(/\\.[^/.]+$/, '.svg');
                
                document.getElementById('resultContent').innerHTML = '<textarea class="text-area" rows="8" readonly>' + svg.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>';
                showResult();
                showToast(TRANSLATIONS.success, 'success');
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''
    
    else:
        return f'''
                updateProgress(50);
                showToast('This tool requires specialized libraries for full functionality', 'warning');
                updateProgress(100);
                convertBtn.innerHTML = '<span>' + TRANSLATIONS.convert + '</span>';
                convertBtn.disabled = false;'''

def generate_files():
    """Generate all HTML files"""
    base_path = '/root/.openclaw/workspace/demo-site/tools'
    
    total_files = 0
    for lang in LANGUAGES:
        for tool in TOOLS:
            file_path = os.path.join(base_path, lang, f"{tool['id']}.html")
            html = get_html_template(tool, lang, LANGUAGES[lang])
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(html)
            
            total_files += 1
            print(f"Created: {lang}/{tool['id']}.html")
    
    print(f"\nTotal files created: {total_files}")

if __name__ == '__main__':
    generate_files()
