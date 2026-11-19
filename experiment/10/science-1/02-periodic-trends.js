export const metadata = {
    id: "exp_10_02_periodic_table",
    standard: 10,
    subject: "Science 1",
    chapter: 2,
    title: "Modern Periodic Table & Element Classification",
    titleUrdu: "جدید دوری جدول اور عناصر کی درجہ بندی",
    description: "Comprehensive modern periodic table containing all 118 chemical elements classified into Metals, Metalloids, and Non-Metals. Select any element to inspect its authentic 3D physical specimen inside an interactive glass showcase: glossy metallic spheres with dual specular reflections, faceted crystals, and sealed gas tubes.",
    descriptionUrdu: "جدید دوری جدول کے تمام 118 عناصر کا جامع مطالعہ کریں۔ کسی بھی عنصر پر ٹیپ کر کے شفاف شیشے کے کیوب میں اس کا تھری ڈی نمونہ دیکھیں: چمکتے ہوئے دھاتی گولے، کرسٹل اور گیس کی ٹیوبز۔",
    apparatusList: [
        {
            id: "periodic_matrix",
            name: "Complete 118-Element Modern Periodic Matrix",
            nameUrdu: "118 عناصر پر مشتمل جدید دوری جدول",
            desc: "Full standard IUPAC periodic grid comprising 18 vertical groups, 7 horizontal periods, plus separate Lanthanide and Actinide series.",
            descUrdu: "18 گروپس، 7 ادوار اور الگ لینتھینائیڈ و ایکٹینائیڈ قطاروں پر مشتمل مکمل دوری جدول۔"
        },
        {
            id: "specimen_chamber",
            name: "Three.js 3D Glass Showcase Chamber",
            nameUrdu: "تھری ڈاٹ جے ایس گلاس شوکیس چیمبر",
            desc: "Interactive 3D WebGL showcase with transparent glass bounding cube. Drag to rotate in 3D, pinch or scroll to zoom, rendering authentic element physical specimens.",
            descUrdu: "شفاف شیشے کا سہ جہتی کیوب جو اشیاء کو گھما کر اور زوم کر کے دیکھنے کی سہولت دیتا ہے۔"
        },
        {
            id: "mechanical_sheet",
            name: "Mechanical & Elemental Property Analyzer",
            nameUrdu: "میکانیکی اور عنصری خصوصیات کا تجزیہ",
            desc: "Analytical breakdown measuring atomic mass, physical state at STP, radioactivity, malleability, ductility, and electronic shell configuration.",
            descUrdu: "ایٹمی کمیت، طبعی حالت، تابکاری، ورق پذیری (Malleability)، تار پذیری (Ductility) اور الیکٹرانی مداروں کی تفاصیل۔"
        }
    ]
};

