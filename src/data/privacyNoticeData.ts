export interface PrivacyNoticeItem {
  id: string;
  item: string;
  question: string;
  summary: string;
  plainLanguageAnswer: string;
  details: string[];
  badge?: string;
}

export const PRIVACY_COLLECTION_NOTICE_ITEMS: PrivacyNoticeItem[] = [
  {
    id: 'identity',
    item: 'Identity',
    question: "What is the club's correct legal entity name and contact address?",
    summary: 'Sydney Colonial Muzzle Loading Club Incorporated (SCMLC) · NSW Incorporated Association Y0181644 (Est. 1962).',
    plainLanguageAnswer:
      'The organisation collecting your personal information is The Sydney Colonial Muzzle Loading Club Incorporated ("SCMLC", "the Club"). We are an incorporated non-profit association registered in New South Wales (Organisation Number Y0181644, founded in 1962).',
    details: [
      'Legal Entity Name: The Sydney Colonial Muzzle Loading Club Incorporated (SCMLC)',
      'NSW Incorporation Number: Y0181644',
      'Range Physical Complex: Sackville Ferry Road, Sackville North, NSW 2756, Australia',
      'Postal Address (Mail To): PO Box 91, Riverstone, NSW 2765, Australia',
      'Club Secretary: Yucel Durkaya (scmlc.secretary@gmail.com)',
      'Membership Secretary & Vice President: Ryan Meads (scmlc.management@gmail.com)',
    ],
    badge: 'Legal Entity',
  },
  {
    id: 'purpose',
    item: 'Purpose',
    question: 'Why is the information being collected—for membership, event administration, safety, licensing, or enquiries?',
    summary: 'To process visitor shoot bookings, verify firearm safety eligibility, administer memberships, manage competition events, and respond to enquiries.',
    plainLanguageAnswer:
      'We collect personal information solely for legitimate club administration, safety compliance, and recreational shooting operations under New South Wales law.',
    details: [
      'Visitor & Shoot Day Registrations: To schedule range attendance, allocate safety equipment, and confirm Range Officer 1:1 supervision ratios.',
      'Firearms Safety & Licensing Compliance: To verify firearms licence status or prepare statutory NSW Police Form P650 declarations for unlicensed visitors.',
      'Membership Administration & Renewals: To process new member applications, maintain our statutory Register of Members, and issue club approval certificates.',
      'Event & Competition Management: To administer match entries, target scoring, handicap tracking, and relay staging for discipline shoots and national championships.',
      'Direct Communication: To respond to your questions, provide range directions, send weather or safety alerts, and manage emergency situations.',
    ],
    badge: 'Statutory & Operational',
  },
  {
    id: 'access',
    item: 'Access & Disclosure',
    question: 'Which officers, committees, service providers, or regulators may receive it?',
    summary: 'Elected Club Officers, Range Officers, authorised sporting database providers (revolutioniseSPORT / Jotform), and NSW Police / statutory regulators where required by law.',
    plainLanguageAnswer:
      'Your information is strictly restricted to authorised personnel on a need-to-know basis and is never sold or disclosed to commercial third parties.',
    details: [
      'Club Management & Range Officers: The President, Vice President, Secretary, Membership Secretary, Treasurer, and appointed Range Officers on duty.',
      'Authorised Digital Service Providers: Secure platform providers including revolutioniseSPORT (membership database), Jotform (online digital intake), and Google Workspace (club email correspondence).',
      'Statutory Authorities & Law Enforcement: The NSW Police Force (Firearms Registry), emergency medical services, and government regulators strictly where required under the Firearms Act 1996 (NSW), Firearms Regulation 2017 (NSW), or valid court subpoena.',
      'Club Insurers: Where required for insurance claim verification or mandatory incident notification following a range accident.',
    ],
    badge: 'Restricted Access',
  },
  {
    id: 'jotform',
    item: 'Jotform & External Services',
    question: 'Is Jotform acting as the external form provider, and is the information stored or processed outside Australia?',
    summary: 'Yes, when online forms (Jotform or revolutioniseSPORT) are used, data is transmitted and processed via secure cloud servers that may be hosted in Australia, the US, or EU under strict TLS encryption.',
    plainLanguageAnswer:
      'Yes. When you submit digital web forms through our website, Jotform (Jotform Inc.) and revolutioniseSPORT act as external form and database processing providers. Depending on server routing, data and attachments may be transmitted or stored on secure cloud infrastructure located in Australia, the United States, or the European Union.',
    details: [
      'Data Security: Data in transit is secured using 256-bit SSL/TLS encryption; stored form data is held on SOC 2 Type II and ISO 27001 certified cloud infrastructure.',
      'Offshore Transmission: By submitting online forms, you consent to this transmission in accordance with Australian Privacy Principle (APP) 8 (Cross-border disclosure of personal information).',
      'Offline Alternative: If you prefer not to submit data online, paper registration forms and Form P650 declarations can be completed in person at Sackville Range or posted to PO Box 91, Riverstone NSW 2765.',
    ],
    badge: 'Cloud Processing',
  },
  {
    id: 'voluntary',
    item: 'Voluntary vs Mandatory Fields',
    question: 'Which fields are optional, and what happens if a person does not provide them?',
    summary: 'Full Name, Email, and Firearms Licence status are mandatory for safety and booking. Phone numbers, notes, and custom discipline choices are optional.',
    plainLanguageAnswer:
      'We clearly mark mandatory fields with an asterisk (*) on all our forms. Voluntary fields are optional.',
    details: [
      'Mandatory Information: Full Name, Email Address, and Firearms Licence Status (or Unlicensed Visitor indicator). If not provided, we cannot verify your eligibility, process your booking, or permit entry to the live-fire firing line.',
      'Optional Information: Phone number, specific historical firearm interests, shooting experience level, and additional notes/questions. If omitted, your booking will still proceed, though we may be unable to send SMS weather alerts or prepare specific loan equipment.',
      'NSW Form P650 Declarations (On-Site): All statutory questions regarding criminal history, AVO status, and mental health fitness on Form P650 are mandatory under NSW law for unlicensed shooters; non-completion results in mandatory refusal of range entry.',
    ],
    badge: 'Form Guidance',
  },
  {
    id: 'retention',
    item: 'Retention & Storage',
    question: 'How long will the information and attachments be kept?',
    summary: 'General enquiries: 12 months. Range attendance records, Form P650 declarations, and membership registers: 7 years minimum (NSW statutory mandate).',
    plainLanguageAnswer:
      'We retain your personal information only for as long as necessary to fulfill the purposes of collection or to satisfy statutory firearms and incorporated association requirements.',
    details: [
      'Visitor Enquiries & Expressions of Interest: Retained for up to 12 months following resolution of your enquiry or shoot day visit, after which records are securely deleted.',
      'Statutory Range Attendance Registers: Retained for a minimum of 7 years in compliance with Section 6B of the Firearms Act 1996 (NSW) and Range Approval conditions.',
      'NSW Police Form P650 Declarations: Retained on file for 7 years for inspection by NSW Firearms Registry audits.',
      'Financial Membership Records: Retained for 7 years following cessation of membership under the Associations Incorporation Act 2009 (NSW).',
      'Destruction Protocol: Physical records are cross-shredded; digital files are permanently purged from secure cloud stores.',
    ],
    badge: '7-Year Statutory',
  },
  {
    id: 'rights',
    item: 'Your Rights (Access & Correction)',
    question: 'How can a person request access to or correction of their information?',
    summary: 'Email scmlc.secretary@gmail.com with photo identification. We will provide access or correct records within 30 days free of charge.',
    plainLanguageAnswer:
      'Under Australian Privacy Principles 12 and 13, you have the legal right to request access to the personal information the Club holds about you, and to request corrections if it is inaccurate, outdated, or incomplete.',
    details: [
      'How to Request: Send a written request by email to scmlc.secretary@gmail.com or by mail to SCMLC Secretary, PO Box 91, Riverstone NSW 2765.',
      'Identity Verification: For security and firearms compliance, we may request reasonable proof of identity (e.g. driver licence or firearms licence number) before releasing records.',
      'Response Time: We will review and respond to access or correction requests within 30 calendar days.',
      'No Fee: The Club does not charge any fee for lodging an access or correction request.',
    ],
    badge: 'Privacy Rights',
  },
  {
    id: 'marketing',
    item: 'Marketing & Communications',
    question: 'Will the person receive newsletters or promotional messages, and how can they unsubscribe?',
    summary: 'No unsolicited commercial marketing. You will only receive direct booking updates or optional club journals. You may opt out anytime.',
    plainLanguageAnswer:
      'SCMLC does not engage in commercial spam or third-party marketing. You will only receive messages directly related to your enquiry, range safety, or optional club journals.',
    details: [
      'Transactional vs Promotional: Booking confirmations, Range Officer advisories, AGM notices, and safety alerts are essential operational notices.',
      'Club Journal & Event Dispatches: If you opt in or are an active member, you may receive electronic copies of our Club Journal and match bulletins.',
      'How to Unsubscribe: Every electronic newsletter contains a one-click unsubscribe link. Alternatively, email scmlc.secretary@gmail.com with "Unsubscribe" in the subject line, and we will update your preferences within 5 business days.',
    ],
    badge: 'Zero Spam',
  },
  {
    id: 'complaints',
    item: 'Complaints & Escalation',
    question: 'Who should receive a privacy complaint, and what is the escalation process?',
    summary: 'Lodge complaints to the Club Secretary (scmlc.secretary@gmail.com). If unresolved within 30 days, escalate to the OAIC (Office of the Australian Information Commissioner).',
    plainLanguageAnswer:
      'If you have concerns about how your personal information has been handled, we have a transparent two-tier complaints and escalation process.',
    details: [
      'Step 1 — Internal Investigation: Send your privacy complaint in writing to the Club Secretary (scmlc.secretary@gmail.com or PO Box 91, Riverstone NSW 2765). The Secretary and Management Committee will investigate, review logs, and provide a formal written resolution within 30 business days.',
      'Step 2 — Independent External Escalation: If you are not satisfied with the Club’s response or determination, you have the right to lodge a formal complaint with the Office of the Australian Information Commissioner (OAIC).',
      'OAIC Contact Details: Website: www.oaic.gov.au | Phone: 1300 363 992 | Post: GPO Box 5218, Sydney NSW 2001.',
    ],
    badge: 'Dispute Resolution',
  },
];
