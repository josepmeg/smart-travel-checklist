document.addEventListener('DOMContentLoaded', () => {

    // --- DATABASE OF ALL POSSIBLE ITEMS ---
    const allItems = [
        // Essentials & Documents
        { name: 'Passport', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Spanish DNI', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Driving License', category: 'Essentials & Documents', relevance: { default: 'recommended' } },
        { name: 'Real ID', category: 'Essentials & Documents', relevance: { default: 'optional' } },
        { name: 'Green Card', category: 'Essentials & Documents', relevance: { tripTypes: ['Business', 'Mix'] } },
        { name: 'Credit/Debit Cards', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Cash / Foreign Currency', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Spanish Wallet', category: 'Essentials & Documents', relevance: { default: 'recommended' } },
        { name: 'House Keys', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Travel Insurance Info', category: 'Essentials & Documents', relevance: { default: 'optional' } },
        { name: 'Visas (if needed)', category: 'Essentials & Documents', relevance: { default: 'optional' } },
        { name: 'Vaccines / Health Certificates', category: 'Essentials & Documents', relevance: { default: 'optional' } },
        { name: 'Holafly / Airalo eSIM', category: 'Essentials & Documents', relevance: { default: 'recommended' } },

        // Airport Outfit
        { name: 'Sweater / Fleece', category: 'Airport Outfit', relevance: { default: 'recommended' } },
        { name: 'Bandana / Scarf', category: 'Airport Outfit', relevance: { default: 'optional' } },
        { name: 'Underwear (for plane)', category: 'Airport Outfit', quantity: 2, relevance: { default: 'recommended' } },
        { name: 'Long Socks (for plane)', category: 'Airport Outfit', quantity: 2, relevance: { default: 'recommended' } },
        { name: 'Fanny Pack', category: 'Airport Outfit', relevance: { default: 'optional' } },
        { name: 'Plane Pillow', category: 'Airport Outfit', relevance: { longFlight: true, default: 'optional' } },

        // Clothing
        { name: 'Underwear', category: 'Clothing', quantityRule: 'days', relevance: { default: 'recommended' } },
        { name: 'Socks', category: 'Clothing', quantityRule: 'days', relevance: { default: 'recommended' } },
        { name: 'T-shirts / Polos', category: 'Clothing', quantityRule: 'tshirts', relevance: { default: 'recommended' } },
        { name: 'Linen Shirts', category: 'Clothing', quantityRule: 'linen', relevance: { seasons: ['Summer'] } },
        { name: 'Shirts (Formal)', category: 'Clothing', quantityRule: 'pants', relevance: { tripTypes: ['Business'] } },
        { name: 'Jeans / Long Pants', category: 'Clothing', quantityRule: 'pants', relevance: { tripTypes: ['Trekking', 'City', 'Business', 'Mix', 'Snow'] } },
        { name: 'Shorts', category: 'Clothing', quantityRule: 'pants', relevance: { seasons: ['Summer', 'Shoulder'] } },
        { name: 'Jacket', category: 'Clothing', relevance: { seasons: ['Winter', 'Shoulder'], tripTypes: ['Trekking', 'City', 'Business', 'Snow', 'Mix'] } },
        { name: 'Raincoat', category: 'Clothing', relevance: { tripTypes: ['Trekking', 'City', 'Mix'], seasons: ['Shoulder', 'Winter'] } },
        { name: 'Waterproof Pants', category: 'Clothing', relevance: { default: 'optional', tripTypes: ['Trekking', 'Snow'] } },
        { name: 'Swimsuit', category: 'Clothing', relevance: { default: 'optional', tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
        { name: 'Pajamas', category: 'Clothing', relevance: { default: 'optional' } },
        { name: 'Nice Outfit (Dining)', category: 'Clothing', quantity: 1, relevance: { default: 'optional', tripTypes: ['City', 'Business', 'Beach', 'Mix'] } },
        { name: 'Gym Clothes', category: 'Clothing', relevance: { default: 'optional' } },
        { name: 'Thermic Shirt', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow', 'Trekking'] } },
        { name: 'Thermic Pants / Leggings', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow', 'Trekking'] } },
        { name: 'Thermic Socks', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow', 'Trekking'] } },
        { name: 'Snow Jacket & Pants', category: 'Clothing', relevance: { tripTypes: ['Snow'] } },
        { name: 'Hat (Winter)', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow'] } },
        { name: 'Gloves', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow'] } },
        { name: 'Neck Gaiter / Buff', category: 'Clothing', relevance: { seasons: ['Winter'], tripTypes: ['Snow', 'Trekking'] } },

        // Shoes
        { name: 'Sneakers', category: 'Shoes', relevance: { tripTypes: ['City', 'Business', 'Mix'] } },
        { name: 'Casual Shoes', category: 'Shoes', relevance: { default: 'optional', tripTypes: ['City', 'Business', 'Mix'] } },
        { name: 'Hiking Boots', category: 'Shoes', relevance: { tripTypes: ['Trekking'] } },
        { name: 'Sandals', category: 'Shoes', relevance: { tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
        { name: 'Flip Flops', category: 'Shoes', relevance: { tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
        { name: 'Work Shoes', category: 'Shoes', relevance: { tripTypes: ['Business'] } },
        { name: 'Snow Boots', category: 'Shoes', relevance: { tripTypes: ['Snow'] } },

        // Electronics
        { name: 'Phone', category: 'Electronics', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Airpods', category: 'Electronics', relevance: { default: 'recommended' } },
        { name: 'External Battery (Power Bank)', category: 'Electronics', relevance: { default: 'recommended' } },
        { name: 'Laptop', category: 'Electronics', relevance: { tripTypes: ['Business', 'Mix'] } },
        { name: 'E-book Reader', category: 'Electronics', relevance: { default: 'optional' } },
        { name: 'Headphones (Wired)', category: 'Electronics', relevance: { longFlight: true } },
        { name: 'Travel Adapter', category: 'Electronics', relevance: { default: 'recommended' } },
        { name: 'Nintendo Switch', category: 'Electronics', relevance: { longFlight: true, default: 'optional' } },
        { name: 'Selfie Stick / Tripod', category: 'Electronics', relevance: { default: 'optional' } },
        { name: 'Backbone (iPhone Controller)', category: 'Electronics', relevance: { longFlight: true, default: 'optional' } },
        { name: 'Backbone Carrying Case', category: 'Electronics', relevance: { longFlight: true, default: 'optional' } },

        // Chargers & Cables
        { name: 'USB-C Cable (phone/laptop)', category: 'Chargers & Cables', relevance: { default: 'recommended' } },
        { name: 'USB-C Charger Block', category: 'Chargers & Cables', relevance: { default: 'recommended' } },
        { name: 'Lightning / USB-C (Airpods)', category: 'Chargers & Cables', relevance: { default: 'recommended' } },
        { name: 'E-book Charger Cable', category: 'Chargers & Cables', relevance: { default: 'optional' } },
        { name: 'Laptop Charger', category: 'Chargers & Cables', relevance: { tripTypes: ['Business', 'Mix'] } },
        { name: 'Nintendo Switch Charger', category: 'Chargers & Cables', relevance: { longFlight: true, default: 'optional' } },

        // Toiletries & Health
        { name: 'Toothbrush & Toothpaste', category: 'Toiletries & Health', relevance: { default: 'recommended' } },
        { name: 'Deodorant', category: 'Toiletries & Health', relevance: { default: 'recommended' } },
        { name: 'Sunscreen', category: 'Toiletries & Health', relevance: { seasons: ['Summer', 'Shoulder', 'Snow'] } },
        { name: 'Chapstick', category: 'Toiletries & Health', relevance: { default: 'recommended' } },
        { name: 'Insect Repellent', category: 'Toiletries & Health', relevance: { tripTypes: ['Trekking', 'Beach'], seasons: ['Summer'] } },
        { name: 'First-Aid Kit', category: 'Toiletries & Health', relevance: { default: 'optional', tripTypes: ['Trekking', 'Snow', 'Mix'] } },
        { name: 'Medications', category: 'Toiletries & Health', relevance: { default: 'recommended' } },
        { name: 'Shampoo & Soap', category: 'Toiletries & Health', relevance: { default: 'recommended' } },
        { name: 'Comb', category: 'Toiletries & Health', relevance: { default: 'optional' } },
        { name: 'Retainers', category: 'Toiletries & Health', relevance: { default: 'optional' } },
        { name: 'Condoms', category: 'Toiletries & Health', relevance: { default: 'optional' } },

        // Miscellaneous
        { name: 'Sunglasses', category: 'Miscellaneous', relevance: { seasons: ['Summer', 'Shoulder', 'Snow'] } },
        { name: 'Daypack / Small Backpack', category: 'Miscellaneous', relevance: { tripTypes: ['Trekking', 'City', 'Mix'] } },
        { name: 'Water Bottle', category: 'Miscellaneous', relevance: { default: 'optional' } },
        { name: 'Towel', category: 'Miscellaneous', relevance: { default: 'optional', tripTypes: ['Beach', 'Trekking'] } },
        { name: 'Hat / Cap (Sun)', category: 'Miscellaneous', relevance: { seasons: ['Summer', 'Shoulder'] } },
        { name: 'Bag for dirty clothes', category: 'Miscellaneous', relevance: { default: 'recommended' } },
        { name: 'Bag for shoes', category: 'Miscellaneous', relevance: { default: 'optional' } },

        // Pre-Trip Grooming
        { name: 'Get a haircut', category: 'Pre-Trip Grooming', relevance: { default: 'optional' } },
        { name: 'Shave', category: 'Pre-Trip Grooming', relevance: { default: 'optional' } },
        { name: 'Trim nails', category: 'Pre-Trip Grooming', relevance: { default: 'optional' } },

        // 1 Week Before
        { name: 'Check Weather Forecast', category: '1 Week Before', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Check visa requirements', category: '1 Week Before', crucial: true, relevance: { default: 'recommended' } },
        { name: 'Check power outlet type', category: '1 Week Before', relevance: { default: 'recommended' } },
        { name: 'Notify bank of travel', category: '1 Week Before', relevance: { default: 'optional' } },
        { name: 'Book restaurants/reservations', category: '1 Week Before', relevance: { default: 'optional' } },
        { name: 'Research local transportation', category: '1 Week Before', relevance: { default: 'optional' } },
        { name: 'Download offline maps/media', category: '1 Week Before', relevance: { default: 'recommended' } },
        { name: 'Set up eSIM (Holafly/Airalo)', category: '1 Week Before', relevance: { default: 'recommended' } },
        { name: 'Iron shirts', category: '1 Week Before', relevance: { default: 'optional' } },

        // Night Before
        { name: 'Charge Phone', category: 'Night Before', relevance: { default: 'recommended' } },
        { name: 'Charge AirPods', category: 'Night Before', relevance: { default: 'recommended' } },
        { name: 'Charge E-Book', category: 'Night Before', relevance: { default: 'optional' } },
        { name: 'Charge Power Bank', category: 'Night Before', relevance: { default: 'recommended' } },
        { name: 'Charge Nintendo Switch', category: 'Night Before', relevance: { longFlight: true, default: 'optional' } },
        { name: 'Check-in for flight', category: 'Night Before', relevance: { default: 'recommended' } },
        { name: 'Pack snacks for flight', category: 'Night Before', relevance: { longFlight: true } },
        { name: 'Set alarm for morning', category: 'Night Before', crucial: true, relevance: { default: 'recommended' } },
    ];

    const tripTypes = ['City', 'Beach', 'Trekking', 'Business', 'Snow', 'Mix'];
    const seasons = ['Summer', 'Shoulder', 'Winter'];
    const categories = [
        'Essentials & Documents', 'Airport Outfit', 'Clothing', 'Shoes',
        'Electronics', 'Chargers & Cables', 'Toiletries & Health',
        'Miscellaneous', 'Pre-Trip Grooming', '1 Week Before', 'Night Before'
    ];
    const categoryIcons = {
        'Essentials & Documents': 'alarm-clock',
        'Airport Outfit': 'plane-takeoff',
        'Clothing': 'shirt',
        'Shoes': 'footprints',
        'Electronics': 'plug-zap',
        'Chargers & Cables': 'cable',
        'Toiletries & Health': 'spray-can',
        'Miscellaneous': 'box',
        'Pre-Trip Grooming': 'scissors',
        '1 Week Before': 'calendar-clock',
        'Night Before': 'moon',
    };
    const themeMap = { City: 'theme-city', Beach: 'theme-beach', Trekking: 'theme-trekking', Business: 'theme-city', Snow: 'theme-snow', Mix: 'theme-trekking' };
    const bagOptions = ['carry-on', 'checked', 'personal'];
    const bagIcons = { 'carry-on': '🧳', 'checked': '📦', 'personal': '🎒' };

    // --- DOM REFERENCES ---
    const tripTypeControls = document.getElementById('trip-type-controls');
    const seasonControls = document.getElementById('season-controls');
    const startDateInput = document.getElementById('start-date-input');
    const endDateInput = document.getElementById('end-date-input');
    const durationDisplay = document.getElementById('duration-display');
    const destinationInput = document.getElementById('destination-input');
    const longFlightCheckbox = document.getElementById('long-flight-checkbox');
    const laundryCheckbox = document.getElementById('laundry-checkbox');
    const checklistContainer = document.getElementById('checklist-container');
    const progressBar = document.getElementById('progress-bar');
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const resetBtn = document.getElementById('reset-btn');
    const saveTripBtn = document.getElementById('save-trip-btn');
    const loadTripSelect = document.getElementById('load-trip-select');
    const deleteTripBtn = document.getElementById('delete-trip-btn');
    const flightNumberInput = document.getElementById('flight-number-input');
    const checkFlightBtn = document.getElementById('check-flight-btn');
    const toggleAllBtn = document.getElementById('toggle-all-btn');

    // --- STATE ---
    const defaultState = {
        tripType: 'City', season: 'Shoulder', days: 0,
        startDate: '', endDate: '', longFlight: false,
        laundry: false, destination: '', flightNumber: '', darkMode: false,
        checkboxes: {}, quantities: {}, bags: {}, customItems: {}
    };
    let currentState = { ...defaultState };

    // --- SAVED TRIPS ---
    function getSavedTrips() {
        return JSON.parse(localStorage.getItem('savedTrips') || '[]');
    }
    function setSavedTrips(trips) {
        localStorage.setItem('savedTrips', JSON.stringify(trips));
    }
    function renderSavedTripsDropdown() {
        const trips = getSavedTrips();
        loadTripSelect.innerHTML = '<option value="">Load a saved trip...</option>';
        trips.forEach((trip, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = trip.name;
            loadTripSelect.appendChild(opt);
        });
        deleteTripBtn.style.display = trips.length > 0 ? 'inline-flex' : 'none';
    }
    function saveCurrentTrip() {
        const name = prompt('Name this trip (e.g., "Japan Summer 2025"):');
        if (!name || !name.trim()) return;
        const trips = getSavedTrips();
        if (trips.length >= 5) {
            alert('Maximum 5 saved trips. Please delete one first.');
            return;
        }
        trips.push({ name: name.trim(), state: JSON.parse(JSON.stringify(currentState)) });
        setSavedTrips(trips);
        renderSavedTripsDropdown();
    }
    function loadTrip(index) {
        const trips = getSavedTrips();
        if (trips[index]) {
            currentState = { ...defaultState, ...trips[index].state };
            applyStateToUI();
            renderAndSave();
        }
    }
    function deleteTrip() {
        const index = loadTripSelect.value;
        if (index === '') return;
        const trips = getSavedTrips();
        const tripName = trips[index]?.name;
        if (!confirm(`Delete saved trip "${tripName}"?`)) return;
        trips.splice(index, 1);
        setSavedTrips(trips);
        renderSavedTripsDropdown();
    }

    // --- STATE MANAGEMENT ---
    function saveState() {
        const checkboxStates = {};
        document.querySelectorAll('.item-checkbox').forEach(cb => {
            const uniqueId = cb.dataset.uniqueId;
            const listItem = cb.closest('li');
            if (uniqueId) {
                checkboxStates[uniqueId] = {
                    checked: cb.checked,
                    dismissed: listItem ? listItem.classList.contains('dismissed-item') : false
                };
            }
        });
        currentState.checkboxes = checkboxStates;
        localStorage.setItem('travelChecklistState', JSON.stringify(currentState));
    }

    function loadState() {
        const savedState = localStorage.getItem('travelChecklistState');
        if (savedState) {
            currentState = { ...defaultState, ...JSON.parse(savedState) };
        }
        applyStateToUI();
    }

    function applyStateToUI() {
        startDateInput.value = currentState.startDate || '';
        endDateInput.value = currentState.endDate || '';
        destinationInput.value = currentState.destination || '';
        flightNumberInput.value = currentState.flightNumber || '';
        longFlightCheckbox.checked = currentState.longFlight || false;
        laundryCheckbox.checked = currentState.laundry || false;

        tripTypeControls.querySelectorAll('.control-btn').forEach(btn =>
            btn.classList.toggle('selected', btn.dataset.value === currentState.tripType)
        );
        seasonControls.querySelectorAll('.control-btn').forEach(btn =>
            btn.classList.toggle('selected', btn.dataset.value === currentState.season)
        );

        if (currentState.darkMode) {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙';
        }

        if (currentState.days > 0) {
            durationDisplay.textContent = currentState.days;
        }
    }

    function resetAll() {
        if (!confirm('Reset all selections and start fresh?')) return;
        currentState = { ...defaultState, darkMode: currentState.darkMode };
        localStorage.removeItem('travelChecklistState');
        applyStateToUI();
        renderAndSave();
    }

    // --- CONTROLS ---
    function createControlButtons(container, items, type, defaultValue) {
        items.forEach(item => {
            const button = document.createElement('button');
            button.textContent = item;
            button.dataset.value = item;
            button.className = 'control-btn px-3 py-1.5 border rounded-full text-sm font-medium hover:bg-white/20';
            if (item === defaultValue) button.classList.add('selected');
            button.addEventListener('click', () => {
                currentState[type] = item;
                container.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                if (type === 'tripType') updateTheme();
                renderAndSave();
            });
            container.appendChild(button);
        });
    }

    function updateTheme() {
        Object.values(themeMap).forEach(tc => body.classList.remove(tc));
        const theme = themeMap[currentState.tripType] || '';
        if (theme) body.classList.add(theme);
    }

    function getSeasonFromDate(date) {
        const month = date.getMonth();
        if (month >= 2 && month <= 4) return 'Shoulder';
        if (month >= 5 && month <= 7) return 'Summer';
        if (month >= 8 && month <= 10) return 'Shoulder';
        return 'Winter';
    }

    function handleDateChange() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        currentState.startDate = startDateInput.value;
        currentState.endDate = endDateInput.value;

        if (startDateInput.value && endDateInput.value && endDate >= startDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            currentState.days = diffDays;
            durationDisplay.textContent = diffDays;

            const suggestedSeason = getSeasonFromDate(startDate);
            currentState.season = suggestedSeason;
            seasonControls.querySelectorAll('.control-btn').forEach(btn => {
                btn.classList.toggle('selected', btn.dataset.value === suggestedSeason);
            });
        } else {
            currentState.days = 0;
            durationDisplay.textContent = 0;
        }
        renderAndSave();
    }

    // --- ITEM RELEVANCE (now returns 'recommended', 'optional', or 'muted' — never 'hidden') ---
    function getItemRelevance(item) {
        const { relevance } = item;
        const { tripType, season, longFlight } = currentState;
        const effectiveTripTypes = tripType === 'Mix' ? ['Trekking', 'Beach', 'City', 'Mix'] : [tripType];

        if (relevance.longFlight && longFlight) return 'recommended';
        if (relevance.tripTypes && relevance.tripTypes.some(t => effectiveTripTypes.includes(t))) return 'recommended';
        if (relevance.seasons && relevance.seasons.includes(season)) return 'recommended';
        if (relevance.default === 'recommended') return 'recommended';
        if (relevance.default === 'optional') return 'optional';

        // Item doesn't match current filters but is still shown (muted)
        return 'muted';
    }

    // --- QUANTITY CALCULATION ---
    function calculateQuantity(item) {
        if (item.quantity) return item.quantity;
        if (!item.quantityRule) return null;

        const days = parseInt(currentState.days, 10) || 7;
        const laundryFactor = currentState.laundry ? 0.5 : 1;
        let qty = 1;

        if (item.quantityRule === 'days') qty = Math.max(1, Math.round(days * laundryFactor));
        else if (item.quantityRule === 'tshirts') qty = Math.max(1, Math.round(Math.min(days, 8) * laundryFactor));
        else if (item.quantityRule === 'pants') qty = Math.max(1, Math.round(Math.ceil(days / 2.5) * laundryFactor));
        else if (item.quantityRule === 'linen') {
            if (days >= 10) qty = 3;
            else if (days >= 5) qty = 2;
            else qty = 1;
            qty = Math.max(1, Math.round(qty * laundryFactor));
        }
        return qty;
    }

    // --- RENDER ---
    function renderChecklist() {
        checklistContainer.innerHTML = '';

        const itemsToRender = allItems.map(item => ({
            ...item,
            currentRelevance: getItemRelevance(item)
        }));

        const groupedItems = {};
        categories.forEach(category => {
            const items = itemsToRender.filter(item => item.category === category);
            // Sort: recommended first, then optional, then muted
            const order = { recommended: 0, optional: 1, muted: 2 };
            items.sort((a, b) => (order[a.currentRelevance] || 2) - (order[b.currentRelevance] || 2));
            if (items.length > 0) groupedItems[category] = items;
        });

        // Add custom items per category
        for (const category in (currentState.customItems || {})) {
            if (!groupedItems[category]) groupedItems[category] = [];
            currentState.customItems[category].forEach(name => {
                groupedItems[category].push({
                    name, category, isCustom: true, currentRelevance: 'recommended',
                    relevance: { default: 'recommended' }
                });
            });
        }

        const totalProgress = { total: 0, checked: 0 };

        for (const category of categories) {
            if (!groupedItems[category] || groupedItems[category].length === 0) continue;

            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card bg-card p-5 rounded-xl shadow-lg border border-theme collapsed';
            categoryCard.dataset.category = category;

            const categoryTitle = document.createElement('button');
            categoryTitle.className = 'w-full text-left text-xl font-semibold mb-0 pb-2 accent-primary-text flex justify-between items-center';

            const titleText = document.createElement('span');
            titleText.className = 'category-title-text';
            titleText.innerHTML = `<i data-lucide="${categoryIcons[category] || 'box'}" class="w-5 h-5"></i>${category}`;

            const titleRight = document.createElement('span');
            titleRight.className = 'flex items-center gap-2';
            titleRight.innerHTML = `<span class="text-sm font-normal text-secondary category-progress-summary"></span><span class="category-complete-badge hidden">✓</span><i data-lucide="chevron-down" class="w-5 h-5 chevron-icon"></i>`;

            categoryTitle.appendChild(titleText);
            categoryTitle.appendChild(titleRight);
            categoryCard.appendChild(categoryTitle);

            const itemList = document.createElement('ul');
            itemList.className = 'space-y-3 category-item-list';

            let catTotal = 0;
            let catChecked = 0;

            groupedItems[category].forEach((item, index) => {
                const uniqueId = `${item.name}-${category}`;
                const savedCheckboxState = currentState.checkboxes[uniqueId] || { checked: false, dismissed: false };

                const listItem = document.createElement('li');
                listItem.className = 'flex items-center p-2 rounded-lg transition-all duration-200';

                if (item.crucial) listItem.classList.add('crucial-item');
                if (item.currentRelevance === 'optional') listItem.classList.add('optional-item');
                if (item.currentRelevance === 'muted') listItem.classList.add('muted-item');
                if (savedCheckboxState.dismissed) listItem.classList.add('dismissed-item');

                const checkboxId = `${category.replace(/\s+/g, '-')}-${index}`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = checkboxId;
                checkbox.dataset.uniqueId = uniqueId;
                checkbox.checked = savedCheckboxState.checked;
                checkbox.disabled = savedCheckboxState.dismissed;
                checkbox.className = 'item-checkbox h-5 w-5 rounded border-theme text-accent-primary ring-accent-primary mr-3 flex-shrink-0 bg-transparent';

                // Bag assignment button
                const bagBtn = document.createElement('button');
                const currentBag = (currentState.bags || {})[uniqueId] || '';
                bagBtn.className = 'bag-btn text-xs mr-2 flex-shrink-0 opacity-60 hover:opacity-100';
                bagBtn.textContent = currentBag ? bagIcons[currentBag] : '📍';
                bagBtn.title = currentBag ? `Bag: ${currentBag}` : 'Assign to bag';
                bagBtn.onclick = (e) => {
                    e.stopPropagation();
                    const currentIdx = bagOptions.indexOf(currentBag);
                    const nextBag = bagOptions[(currentIdx + 1) % (bagOptions.length + 1)] || '';
                    if (!currentState.bags) currentState.bags = {};
                    if (nextBag) {
                        currentState.bags[uniqueId] = nextBag;
                        bagBtn.textContent = bagIcons[nextBag];
                        bagBtn.title = `Bag: ${nextBag}`;
                    } else {
                        delete currentState.bags[uniqueId];
                        bagBtn.textContent = '📍';
                        bagBtn.title = 'Assign to bag';
                    }
                    saveState();
                };

                const label = document.createElement('label');
                label.htmlFor = checkboxId;
                label.className = 'item-label flex-grow cursor-pointer';

                let itemName = item.name;
                const computedQty = calculateQuantity(item);

                if (computedQty && computedQty > 1) {
                    const overrideQty = (currentState.quantities || {})[uniqueId];
                    const displayQty = overrideQty != null ? overrideQty : computedQty;
                    itemName += ` <span class="quantity-display">(x${displayQty})</span>`;
                }

                label.innerHTML = `<span class="transition-colors duration-200 text-primary">${itemName}</span>`;

                listItem.appendChild(checkbox);
                listItem.appendChild(bagBtn);
                listItem.appendChild(label);

                // Quantity stepper for items with quantityRule
                if (item.quantityRule || (item.quantity && item.quantity > 1)) {
                    const stepper = document.createElement('span');
                    stepper.className = 'quantity-stepper flex items-center gap-1 ml-2 flex-shrink-0';
                    const overrideQty = (currentState.quantities || {})[uniqueId];
                    const currentQty = overrideQty != null ? overrideQty : computedQty;

                    stepper.innerHTML = `
                        <button class="qty-btn qty-minus" data-uid="${uniqueId}" data-base="${computedQty}">−</button>
                        <span class="qty-value">${currentQty}</span>
                        <button class="qty-btn qty-plus" data-uid="${uniqueId}" data-base="${computedQty}">+</button>
                    `;
                    listItem.appendChild(stepper);
                }

                // Dismiss button for optional/muted items
                if (item.currentRelevance === 'optional' || item.currentRelevance === 'muted') {
                    const dismissBtn = document.createElement('button');
                    dismissBtn.innerHTML = '&#x2715;';
                    dismissBtn.className = 'text-xs text-secondary hover:text-primary ml-2 px-2 py-1 rounded flex-shrink-0';
                    dismissBtn.title = 'Not Needed';
                    dismissBtn.onclick = (e) => {
                        e.stopPropagation();
                        listItem.classList.toggle('dismissed-item');
                        checkbox.checked = false;
                        checkbox.disabled = listItem.classList.contains('dismissed-item');
                        updateAllProgress();
                    };
                    listItem.appendChild(dismissBtn);
                }

                // Delete button for custom items
                if (item.isCustom) {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = '🗑️';
                    deleteBtn.className = 'text-xs ml-2 px-1 py-1 rounded flex-shrink-0 opacity-60 hover:opacity-100';
                    deleteBtn.title = 'Remove custom item';
                    deleteBtn.onclick = (e) => {
                        e.stopPropagation();
                        const idx = currentState.customItems[category].indexOf(item.name);
                        if (idx > -1) currentState.customItems[category].splice(idx, 1);
                        renderAndSave();
                    };
                    listItem.appendChild(deleteBtn);
                }

                if (!savedCheckboxState.dismissed) {
                    catTotal++;
                    if (savedCheckboxState.checked) catChecked++;
                }

                checkbox.addEventListener('change', updateAllProgress);
                itemList.appendChild(listItem);
            });

            // Add custom item button
            const addItemLi = document.createElement('li');
            addItemLi.className = 'flex items-center p-2 rounded-lg';
            const addItemBtn = document.createElement('button');
            addItemBtn.className = 'add-item-btn text-sm text-secondary hover:text-primary flex items-center gap-1';
            addItemBtn.innerHTML = '<i data-lucide="plus-circle" class="w-4 h-4"></i> Add item';
            addItemBtn.onclick = (e) => {
                e.stopPropagation();
                const name = prompt(`Add item to "${category}":`);
                if (!name || !name.trim()) return;
                if (!currentState.customItems) currentState.customItems = {};
                if (!currentState.customItems[category]) currentState.customItems[category] = [];
                currentState.customItems[category].push(name.trim());
                renderAndSave();
            };
            addItemLi.appendChild(addItemBtn);
            itemList.appendChild(addItemLi);

            categoryCard.appendChild(itemList);
            checklistContainer.appendChild(categoryCard);

            totalProgress.total += catTotal;
            totalProgress.checked += catChecked;

            // Category collapse/expand
            categoryTitle.addEventListener('click', () => {
                categoryCard.classList.toggle('collapsed');
                const isCollapsed = categoryCard.classList.contains('collapsed');
                categoryCard.classList.toggle('expanded', !isCollapsed);
                categoryCard.querySelector('.category-progress-summary').style.display = isCollapsed ? 'inline' : 'none';
                if (!isCollapsed) {
                    categoryTitle.classList.add('mb-4', 'border-b', 'border-theme');
                } else {
                    categoryTitle.classList.remove('mb-4', 'border-b', 'border-theme');
                }
            });

            const isCollapsed = categoryCard.classList.contains('collapsed');
            categoryCard.classList.toggle('expanded', !isCollapsed);
            categoryCard.querySelector('.category-progress-summary').style.display = isCollapsed ? 'inline' : 'none';
        }

        // Quantity stepper event delegation
        checklistContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-minus') || e.target.classList.contains('qty-plus')) {
                e.stopPropagation();
                const uid = e.target.dataset.uid;
                const baseQty = parseInt(e.target.dataset.base, 10);
                if (!currentState.quantities) currentState.quantities = {};
                const current = currentState.quantities[uid] != null ? currentState.quantities[uid] : baseQty;
                const newQty = e.target.classList.contains('qty-plus') ? current + 1 : Math.max(1, current - 1);
                currentState.quantities[uid] = newQty;

                const stepper = e.target.closest('.quantity-stepper');
                stepper.querySelector('.qty-value').textContent = newQty;

                const li = e.target.closest('li');
                const qtySpan = li.querySelector('.quantity-display');
                if (qtySpan) qtySpan.textContent = `(x${newQty})`;

                saveState();
            }
        });

        updateAllProgress();
        lucide.createIcons();
    }

    function updateCategoryProgress(categoryCard) {
        const summaryEl = categoryCard.querySelector('.category-progress-summary');
        const badge = categoryCard.querySelector('.category-complete-badge');
        if (!summaryEl) return;

        const allCheckboxes = categoryCard.querySelectorAll('.item-checkbox:not(:disabled)');
        const checkedCheckboxes = categoryCard.querySelectorAll('.item-checkbox:checked:not(:disabled)');

        const total = allCheckboxes.length;
        const checked = checkedCheckboxes.length;
        summaryEl.textContent = `(${checked}/${total})`;

        if (total > 0 && checked === total) {
            categoryCard.classList.add('category-complete');
            badge.classList.remove('hidden');
        } else {
            categoryCard.classList.remove('category-complete');
            badge.classList.add('hidden');
        }
    }

    function updateAllProgress() {
        const allCheckboxes = document.querySelectorAll('.item-checkbox:not(:disabled)');
        const checkedCheckboxes = document.querySelectorAll('.item-checkbox:checked:not(:disabled)');

        if (allCheckboxes.length === 0) {
            progressBar.style.width = '100%';
            progressBar.textContent = 'All Set!';
            progressBar.parentElement.classList.add('hidden');
        } else {
            progressBar.parentElement.classList.remove('hidden');
            const percentage = Math.round((checkedCheckboxes.length / allCheckboxes.length) * 100);
            progressBar.style.width = `${percentage}%`;
            progressBar.textContent = `${percentage}%`;

            // "Don't forget" pulse on crucial unchecked items when near completion
            if (percentage >= 80) {
                document.querySelectorAll('.crucial-item').forEach(li => {
                    const cb = li.querySelector('.item-checkbox');
                    if (cb && !cb.checked && !cb.disabled) {
                        li.classList.add('pulse-reminder');
                    } else {
                        li.classList.remove('pulse-reminder');
                    }
                });
            } else {
                document.querySelectorAll('.pulse-reminder').forEach(el => el.classList.remove('pulse-reminder'));
            }
        }

        document.querySelectorAll('.category-card').forEach(card => updateCategoryProgress(card));
        saveState();
    }

    function renderAndSave() {
        renderChecklist();
        saveState();
    }

    // --- DARK MODE ---
    function toggleDarkMode() {
        currentState.darkMode = !currentState.darkMode;
        body.classList.toggle('dark-mode', currentState.darkMode);
        darkModeToggle.textContent = currentState.darkMode ? '☀️' : '🌙';
        saveState();
    }

    // --- INITIALIZATION ---
    loadState();
    createControlButtons(tripTypeControls, tripTypes, 'tripType', currentState.tripType);
    createControlButtons(seasonControls, seasons, 'season', currentState.season);
    renderSavedTripsDropdown();

    startDateInput.addEventListener('change', handleDateChange);
    endDateInput.addEventListener('change', handleDateChange);
    destinationInput.addEventListener('input', (e) => {
        currentState.destination = e.target.value;
        renderAndSave();
    });
    flightNumberInput.addEventListener('input', (e) => {
        currentState.flightNumber = e.target.value;
        saveState();
    });
    checkFlightBtn.addEventListener('click', () => {
        const flight = currentState.flightNumber.trim();
        if (flight) {
            window.open(`https://www.google.com/search?q=flight+${encodeURIComponent(flight)}`, '_blank');
        }
    });
    longFlightCheckbox.addEventListener('change', (e) => {
        currentState.longFlight = e.target.checked;
        renderAndSave();
    });
    laundryCheckbox.addEventListener('change', (e) => {
        currentState.laundry = e.target.checked;
        renderAndSave();
    });
    darkModeToggle.addEventListener('click', toggleDarkMode);
    resetBtn.addEventListener('click', resetAll);
    saveTripBtn.addEventListener('click', saveCurrentTrip);
    loadTripSelect.addEventListener('change', (e) => {
        if (e.target.value !== '') loadTrip(parseInt(e.target.value, 10));
    });
    deleteTripBtn.addEventListener('click', deleteTrip);

    let allExpanded = false;
    toggleAllBtn.addEventListener('click', () => {
        allExpanded = !allExpanded;
        document.querySelectorAll('.category-card').forEach(card => {
            const titleBtn = card.querySelector('button');
            if (allExpanded) {
                card.classList.remove('collapsed');
                card.classList.add('expanded');
                if (titleBtn) titleBtn.classList.add('mb-4', 'border-b', 'border-theme');
            } else {
                card.classList.add('collapsed');
                card.classList.remove('expanded');
                if (titleBtn) titleBtn.classList.remove('mb-4', 'border-b', 'border-theme');
            }
            const summary = card.querySelector('.category-progress-summary');
            if (summary) summary.style.display = allExpanded ? 'none' : 'inline';
        });
        toggleAllBtn.innerHTML = allExpanded
            ? '<i data-lucide="rows-3" class="w-4 h-4"></i> Collapse all'
            : '<i data-lucide="rows-3" class="w-4 h-4"></i> Expand all';
        lucide.createIcons();
    });

    updateTheme();
    handleDateChange();
});