// Complete 118 Elements IUPAC Dataset (Z = 1 to 118)
export const PERIODIC_DATA = [
    // Period 1
    { num: 1, sym: "H", name: "Hydrogen", mass: "1.008", cat: "nonmetal", period: 1, group: 1, state: "Gas", radio: "No", config: "1", mal: "None (Gas)", duc: "None (Gas)", desc: "Lightest chemical element; colorless, odorless, highly flammable diatomic gas." },
    { num: 2, sym: "He", name: "Helium", mass: "4.003", cat: "nonmetal", period: 1, group: 18, state: "Gas", radio: "No", config: "2", mal: "None (Gas)", duc: "None (Gas)", desc: "Inert noble gas with lowest boiling point among all elements, widely used in cryogenics." },

    // Period 2
    { num: 3, sym: "Li", name: "Lithium", mass: "6.94", cat: "metal", period: 2, group: 1, state: "Solid", radio: "No", config: "2, 1", mal: "High (Soft Metal)", duc: "Moderate", desc: "Soft silvery alkali metal; least dense solid element, vital for rechargeable batteries." },
    { num: 4, sym: "Be", name: "Beryllium", mass: "9.012", cat: "metal", period: 2, group: 2, state: "Solid", radio: "No", config: "2, 2", mal: "Low (Brittle)", duc: "Low", desc: "Rigid, lightweight steel-gray metal used in aerospace alloys and X-ray tube windows." },
    { num: 5, sym: "B", name: "Boron", mass: "10.81", cat: "metalloid", period: 2, group: 13, state: "Solid", radio: "No", config: "2, 3", mal: "Brittle", duc: "Non-ductile", desc: "Extremely hard black-brown metalloid semiconductor used in borosilicate glassware." },
    { num: 6, sym: "C", name: "Carbon", mass: "12.011", cat: "nonmetal", period: 2, group: 14, state: "Solid", radio: "No", config: "2, 4", mal: "Brittle (Graphite)", duc: "Non-ductile", desc: "Basis of all organic chemistry; forms diamond crystals and black lustrous graphite." },
    { num: 7, sym: "N", name: "Nitrogen", mass: "14.007", cat: "nonmetal", period: 2, group: 15, state: "Gas", radio: "No", config: "2, 5", mal: "None (Gas)", duc: "None (Gas)", desc: "Makes up 78% of Earth's atmosphere; inert gas essential for proteins and fertilizers." },
    { num: 8, sym: "O", name: "Oxygen", mass: "15.999", cat: "nonmetal", period: 2, group: 16, state: "Gas", radio: "No", config: "2, 6", mal: "None (Gas)", duc: "None (Gas)", desc: "Highly reactive nonmetal supporting cellular aerobic respiration and combustion." },
    { num: 9, sym: "F", name: "Fluorine", mass: "18.998", cat: "nonmetal", period: 2, group: 17, state: "Gas", radio: "No", config: "2, 7", mal: "None (Gas)", duc: "None (Gas)", desc: "Most electronegative and chemically aggressive element; pale yellow toxic halogen gas." },
    { num: 10, sym: "Ne", name: "Neon", mass: "20.180", cat: "nonmetal", period: 2, group: 18, state: "Gas", radio: "No", config: "2, 8", mal: "None (Gas)", duc: "None (Gas)", desc: "Inert noble gas glowing intense reddish-orange in high-voltage electric discharge tubes." },

    // Period 3
    { num: 11, sym: "Na", name: "Sodium", mass: "22.990", cat: "metal", period: 3, group: 1, state: "Solid", radio: "No", config: "2, 8, 1", mal: "High (Soft Metal)", duc: "Moderate", desc: "Soft alkali metal easily cut with a knife; stored in mineral oil to prevent violent reaction with air/water." },
    { num: 12, sym: "Mg", name: "Magnesium", mass: "24.305", cat: "metal", period: 3, group: 2, state: "Solid", radio: "No", config: "2, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery-white metal burning with a dazzling white flame; essential for plant chlorophyll." },
    { num: 13, sym: "Al", name: "Aluminium", mass: "26.982", cat: "metal", period: 3, group: 13, state: "Solid", radio: "No", config: "2, 8, 3", mal: "Very High", duc: "Very High", desc: "Lightweight, corrosion-resistant silvery metal widely rolled into foils and drawn into wire." },
    { num: 14, sym: "Si", name: "Silicon", mass: "28.085", cat: "metalloid", period: 3, group: 14, state: "Solid", radio: "No", config: "2, 8, 4", mal: "Brittle", duc: "Non-ductile", desc: "Dark silvery-gray semiconducting metalloid with metallic luster; powers computer microchips." },
    { num: 15, sym: "P", name: "Phosphorus", mass: "30.974", cat: "nonmetal", period: 3, group: 15, state: "Solid", radio: "No", config: "2, 8, 5", mal: "Brittle (Solid)", duc: "Non-ductile", desc: "Exists as white or dark red phosphorus; essential for cellular DNA, ATP energy, and safety matches." },
    { num: 16, sym: "S", name: "Sulfur", mass: "32.06", cat: "nonmetal", period: 3, group: 16, state: "Solid", radio: "No", config: "2, 8, 6", mal: "Brittle", duc: "Non-ductile", desc: "Bright lemon-yellow crystalline brittle solid used in vulcanizing rubber and sulfuric acid production." },
    { num: 17, sym: "Cl", name: "Chlorine", mass: "35.45", cat: "nonmetal", period: 3, group: 17, state: "Gas", radio: "No", config: "2, 8, 7", mal: "None (Gas)", duc: "None (Gas)", desc: "Pungent greenish-yellow halogen gas used extensively for drinking water purification." },
    { num: 18, sym: "Ar", name: "Argon", mass: "39.948", cat: "nonmetal", period: 3, group: 18, state: "Gas", radio: "No", config: "2, 8, 8", mal: "None (Gas)", duc: "None (Gas)", desc: "Colorless, odorless noble gas glowing lilac-violet in electric discharge; welding shield gas." },

    // Period 4
    { num: 19, sym: "K", name: "Potassium", mass: "39.098", cat: "metal", period: 4, group: 1, state: "Solid", radio: "No", config: "2, 8, 8, 1", mal: "High (Soft Metal)", duc: "Moderate", desc: "Soft silvery alkali metal reacting violently with water with a lilac flame." },
    { num: 20, sym: "Ca", name: "Calcium", mass: "40.078", cat: "metal", period: 4, group: 2, state: "Solid", radio: "No", config: "2, 8, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Dull gray alkaline earth metal; primary structural component of bones, teeth, and limestone." },
    { num: 21, sym: "Sc", name: "Scandium", mass: "44.956", cat: "metal", period: 4, group: 3, state: "Solid", radio: "No", config: "2, 8, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery transition metal developing a slightly yellowish or pinkish cast upon weathering." },
    { num: 22, sym: "Ti", name: "Titanium", mass: "47.867", cat: "metal", period: 4, group: 4, state: "Solid", radio: "No", config: "2, 8, 10, 2", mal: "High", duc: "High", desc: "Lustrous silver transition metal with highest strength-to-weight ratio; immune to seawater corrosion." },
    { num: 23, sym: "V", name: "Vanadium", mass: "50.942", cat: "metal", period: 4, group: 5, state: "Solid", radio: "No", config: "2, 8, 11, 2", mal: "Moderate", duc: "High", desc: "Hard, ductile, silvery-gray transition metal added to steel for shock-resistant tools." },
    { num: 24, sym: "Cr", name: "Chromium", mass: "51.996", cat: "metal", period: 4, group: 6, state: "Solid", radio: "No", config: "2, 8, 13, 1", mal: "Low (Hard/Brittle)", duc: "Moderate", desc: "Steely-gray lustrous metal that takes high mirror polish; essential for stainless steel." },
    { num: 25, sym: "Mn", name: "Manganese", mass: "54.938", cat: "metal", period: 4, group: 7, state: "Solid", radio: "No", config: "2, 8, 13, 2", mal: "Low (Brittle)", duc: "Low", desc: "Silvery-gray brittle metal indispensable for iron smelting and aluminum beverage cans." },
    { num: 26, sym: "Fe", name: "Iron", mass: "55.845", cat: "metal", period: 4, group: 8, state: "Solid", radio: "No", config: "2, 8, 14, 2", mal: "High", duc: "High", desc: "Silvery-gray ferromagnetic backbone metal of modern engineering; carries oxygen in hemoglobin." },
    { num: 27, sym: "Co", name: "Cobalt", mass: "58.933", cat: "metal", period: 4, group: 9, state: "Solid", radio: "No", config: "2, 8, 15, 2", mal: "Moderate", duc: "Moderate", desc: "Lustrous bluish-gray ferromagnetic metal used in superalloys for jet engines and batteries." },
    { num: 28, sym: "Ni", name: "Nickel", mass: "58.693", cat: "metal", period: 4, group: 10, state: "Solid", radio: "No", config: "2, 8, 16, 2", mal: "High", duc: "High", desc: "Silvery-white lustrous transition metal with a slight golden tinge; used in stainless steel and coinage." },
    { num: 29, sym: "Cu", name: "Copper", mass: "63.546", cat: "metal", period: 4, group: 11, state: "Solid", radio: "No", config: "2, 8, 18, 1", mal: "Extremely High", duc: "Extremely High", desc: "Soft reddish-orange metal with superb electrical conductivity; industry standard for electrical cabling." },
    { num: 30, sym: "Zn", name: "Zinc", mass: "65.38", cat: "metal", period: 4, group: 12, state: "Solid", radio: "No", config: "2, 8, 18, 2", mal: "Moderate (High at 120°C)", duc: "Moderate", desc: "Bluish-silver crystalline lustrous metal used to galvanize iron and steel against corrosion." },
    { num: 31, sym: "Ga", name: "Gallium", mass: "69.723", cat: "metal", period: 4, group: 13, state: "Solid", radio: "No", config: "2, 8, 18, 3", mal: "Moderate (Soft Solid)", duc: "Low", desc: "Silvery post-transition metal melting in human hands at 29.7°C; used in blue semiconductor LEDs." },
    { num: 32, sym: "Ge", name: "Germanium", mass: "72.630", cat: "metalloid", period: 4, group: 14, state: "Solid", radio: "No", config: "2, 8, 18, 4", mal: "Brittle", duc: "Non-ductile", desc: "Lustrous, hard, grayish-white metalloid used in wide-angle infrared lenses and fiber optics." },
    { num: 33, sym: "As", name: "Arsenic", mass: "74.922", cat: "metalloid", period: 4, group: 15, state: "Solid", radio: "No", config: "2, 8, 18, 5", mal: "Brittle", duc: "Non-ductile", desc: "Steel-gray brittle metallic-looking metalloid; historically infamous toxin used in GaAs lasers." },
    { num: 34, sym: "Se", name: "Selenium", mass: "78.971", cat: "nonmetal", period: 4, group: 16, state: "Solid", radio: "No", config: "2, 8, 18, 6", mal: "Brittle", duc: "Non-ductile", desc: "Metallic gray or red nonmetal with photoconductive properties that conduct electricity upon lighting." },
    { num: 35, sym: "Br", name: "Bromine", mass: "79.904", cat: "nonmetal", period: 4, group: 17, state: "Liquid", radio: "No", config: "2, 8, 18, 7", mal: "None (Liquid)", duc: "None (Liquid)", desc: "Dense, fuming reddish-brown halogen liquid at room temperature; volatile with a choking pungent odor." },
    { num: 36, sym: "Kr", name: "Krypton", mass: "83.798", cat: "nonmetal", period: 4, group: 18, state: "Gas", radio: "No", config: "2, 8, 18, 8", mal: "None (Gas)", duc: "None (Gas)", desc: "Colorless noble gas characterized by a brilliant greenish-yellow and white discharge spectrum." },

    // Period 5
    { num: 37, sym: "Rb", name: "Rubidium", mass: "85.468", cat: "metal", period: 5, group: 1, state: "Solid", radio: "No", config: "2, 8, 18, 8, 1", mal: "High (Soft Metal)", duc: "Moderate", desc: "Very soft, highly reactive silvery-white alkali metal that ignites spontaneously in atmospheric air." },
    { num: 38, sym: "Sr", name: "Strontium", mass: "87.62", cat: "metal", period: 5, group: 2, state: "Solid", radio: "No", config: "2, 8, 18, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery yellowish metal burning with a dazzling crimson flame used in emergency fireworks." },
    { num: 39, sym: "Y", name: "Yttrium", mass: "88.906", cat: "metal", period: 5, group: 3, state: "Solid", radio: "No", config: "2, 8, 18, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery-metallic transition metal used in YAG lasers and high-temperature superconductors." },
    { num: 40, sym: "Zr", name: "Zirconium", mass: "91.224", cat: "metal", period: 5, group: 4, state: "Solid", radio: "No", config: "2, 8, 18, 10, 2", mal: "High", duc: "High", desc: "Lustrous, grayish-white corrosion-resistant metal used to clad radioactive nuclear fuel rods." },
    { num: 41, sym: "Nb", name: "Niobium", mass: "92.906", cat: "metal", period: 5, group: 5, state: "Solid", radio: "No", config: "2, 8, 18, 12, 1", mal: "High", duc: "High", desc: "Ductile transition metal forming superconducting alloys used in hospital MRI scanner magnets." },
    { num: 42, sym: "Mo", name: "Molybdenum", mass: "95.95", cat: "metal", period: 5, group: 6, state: "Solid", radio: "No", config: "2, 8, 18, 13, 1", mal: "Moderate", duc: "High", desc: "Refractory silvery metal with extreme melting point (2623°C); strengthens military armor plates." },
    { num: 43, sym: "Tc", name: "Technetium", mass: "98.0", cat: "metal", period: 5, group: 7, state: "Solid", radio: "Yes", config: "2, 8, 18, 13, 2", mal: "Moderate", duc: "Moderate", desc: "First artificially synthesized radioactive metal; technetium-99m is vital for medical gamma scans." },
    { num: 44, sym: "Ru", name: "Ruthenium", mass: "101.07", cat: "metal", period: 5, group: 8, state: "Solid", radio: "No", config: "2, 8, 18, 15, 1", mal: "Low (Brittle)", duc: "Low", desc: "Rare polyvalent platinum-group metal used for wear-resistant electrical contacts and tips." },
    { num: 45, sym: "Rh", name: "Rhodium", mass: "102.91", cat: "metal", period: 5, group: 9, state: "Solid", radio: "No", config: "2, 8, 18, 16, 1", mal: "Moderate", duc: "High", desc: "Extremely reflective, noble silvery metal prized as catalytic converter in automotive exhaust systems." },
    { num: 46, sym: "Pd", name: "Palladium", mass: "106.42", cat: "metal", period: 5, group: 10, state: "Solid", radio: "No", config: "2, 8, 18, 18", mal: "High", duc: "High", desc: "Lustrous silvery-white metal that absorbs up to 900 times its own volume of hydrogen gas." },
    { num: 47, sym: "Ag", name: "Silver", mass: "107.87", cat: "metal", period: 5, group: 11, state: "Solid", radio: "No", config: "2, 8, 18, 18, 1", mal: "Extremely High", duc: "Extremely High", desc: "Brilliant white lustrous metal; possesses the highest electrical and thermal conductivity of all elements." },
    { num: 48, sym: "Cd", name: "Cadmium", mass: "112.41", cat: "metal", period: 5, group: 12, state: "Solid", radio: "No", config: "2, 8, 18, 18, 2", mal: "High", duc: "High", desc: "Soft, toxic bluish-white metal historically used in rechargeable Ni-Cd batteries and anti-corrosion plating." },
    { num: 49, sym: "In", name: "Indium", mass: "114.82", cat: "metal", period: 5, group: 13, state: "Solid", radio: "No", config: "2, 8, 18, 18, 3", mal: "Extremely High (Soft)", duc: "Moderate", desc: "Silvery-white post-transition metal so soft it can be chewed with teeth; makes transparent touchscreen ITO." },
    { num: 50, sym: "Sn", name: "Tin", mass: "118.71", cat: "metal", period: 5, group: 14, state: "Solid", radio: "No", config: "2, 8, 18, 18, 4", mal: "High", duc: "Moderate", desc: "Silvery malleable metal emitting a characteristic 'tin cry' when bent; alloyed into bronze." },
    { num: 51, sym: "Sb", name: "Antimony", mass: "121.76", cat: "metalloid", period: 5, group: 15, state: "Solid", radio: "No", config: "2, 8, 18, 18, 5", mal: "Brittle", duc: "Non-ductile", desc: "Lustrous gray metalloid alloyed to harden lead in car batteries and used as flame-retardant." },
    { num: 52, sym: "Te", name: "Tellurium", mass: "127.60", cat: "metalloid", period: 5, group: 16, state: "Solid", radio: "No", config: "2, 8, 18, 18, 6", mal: "Brittle", duc: "Non-ductile", desc: "Brittle silvery-white metalloid with metallic luster, alloyed to improve copper machinability." },
    { num: 53, sym: "I", name: "Iodine", mass: "126.90", cat: "nonmetal", period: 5, group: 17, state: "Solid", radio: "No", config: "2, 8, 18, 18, 7", mal: "Brittle (Sublimes)", duc: "Non-ductile", desc: "Lustrous dark violet-black solid subliming into brilliant deep violet gas; essential dietary thyroid nutrient." },
    { num: 54, sym: "Xe", name: "Xenon", mass: "131.29", cat: "nonmetal", period: 5, group: 18, state: "Gas", radio: "No", config: "2, 8, 18, 18, 8", mal: "None (Gas)", duc: "None (Gas)", desc: "Dense noble gas emitting brilliant blue glow in electric discharge; propellant for deep-space ion thrusters." },

    // Period 6 (Main Table + Lanthanides 57-71)
    { num: 55, sym: "Cs", name: "Caesium", mass: "132.91", cat: "metal", period: 6, group: 1, state: "Solid", radio: "No", config: "2, 8, 18, 18, 8, 1", mal: "High (Extremely Soft)", duc: "Low", desc: "Pale golden alkali metal melting at 28.5°C; atomic vibration frequency defines the global SI second." },
    { num: 56, sym: "Ba", name: "Barium", mass: "137.33", cat: "metal", period: 6, group: 2, state: "Solid", radio: "No", config: "2, 8, 18, 18, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Soft silvery alkaline earth metal producing vivid green pyrotechnic flares; used in gastrointestinal X-rays." },

    // Lanthanide Series (57 to 71)
    { num: 57, sym: "La", name: "Lanthanum", mass: "138.91", cat: "metal", period: 8, group: 3, state: "Solid", radio: "No", config: "2, 8, 18, 18, 9, 2", mal: "Moderate", duc: "High", desc: "Silvery-white soft rare earth metal that oxidizes quickly; used in studio cinema carbon arc lighting." },
    { num: 58, sym: "Ce", name: "Cerium", mass: "140.12", cat: "metal", period: 8, group: 4, state: "Solid", radio: "No", config: "2, 8, 18, 19, 9, 2", mal: "High", duc: "High", desc: "Most abundant rare earth metal; sparks easily when struck, forming the ferrocerium in cigarette lighters." },
    { num: 59, sym: "Pr", name: "Praseodymium", mass: "140.91", cat: "metal", period: 8, group: 5, state: "Solid", radio: "No", config: "2, 8, 18, 21, 8, 2", mal: "Moderate", duc: "High", desc: "Soft silvery metal imparting rich yellow-green tint to welder safety goggles and studio glassware." },
    { num: 60, sym: "Nd", name: "Neodymium", mass: "144.24", cat: "metal", period: 8, group: 6, state: "Solid", radio: "No", config: "2, 8, 18, 22, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Critical constituent of world's strongest permanent magnets (NdFeB), essential for EV traction motors." },
    { num: 61, sym: "Pm", name: "Promethium", mass: "145.0", cat: "metal", period: 8, group: 7, state: "Solid", radio: "Yes", config: "2, 8, 18, 23, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Extremely rare radioactive lanthanide glowing pale blue in the dark; used in nuclear batteries." },
    { num: 62, sym: "Sm", name: "Samarium", mass: "150.36", cat: "metal", period: 8, group: 8, state: "Solid", radio: "No", config: "2, 8, 18, 24, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Hard silvery metal alloyed to produce samarium-cobalt magnets operating at extreme high temperatures." },
    { num: 63, sym: "Eu", name: "Europium", mass: "151.96", cat: "metal", period: 8, group: 9, state: "Solid", radio: "No", config: "2, 8, 18, 25, 8, 2", mal: "High (Soft)", duc: "High", desc: "Most reactive lanthanide metal; red phosphors illuminate color TV screens and euro banknote anti-counterfeit marks." },
    { num: 64, sym: "Gd", name: "Gadolinium", mass: "157.25", cat: "metal", period: 8, group: 10, state: "Solid", radio: "No", config: "2, 8, 18, 25, 9, 2", mal: "Moderate", duc: "High", desc: "Silvery rare earth metal used as intravenous contrast agent to sharpen diagnostic magnetic resonance imaging." },
    { num: 65, sym: "Tb", name: "Terbium", mass: "158.93", cat: "metal", period: 8, group: 11, state: "Solid", radio: "No", config: "2, 8, 18, 27, 8, 2", mal: "Moderate", duc: "High", desc: "Silvery-gray rare earth metal emitting intense green phosphorescence in fluorescent lamps." },
    { num: 66, sym: "Dy", name: "Dysprosium", mass: "162.50", cat: "metal", period: 8, group: 12, state: "Solid", radio: "No", config: "2, 8, 18, 28, 8, 2", mal: "Moderate", duc: "High", desc: "Retains high magnetic susceptibility; added to neodymium magnets to stop demagnetization in electric vehicles." },
    { num: 67, sym: "Ho", name: "Holmium", mass: "164.93", cat: "metal", period: 8, group: 13, state: "Solid", radio: "No", config: "2, 8, 18, 29, 8, 2", mal: "Moderate", duc: "High", desc: "Possesses highest magnetic moment of all natural elements; concentrates magnetic flux lines in pole pieces." },
    { num: 68, sym: "Er", name: "Erbium", mass: "167.26", cat: "metal", period: 8, group: 14, state: "Solid", radio: "No", config: "2, 8, 18, 30, 8, 2", mal: "Moderate", duc: "High", desc: "Rose-pink tinted element utilized in trans-oceanic optical fiber signal repeaters and dermatology lasers." },
    { num: 69, sym: "Tm", name: "Thulium", mass: "168.93", cat: "metal", period: 8, group: 15, state: "Solid", radio: "No", config: "2, 8, 18, 31, 8, 2", mal: "Moderate", duc: "High", desc: "Least abundant stable lanthanide; radioactive thulium-170 powers portable battlefield X-ray emitters." },
    { num: 70, sym: "Yb", name: "Ytterbium", mass: "173.05", cat: "metal", period: 8, group: 16, state: "Solid", radio: "No", config: "2, 8, 18, 32, 8, 2", mal: "High", duc: "High", desc: "Soft, malleable silvery metal used in fiber-laser metallurgy and ultra-precise optical atomic clocks." },
    { num: 71, sym: "Lu", name: "Lutetium", mass: "174.97", cat: "metal", period: 8, group: 17, state: "Solid", radio: "No", config: "2, 8, 18, 32, 9, 2", mal: "Moderate", duc: "High", desc: "Hardest and densest lanthanide; cerium-doped lutetium oxyorthosilicate crystals power PET oncology scanners." },

    // Period 6 Transition Metals & Main Table (72 to 86)
    { num: 72, sym: "Hf", name: "Hafnium", mass: "178.49", cat: "metal", period: 6, group: 4, state: "Solid", radio: "No", config: "2, 8, 18, 32, 10, 2", mal: "High", duc: "High", desc: "Lustrous gray transition metal absorbing thermal neutrons; controls nuclear submarine reactors." },
    { num: 73, sym: "Ta", name: "Tantalum", mass: "180.95", cat: "metal", period: 6, group: 5, state: "Solid", radio: "No", config: "2, 8, 18, 32, 11, 2", mal: "High", duc: "High", desc: "Dark blue-gray metal immune to chemical acid attack; essential for miniaturized smartphone capacitors." },
    { num: 74, sym: "W", name: "Tungsten", mass: "183.84", cat: "metal", period: 6, group: 6, state: "Solid", radio: "No", config: "2, 8, 18, 32, 12, 2", mal: "Low (Very Hard)", duc: "High (When Pure)", desc: "Highest melting point of all metals (3422°C); used in incandescent filaments and rocket engine nozzles." },
    { num: 75, sym: "Re", name: "Rhenium", mass: "186.21", cat: "metal", period: 6, group: 7, state: "Solid", radio: "No", config: "2, 8, 18, 32, 13, 2", mal: "Moderate", duc: "High", desc: "Dense silvery metal with third-highest melting point; alloyed in turbine combustion blades for supersonic jets." },
    { num: 76, sym: "Os", name: "Osmium", mass: "190.23", cat: "metal", period: 6, group: 8, state: "Solid", radio: "No", config: "2, 8, 18, 32, 14, 2", mal: "Low (Extremely Brittle)", duc: "Non-ductile", desc: "Densest naturally occurring substance on Earth (22.59 g/cm³); blue-gray lustrous metal with extreme hardness." },
    { num: 77, sym: "Ir", name: "Iridium", mass: "192.22", cat: "metal", period: 6, group: 9, state: "Solid", radio: "No", config: "2, 8, 18, 32, 15, 2", mal: "Low (Brittle)", duc: "Moderate", desc: "Most corrosion-resistant metal known; standard international prototype kilogram was cast from 90% platinum 10% iridium." },
    { num: 78, sym: "Pt", name: "Platinum", mass: "195.08", cat: "metal", period: 6, group: 10, state: "Solid", radio: "No", config: "2, 8, 18, 32, 17, 1", mal: "Very High", duc: "Very High", desc: "Dense, malleable, silver-white noble metal resistant to oxidation; primary industrial chemical catalyst." },
    { num: 79, sym: "Au", name: "Gold", mass: "196.97", cat: "metal", period: 6, group: 11, state: "Solid", radio: "No", config: "2, 8, 18, 32, 18, 1", mal: "Most Malleable of All", duc: "Most Ductile of All", desc: "Lustrous yellow noble metal that never tarnishes; single gram can be beaten into 1 square meter gold leaf." },
    { num: 80, sym: "Hg", name: "Mercury", mass: "200.59", cat: "metal", period: 6, group: 12, state: "Liquid", radio: "No", config: "2, 8, 18, 32, 18, 2", mal: "None (Liquid)", duc: "None (Liquid)", desc: "Heavy silvery d-block element; only metallic element existing in liquid physical state at standard room temperature." },
    { num: 81, sym: "Tl", name: "Thallium", mass: "204.38", cat: "metal", period: 6, group: 13, state: "Solid", radio: "No", config: "2, 8, 18, 32, 18, 3", mal: "High (Very Soft)", duc: "Low", desc: "Soft malleable gray post-transition metal; highly toxic compound historically used in rodenticides." },
    { num: 82, sym: "Pb", name: "Lead", mass: "207.2", cat: "metal", period: 6, group: 14, state: "Solid", radio: "No", config: "2, 8, 18, 32, 18, 4", mal: "Very High", duc: "Moderate", desc: "Heavy dense bluish-gray metal shielding against harmful X-rays and gamma radiation; vehicle battery plates." },
    { num: 83, sym: "Bi", name: "Bismuth", mass: "208.98", cat: "metal", period: 6, group: 15, state: "Solid", radio: "No", config: "2, 8, 18, 32, 18, 5", mal: "Brittle", duc: "Non-ductile", desc: "Brittle metal with silvery-pink hue; forms spectacular iridescent rainbow hopper crystals via surface oxide thin-film." },
    { num: 84, sym: "Po", name: "Polonium", mass: "209.0", cat: "metalloid", period: 6, group: 16, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 6", mal: "Moderate", duc: "Moderate", desc: "Highly radioactive silvery-gray metalloid discovered by Marie Curie in 1898; emits intense alpha particles." },
    { num: 85, sym: "At", name: "Astatine", mass: "210.0", cat: "metalloid", period: 6, group: 17, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 7", mal: "Unknown (Decays)", duc: "Unknown (Decays)", desc: "Rarest naturally occurring chemical element in Earth's crust; decays rapidly with half-life of 8.1 hours." },
    { num: 86, sym: "Rn", name: "Radon", mass: "222.0", cat: "nonmetal", period: 6, group: 18, state: "Gas", radio: "Yes", config: "2, 8, 18, 32, 18, 8", mal: "None (Gas)", duc: "None (Gas)", desc: "Colorless radioactive noble gas produced naturally from decaying uranium and thorium bedrock deposits." },

    // Period 7 (Main Table + Actinides 89-103)
    { num: 87, sym: "Fr", name: "Francium", mass: "223.0", cat: "metal", period: 7, group: 1, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 8, 1", mal: "High (Theoretical)", duc: "Moderate", desc: "Intensely radioactive alkali metal; highest electropositivity with maximum half-life of 22 minutes." },
    { num: 88, sym: "Ra", name: "Radium", mass: "226.0", cat: "metal", period: 7, group: 2, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Pure white radioactive alkaline earth metal oxidizing to black; historically used on self-luminous watch dials." },

    // Actinide Series (89 to 103)
    { num: 89, sym: "Ac", name: "Actinium", mass: "227.0", cat: "metal", period: 9, group: 3, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery radioactive actinide glowing blue in the dark from intense radiation ionizing surrounding air." },
    { num: 90, sym: "Th", name: "Thorium", mass: "232.04", cat: "metal", period: 9, group: 4, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 18, 10, 2", mal: "High", duc: "High", desc: "Silvery actinide metal thrice as abundant as uranium; fertile fuel source for molten salt nuclear reactors." },
    { num: 91, sym: "Pa", name: "Protactinium", mass: "231.04", cat: "metal", period: 9, group: 5, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 20, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Dense, silvery-gray radioactive actinide metal developing a thin oxide coating when exposed to air." },
    { num: 92, sym: "U", name: "Uranium", mass: "238.03", cat: "metal", period: 9, group: 6, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 21, 9, 2", mal: "High", duc: "High", desc: "Dense silvery-gray metallic element; primary fissile fuel supplying civilian nuclear power plants." },
    { num: 93, sym: "Np", name: "Neptunium", mass: "237.0", cat: "metal", period: 9, group: 7, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 22, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Silvery transuranic actinide synthesized by cyclotron bombardment; precursor to plutonium-238." },
    { num: 94, sym: "Pu", name: "Plutonium", mass: "244.0", cat: "metal", period: 9, group: 8, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 24, 8, 2", mal: "Moderate", duc: "Low", desc: "Silvery-gray metal turning yellowish-bronze; fissile core of atomic warheads and deep space probes." },
    { num: 95, sym: "Am", name: "Americium", mass: "243.0", cat: "metal", period: 9, group: 9, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 25, 8, 2", mal: "Moderate", duc: "High", desc: "Synthetic white lustrous actinide; ionizing alpha radiation triggers commercial smoke alarms." },
    { num: 96, sym: "Cm", name: "Curium", mass: "247.0", cat: "metal", period: 9, group: 10, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 25, 9, 2", mal: "Moderate", duc: "Moderate", desc: "Hard dense radioactive metal named for Marie Curie; generates thermal power for extraterrestrial landers." },
    { num: 97, sym: "Bk", name: "Berkelium", mass: "247.0", cat: "metal", period: 9, group: 11, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 27, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Synthetic soft silvery radioactive actinide synthesized at University of California, Berkeley." },
    { num: 98, sym: "Cf", name: "Californium", mass: "251.0", cat: "metal", period: 9, group: 12, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 28, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Very potent neutron emitter; utilized in oil well logging and detecting metal fatigue in airplane wings." },
    { num: 99, sym: "Es", name: "Einsteinium", mass: "252.0", cat: "metal", period: 9, group: 13, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 29, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Discovered in the radioactive fallout debris of the first megaton hydrogen bomb blast (Ivy Mike) in 1952." },
    { num: 100, sym: "Fm", name: "Fermium", mass: "257.0", cat: "metal", period: 9, group: 14, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 30, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Heaviest element that can be synthesized by consecutive neutron absorption; named for Enrico Fermi." },
    { num: 101, sym: "Md", name: "Mendelevium", mass: "258.0", cat: "metal", period: 9, group: 15, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 31, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Synthesized atom-by-atom in particle accelerators; named after the architect of the periodic table." },
    { num: 102, sym: "No", name: "Nobelium", mass: "259.0", cat: "metal", period: 9, group: 16, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 8, 2", mal: "Moderate", duc: "Moderate", desc: "Radioactive synthetic actinide discovered at Joint Institute for Nuclear Research; named for Alfred Nobel." },
    { num: 103, sym: "Lr", name: "Lawrencium", mass: "266.0", cat: "metal", period: 9, group: 17, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 8, 3", mal: "Moderate", duc: "Moderate", desc: "Final member of the actinide series; behaves chemically analogous to transition metals." },

    // Period 7 Superheavy Transactinides (104 to 118)
    { num: 104, sym: "Rf", name: "Rutherfordium", mass: "267.0", cat: "metal", period: 7, group: 4, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 10, 2", mal: "Moderate (Simulated)", duc: "Moderate", desc: "First synthetic transactinide superheavy element; half-life spans mere minutes." },
    { num: 105, sym: "Db", name: "Dubnium", mass: "268.0", cat: "metal", period: 7, group: 5, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 11, 2", mal: "Moderate", duc: "Moderate", desc: "Superheavy element named after the Russian nuclear research institute in Dubna." },
    { num: 106, sym: "Sg", name: "Seaborgium", mass: "269.0", cat: "metal", period: 7, group: 6, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 12, 2", mal: "Moderate", duc: "Moderate", desc: "Named in honor of Glenn T. Seaborg, Nobel laureate pioneer of transuranium synthesis." },
    { num: 107, sym: "Bh", name: "Bohrium", mass: "270.0", cat: "metal", period: 7, group: 7, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 13, 2", mal: "Moderate", duc: "Moderate", desc: "Superheavy synthetic metal named after Danish quantum physicist Niels Bohr." },
    { num: 108, sym: "Hs", name: "Hassium", mass: "277.0", cat: "metal", period: 7, group: 8, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 14, 2", mal: "Moderate", duc: "Moderate", desc: "Synthetic transition metal forming volatile tetroxide compound analogous to osmium." },
    { num: 109, sym: "Mt", name: "Meitnerium", mass: "278.0", cat: "metal", period: 7, group: 9, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 15, 2", mal: "Moderate", duc: "Moderate", desc: "Named in honor of Austrian physicist Lise Meitner, co-discoverer of nuclear fission." },
    { num: 110, sym: "Ds", name: "Darmstadtium", mass: "281.0", cat: "metal", period: 7, group: 10, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 17, 1", mal: "Moderate", duc: "Moderate", desc: "Created via fusion of lead-208 and nickel-62 at GSI facility in Darmstadt, Germany." },
    { num: 111, sym: "Rg", name: "Roentgenium", mass: "282.0", cat: "metal", period: 7, group: 11, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 1", mal: "High (Estimated)", duc: "High", desc: "Synthetic coinage metal homologue of gold named after Wilhelm Röntgen, discoverer of X-rays." },
    { num: 112, sym: "Cn", name: "Copernicium", mass: "285.0", cat: "metal", period: 7, group: 12, state: "Liquid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 2", mal: "None (Volatile Liquid)", duc: "None", desc: "Extremely volatile relativistic metal behaving with noble-gas-like inertness." },
    { num: 113, sym: "Nh", name: "Nihonium", mass: "286.0", cat: "metal", period: 7, group: 13, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 3", mal: "Moderate", duc: "Moderate", desc: "First element synthesized in Asia (RIKEN accelerator in Japan); highly unstable radioactive metal." },
    { num: 114, sym: "Fl", name: "Flerovium", mass: "289.0", cat: "metal", period: 7, group: 14, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 4", mal: "Moderate", duc: "Moderate", desc: "Superheavy post-transition element synthesized at Joint Institute for Nuclear Research." },
    { num: 115, sym: "Mc", name: "Moscovium", mass: "290.0", cat: "metal", period: 7, group: 15, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 5", mal: "Moderate", duc: "Moderate", desc: "Extremely unstable synthetic metal decaying within fractions of a second into lighter isotopes." },
    { num: 116, sym: "Lv", name: "Livermorium", mass: "293.0", cat: "metal", period: 7, group: 16, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 6", mal: "Moderate", duc: "Moderate", desc: "Superheavy synthetic chalcogen synthesized via curium-248 and calcium-48 ion bombardment." },
    { num: 117, sym: "Ts", name: "Tennessine", mass: "294.0", cat: "metalloid", period: 7, group: 17, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 7", mal: "Brittle", duc: "Non-ductile", desc: "Second-heaviest known element; superheavy halogen predicted to exhibit metalloid properties." },
    { num: 118, sym: "Og", name: "Oganesson", mass: "294.0", cat: "nonmetal", period: 7, group: 18, state: "Solid", radio: "Yes", config: "2, 8, 18, 32, 32, 18, 8", mal: "None (Solid Gas)", duc: "None", desc: "Heaviest element in the periodic table (Atomic Number 118); relativistic effects predict solid state at STP." }
];

export class Experiment {
    constructor(canvas, lang = 'en') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lang = lang;
        this.metadata = metadata;

        // Default Selected Element (Gold - Au)
        this.selectedElement = PERIODIC_DATA.find(e => e.sym === "Au") || PERIODIC_DATA[0];

        // Canvas Layout Dimensions
        this.gridCols = 18;
        this.cellBoxes = [];

        // Three.js Core State (Singleton WebGL Pipeline)
        this.threeRenderer = null;
        this.threeScene = null;
        this.threeCamera = null;
        this.threePivot = null;
        this.currentSpecimenMesh = null;
        this.animFrameId = null;

        // Touch & Zoom Controller State
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        this.initialPinchDistance = 0;
        this.initialCameraZ = 4.0;

        // Auto-mount inspector in controls dock
        this.ensureInspectorMounted();
    }

    ensureInspectorMounted() {
        setTimeout(() => {
            const dockContainer = document.getElementById('simDynamicControlsContainer');
            if (dockContainer && !document.getElementById('threejsCanvasMount')) {
                this.renderInspectorInterface(dockContainer);
            }
        }, 120);
    }

    update(delta) {
        // High performance idle state - no CPU cycles wasted
    }

    // ========================================================
    // PERIODIC TABLE CANVAS MATRIX (118 ELEMENTS IUPAC)
    // ========================================================

    draw(ctx, width, height) {
        ctx.save();
        this.cellBoxes = [];

        const marginX = 14;
        const marginTop = 52;
        const availableW = width - (marginX * 2);
        const cellW = Math.max(34, Math.min(48, availableW / this.gridCols));
        const cellH = cellW * 1.14;
        const gridStartX = Math.max(marginX, (width - (cellW * this.gridCols)) / 2);

        // 1. Category Legend
        this.drawLegend(ctx, gridStartX, marginTop - 24);

        // 2. Main Matrix (Periods 1 to 7)
        PERIODIC_DATA.forEach(elem => {
            if (elem.period <= 7) {
                const colIdx = elem.group - 1;
                const rowIdx = elem.period - 1;
                const x = gridStartX + (colIdx * cellW);
                const y = marginTop + (rowIdx * cellH);

                this.cellBoxes.push({ elem, x, y, w: cellW, h: cellH });
                this.drawElementCell(ctx, elem, x, y, cellW, cellH);
            }
        });

        // 3. Lanthanides & Actinides (Periods 8 & 9)
        const subSeriesTopY = marginTop + (7 * cellH) + 16;
        this.drawSeriesLabel(ctx, gridStartX, subSeriesTopY, cellW, "Lanthanides (57-71)");
        this.drawSeriesLabel(ctx, gridStartX, subSeriesTopY + cellH + 4, cellW, "Actinides (89-103)");

        PERIODIC_DATA.forEach(elem => {
            if (elem.period === 8 || elem.period === 9) {
                const colIdx = elem.group - 1;
                const rowOffset = elem.period === 8 ? 0 : 1;
                const x = gridStartX + (colIdx * cellW);
                const y = subSeriesTopY + (rowOffset * (cellH + 4));

                this.cellBoxes.push({ elem, x, y, w: cellW, h: cellH });
                this.drawElementCell(ctx, elem, x, y, cellW, cellH);
            }
        });

        ctx.restore();
    }

    drawLegend(ctx, x, y) {
        ctx.save();
        const legendItems = [
            { label: "Metals", color: "#0284c7", border: "#38bdf8" },
            { label: "Metalloids", color: "#d97706", border: "#fbbf24" },
            { label: "Non-Metals", color: "#059669", border: "#34d399" }
        ];

        let curX = x + 2;
        ctx.font = "bold 10px sans-serif";
        ctx.textBaseline = "middle";

        legendItems.forEach(item => {
            ctx.fillStyle = item.color;
            ctx.strokeStyle = item.border;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(curX, y - 5, 12, 10, 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#cbd5e1";
            ctx.textAlign = "left";
            ctx.fillText(item.label, curX + 16, y);
            curX += 90;
        });

        ctx.restore();
    }

    drawSeriesLabel(ctx, x, y, cellW, label) {
        ctx.save();
        ctx.fillStyle = "#64748b";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x + 2, y + cellW * 0.55);
        ctx.restore();
    }

    drawElementCell(ctx, elem, x, y, w, h) {
        ctx.save();
        const isSelected = this.selectedElement.num === elem.num;

        let fillColor, borderColor, glowColor;
        if (elem.cat === "metal") {
            fillColor = isSelected ? "rgba(2, 132, 199, 0.55)" : "rgba(15, 23, 42, 0.92)";
            borderColor = isSelected ? "#00f0ff" : "rgba(56, 189, 248, 0.55)";
            glowColor = "#00f0ff";
        } else if (elem.cat === "metalloid") {
            fillColor = isSelected ? "rgba(217, 119, 6, 0.55)" : "rgba(24, 18, 12, 0.92)";
            borderColor = isSelected ? "#fbbf24" : "rgba(245, 158, 11, 0.65)";
            glowColor = "#fbbf24";
        } else {
            fillColor = isSelected ? "rgba(5, 150, 105, 0.55)" : "rgba(10, 24, 20, 0.92)";
            borderColor = isSelected ? "#34d399" : "rgba(16, 185, 129, 0.55)";
            glowColor = "#34d399";
        }

        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, w - 2, h - 2, 3);
        ctx.fillStyle = fillColor;
        ctx.fill();

        ctx.lineWidth = isSelected ? 2.0 : 1.0;
        ctx.strokeStyle = borderColor;
        if (isSelected) {
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 12;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Atomic Number
        ctx.fillStyle = isSelected ? "#ffffff" : "#94a3b8";
        ctx.font = `bold ${Math.max(7, Math.round(w * 0.22))}px monospace`;
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText(`${elem.num}`, x + w - 3, y + 2.5);

        // Symbol
        ctx.fillStyle = isSelected ? "#ffffff" : (elem.cat === "metal" ? "#38bdf8" : (elem.cat === "metalloid" ? "#fbbf24" : "#34d399"));
        ctx.font = `bold ${Math.max(12, Math.round(w * 0.40))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(elem.sym, x + w / 2, y + h * 0.46);

        // Name
        ctx.fillStyle = "#cbd5e1";
        ctx.font = `600 ${Math.max(6, Math.round(w * 0.17))}px sans-serif`;
        const displayName = elem.name.length > 8 ? elem.name.slice(0, 7) + "…" : elem.name;
        ctx.fillText(displayName, x + w / 2, y + h * 0.74);

        // Mass
        ctx.fillStyle = "#64748b";
        ctx.font = `${Math.max(5, Math.round(w * 0.14))}px monospace`;
        ctx.fillText(elem.mass, x + w / 2, y + h * 0.88);

        ctx.restore();
    }

    drawHUD(ctx, w, h) {
        ctx.save();
        const scale = Math.min(w / 700, h / 520, 1.0);
        const elem = this.selectedElement;

        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = `700 ${10 * scale}px sans-serif`;
        ctx.fillText("Modern Periodic Table of Elements (118 Elements IUPAC)", 14, 22);

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${12 * scale}px sans-serif`;
        const catName = elem.cat === "metal" ? "Metal" : (elem.cat === "metalloid" ? "Metalloid" : "Non-Metal");
        ctx.fillText(`Selected: ${elem.name} (${elem.sym}) | Atomic No: ${elem.num} | Class: ${catName}`, 14, 38);

        ctx.restore();
    }

    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        for (const box of this.cellBoxes) {
            if (stageX >= box.x && stageX <= box.x + box.w && stageY >= box.y && stageY <= box.y + box.h) {
                this.selectElement(box.elem);
                return {
                    id: `elem_${box.elem.num}`,
                    name: `${box.elem.name} (${box.elem.sym}) - ${box.elem.cat.toUpperCase()}`,
                    x: box.x + box.w / 2,
                    y: box.y - 12
                };
            }
        }
        return null;
    }

    selectElement(elem) {
        this.selectedElement = elem;
        this.updateInspectorDom();
        if (this.threeScene && window.THREE) {
            this.updateThreeSpecimen(elem);
        }
    }

    // ========================================================
    // CONTROLS DOCK SCHEMA & INSPECTOR DOM
    // ========================================================

    getControls() {
        return [
            {
                id: "element_inspector_dock",
                type: "custom",
                render: (container) => {
                    this.renderInspectorInterface(container);
                }
            }
        ];
    }

    renderInspectorInterface(container) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:12px; width:100%; box-sizing:border-box;">
                <!-- 3D Specimen Showcase Box (Three.js WebGL Container) -->
                <div class="glass-3d-box" style="position:relative; width:100%; height:230px; background:radial-gradient(circle at 50% 40%, rgba(20, 32, 60, 0.95), rgba(7, 11, 22, 0.98)); border:1.5px solid rgba(0, 240, 255, 0.45); border-radius:12px; box-shadow:0 8px 32px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(0, 240, 255, 0.15); overflow:hidden; display:flex; align-items:center; justify-content:center; touch-action:none; user-select:none;">
                    
                    <!-- Three.js Canvas Mount Node -->
                    <div id="threejsCanvasMount" style="width:100%; height:100%; position:absolute; top:0; left:0; touch-action:none;"></div>
                    
                    <div style="position:absolute; top:8px; left:12px; font-size:10px; font-weight:700; font-family:monospace; color:#00f0ff; letter-spacing:1px; pointer-events:none; z-index:10;">
                        3D SPECIMEN SHOWCASE
                    </div>
                    <div id="inspectorCatBadge" style="position:absolute; top:8px; right:12px; font-size:9px; font-weight:bold; padding:2px 8px; border-radius:4px; text-transform:uppercase; pointer-events:none; z-index:10;">
                        METALLIC
                    </div>

                    <!-- Video Matching Instruction Guide -->
                    <div style="position:absolute; bottom:8px; left:0; width:100%; text-align:center; font-size:10px; color:#94a3b8; pointer-events:none; font-family:sans-serif; z-index:10;">
                        Touch / Drag to rotate | Pinch or Scroll to zoom
                    </div>
                </div>

                <!-- Elemental Metrics Grid (Including Malleability & Ductility) -->
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px;">
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #00f0ff;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">ATOMIC NUMBER (Z)</span>
                        <span id="specAtomicNum" style="font-size:15px; font-weight:bold; color:#f8fafc; font-family:monospace;">79</span>
                    </div>
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #10b981;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">ATOMIC MASS (A)</span>
                        <span id="specAtomicMass" style="font-size:15px; font-weight:bold; color:#f8fafc; font-family:monospace;">196.97 u</span>
                    </div>
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #f59e0b;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">MALLEABILITY</span>
                        <span id="specMalleability" style="font-size:13px; font-weight:bold; color:#f8fafc;">Most Malleable of All</span>
                    </div>
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #38bdf8;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">DUCTILITY</span>
                        <span id="specDuctility" style="font-size:13px; font-weight:bold; color:#f8fafc;">Most Ductile of All</span>
                    </div>
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #a855f7;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">STATE AT STP</span>
                        <span id="specState" style="font-size:13px; font-weight:bold; color:#f8fafc;">Solid</span>
                    </div>
                    <div style="background:rgba(30, 41, 59, 0.7); padding:8px 12px; border-radius:6px; border-left:3px solid #ec4899;">
                        <span style="font-size:9px; color:#94a3b8; display:block; font-weight:600;">RADIOACTIVITY</span>
                        <span id="specRadioactive" style="font-size:13px; font-weight:bold; color:#10b981;">Stable</span>
                    </div>
                </div>

                <!-- Electronic Configuration Card -->
                <div style="background:rgba(15, 23, 42, 0.85); border:1px solid rgba(148, 163, 184, 0.2); padding:10px 12px; border-radius:8px;">
                    <div style="font-size:9px; color:#94a3b8; margin-bottom:4px; font-weight:bold;">ELECTRONIC CONFIGURATION (SHELLS K, L, M, N...)</div>
                    <div id="specConfig" style="font-size:14px; font-weight:bold; color:#00f0ff; font-family:monospace;">2, 8, 18, 32, 18, 1</div>
                </div>

                <!-- Educational Chemical Profile Article -->
                <div style="background:rgba(15, 23, 42, 0.85); border:1px solid rgba(148, 163, 184, 0.2); padding:10px 12px; border-radius:8px;">
                    <div id="articleHeader" style="font-size:11px; color:#38bdf8; font-weight:bold; margin-bottom:5px;">GOLD (Au) - GROUP 11, PERIOD 6</div>
                    <p id="articleBody" style="font-size:11px; color:#cbd5e1; line-height:1.55; margin:0;">
                        Lustrous yellow noble metal that never tarnishes; single gram can be beaten into 1 square meter gold leaf.
                    </p>
                </div>
            </div>
        `;

        this.updateInspectorDom();
        this.bootstrapThreeEngine();
    }

    // ========================================================
    // THREE.JS CRASH-PROOF WEBLOGIC ENGINE
    // ========================================================

    async bootstrapThreeEngine() {
        try {
            if (!window.THREE) {
                await this.loadThreeScript();
            }
            this.initThreeScene();
        } catch (err) {
            console.error("Three.js bootstrap failed:", err);
        }
    }

    loadThreeScript() {
        return new Promise((resolve, reject) => {
            if (window.THREE) return resolve();
            const existing = document.getElementById("threejs_script_cdn");
            if (existing) {
                existing.addEventListener("load", () => resolve());
                existing.addEventListener("error", reject);
                return;
            }
            const script = document.createElement("script");
            script.id = "threejs_script_cdn";
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    initThreeScene() {
        const mount = document.getElementById("threejsCanvasMount");
        if (!mount || !window.THREE) return;

        // Cleanup existing canvas if re-initializing
        while (mount.firstChild) {
            mount.removeChild(mount.firstChild);
        }

        const width = mount.clientWidth || 340;
        const height = mount.clientHeight || 230;

        // 1. Scene & Camera Setup
        this.threeScene = new THREE.Scene();
        this.threeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.threeCamera.position.set(0, 0, 4.0);

        // 2. High-Performance WebGL Renderer (Crash-proof DPR clamp)
        this.threeRenderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.threeRenderer.setSize(width, height);
        this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        mount.appendChild(this.threeRenderer.domElement);

        // 3. WebGL Context Recovery Listeners
        this.threeRenderer.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("WebGL context lost, pausing render loop");
            cancelAnimationFrame(this.animFrameId);
        }, false);

        this.threeRenderer.domElement.addEventListener("webglcontextrestored", () => {
            console.log("WebGL context restored, re-initializing scene");
            this.initThreeScene();
        }, false);

        // 4. Central Pivot Node
        this.threePivot = new THREE.Group();
        this.threePivot.rotation.set(-0.25, 0.40, 0); // Video initial isometric angle
        this.threeScene.add(this.threePivot);

        // 5. Video-Identical 3D Glass Showcase Bounding Cube
        this.buildGlassCube();

        // 6. Dual Specular Lighting Engine (Matches Video Yellow & Green Specular Points)
        this.setupLighting();

        // 7. Specimen Mesh Builder
        this.updateThreeSpecimen(this.selectedElement);

        // 8. Bind Touch Drag & Pinch Zoom Controls
        this.bindTouchControls(this.threeRenderer.domElement);

        // 9. Start High-Performance Animation Loop
        this.startThreeRenderLoop();
    }

    buildGlassCube() {
        const THREE = window.THREE;

        // Box Geometry
        const cubeSize = 2.0;
        const boxGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        // Translucent Glass Panels
        const glassMat = new THREE.MeshBasicMaterial({
            color: 0x1e293b,
            transparent: true,
            opacity: 0.16,
            depthWrite: false,
            side: THREE.DoubleSide
        });
        const glassMesh = new THREE.Mesh(boxGeom, glassMat);
        this.threePivot.add(glassMesh);

        // Crisp White Wireframe Edges
        const edgesGeom = new THREE.EdgesGeometry(boxGeom);
        const edgesMat = new THREE.LineBasicMaterial({
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.85,
            linewidth: 1.5
        });
        const edgesMesh = new THREE.LineSegments(edgesGeom, edgesMat);
        this.threePivot.add(edgesMesh);

        // Calibration Orbit Dot (As seen in reference video)
        const dotGeom = new THREE.SphereGeometry(0.07, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
        const dotMesh = new THREE.Mesh(dotGeom, dotMat);
        dotMesh.position.set(1.0, 0.25, 1.0);
        this.threePivot.add(dotMesh);
    }

        setupLighting() {
        const THREE = window.THREE;

        // 1. Clean Neutral Ambient Base
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        this.threeScene.add(ambientLight);

        // 2. Primary Key Studio Light (Neutral Pure Specular)
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
        keyLight.position.set(2.5, 3.0, 3.5);
        this.threeScene.add(keyLight);

        // 3. Soft Cool Fill Light (Brings out real metallic color)
        const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
        fillLight.position.set(-2.5, -1.0, 2.0);
        this.threeScene.add(fillLight);

        // 4. Subtle Back Rim Light (Highlights 3D glass cube and specimen edges)
        const rimLight = new THREE.PointLight(0x38bdf8, 2.0, 10);
        rimLight.position.set(0, 2.0, -2.5);
        this.threeScene.add(rimLight);
    }

    // ========================================================
    // COMPREHENSIVE 3D PHYSICAL SPECIMEN ENGINE (NO DUPLICATES)
    // ========================================================

        updateThreeSpecimen(elem) {
        const THREE = window.THREE;
        if (!THREE || !this.threePivot) return;

        // VRAM Garbage Collection (Prevent WebGL memory leaks)
        if (this.currentSpecimenMesh) {
            this.threePivot.remove(this.currentSpecimenMesh);
            this.currentSpecimenMesh.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                    else child.material.dispose();
                }
            });
            this.currentSpecimenMesh = null;
        }

        const sym = elem.sym;
        const state = elem.state;
        const cat = elem.cat;

        // ==========================================
        // 1. GASES: LUMINOUS SEALED PLASMA AMPOULE
        // ==========================================
        if (state === "Gas") {
            const group = new THREE.Group();

            let plasmaCol = 0x38bdf8;
            if (sym === "Ne") plasmaCol = 0xff2a00;       // Neon: Pure Scarlet Red-Orange
            else if (sym === "He") plasmaCol = 0xffb86c;  // Helium: Golden Peach
            else if (sym === "Ar") plasmaCol = 0xc084fc;  // Argon: Brilliant Lilac
            else if (sym === "Kr") plasmaCol = 0x22d3ee;  // Krypton: Icy Electric Cyan
            else if (sym === "Xe") plasmaCol = 0x3b82f6;  // Xenon: Deep Sky Blue
            else if (sym === "Rn") plasmaCol = 0x34d399;  // Radon: Glowing Emerald
            else if (sym === "Cl") plasmaCol = 0xa3e635;  // Chlorine: Toxic Yellow-Green
            else if (sym === "F")  plasmaCol = 0xfacc15;  // Fluorine: Pale Yellow
            else if (sym === "H")  plasmaCol = 0xf472b6;  // Hydrogen: Electric Pink
            else if (sym === "N")  plasmaCol = 0x818cf8;  // Nitrogen: Blue-Violet
            else if (sym === "O")  plasmaCol = 0x67e8f9;  // Oxygen: Pale Cyan

            // Central Ionized Gas Core
            const coreGeom = new THREE.CylinderGeometry(0.20, 0.20, 1.0, 24);
            const coreMat = new THREE.MeshBasicMaterial({ color: plasmaCol });
            group.add(new THREE.Mesh(coreGeom, coreMat));

            // Outer Sealed Borosilicate Glass Ampoule with Rounded Domes
            const glassGeom = new THREE.CylinderGeometry(0.38, 0.38, 1.05, 32);
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.32,
                roughness: 0.05,
                transmission: 0.92,
                depthWrite: false
            });
            group.add(new THREE.Mesh(glassGeom, glassMat));

            const domeGeom = new THREE.SphereGeometry(0.38, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const topDome = new THREE.Mesh(domeGeom, glassMat);
            topDome.position.y = 0.525;
            group.add(topDome);

            const botDome = new THREE.Mesh(domeGeom, glassMat);
            botDome.position.y = -0.525;
            botDome.rotation.x = Math.PI;
            group.add(botDome);

            this.currentSpecimenMesh = group;

        // ==========================================
        // 2. LIQUIDS: QUICKSILVER & BROMINE AMPOULE
        // ==========================================
        } else if (state === "Liquid") {
            if (sym === "Hg") {
                // Mercury: Authentic Fluid Quicksilver Droplet with Mirror Specular
                const geom = new THREE.SphereGeometry(0.74, 48, 48);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xf1f5f9,
                    metalness: 1.0,
                    roughness: 0.02
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else {
                // Bromine: Sealed Glass Ampoule with Deep Ruby-Red Liquid Pool
                const group = new THREE.Group();

                const liquidGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.55, 32);
                const liquidMat = new THREE.MeshStandardMaterial({
                    color: 0x580808,
                    roughness: 0.1,
                    metalness: 0.2
                });
                const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
                liquidMesh.position.y = -0.25;
                group.add(liquidMesh);

                const vaporGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.50, 24);
                const vaporMat = new THREE.MeshBasicMaterial({
                    color: 0x991b1b,
                    transparent: true,
                    opacity: 0.40
                });
                const vaporMesh = new THREE.Mesh(vaporGeom, vaporMat);
                vaporMesh.position.y = 0.25;
                group.add(vaporMesh);

                const glassGeom = new THREE.CylinderGeometry(0.38, 0.38, 1.05, 32);
                const glassMat = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.35,
                    roughness: 0.05,
                    transmission: 0.90,
                    depthWrite: false
                });
                group.add(new THREE.Mesh(glassGeom, glassMat));

                this.currentSpecimenMesh = group;
            }

        // ==========================================
        // 3. NON-METAL SOLIDS (CRYSTALS & MINERALS)
        // ==========================================
        } else if (cat === "nonmetal" && state === "Solid") {
            if (sym === "S") {
                // Sulfur: Sharp Lemon-Yellow Faceted Octahedron
                const geom = new THREE.OctahedronGeometry(0.75, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xfacc15,
                    roughness: 0.28,
                    metalness: 0.05,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "C") {
                // Carbon: Dark Matte Charcoal Graphite Prism
                const geom = new THREE.DodecahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x1e293b,
                    roughness: 0.70,
                    metalness: 0.25,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "P") {
                // Phosphorus: Deep Crimson Waxy Mineral Cluster
                const geom = new THREE.IcosahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x881337,
                    roughness: 0.35,
                    metalness: 0.15,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "I") {
                // Iodine: Dark Metallic Violet-Black Crystal
                const geom = new THREE.OctahedronGeometry(0.74, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x3b0764,
                    roughness: 0.22,
                    metalness: 0.65,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else {
                // Selenium & Others: Steely Glassy Crystal
                const geom = new THREE.OctahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x334155,
                    roughness: 0.35,
                    metalness: 0.50,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            }

        // ==========================================
        // 4. METALLOIDS (INDIVIDUAL SHAPES & COLORS)
        // ==========================================
        } else if (cat === "metalloid") {
            if (sym === "Si") {
                // Silicon: Mirror Blue-Grey Semiconductor Ingot Wafer
                const geom = new THREE.BoxGeometry(0.88, 0.88, 0.35);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x334155,
                    roughness: 0.10,
                    metalness: 0.95
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "B") {
                // Boron: Jet-Black Superhard Icosahedron
                const geom = new THREE.IcosahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x09090b,
                    roughness: 0.25,
                    metalness: 0.40,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Ge") {
                // Germanium: Brilliant Silvery-Gray Faceted Crystal
                const geom = new THREE.OctahedronGeometry(0.74, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x94a3b8,
                    roughness: 0.15,
                    metalness: 0.85,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Sb") {
                // Antimony: Bluish-Silver Star-Burst Needle Cluster
                const geom = new THREE.DodecahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xe2e8f0,
                    roughness: 0.12,
                    metalness: 0.92,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Te") {
                // Tellurium: Brittle Crystal with Golden Lustrous Sheen
                const geom = new THREE.OctahedronGeometry(0.74, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xd4af37,
                    roughness: 0.20,
                    metalness: 0.85,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else {
                // Arsenic, Polonium, etc.
                const geom = new THREE.IcosahedronGeometry(0.72, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x52525b,
                    roughness: 0.30,
                    metalness: 0.70,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            }

        // ==========================================
        // 5. METALS: AUTHENTIC BULLIONS & INGOTS
        // ==========================================
        } else {
            if (sym === "Au") {
                // 24K Gold: Cast Bullion Ingot Bar
                const geom = new THREE.BoxGeometry(0.92, 0.58, 0.65);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xfbbf24,
                    metalness: 0.95,
                    roughness: 0.18
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Cu") {
                // Native Copper: Salmon Reddish-Orange Bullion Ingot
                const geom = new THREE.BoxGeometry(0.92, 0.58, 0.65);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xea580c,
                    metalness: 0.92,
                    roughness: 0.22
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Ag") {
                // Pure Silver: Ultra-Brilliant Mirror Chrome Bullion
                const geom = new THREE.BoxGeometry(0.92, 0.58, 0.65);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xf8fafc,
                    metalness: 0.98,
                    roughness: 0.08
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Bi") {
                // Bismuth: Stepped Iridescent Rainbow Hopper Crystal
                const geom = new THREE.DodecahedronGeometry(0.74, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xf472b6,
                    metalness: 0.90,
                    roughness: 0.16,
                    flatShading: true
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Pb") {
                // Lead: Heavy Dull Matte Blue-Grey Bullion Bar
                const geom = new THREE.BoxGeometry(0.92, 0.58, 0.65);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x475569,
                    metalness: 0.45,
                    roughness: 0.65
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Fe") {
                // Iron: Dark Ferromagnetic Steel Ingot
                const geom = new THREE.BoxGeometry(0.90, 0.60, 0.60);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x334155,
                    metalness: 0.85,
                    roughness: 0.35
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Al") {
                // Aluminium: Lightweight Bright Silver Extruded Billet
                const geom = new THREE.CylinderGeometry(0.48, 0.48, 0.90, 32);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xf1f5f9,
                    metalness: 0.80,
                    roughness: 0.22
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (sym === "Ti" || sym === "W") {
                // Titanium / Tungsten: Precision Machined Aerospace Billet
                const geom = new THREE.CylinderGeometry(0.46, 0.46, 0.92, 32);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x64748b,
                    metalness: 0.90,
                    roughness: 0.20
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else if (["Li", "Na", "K", "Rb", "Cs"].includes(sym)) {
                // Alkali Metals: Freshly Cut Silvery Metallic Sliced Block
                const geom = new THREE.BoxGeometry(0.85, 0.85, 0.55);
                const mat = new THREE.MeshStandardMaterial({
                    color: sym === "Cs" ? 0xfde047 : 0xe2e8f0,
                    metalness: 0.88,
                    roughness: 0.28
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            } else {
                // Transition & Actinide/Lanthanide Metals (Distinct Real Metallic Tones)
                const modulo = elem.num % 4;
                let metalCol = 0xcbd5e1;
                let geom = null;

                if (modulo === 0) {
                    metalCol = 0x94a3b8; // Gunmetal
                    geom = new THREE.CylinderGeometry(0.45, 0.45, 0.88, 28);
                } else if (modulo === 1) {
                    metalCol = 0xf8fafc; // Bright Chrome
                    geom = new THREE.BoxGeometry(0.88, 0.55, 0.60);
                } else if (modulo === 2) {
                    metalCol = 0x64748b; // Heavy Steel
                    geom = new THREE.CylinderGeometry(0.48, 0.48, 0.85, 6); // Hexagonal billet
                } else {
                    metalCol = 0xa1a1aa; // Platinum Slate
                    geom = new THREE.SphereGeometry(0.70, 36, 36);
                }

                const mat = new THREE.MeshStandardMaterial({
                    color: metalCol,
                    metalness: 0.88,
                    roughness: 0.22
                });
                this.currentSpecimenMesh = new THREE.Mesh(geom, mat);
            }
        }

        this.threePivot.add(this.currentSpecimenMesh);
    }


    // ========================================================
    // FAIL-SAFE TOUCH & DRAG / PINCH ZOOM CONTROLLER
    // ========================================================

    bindTouchControls(domElement) {
        if (!domElement) return;

        // Pointer Drag (Mouse / Single Touch)
        domElement.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            this.isDragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            domElement.setPointerCapture(e.pointerId);
            domElement.style.cursor = "grabbing";
        });

        domElement.addEventListener("pointermove", (e) => {
            if (!this.isDragging || !this.threePivot) return;
            e.preventDefault();
            const dx = e.clientX - this.lastX;
            const dy = e.clientY - this.lastY;

            this.threePivot.rotation.y += dx * 0.012;
            this.threePivot.rotation.x += dy * 0.012;
            this.threePivot.rotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, this.threePivot.rotation.x));

            this.lastX = e.clientX;
            this.lastY = e.clientY;
        });

        const endDrag = (e) => {
            this.isDragging = false;
            domElement.style.cursor = "grab";
            try { domElement.releasePointerCapture(e.pointerId); } catch (_) {}
        };

        domElement.addEventListener("pointerup", endDrag);
        domElement.addEventListener("pointercancel", endDrag);

        // Mobile Explicit Touch & Pinch-to-Zoom Trapping
        domElement.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                this.isDragging = true;
                this.lastX = e.touches[0].clientX;
                this.lastY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                e.preventDefault();
                this.isDragging = false;
                this.initialPinchDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                this.initialCameraZ = this.threeCamera.position.z;
            }
        }, { passive: false });

        domElement.addEventListener("touchmove", (e) => {
            if (e.touches.length === 1 && this.isDragging && this.threePivot) {
                e.preventDefault();
                const dx = e.touches[0].clientX - this.lastX;
                const dy = e.touches[0].clientY - this.lastY;

                this.threePivot.rotation.y += dx * 0.012;
                this.threePivot.rotation.x += dy * 0.012;
                this.threePivot.rotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, this.threePivot.rotation.x));

                this.lastX = e.touches[0].clientX;
                this.lastY = e.touches[0].clientY;
            } else if (e.touches.length === 2 && this.threeCamera) {
                e.preventDefault();
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const factor = this.initialPinchDistance / Math.max(10, dist);
                this.threeCamera.position.z = Math.max(2.2, Math.min(6.5, this.initialCameraZ * factor));
            }
        }, { passive: false });

        domElement.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.isDragging = false;
        }, { passive: false });

        // Wheel Scroll to Zoom
        domElement.addEventListener("wheel", (e) => {
            if (!this.threeCamera) return;
            e.preventDefault();
            this.threeCamera.position.z += e.deltaY * 0.003;
            this.threeCamera.position.z = Math.max(2.2, Math.min(6.5, this.threeCamera.position.z));
        }, { passive: false });
    }

    startThreeRenderLoop() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

        const loop = () => {
            if (this.threeRenderer && this.threeScene && this.threeCamera) {
                this.threeRenderer.render(this.threeScene, this.threeCamera);
            }
            this.animFrameId = requestAnimationFrame(loop);
        };
        this.animFrameId = requestAnimationFrame(loop);
    }

    updateInspectorDom() {
        const elem = this.selectedElement;
        const catBadge = document.getElementById("inspectorCatBadge");
        const specNum = document.getElementById("specAtomicNum");
        const specMass = document.getElementById("specAtomicMass");
        const specMal = document.getElementById("specMalleability");
        const specDuc = document.getElementById("specDuctility");
        const specState = document.getElementById("specState");
        const specRadio = document.getElementById("specRadioactive");
        const specConfig = document.getElementById("specConfig");
        const artHeader = document.getElementById("articleHeader");
        const artBody = document.getElementById("articleBody");

        if (!catBadge || !specNum) return;

        const catName = elem.cat === "metal" ? "Metal" : (elem.cat === "metalloid" ? "Metalloid" : "Non-Metal");
        catBadge.textContent = catName;
        catBadge.style.background = elem.cat === "metal" ? "rgba(2, 132, 199, 0.4)" : (elem.cat === "metalloid" ? "rgba(217, 119, 6, 0.4)" : "rgba(5, 150, 105, 0.4)");
        catBadge.style.color = elem.cat === "metal" ? "#38bdf8" : (elem.cat === "metalloid" ? "#fbbf24" : "#34d399");
        catBadge.style.border = `1px solid ${catBadge.style.color}`;

        specNum.textContent = elem.num;
        specMass.textContent = `${elem.mass} u`;
        if (specMal) specMal.textContent = elem.mal;
        if (specDuc) specDuc.textContent = elem.duc;
        if (specState) specState.textContent = elem.state;
        if (specRadio) {
            specRadio.textContent = elem.radio === "Yes" ? "Radioactive" : "Stable";
            specRadio.style.color = elem.radio === "Yes" ? "#ef4444" : "#10b981";
        }

        if (specConfig) specConfig.textContent = elem.config;
        if (artHeader) artHeader.textContent = `${elem.name.toUpperCase()} (${elem.sym}) - GROUP ${elem.group}, PERIOD ${elem.period}`;
        if (artBody) artBody.textContent = elem.desc;
    }

    destroy() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        if (this.threeRenderer) {
            this.threeRenderer.dispose();
            this.threeRenderer = null;
        }
    }

    reset() {
        this.selectedElement = PERIODIC_DATA.find(e => e.sym === "Au") || PERIODIC_DATA[0];
        this.updateInspectorDom();
        if (this.threeScene && window.THREE) {
            this.updateThreeSpecimen(this.selectedElement);
        }
    }

    setLanguage(lang) {
        this.lang = lang;
    }
}
