export interface OfficialDocument {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Legal' | 'Governance' | 'Safety' | 'Compliance';
  version: string;
  fileSize: string;
  pages: number;
  description: string;
  fileName: string;
  updatedDate: string;
  sections: {
    title: string;
    subsections?: {
      title?: string;
      content: string | string[];
    }[];
    content?: string | string[];
  }[];
}

export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  {
    id: 'risk-warning-waiver',
    title: 'Sydney Colonial Muzzle Loading Club - Risk Warning and Waiver',
    shortTitle: 'Risk Warning & Waiver',
    category: 'Legal',
    version: 'Statutory 2024 / NSW Civil Liability Act 2002 (Section 5M)',
    fileSize: '1.4 MB',
    pages: 4,
    description: 'Mandatory risk warning, assumption of risk, indemnity, and release agreement under NSW Civil Liability Act 2002 for all shooters, guests, and minors.',
    fileName: 'SCMLC_Risk_Warning_and_Waiver.pdf',
    updatedDate: 'November 2024',
    sections: [
      {
        title: 'Statutory Risk Warning & Important Notice',
        content: [
          'RISK WARNING — DANGEROUS RECREATIONAL ACTIVITY (CIVIL LIABILITY ACT 2002 (NSW) Section 5M): Recreational shooting is a dangerous recreational activity that involves obvious and significant risks of physical harm, including death. By participating, you acknowledge that you have been given this risk warning and you accept those risks.',
          'IMPORTANT: Please read carefully. By signing, you agree to be bound by the following terms with Sydney Colonial Muzzle Loading Club Incorporated (Organisation Number Y0181644) ("SCMLC", "Club", "we/us/our"). These terms apply to you and, where relevant, any minor in your care.',
        ],
      },
      {
        title: '1. Parties & Capacity',
        content: [
          '1.1. Participant: The undersigned person ("you/your").',
          '1.2. If signing for a minor, you warrant you are the minor’s parent/legal guardian and accept these terms for the minor and yourself.',
        ],
      },
      {
        title: '2. Activities & Scope',
        content: [
          '2.1. This waiver covers entry to Club property, ranges and facilities; attendance at or participation in any shooting, training, events, competitions, working bees, demonstrations or other activities on or off-site under Club control (collectively, "Activities").',
          '2.2. "Rules" means all Club rules, including Range Rules & Safety Regulations (including NSW Muzzle Loading Association rules and SCMLC variations), Range Approval conditions, Keyholder Policy, Range Standing Orders/Register, posted notices, competition rules, lawful directions of Range Officers/officials, and applicable legislation (incl. Firearms Act 1996 (NSW) and regulations).',
          '2.3. Statutory obligations preserved. Nothing in this Waiver, the Rules or any Club direction permits or requires conduct contrary to any law (including the Firearms Act 1996 (NSW) and Firearms Regulation 2017 (NSW)) or the Club’s Range Approval. If there is any inconsistency, the law and the Range Approval prevail.',
        ],
      },
      {
        title: '3. Documents Acknowledgment',
        content: [
          '3.1. You acknowledge that the following documents are available on request and/or displayed at the range/website/newsletter, and by signing you confirm you have read, understand and agree to comply with them:',
          '  • 3.1.1. SCMLC Range Rules & Safety Regulations (including NSW Muzzle Loading Association rules and SCMLC variations);',
          '  • 3.1.2. NSWMLA rules relevant to disciplines;',
          '  • 3.1.3. SCMLC Constitution & By-Laws;',
          '  • 3.1.4. SCMLC Firearms Safety Course materials;',
          '  • 3.1.5. Membership Application & Conditions (including P650 guidance);',
          '  • 3.1.6. Shooting calendar and posted Range Notices;',
          '  • 3.1.7. Range Approval conditions;',
          '  • 3.1.8. Keyholder Policy;',
          '  • 3.1.9. Environmental/Lead Management and Hygiene notices (if available);',
          '  • 3.1.10. Working Bee/Power-tool safety notices (if available).',
          '3.2. You accept that breach of any Rules is your responsibility and may result in removal, discipline or referral to authorities. The Club is not liable for your breach.',
        ],
      },
      {
        title: '4. Truthfulness',
        content: [
          '4.1. Your permission to enter and participate in Activities are conditional on the truthfulness and completeness of all information you provide to the Club (including without limitation in this waiver, membership forms, P650, medical questionnaires and any declarations).',
          '4.2. If any information you provide is false, misleading or incomplete, you will be personally liable for and indemnify the Club against all loss, damage, liability, claims, costs and expenses arising as a result, and the Club may, in its discretion, refuse or terminate your participation without refund of any fees paid.',
        ],
      },
      {
        title: '5. Assumption of Risk',
        content: [
          '5.1. You acknowledge inherent and obvious risks including projectile/ricochet injury; burns from flash-over/touch-hole; misfires/hang-fires; equipment/ammunition failure or unsafe modifications; manual handling and power-tool use at working bees; slips/trips/falls on uneven, wet or muddy ground; storms, heat, cold and falling branches; vehicles on unsealed/unstable surfaces; bees/animals/insects; fire/bushfire; dust and airborne particulates; lead and black-powder smoke exposure; high noise; interactions with other participants; and first aid rendered or not rendered.',
          '5.2. You voluntarily assume all risks, both foreseen and unforeseen, arising from the Activities, except to the extent liability cannot be excluded by law.',
        ],
      },
      {
        title: '6. Compliance, Directions & Reporting',
        content: [
          '6.1. You will comply with all Rules, signage and lawful directions of Range Officers/officials, including range supervision, red-flag procedures, attendance registers, P650 processes for unlicensed persons, and Keyholder responsibilities.',
          '6.2. You must immediately report hazards, injury, incidents, unsafe behaviour or breach of the Rules to a Range Officer.',
          '6.3. Supervision of minors and unlicensed persons: Minors and unlicensed participants must at all times be under direct supervision in accordance with the Firearms Act 1996 (NSW), the Firearms Regulation 2017 (NSW) and the Club’s Range Approval (including any 1:1 supervision requirement for unlicensed participants). All P650 requirements must be strictly followed.',
          '6.4. A breach of this Waiver or the Rules by a member may result in disciplinary action under the Constitution and By-Laws (including suspension or termination). A breach by a visitor or non-member may result in immediate removal from the range, refusal of further entry or participation in any Activities, and/or referral to authorities.',
        ],
      },
      {
        title: '7. Personal Property, Vehicles & Bailee Disclaimer',
        content: [
          '7.1. All your personal property (including firearms, accessories, powder, ammunition, tools, PPE, phones, bags, valuables) and your vehicles parked on Club property are at your sole risk.',
          '7.2. The Club is not a bailee and accepts no responsibility for loss, theft, damage or destruction of any of your personal property, howsoever caused (including by third parties or weather), except to the extent liability cannot be excluded by law. You remain responsible for securing your property and complying with legal storage/transport obligations.',
          '7.3. You acknowledge the Club does not provide personal accident or property insurance for you or your equipment/vehicles.',
        ],
      },
      {
        title: '8. Environmental Exposure and Hygiene',
        content: [
          '8.1. You acknowledge exposure risks from lead, black-powder residue, smoke and airborne particulates, and you must follow posted hygiene measures (including hand-washing/de-leading, no food/drink on firing line, PPE) and any environmental notices.',
          '8.2. To the maximum extent permitted by law, the Club disclaims liability for chronic environmental exposure, and you accept responsibility for your own risk-mitigation.',
        ],
      },
      {
        title: '9. Your Equipment & Damage to Club Property',
        content: [
          '9.1. You are solely responsible for the condition, maintenance and safe operation of any personal property, including firearm, ammunition, powder and equipment you bring or use.',
          '9.2. You agree to indemnify the Club for any loss, cost or damage to Club property, facilities or equipment arising from your acts/omissions, misuse, negligence or breach of Rules.',
        ],
      },
      {
        title: '10. Behaviour & Intoxication',
        content: [
          '10.1. You must not handle or use firearms while under the influence of alcohol or drugs and must follow all safe-handling, loading and transport requirements.',
          '10.2. The Club may require PPE (hearing/eye protection) as a condition of participation.',
          '10.3. Anti-social, unsafe, abusive, discriminatory or disruptive conduct, or being under the influence of alcohol or drugs, is prohibited.',
          '10.4. The Club may refuse participation or remove you immediately (without refund) for any breach, non-compliance or unsafe conduct.',
        ],
      },
      {
        title: '11. Medical Fitness, Disclosure & First Aid',
        content: [
          '11.1. You warrant you are medically fit to participate in the Activities and have truthfully disclosed any relevant medical conditions / medications that might affect safe participation; you will promptly inform the Club if your condition changes, including conditions relevant to heat stress, dehydration, cardiac issues, allergies and insect bites.',
          '11.2. You consent to first aid by Club personnel (who may not be medical practitioners) and to emergency transport if reasonably required. You are responsible for all related costs (ambulance / evacuation / treatment), except where liability cannot be excluded by law.',
        ],
      },
      {
        title: '12. Insurance Recommendation',
        content: [
          '12.1. You are responsible for your own insurance. The Club strongly recommends appropriate personal accident/ambulance cover and, if you bring firearms/vehicles, property insurance for theft and damage. Lack of insurance does not create liability for the Club or its Volunteers.',
        ],
      },
      {
        title: '13. Release, Waiver, Indemnity & Covenant Not to Sue',
        content: [
          '13.1. To the maximum extent permitted by law, you release, waive and discharge the Club, its officers, members, volunteers, Range Officers, contractors and the owner/occupier of the premises from all claims and liabilities for injury, illness, death, loss or damage you may suffer in connection with the Activities, except to the extent caused by the Club’s breach of a non-excludable duty or guarantee.',
          '13.2. You indemnify and keep indemnified the Club against any claims, losses, costs and liabilities arising from your acts/omissions, breach of this waiver or the Rules.',
          '13.3. You acknowledge the Club is volunteer-run and that Volunteers acting in good faith within the scope of their community work for the Club are protected by law. To the maximum extent permitted by law, you agree not to bring, aid or participate in claims against Volunteers personally for matters arising from the Activities.',
          '13.4. If and to the extent that the Activities constitute "recreational services" within the meaning of section 139A of the Competition and Consumer Act 2010 (Cth), the Club, to the maximum extent permitted by law, excludes any liability for death or personal injury and any warranty that the services will be provided with reasonable care and skill.',
          '13.5. You covenant not to commence, assist or participate in any claim, demand, action or proceeding against the Club or any person released under clause 13 in respect of any matter covered by that release. The Club may rely on this clause as a complete defence and bar to any such proceedings.',
        ],
      },
      {
        title: '14. Exclusion of Indirect Loss',
        content: [
          '14.1. To the maximum extent permitted by law, the Club is not liable for any indirect, incidental, special or consequential loss, loss of opportunity or profits, or punitive damages arising out of your attendance or participation of the Activities.',
        ],
      },
      {
        title: '15. Minors',
        content: [
          '15.1. A parent/legal guardian must sign this document for a minor and ensure supervision as required by law and Club Rules. The signatory accepts all warranties, acknowledgments, risks, releases and indemnities on the minor’s behalf.',
          '15.2. The minor must at all times be directly supervised in accordance with clause 6.3.',
        ],
      },
      {
        title: '16. Photography & Media',
        content: [
          '16.1. The Club may take photos/video or install CCTV for safety records and Club promotion. If you do not consent to promotional use, notify the Club in writing before participating. Safety/incident recording may still occur.',
        ],
      },
      {
        title: '17. Privacy',
        content: [
          '17.1. The Club collects personal information (incl. licence and attendance data) to meet legal obligations and manage safety, and may disclose information to NSW Police (incl. Firearms Registry), its insurers and other regulators/law enforcement as required by law.',
        ],
      },
      {
        title: '18. No Reliance / Entire Agreement',
        content: [
          '18.1. You confirm you have not relied on any oral statement, promise or representation about risks, conditions or facilities other than this waiver and the Rules.',
          '18.2. The Club may update the Rules and posted notices (including environmental/lead hygiene notices and Keyholder Policy) from time to time. This waiver and the referenced documents constitute the entire agreement about its subject matter, subject to any non-excludable statutory warranties.',
        ],
      },
      {
        title: '19. Severability, Variation & Governance',
        content: [
          '19.1. If any provision is invalid or unenforceable, the remainder continues in effect.',
          '19.2. The Club may update the Rules and posted notices from time to time. You agree to comply with the current versions when participating.',
          '19.3. This waiver is governed by the law of New South Wales, Australia. Parties submit to the exclusive jurisdiction of NSW courts.',
        ],
      },
      {
        title: 'Signatures & Declarations',
        content: [
          'Participant Full Name: ___________________________ DOB: ___ / ___ / ______',
          'Residential Address: ____________________________________________________',
          'Email / Phone: ________________________________________________________',
          'Firearms Licence No. & Category(ies): ________________ Exp: ___ / ___ / ______',
          'Emergency Contact (Name & Phone): _______________________________________',
          'Medical Disclosure (Relevant conditions/medications or "Nil"): _________________',
          '☐ I have read and understood this Waiver, the risks, and the documents listed in clause 3, and I agree to be bound by its terms.',
          '☐ I understand and accept the Risk Warning above.',
          '☐ I have read and understood the Rules, Keyholder Policy (if applicable), and posted notices.',
          'Participant Signature: ________________________________ Date: ___ / ___ / ______',
          'FOR MINORS (IF APPLICABLE):',
          'Minor\'s Full Name: ________________________________ DOB: ___ / ___ / ______',
          '☐ I am the parent/legal guardian of the above minor. I consent to the minor’s participation and agree to the terms of this Waiver on the minor’s behalf and my own.',
          'Parent/Guardian Name: ____________________ Signature: __________________ Date: ___/___/___ Phone: ____________',
        ],
      },
    ],
  },
  {
    id: 'constitution-bylaws',
    title: 'Sydney Colonial Muzzle Loading Club - Constitution & By-Laws',
    shortTitle: 'Constitution & By-Laws',
    category: 'Governance',
    version: 'Adopted November 2024 (Official Club Instrument)',
    fileSize: '2.8 MB',
    pages: 16,
    description: 'Complete official Constitution and By-Laws of the Sydney Colonial Muzzle Loading Club Incorporated, including Objectives, Officer duties, Membership rules, and 2024 Amendments.',
    fileName: 'SCMLC_Constitution_and_ByLaws_Nov2024.pdf',
    updatedDate: 'November 2024',
    sections: [
      {
        title: 'The Constitution - 01 Name of Club',
        content: 'The name of the club shall be "The Sydney Colonial Muzzle Loading Club Incorporated" (hereinafter referred to as the "Club").',
      },
      {
        title: '02 Objectives',
        content: [
          'The club is formed:',
          'a. To support, promote, and foster an interest in muzzle-loading shooting in all its forms and applications, including hunting.',
          'b. To promote an interest in the collection, restoration and preservation of antique firearms and arms of historical interests.',
          'c. To promote an interest in the dress, customs and style of the Australian colonial period.',
          'd. To support all persons, associations, clubs or any organizations with interests of a similar nature to those of this Club.',
          'e. To acquire land, Freehold and/or Leasehold properties and to construct thereon or elsewhere any amenities, buildings or structures whatever and to sell, or otherwise dispose of and deal in same in pursuance of the Club\'s objectives.',
          'f. To borrow, raise or in any other fashion find money to further these objectives.',
          'g. To do all such acts, matters and thing permitted by law, and whether similar to or different from the above which in the operation of the Club may assist in any way to achieve its objectives.',
          'h. To directly apply the assets and income of the Club to the promotion of its objects with no portion being paid or distributed directly or indirectly to the members of the Club except as bona fide remuneration for services rendered or expenses incurred on behalf of the Club.',
          'i. Offer help, support or assistance to other shooting sports or allied interests where such help, support or assistance does not in any way jeopardize the primary objectives of the Club.',
          'j. To uphold the objectives listed herein The Sydney Colonial Muzzle Loading Club will always remain a stand-alone club run by volunteers headed by the elected committee of management, it will never assign control governing or otherwise to another club, or association or similar entity.',
        ],
      },
      {
        title: '03 Membership & 04 Register of Members',
        content: [
          '03 MEMBERSHIP: The Club shall consist of ordinary, Spousal, honorary, life, junior and collector members.',
          '04 REGISTER OF MEMBERS: The Membership Secretary shall keep a register of members containing all the information required by Law and the Club. All notices sent to the last recorded address of members shall be deemed to have been delivered fourteen days after the date of posting.',
          '05 RESIGNATION OF MEMBERS: A member may, at any time, by giving notice in writing to the Secretary, resign his/her membership of the Club, but shall remain liable for annual subscription and any other monies due and unpaid at the date of resignation.',
        ],
      },
      {
        title: '06-08 Range Attendance & Inspections',
        content: [
          '06 RECORD OF ATTENDANCE: Members must sign the attendance register when attending any Club range for an approved reason. It is the responsibility of the member to ensure they sign the attendance register. If the register is NOT signed the attendance WILL NOT be recorded.',
          '07 INSPECTION OF RECORDS: All registers, books and other documents shall be made available at any reasonable time for inspection by members of the Club, Police Officer or a person authorized by the Commissioner of Police.',
          '08 INSPECTION OF RANGES: Any range or ranges of the Club may be inspected at any time by a member of the Police Force, or a person nominated by the Commissioner of Police.',
        ],
      },
      {
        title: '09-11 By-Laws, Infringements & Appeals',
        content: [
          '09 CLUB BY-LAWS AND RULES: The Committee of Management is empowered to make, repeal and amend such By-Laws as they may from time to time consider necessary for the wellbeing of the Club.',
          '10 INFRINGEMENT OF TERMS: The Management Committee shall have the power to penalise any member who is guilty of infringement of the terms of the Constitution, by-laws or rules. The Range Captain shall have authority to warn or suspend competitors after two safety warnings.',
          '11 APPEAL AGAINST PENALTY: Any member who may be fined, suspended or disqualified shall have the right to appeal within twenty-one (21) days. An Extraordinary General Meeting shall be held within 21 days, and unless a two-thirds majority votes against the appeal, such appeal shall be upheld.',
        ],
      },
      {
        title: '12-16 Officers of the Club & Committee of Management',
        content: [
          '12 OFFICERS: Elected at the Annual General Meeting, holding office until the next AGM.',
          '13 TITLES OF OFFICERS: Patron, President, Vice-President, Club Captain, Discipline Captains, Honorary Secretary, Scorers, Assistant Secretary (Pistol), Honorary Treasurer, Instructors, Committee Persons (4 to 8), Auditors, First Aid and Safety Officers.',
          '14 COMMITTEE OF MANAGEMENT: President, Vice-President, Secretary, Treasurer, Captain, and Committee persons.',
          '15 CONTROLLING BODY: Members in General Meeting. Committee of Management decisions prevail unless beaten by two-thirds vote of the meeting.',
          '16 ELECTION QUALIFICATIONS (Amendment 16.h): The positions of Club President, Club Vice President, Hon Secretary, Hon Treasurer and Club Captain may only be held by financial members where SCMLC is their primary club, and who have served on the committee for no less than 3 consecutive years or currently serve in management.',
        ],
      },
      {
        title: '17-23 Finance, Levies & Liability',
        content: [
          '17 FUNDING: Membership subscriptions, joining fees, range fees, competition fees, badge fees, levies, and social activities.',
          '18 SUBSCRIPTIONS: Annual subscription rates set for ordinary members; other rates defined in By-Laws.',
          '19 LEVIES: Management Committee may impose per capita levies not exceeding $5 per member per annum unless approved by General Meeting.',
          '20 RANGE FEES: Fixed by Committee of Management.',
          '21 FINANCIAL YEAR: Ends on the last day of June each year.',
          '22 PROPERTY: Vested in the Committee of Management.',
          '23 LIABILITY: Limited to a sum not exceeding one dollar ($1) each plus unpaid dues.',
        ],
      },
      {
        title: '24-36 Meetings, Governance & Dissolution',
        content: [
          '24 ANNUAL GENERAL MEETING: Held in July of each year with 14 days clear written notice. Quorum: 15 financial members.',
          '25 EXTRAORDINARY GENERAL MEETING: Called by Committee or requisitioned by 6 financial members with 21 days clear written notice.',
          '26 COMMITTEE MEETINGS: Assembled at least once each month. Quorum: 4 members.',
          '29 DISSOLUTION: Requires majority at General Meeting confirmed by 3/4 vote at Extraordinary General Meeting. Net proceeds wholly donated to The First Australian Muzzle Loading Gun and Rifle Association Lithgow Inc.',
          '31 PUBLIC OFFICER: Appointed by Committee within 14 days of vacancy. Must be 18+ and NSW resident.',
          '34 INTOXICATING LIQUOR: Consumed only after all shooting is completed and firearms safely secured. Zero tolerance on firing line (5 years imprisonment statutory penalty under Firearms Act).',
        ],
      },
      {
        title: 'The By-Laws - Key Rules & Subscriptions',
        content: [
          'BY-LAW 01 MEMBERSHIP: Good fame and character, eligible for NSW licence, proposed by 2 members, probation period, $50 re-establishment fee for late dues.',
          'BY-LAW 02 LIFE MEMBERS: 10 years continuous/broken membership + 5 years official service.',
          'BY-LAW 04 PROBATIONARY MEMBERS: Approved temporary permit, minimum 3-month probation, proficiency register.',
          'BY-LAW 08 DUTIES: Detailed roles for President, Vice-President, Captain, Discipline Captains, Hon Secretary, Pistol Assistant Secretary (NSW Police Registry returns), Treasurer, Scorers, Auditors, Safety Officer.',
          'BY-LAW 10 SUBSCRIPTION CATEGORIES: Regular Member, Spousal Member, Junior Member, New Member, Life Member (fee-free), Honorary Member (fee-free), Complimentary (Executive officers & major work contributors).',
          'BY-LAW 10.1 MANAGEMENT POSITIONS: President, Vice President, Secretary, Treasurer, Pistol Secretary, Membership Secretary.',
        ],
      },
    ],
  },
  {
    id: 'range-rules-safety',
    title: 'Sydney Colonial Muzzle Loading Club - Range Rules & Safety Regulations',
    shortTitle: 'Range Rules & Safety Regulations',
    category: 'Safety',
    version: 'Updated 2018 (Incorporating NSWMLA Rules & SCMLC Variations)',
    fileSize: '2.1 MB',
    pages: 8,
    description: 'Comprehensive 8-page Range Rules and Safety Regulations covering General Range Conduct, Single Action, Pistol, Shotgun, Matchlocks, Cannon firing, Disparts, and Range Specifications.',
    fileName: 'SCMLC_Range_Rules_and_Safety_Regulations.pdf',
    updatedDate: 'Updated 2018',
    sections: [
      {
        title: 'General Safety & Operational Rules (Rules 1-47)',
        content: [
          '1. The Range Captain, Discipline Captains or their assistants (Range Officers) shall be in charge of the Club Ranges at all times. Members and guests must react promptly to instructions and advice.',
          '2. The Range Officer must have taken charge of the range before shooting can commence.',
          '3. REMEMBER – Safety is your responsibility and requires your attention to detail. It is not the sole responsibility of the Range Officer.',
          '4. Unsafe or objectionable persons may be ordered to remove themselves from the range immediately.',
          '5. Members are responsible for their family, children, guests, and pets.',
          '6. Attendance Register: Members and guests must sign the attendance book upon arrival at the range.',
          '7. Smoking is forbidden within three (3) metres of the loading or firing line.',
          '8. Alcohol / Drugs: Strictly forbidden while shooting is in progress. Firearms must be safely cased/locked before alcohol is consumed. Firearms Act 1996 s64(1) penalty: up to 5 years imprisonment.',
          '9. Loud talking is not permitted on or near the firing line. Shooters must clearly hear Range Officer orders.',
          '10. A Red Flag must be displayed when shooting is in progress and removed upon range closure.',
          '15. Firelocks/Flintlocks: Flintlocks SHALL be fitted with flash guards to prevent touchhole blast from reaching neighboring shooters.',
          '16. Licences & P650: Valid NSW firearms licence required. Unlicensed visitors wishing to sample shooting must complete Form P650 and receive 1:1 direct supervision from an appointed licensed member.',
          '19-20. Capping & Priming: No firearm may be capped, primed, fused, or loaded with cartridges until on the firing line and pointed downrange.',
          '21-22. Misfires: Misfired firearms must be kept pointed downrange for at least 15 seconds before clearing under Range Officer supervision.',
          '24. Powderless Ball: Barrel must be verified clear with a cleaning rod after shooting out a dry ball.',
          '31-35. Powder Handling: Firearms loaded strictly from single-charge pre-measured tubes. Direct pouring from flasks/horns down the barrel is prohibited. No plastic containers for bulk powder on the firing line. No smokeless/duplex loads.',
          '36. "CEASE FIRE": Immediately render firearms safe, keep pointed in safe direction, await instructions.',
          '38. "RANGE CLOSED": Render safe, place in racks or holsters, no handling until range is reopened.',
          '40. Green Light: No firearm may be touched if a green light is showing in the bay.',
          '45. Mandatory PPE: Eye and ear protection must be worn, along with covered footwear.',
          '46. Non-Scheduled Shoots: Minimum of two licensed shooters, one acting as Range Officer.',
        ],
      },
      {
        title: 'Shotgun & Field Loading Rules',
        content: [
          'SHOTGUN:',
          '1. For manually operated traps, the trapper will be given a red flag. On red flag, shooting stops immediately and guns uncapped/unloaded.',
          '2. Shooters given opportunity to see flight of non-scoring clay before shooting commences.',
          '3. "NO TARGET" called for clays outside shooting area, dangerously placed clays, or broken trap clays.',
          'FIELD LOADING:',
          '1. Shooters must carry on their person ALL equipment required during the event.',
          '2. No leaving the firing line once shooting commences.',
          '4. On "CEASE FIRE", firearms held vertically in an unprimed state before persons go forward of firing line.',
          '5. Avoid resting the muzzle against your body when loading.',
        ],
      },
      {
        title: 'Additional Safety Rules for Matchlocks',
        content: [
          'THE SAFE HANDLING OF MATCHLOCKS IS PARAMOUNT:',
          '1. Dedicated assistant appointed to supervise matchlock shooters solely.',
          '2. Match cord must be REMOVED FROM THE SERPENTINE while the firearm is being loaded.',
          '3. Match cord lit at one end only and lit ONLY on the firing line.',
          '5. If leaving the firing line to reload, the lit match must be left at the firing line.',
          '6-8. Minimum 3 metres separation between matchlock shooters and other shooters/equipment.',
          '9-12. Bandolier flasks ("The Twelve Apostles") must be worn as ornaments only or used only for sealed paper cartridges with RO approval. Never used for loose propellant.',
        ],
      },
      {
        title: 'Pistol Range Rules & Scoring',
        content: [
          'PISTOL RULES:',
          '1. Zero alcohol tolerance.',
          '4. Bulk powder removed from loading bench before capping/priming.',
          '5. Keep hands behind cylinder mouth while capping nipples.',
          '8-9. At shoot completion, cap & ball revolver completely unloaded and spent caps removed before inspection by Range Officer.',
          '14. Probationary shooters and minors supervised 1:1 by licensed Category H shooter at all times.',
          'SCORING RULES:',
          '1. 50-metre Olympic Pistol Target used at ranges up to 100 metres.',
          '2. Centerline scoring of bullet holes irrespective of caliber.',
          '4. Tied scores decided by highest number of X’s (10.1), then 10s, 9s, or least wide shot.',
          '10. Formats: 10/13 (13 shots fired, best 10 score) or 3/10 (3 sighters + 10 consecutive).',
        ],
      },
      {
        title: 'Ranges of the Club Specifications',
        content: [
          '100m RANGES: Black powder shooting up to 1.5" and smokeless to 9mm/.38 caliber. No jacketed ammunition except .22 LR. Rifles, pistols, air rifles, cannons fired in separated details.',
          'LOWER RANGE: Lead projectiles only on Single Action Range (no jacketed). All legal black powder longarms and cannons permitted.',
          'SHOTGUN RANGE: Maximum #6 shot (single ball slugs and heavy shot prohibited). Max load: 3.5 drams black powder and 1.25 oz lead shot. Proofed guns only.',
          'HILLEND RANGE: Pistols and prohibited firearms prohibited. Prior Management Committee permission required.',
        ],
      },
      {
        title: 'Basic Single Action Range Rules',
        content: [
          '1. No wrist or butt stock bandoliers.',
          '2. Long guns broken open when leaving shooters hands; pistols returned to leather when emptied.',
          '3. Shotguns staged empty.',
          '4. Revolvers loaded with 5 rounds only, hammer resting on empty/safety chamber. All loaded chambers capped.',
          '8. "NO ALIBI" MATCHES: Once the first shot is fired, the shooter is committed. Jams, misfires, and squibs are not grounds for a re-shoot unless range equipment failed.',
          '9. Shooters must verify and initial scorecards; 1-hour protest window following post.',
        ],
      },
      {
        title: 'General Cannon Rules & Disparts',
        content: [
          '1-3. Eye & ear protection mandatory. Only direct crew on firing line. Cannons recoiling more than overall length must be restrained.',
          '4. Range Officers inspect carriage cap squares.',
          '5. Bulk powder in lidded boxes at least 2 metres behind firing line.',
          '7. Slow match under direct Range Officer control.',
          '11. Unclearable cannons drowned with water through vent before removal.',
          '12. Linstock slow match used for volley fire.',
          '14. Wormer and wet mop/sponge required after EVERY shot to remove burning embers and impacted fouling.',
          '19. SCMLC approved for maximum 1.5" (38mm) cannon ball.',
          'DISPARTS: Foresight posts/patches cast or soldered at muzzle swell or reinforce rings. Minimum 10mm wide across flat, single scribe line, non-adjustable.',
        ],
      },
    ],
  },
  {
    id: 'p650-form-guidance',
    title: 'NSW Police Form P650 - Declaration & Range Visitor Guidance',
    shortTitle: 'NSW Police P650 Form Guidance',
    category: 'Compliance',
    version: 'NSW Firearms Registry Official Format',
    fileSize: '480 KB',
    pages: 2,
    description: 'Official declaration form for unlicensed persons undertaking trial shooting at an approved range under direct one-on-one supervision.',
    fileName: 'NSW_Police_Form_P650_Declaration.pdf',
    updatedDate: 'Current NSW Registry Requirement',
    sections: [
      {
        title: 'Declaration by Unlicensed Person (Form P650)',
        content: [
          'Under Section 6B of the Firearms Act 1996 (NSW), a person who is not the holder of a firearms licence or permit may possess and use a firearm under the direct supervision of a licensed club member on an approved range, provided this declaration is completed and approved.',
          'Key Eligibility Questions:',
          '1. Have you in the past 10 years been convicted of an offence involving firearms, violence, drugs, or fraud?',
          '2. Are you subject to an Apprehended Violence Order (AVO) or interim AVO in NSW or elsewhere?',
          '3. Have you ever attempted suicide or self-harm, or received treatment for a mental illness that could affect safe handling?',
          '4. Are you subject to a firearms prohibition order (FPO)?',
          'Photo ID Verification: A valid Australian Driver Licence, Passport, or NSW Photo Card must be sighted and recorded by the Range Officer on duty before entering the firing line.',
        ],
      },
    ],
  },
  {
    id: 'privacy-collection-notice',
    title: 'Sydney Colonial Muzzle Loading Club - Privacy Collection Notice',
    shortTitle: 'Privacy Collection Notice',
    category: 'Legal',
    version: 'Statutory 2026 / Australian Privacy Principles (APPs)',
    fileSize: '620 KB',
    pages: 4,
    description: 'Official plain-language privacy collection notice answering all 9 mandatory Australian statutory notice items before form submission.',
    fileName: 'SCMLC_Privacy_Collection_Notice.pdf',
    updatedDate: 'August 2026',
    sections: [
      {
        title: '1. Identity & Legal Entity',
        content: [
          'Legal Entity Name: The Sydney Colonial Muzzle Loading Club Incorporated (SCMLC)',
          'NSW Incorporation Number: Y0181644 (Founded 1962)',
          'Physical Range Complex: Sackville Ferry Road, Sackville North, NSW 2756, Australia',
          'Postal Address: PO Box 91, Riverstone, NSW 2765, Australia',
          'Primary Privacy Contacts: Club Secretary Yucel Durkaya (scmlc.secretary@gmail.com) and Membership Secretary Ryan Meads (scmlc.management@gmail.com)',
        ],
      },
      {
        title: '2. Purpose of Collection',
        content: [
          'Information collected through forms on this website or at the range is used strictly for legitimate club administration, safety compliance, and recreational shooting operations under NSW law.',
          '• Processing visitor range bookings and scheduling 1:1 Range Officer supervision.',
          '• Verifying firearms licences or administering NSW Police Form P650 declarations.',
          '• Administering new member applications, annual renewals, and the statutory Register of Members.',
          '• Managing discipline matches, target scoring, and national championships.',
          '• Providing direct correspondence, weather alerts, and emergency notifications.',
        ],
      },
      {
        title: '3. Access & Authorised Recipients',
        content: [
          'Access to personal information is strictly restricted on a need-to-know basis to:',
          '• Elected Club Executive Officers and rostered Range Officers on duty.',
          '• Authorised digital infrastructure providers (revolutioniseSPORT, Jotform, Google Workspace).',
          '• NSW Police Force (Firearms Registry) and statutory regulators where required under the Firearms Act 1996 (NSW) or lawful subpoena.',
          '• Club insurers strictly for mandatory incident reporting following a range injury.',
          'SCMLC never sells, rents, or discloses personal information to commercial marketing entities.',
        ],
      },
      {
        title: '4. Jotform & External Service Providers (Offshore Storage)',
        content: [
          'When online forms are submitted via Jotform or revolutioniseSPORT, data and attachments may be processed or held on secure cloud servers located in Australia, the United States, or the European Union.',
          'All cloud infrastructure complies with SOC 2 Type II / ISO 27001 standards and 256-bit TLS encryption in transit.',
          'Paper-based registration forms and Form P650 declarations remain available on-site at Sackville Range or via post for those preferring offline lodging.',
        ],
      },
      {
        title: '5. Voluntary vs Mandatory Fields',
        content: [
          '• Mandatory Fields (Full Name, Email, Firearms Licence status): Required to verify identity and comply with range safety rules. If not provided, the Club cannot process your booking or permit range access.',
          '• Optional Fields (Phone number, experience level, custom notes): Voluntary. Omitting these will not prevent registration but may impact our ability to send weather SMS alerts or prepare specialized loan equipment.',
          '• NSW Form P650 (On-Site): All statutory suitability questions are mandatory by NSW law for unlicensed shooters.',
        ],
      },
      {
        title: '6. Data Retention Schedule',
        content: [
          '• Visitor Inquiries & Expressions of Interest: Retained for up to 12 months after resolution or shoot attendance.',
          '• Statutory Range Attendance Registers & Form P650 Declarations: Retained for a minimum of 7 years in compliance with Section 6B of the Firearms Act 1996 (NSW).',
          '• Member Registers & Financial Records: Retained for 7 years under the Associations Incorporation Act 2009 (NSW).',
          '• Expired physical records are cross-shredded; digital files are permanently erased.',
        ],
      },
      {
        title: '7. Individual Rights (Access & Correction)',
        content: [
          'Under APPs 12 & 13, you may request access to any personal information SCMLC holds about you, and request prompt correction of inaccurate or incomplete records.',
          'Submit your request in writing to scmlc.secretary@gmail.com or PO Box 91, Riverstone NSW 2765. The Club will verify your identity and respond within 30 calendar days without charging any fee.',
        ],
      },
      {
        title: '8. Marketing & Communication Policy',
        content: [
          'SCMLC operates a strict zero-spam policy. We do not engage in commercial third-party marketing.',
          'You will only receive notices directly related to your enquiry, range safety, or optional club journals.',
          'You may opt out of newsletters or match dispatches at any time via the email unsubscribe link or by contacting scmlc.secretary@gmail.com.',
        ],
      },
      {
        title: '9. Complaints & Independent Escalation',
        content: [
          'Step 1 (Internal Privacy Officer): Lodge complaints in writing to the Club Secretary (scmlc.secretary@gmail.com). The Committee will investigate and provide a written determination within 30 business days.',
          'Step 2 (External Escalation): If unsatisfied, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) via www.oaic.gov.au or by calling 1300 363 992.',
        ],
      },
    ],
  },
];
