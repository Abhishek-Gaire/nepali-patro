/**
 * ============================================================================
 * barshik-nepali-patro — Static Public Holiday Data
 * ============================================================================
 * Public holidays in Nepal vary each year because many festivals (Dashain,
 * Tihar, Eid, etc.) follow lunar tithis. This file
 * contains confirmed holiday lists per BS year.
 *
 * When the government publishes the next year's holiday list (usually
 * around Falgun/Chaitra), append it here. The fallback layer will serve
 * the most recent known year if a requested year is missing.
 *
 * Naming convention:
 *   - month  : Month number (1-12)
 *   - day    : Day number (1-32/33)
 *   - name   : English label (primary)
 *   - nameNp : Devanagari label (optional, for native-language UIs)
 *   - scope  : Audience restriction (optional, omit = nationwide)
 * ============================================================================
 */

import type { NepaliHoliday } from "../types";


// Scraped by AI from official government websites and their provided downloadable pdf documents
export const NEPALI_HOLIDAYS: Record<number, NepaliHoliday[]> = {
  // ── 2080 BS ── (All public holidays per official Gazette)
  2080: [
    // ═══════════════════════════════════════════════════════════════
    // Dashain Holidays (Kartik 4 – Kartik 9)
    // ═══════════════════════════════════════════════════════════════
    { month: 7, day: 4, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 5, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 6, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 7, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 8, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 9, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },

    // ═══════════════════════════════════════════════════════════════
    // Tihar Holidays (Kartik 26 – Kartik 30)
    // ═══════════════════════════════════════════════════════════════
    { month: 7, day: 26, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 27, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 28, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 29, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 30, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on National Festivals
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 1, name: "Nepali New Year", nameNp: "नयाँ वर्ष", scope: "national" },
    { month: 1, day: 22, name: "Ubauli Parva", nameNp: "उबौली पर्व", scope: "national" },
    { month: 5, day: 14, name: "Rakshya Bandhan", nameNp: "रक्षा बन्धन", scope: "national" },
    { month: 5, day: 20, name: "Krishna Janmashtami", nameNp: "कृष्ण जन्माष्टमी", scope: "national" },
    { month: 6, day: 28, name: "Ghatasthapana", nameNp: "घटस्थापना", scope: "national" },
    { month: 8, day: 3, name: "Chhath Parva", nameNp: "छठ पर्व", scope: "national" },
    { month: 8, day: 10, name: "Udhauli Parva / Yomari Punhi", nameNp: "उधौली पर्व / योमरी पुन्हि", scope: "national" },
    { month: 9, day: 9, name: "Christmas", nameNp: "क्रिसमस", scope: "national" },
    { month: 9, day: 15, name: "Tamu Lhosar", nameNp: "तमु ल्होसार", scope: "national" },
    { month: 10, day: 1, name: "Maghi Parva / Maghe Sankranti", nameNp: "माघी पर्व / माघे संक्रान्ति", scope: "national" },
    { month: 10, day: 27, name: "Sonam Lhosar", nameNp: "सोनाम ल्होसार", scope: "national" },
    { month: 11, day: 25, name: "Maha Shivaratri", nameNp: "महाशिवरात्रि", scope: "national" },
    { month: 11, day: 28, name: "Gyalpo Lhosar", nameNp: "ग्याल्पो ल्होसार", scope: "national" },
    { month: 12, day: 11, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    { month: 12, day: 12, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    // Eid dates are lunar-dependent and announced separately each year:
    // { month: ?, day: ?, name: "Bakar Eid (Eid Ul Fitr)", nameNp: "बकर ईद", scope: "national" },
    // { month: ?, day: ?, name: "Eid Ul Adha", nameNp: "ईद उल अधा", scope: "national" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Ethnic Festivals (respective communities)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 14, name: "Gaijatra", nameNp: "गाईजात्रा", scope: "ethnic" },
    { month: 5, day: 10, name: "Gaura Parva", nameNp: "गौरा पर्व", scope: "ethnic" },
    // Siruwa Pawani — observed in Jhapa, Morang, Sunsari, Siraha, Saptari (date not fixed in source)

    // ═══════════════════════════════════════════════════════════════
    // Women Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 6, day: 1, name: "Haritalika Teej", nameNp: "हरितालिका तीज", scope: "women" },
    { month: 6, day: 20, name: "Jitiya Festival", nameNp: "जितिया पर्व", scope: "women" },

    // ═══════════════════════════════════════════════════════════════
    // Education Institutions Only
    // ═══════════════════════════════════════════════════════════════
    { month: 10, day: 21, name: "Basanta Panchami / Saraswati Puja", nameNp: "बसन्त पञ्चमी / सरस्वती पूजा", scope: "education" },

    // ═══════════════════════════════════════════════════════════════
    // Jatra Holidays (Kathmandu Valley Only)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 14, name: "Gai Jatra", nameNp: "गाईजात्रा", scope: "kathmandu-valley" },
    { month: 6, day: 11, name: "Indra Jatra", nameNp: "इन्द्रजात्रा", scope: "kathmandu-valley" },
    // Bhoto Jatra — observed on the day of the event (no fixed calendar date)
    { month: 12, day: 26, name: "Ghode Jatra", nameNp: "घोडेजात्रा", scope: "kathmandu-valley" },

    // ═══════════════════════════════════════════════════════════════
    // Observed Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 18, name: "May Day / Labour Day", nameNp: "मे दिन / श्रमिक दिवस", scope: "observed" },
    { month: 2, day: 15, name: "Republic Day", nameNp: "गणतन्त्र दिवस", scope: "observed" },
    { month: 6, day: 3, name: "Constitution Day", nameNp: "संविधान दिवस", scope: "observed" },
    { month: 10, day: 16, name: "Martyrs Day", nameNp: "शहिद दिवस", scope: "observed" },
    { month: 11, day: 7, name: "Democracy Day", nameNp: "प्रजातन्त्र दिवस", scope: "observed" },
    { month: 11, day: 24, name: "International Women's Day", nameNp: "अन्तर्राष्ट्रिय महिला दिवस", scope: "observed" },

    // ═══════════════════════════════════════════════════════════════
    // For People with Disabilities Only
    // ═══════════════════════════════════════════════════════════════
    { month: 8, day: 17, name: "International Day of Persons with Disabilities", nameNp: "अन्तर्राष्ट्रिय अपांगता दिवस", scope: "disabilities" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Birth Anniversaries
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 22, name: "Buddha Jayanti", nameNp: "बुद्ध जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 25, name: "Falgunanda Jayanti", nameNp: "फाल्गुनन्द जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 30, name: "Guru Nanak Jayanti", nameNp: "गुरु नानक जयन्ती", scope: "birth-anniversary" },
    { month: 9, day: 27, name: "Prithvi Jayanti", nameNp: "पृथ्वी जयन्ती", scope: "birth-anniversary" },
    // Prophet Muhammad Birth Anniversary — date announced per lunar calendar

    // ═══════════════════════════════════════════════════════════════
    // Nationally Celebrated but Office Opening Days
    // ═══════════════════════════════════════════════════════════════
    { month: 2, day: 21, name: "Ethnic Discrimination and Untouchability Eradication National Day", nameNp: "जातीय भेदभाव र छुवाछुत उन्मूलन राष्ट्रिय दिवस", scope: "office-open" },
    { month: 5, day: 22, name: "Civil Service Day", nameNp: "निजामती सेवा दिवस", scope: "office-open" },
  ],

  // ── 2081 BS ── (All public holidays per official Gazette)
  2081: [
    // ═══════════════════════════════════════════════════════════════
    // Dashain Holidays (Ashoj 24 – Ashoj 28)
    // ═══════════════════════════════════════════════════════════════
    { month: 6, day: 24, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 25, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 26, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 27, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 28, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },

    // ═══════════════════════════════════════════════════════════════
    // Tihar Holidays (Kartik 15 – Kartik 19)
    // ═══════════════════════════════════════════════════════════════
    { month: 7, day: 15, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 16, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 17, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 18, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 19, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on National Festivals
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 1, name: "Nepali New Year", nameNp: "नयाँ वर्ष", scope: "national" },
    { month: 1, day: 5, name: "Ram Navami", nameNp: "राम नवमी", scope: "national" },
    { month: 2, day: 10, name: "Buddha Jayanti / Ubauli Parva", nameNp: "बुद्ध जयन्ती / उबौली पर्व", scope: "national" },
    { month: 5, day: 3, name: "Rakshya Bandhan", nameNp: "रक्षा बन्धन", scope: "national" },
    { month: 5, day: 10, name: "Krishna Janmashtami", nameNp: "कृष्ण जन्माष्टमी", scope: "national" },
    { month: 6, day: 17, name: "Ghatasthapana", nameNp: "घटस्थापना", scope: "national" },
    { month: 7, day: 22, name: "Chhath Parva", nameNp: "छठ पर्व", scope: "national" },
    { month: 8, day: 30, name: "Udhauli Parva / Yomari Punhi", nameNp: "उधौली पर्व / योमरी पुन्हि", scope: "national" },
    { month: 9, day: 10, name: "Christmas", nameNp: "क्रिसमस", scope: "national" },
    { month: 9, day: 15, name: "Tamu Lhosar", nameNp: "तमु ल्होसार", scope: "national" },
    { month: 10, day: 1, name: "Maghi Parva / Maghe Sankranti", nameNp: "माघी पर्व / माघे संक्रान्ति", scope: "national" },
    { month: 10, day: 17, name: "Sonam Lhosar", nameNp: "सोनाम ल्होसार", scope: "national" },
    { month: 11, day: 14, name: "Maha Shivaratri", nameNp: "महाशिवरात्रि", scope: "national" },
    { month: 11, day: 16, name: "Gyalpo Lhosar", nameNp: "ग्याल्पो ल्होसार", scope: "national" },
    { month: 11, day: 29, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    { month: 12, day: 1, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    // Eid dates are lunar-dependent and announced separately each year:
    // { month: ?, day: ?, name: "Bakar Eid (Eid Ul Fitr)", nameNp: "बकर ईद", scope: "national" },
    // { month: ?, day: ?, name: "Eid Ul Adha", nameNp: "ईद उल अधा", scope: "national" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Ethnic Festivals (respective communities)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 4, name: "Gaijatra", nameNp: "गाईजात्रा", scope: "ethnic" },
    { month: 5, day: 10, name: "Gaura Parva", nameNp: "गौरा पर्व", scope: "ethnic" },
    // Siruwa Pawani — observed in Jhapa, Morang, Sunsari, Siraha, Saptari (date not fixed in source)

    // ═══════════════════════════════════════════════════════════════
    // Women Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 21, name: "Haritalika Teej", nameNp: "हरितालिका तीज", scope: "women" },
    { month: 6, day: 1, name: "Jitiya Festival", nameNp: "जितिया पर्व", scope: "women" },

    // ═══════════════════════════════════════════════════════════════
    // Education Institutions Only
    // ═══════════════════════════════════════════════════════════════
    { month: 10, day: 21, name: "Basanta Panchami / Saraswati Puja", nameNp: "बसन्त पञ्चमी / सरस्वती पूजा", scope: "education" },

    // ═══════════════════════════════════════════════════════════════
    // Jatra Holidays (Kathmandu Valley Only)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 4, name: "Gai Jatra", nameNp: "गाईजात्रा", scope: "kathmandu-valley" },
    { month: 6, day: 9, name: "Indra Jatra", nameNp: "इन्द्रजात्रा", scope: "kathmandu-valley" },
    // Bhoto Jatra — observed on the day of the event (no fixed calendar date)
    { month: 12, day: 16, name: "Ghode Jatra", nameNp: "घोडेजात्रा", scope: "kathmandu-valley" },

    // ═══════════════════════════════════════════════════════════════
    // Observed Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 19, name: "May Day / Labour Day", nameNp: "मे दिन / श्रमिक दिवस", scope: "observed" },
    { month: 2, day: 15, name: "Republic Day", nameNp: "गणतन्त्र दिवस", scope: "observed" },
    { month: 6, day: 3, name: "Constitution Day", nameNp: "संविधान दिवस", scope: "observed" },
    { month: 10, day: 16, name: "Martyrs Day", nameNp: "शहिद दिवस", scope: "observed" },
    { month: 11, day: 7, name: "Democracy Day", nameNp: "प्रजातन्त्र दिवस", scope: "observed" },
    { month: 11, day: 24, name: "International Women's Day", nameNp: "अन्तर्राष्ट्रिय महिला दिवस", scope: "observed" },

    // ═══════════════════════════════════════════════════════════════
    // For People with Disabilities Only
    // ═══════════════════════════════════════════════════════════════
    { month: 8, day: 18, name: "International Day of Persons with Disabilities", nameNp: "अन्तर्राष्ट्रिय अपांगता दिवस", scope: "disabilities" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Birth Anniversaries
    // ═══════════════════════════════════════════════════════════════
    { month: 2, day: 10, name: "Buddha Jayanti", nameNp: "बुद्ध जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 25, name: "Falgunanda Jayanti", nameNp: "फाल्गुनन्द जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 30, name: "Guru Nanak Jayanti", nameNp: "गुरु नानक जयन्ती", scope: "birth-anniversary" },
    { month: 9, day: 27, name: "Prithvi Jayanti", nameNp: "पृथ्वी जयन्ती", scope: "birth-anniversary" },
    // Prophet Muhammad Birth Anniversary — date announced per lunar calendar

    // ═══════════════════════════════════════════════════════════════
    // Nationally Celebrated but Office Opening Days
    // ═══════════════════════════════════════════════════════════════
    { month: 2, day: 21, name: "Ethnic Discrimination and Untouchability Eradication National Day", nameNp: "जातीय भेदभाव र छुवाछुत उन्मूलन राष्ट्रिय दिवस", scope: "office-open" },
    { month: 5, day: 22, name: "Civil Service Day", nameNp: "निजामती सेवा दिवस", scope: "office-open" },
  ],

  // ── 2082 BS ── (All public holidays per official Gazette)
  2082: [
    // ═══════════════════════════════════════════════════════════════
    // Dashain Holidays (Ashoj 13 – Ashoj 18)
    // ═══════════════════════════════════════════════════════════════
    { month: 6, day: 13, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 14, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 15, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 16, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 17, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 6, day: 18, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },

    // ═══════════════════════════════════════════════════════════════
    // Tihar Holidays (Kartik 3 – Kartik 7)
    // ═══════════════════════════════════════════════════════════════
    { month: 7, day: 3, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 4, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 5, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 6, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 7, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on National Festivals (17 days)
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 1, name: "Nepali New Year", nameNp: "नयाँ वर्ष", scope: "national" },
    { month: 1, day: 5, name: "Ram Navami", nameNp: "राम नवमी", scope: "national" },
    { month: 1, day: 29, name: "Ubauli Parva", nameNp: "उबौली पर्व", scope: "national" },
    { month: 4, day: 24, name: "Rakshya Bandhan", nameNp: "रक्षा बन्धन", scope: "national" },
    { month: 4, day: 31, name: "Krishna Janmashtami", nameNp: "कृष्ण जन्माष्टमी", scope: "national" },
    { month: 6, day: 6, name: "Ghatasthapana", nameNp: "घटस्थापना", scope: "national" },
    { month: 7, day: 10, name: "Chhath Parva", nameNp: "छठ पर्व", scope: "national" },
    { month: 8, day: 18, name: "Udhauli Parva / Yomari Punhi", nameNp: "उधौली पर्व / योमरी पुन्हि", scope: "national" },
    { month: 9, day: 10, name: "Christmas", nameNp: "क्रिसमस", scope: "national" },
    { month: 9, day: 15, name: "Tamu Lhosar", nameNp: "तमु ल्होसार", scope: "national" },
    { month: 10, day: 1, name: "Maghi Parva / Maghe Sankranti", nameNp: "माघी पर्व / माघे संक्रान्ति", scope: "national" },
    { month: 10, day: 5, name: "Sonam Lhosar", nameNp: "सोनाम ल्होसार", scope: "national" },
    { month: 11, day: 3, name: "Maha Shivaratri", nameNp: "महाशिवरात्रि", scope: "national" },
    { month: 11, day: 6, name: "Gyalpo Lhosar", nameNp: "ग्याल्पो ल्होसार", scope: "national" },
    { month: 11, day: 18, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    { month: 12, day: 1, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    // Eid dates are lunar-dependent and announced separately each year:
    // { month: ?, day: ?, name: "Bakar Eid (Eid Ul Fitr)", nameNp: "बकर ईद", scope: "national" },
    // { month: ?, day: ?, name: "Eid Ul Adha", nameNp: "ईद उल अधा", scope: "national" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Ethnic Festivals (respective communities)
    // ═══════════════════════════════════════════════════════════════
    { month: 4, day: 25, name: "Gaijatra", nameNp: "गाईजात्रा", scope: "ethnic" },
    { month: 5, day: 15, name: "Gaura Parva", nameNp: "गौरा पर्व", scope: "ethnic" },
    // Siruwa Pawani — observed in Jhapa, Morang, Sunsari, Siraha, Saptari (date not fixed in source)

    // ═══════════════════════════════════════════════════════════════
    // Women Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 10, name: "Haritalika Teej", nameNp: "हरितालिका तीज", scope: "women" },
    { month: 5, day: 30, name: "Jitiya Festival", nameNp: "जितिया पर्व", scope: "women" },

    // ═══════════════════════════════════════════════════════════════
    // Education Institutions Only
    // ═══════════════════════════════════════════════════════════════
    { month: 10, day: 9, name: "Basanta Panchami / Saraswati Puja", nameNp: "बसन्त पञ्चमी / सरस्वती पूजा", scope: "education" },

    // ═══════════════════════════════════════════════════════════════
    // Jatra Holidays (Kathmandu Valley Only)
    // ═══════════════════════════════════════════════════════════════
    { month: 4, day: 25, name: "Gai Jatra", nameNp: "गाईजात्रा", scope: "kathmandu-valley" },
    { month: 5, day: 21, name: "Indra Jatra", nameNp: "इन्द्रजात्रा", scope: "kathmandu-valley" },
    // Bhoto Jatra — observed on the day of the event (no fixed calendar date)
    { month: 12, day: 4, name: "Ghode Jatra", nameNp: "घोडेजात्रा", scope: "kathmandu-valley" },

    // ═══════════════════════════════════════════════════════════════
    // Observed Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 18, name: "May Day / Labour Day", nameNp: "मे दिन / श्रमिक दिवस", scope: "observed" },
    { month: 2, day: 15, name: "Republic Day", nameNp: "गणतन्त्र दिवस", scope: "observed" },
    { month: 6, day: 3, name: "Constitution Day", nameNp: "संविधान दिवस", scope: "observed" },
    { month: 10, day: 16, name: "Martyrs Day", nameNp: "शहिद दिवस", scope: "observed" },
    { month: 11, day: 7, name: "Democracy Day", nameNp: "प्रजातन्त्र दिवस", scope: "observed" },
    { month: 11, day: 24, name: "International Women's Day", nameNp: "अन्तर्राष्ट्रिय महिला दिवस", scope: "observed" },

    // ═══════════════════════════════════════════════════════════════
    // For People with Disabilities Only
    // ═══════════════════════════════════════════════════════════════
    { month: 8, day: 17, name: "International Day of Persons with Disabilities", nameNp: "अन्तर्राष्ट्रिय अपांगता दिवस", scope: "disabilities" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Birth Anniversaries
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 29, name: "Buddha Jayanti", nameNp: "बुद्ध जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 25, name: "Falgunanda Jayanti", nameNp: "फाल्गुनन्द जयन्ती", scope: "birth-anniversary" },
    { month: 9, day: 27, name: "Prithvi Jayanti", nameNp: "पृथ्वी जयन्ती", scope: "birth-anniversary" },
    // Guru Nanak Jayanti — date announced per lunar calendar (Sikh community)
    // Prophet Muhammad Birth Anniversary — date announced per lunar calendar

    // ═══════════════════════════════════════════════════════════════
    // Nationally Celebrated but Office Opening Days
    // ═══════════════════════════════════════════════════════════════
    { month: 2, day: 21, name: "Ethnic Discrimination and Untouchability Eradication National Day", nameNp: "जातीय भेदभाव र छुवाछुत उन्मूलन राष्ट्रिय दिवस", scope: "office-open" },
    { month: 5, day: 22, name: "Civil Service Day", nameNp: "निजामती सेवा दिवस", scope: "office-open" },
  ],

  // ── 2083 BS ── (All public holidays per official Gazette)
  2083: [
    // ═══════════════════════════════════════════════════════════════
    // Dashain Holidays (Ashoj 31 – Kartik 6)
    // ═══════════════════════════════════════════════════════════════
    { month: 6, day: 31, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 1, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 2, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 3, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 4, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 5, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },
    { month: 7, day: 6, name: "Dashain Holiday", nameNp: "दशैं विदा", scope: "dashain" },

    // ═══════════════════════════════════════════════════════════════
    // Tihar Holidays (Kartik 22 – Kartik 26)
    // ═══════════════════════════════════════════════════════════════
    { month: 7, day: 22, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 23, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 24, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 25, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },
    { month: 7, day: 26, name: "Tihar Holiday", nameNp: "तिहार विदा", scope: "tihar" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on National Festivals (16 days)
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 1, name: "Nepali New Year", nameNp: "नयाँ वर्ष", scope: "national" },
    { month: 1, day: 18, name: "Buddha Jayanti / Baisakh Purnima / Ubauli Parva", nameNp: "बुद्ध जयन्ती / बैशाख पूर्णिमा / उबौली पर्व", scope: "national" },
    { month: 5, day: 12, name: "Rakshya Bandhan", nameNp: "रक्षा बन्धन", scope: "national" },
    { month: 5, day: 19, name: "Krishna Janmashtami", nameNp: "कृष्ण जन्माष्टमी", scope: "national" },
    { month: 6, day: 25, name: "Ghatasthapana", nameNp: "घटस्थापना", scope: "national" },
    { month: 7, day: 29, name: "Chhath Parva", nameNp: "छठ पर्व", scope: "national" },
    { month: 9, day: 9, name: "Udhauli Parva / Yomari Punhi", nameNp: "उधौली पर्व / योमरी पुन्हि", scope: "national" },
    { month: 9, day: 10, name: "Christmas", nameNp: "क्रिसमस", scope: "national" },
    { month: 9, day: 15, name: "Tamu Lhosar", nameNp: "तमु ल्होसार", scope: "national" },
    { month: 10, day: 1, name: "Maghi Parva / Maghe Sankranti", nameNp: "माघी पर्व / माघे संक्रान्ति", scope: "national" },
    { month: 10, day: 24, name: "Sonam Lhosar", nameNp: "सोनाम ल्होसार", scope: "national" },
    { month: 11, day: 22, name: "Maha Shivaratri", nameNp: "महाशिवरात्रि", scope: "national" },
    { month: 11, day: 25, name: "Gyalpo Lhosar", nameNp: "ग्याल्पो ल्होसार", scope: "national" },
    { month: 12, day: 7, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    { month: 12, day: 8, name: "Fagu Purnima", nameNp: "फागु पुन्हि", scope: "national" },
    // Eid dates are lunar-dependent and announced separately each year:
    // { month: ?, day: ?, name: "Bakar Eid (Eid Ul Fitr)", nameNp: "बकर ईद", scope: "national" },
    // { month: ?, day: ?, name: "Eid Ul Adha", nameNp: "ईद उल अधा", scope: "national" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Ethnic Festivals (respective communities)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 13, name: "Gaijatra", nameNp: "गाईजात्रा", scope: "ethnic" },
    { month: 5, day: 19, name: "Gaura Parva", nameNp: "गौरा पर्व", scope: "ethnic" },
    { month: 9, day: 15, name: "Dura Mhepra Nakuma", nameNp: "दुरा म्हेप्रा नकुमा", scope: "ethnic" },
    // Siruwa Pawani — observed in Jhapa, Morang, Sunsari, Siraha, Saptari (date not fixed in source)

    // ═══════════════════════════════════════════════════════════════
    // Women Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 29, name: "Haritalika Teej", nameNp: "हरितालिका तीज", scope: "women" },
    { month: 6, day: 18, name: "Jitiya Festival", nameNp: "जितिया पर्व", scope: "women" },

    // ═══════════════════════════════════════════════════════════════
    // Education Institutions Only
    // ═══════════════════════════════════════════════════════════════
    { month: 10, day: 28, name: "Basanta Panchami / Saraswati Puja", nameNp: "बसन्त पञ्चमी / सरस्वती पूजा", scope: "education" },

    // ═══════════════════════════════════════════════════════════════
    // Jatra Holidays (Kathmandu Valley Only)
    // ═══════════════════════════════════════════════════════════════
    { month: 5, day: 13, name: "Gai Jatra", nameNp: "गाईजात्रा", scope: "kathmandu-valley" },
    { month: 6, day: 9, name: "Indra Jatra", nameNp: "इन्द्रजात्रा", scope: "kathmandu-valley" },
    // Bhoto Jatra — observed on the day of the event (no fixed calendar date)
    { month: 12, day: 23, name: "Ghode Jatra", nameNp: "घोडेजात्रा", scope: "kathmandu-valley" },

    // ═══════════════════════════════════════════════════════════════
    // Observed Holidays
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 18, name: "May Day / Labour Day", nameNp: "मे दिन / श्रमिक दिवस", scope: "observed" },
    { month: 2, day: 15, name: "Republic Day", nameNp: "गणतन्त्र दिवस", scope: "observed" },
    { month: 6, day: 3, name: "Constitution Day", nameNp: "संविधान दिवस", scope: "observed" },
    { month: 10, day: 16, name: "Martyrs Day", nameNp: "शहिद दिवस", scope: "observed" },
    { month: 11, day: 7, name: "Democracy Day", nameNp: "प्रजातन्त्र दिवस", scope: "observed" },
    { month: 11, day: 24, name: "International Women's Day", nameNp: "अन्तर्राष्ट्रिय महिला दिवस", scope: "observed" },

    // ═══════════════════════════════════════════════════════════════
    // For People with Disabilities Only
    // ═══════════════════════════════════════════════════════════════
    { month: 8, day: 17, name: "International Day of Persons with Disabilities", nameNp: "अन्तर्राष्ट्रिय अपांगता दिवस", scope: "disabilities" },

    // ═══════════════════════════════════════════════════════════════
    // Public Holidays on Birth Anniversaries
    // ═══════════════════════════════════════════════════════════════
    { month: 1, day: 18, name: "Buddha Jayanti", nameNp: "बुद्ध जयन्ती", scope: "birth-anniversary" },
    { month: 7, day: 25, name: "Falgunanda Jayanti", nameNp: "फाल्गुनन्द जयन्ती", scope: "birth-anniversary" },
    { month: 9, day: 27, name: "Prithvi Jayanti", nameNp: "पृथ्वी जयन्ती", scope: "birth-anniversary" },
    // Guru Nanak Jayanti — date announced per lunar calendar (Sikh community)
    // Prophet Muhammad Birth Anniversary — date announced per lunar calendar

    // ═══════════════════════════════════════════════════════════════
    // Nationally Celebrated but Office Opening Days
    // ═══════════════════════════════════════════════════════════════
    { month: 2, day: 21, name: "Ethnic Discrimination and Untouchability Eradication National Day", nameNp: "जातीय भेदभाव र छुवाछुत उन्मूलन राष्ट्रिय दिवस", scope: "office-open" },
    { month: 5, day: 22, name: "Civil Service Day", nameNp: "निजामती सेवा दिवस", scope: "office-open" },
    { month: 5, day: 23, name: "Gen-Z Martyr Day", nameNp: "जेन-जेड शहिद दिवस", scope: "office-open" },
  ],
};
