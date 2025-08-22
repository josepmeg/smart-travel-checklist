document.addEventListener('DOMContentLoaded', () => {

        // --- DATABASE OF ALL POSSIBLE ITEMS ---
        const allItems = [
            // Essentials & Documents
            { name: 'Passport / ID', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
            { name: 'Green Card', category: 'Essentials & Documents', relevance: { tripTypes: ['Business', 'Mix'] } },
            { name: 'Credit/Debit Cards', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
            { name: 'Cash / Foreign Currency', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
            { name: 'House Keys', category: 'Essentials & Documents', crucial: true, relevance: { default: 'recommended' } },
            { name: 'Travel Insurance Info', category: 'Essentials & Documents', relevance: { default: 'optional' } },
            { name: 'Visas (if needed)', category: 'Essentials & Documents', relevance: { default: 'optional' } },

            // Airport Outfit
            { name: 'Sweater / Fleece', category: 'Airport Outfit', relevance: { default: 'recommended' } },
            { name: 'Bandana / Scarf', category: 'Airport Outfit', relevance: { default: 'optional' } },
            { name: 'Underwear (for plane)', category: 'Airport Outfit', quantity: 2, relevance: { default: 'recommended' } },
            { name: 'Long Socks (for plane)', category: 'Airport Outfit', quantity: 2, relevance: { default: 'recommended' } },
            { name: 'Fanny Pack', category: 'Airport Outfit', relevance: { default: 'optional' } },

            // Clothing
            { name: 'Underwear', category: 'Clothing', quantityRule: 'days', relevance: { default: 'recommended' } },
            { name: 'Socks', category: 'Clothing', quantityRule: 'days', relevance: { default: 'recommended' } },
            { name: 'T-shirts / Polos', category: 'Clothing', quantityRule: 'days', relevance: { tripTypes: ['Trekking', 'Beach', 'City', 'Business', 'Mix'] } },
            { name: 'Linen Shirts', category: 'Clothing', quantityRule: 'linen', relevance: { seasons: ['Summer'] } },
            { name: 'Shirts (Formal)', category: 'Clothing', quantityRule: 'pants', relevance: { tripTypes: ['Business'] } },
            { name: 'Jeans / Long Pants', category: 'Clothing', quantityRule: 'pants', relevance: { tripTypes: ['Trekking', 'City', 'Business', 'Mix', 'Snow'] } },
            { name: 'Jacket', category: 'Clothing', relevance: { seasons: ['Winter', 'Shoulder'], tripTypes: ['Trekking', 'City', 'Business', 'Snow', 'Mix'] } },
            { name: 'Raincoat', category: 'Clothing', relevance: { tripTypes: ['Trekking', 'City', 'Mix'], seasons: ['Shoulder', 'Winter'] } },
            { name: 'Waterproof Pants', category: 'Clothing', relevance: { default: 'optional', tripTypes: ['Trekking', 'Snow'] } },
            { name: 'Shorts', category: 'Clothing', quantityRule: 'pants', relevance: { seasons: ['Summer'] } },
            { name: 'Swimsuit', category: 'Clothing', relevance: { default: 'optional', tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
            { name: 'Pajamas', category: 'Clothing', relevance: { default: 'optional' } },
            { name: 'Nice Outfit (Dining)', category: 'Clothing', quantity: 1, relevance: { default: 'optional', tripTypes: ['City', 'Business', 'Beach', 'Mix'] } },
            { name: 'Gym Clothes', category: 'Clothing', relevance: { default: 'optional' } },
            { name: 'Thermic Shirt', category: 'Clothing', relevance: { seasons: ['Winter'] } },
            { name: 'Thermic Pants', category: 'Clothing', relevance: { seasons: ['Winter'] } },
            { name: 'Snow Jacket & Pants', category: 'Clothing', relevance: { tripTypes: ['Snow'] } },
            { name: 'Hat (Winter)', category: 'Clothing', relevance: { seasons: ['Winter'] } },
            { name: 'Gloves', category: 'Clothing', relevance: { seasons: ['Winter'] } },

            // Shoes
            { name: 'Sneakers', category: 'Shoes', relevance: { tripTypes: ['City', 'Business', 'Mix'] } },
            { name: 'Casual Shoes', category: 'Shoes', relevance: { default: 'optional', tripTypes: ['City', 'Business', 'Mix'] } },
            { name: 'Hiking Boots', category: 'Shoes', relevance: { tripTypes: ['Trekking'] } },
            { name: 'Sandals', category: 'Shoes', relevance: { tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
            { name: 'Flip Flops', category: 'Shoes', relevance: { tripTypes: ['Beach', 'Mix'], seasons: ['Summer'] } },
            { name: 'Work Shoes', category: 'Shoes', relevance: { tripTypes: ['Business'] } },
            { name: 'Snow Boots', category: 'Shoes', relevance: { tripTypes: ['Snow'] } },

            // Electronics
            { name: 'Phone & Charger', category: 'Electronics', crucial: true, relevance: { default: 'recommended' } },
            { name: 'Airpods & Charger', category: 'Electronics', relevance: { default: 'recommended' } },
            { name: 'External Battery (Power Bank)', category: 'Electronics', relevance: { default: 'recommended' } },
            { name: 'Laptop & Charger', category: 'Electronics', relevance: { tripTypes: ['Business', 'Mix'] } },
            { name: 'E-book / Book', category: 'Electronics', relevance: { default: 'optional' } },
            { name: 'Headphones (Wired)', category: 'Electronics', relevance: { longFlight: true } },
            { name: 'Travel Adapter', category: 'Electronics', relevance: { default: 'recommended' } },
            { name: 'Nintendo Switch & Charger', category: 'Electronics', relevance: { longFlight: true } },
            
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

            // Final Packing & Checks
            { name: 'Check Weather Forecast', category: 'Final Packing & Checks', crucial: true, relevance: { default: 'recommended' } },
            { name: 'Iron shirts', category: 'Final Packing & Checks', relevance: { default: 'optional' } },
            { name: 'Pack snacks for flight', category: 'Final Packing & Checks', relevance: { longFlight: true } },
            { name: 'Charge Phone', category: 'Final Packing & Checks', relevance: { default: 'recommended' } },
            { name: 'Charge AirPods', category: 'Final Packing & Checks', relevance: { default: 'recommended' } },
            { name: 'Charge E-Book', category: 'Final Packing & Checks', relevance: { default: 'optional' } },
            { name: 'Charge Power Bank', category: 'Final Packing & Checks', relevance: { default: 'recommended' } },
            { name: 'Charge Nintendo Switch', category: 'Final Packing & Checks', relevance: { longFlight: true } },
            { name: 'Download offline maps/media', category: 'Final Packing & Checks', relevance: { default: 'recommended' } },
            { name: 'Check-in for flight', category: 'Final Packing & Checks', relevance: { default: 'recommended' } },
            { name: 'Notify bank of travel', category: 'Final Packing & Checks', relevance: { default: 'optional' } },
        ];

        const tripTypes = ['City', 'Beach', 'Trekking', 'Business', 'Snow', 'Mix'];
        const seasons = ['Summer', 'Shoulder', 'Winter'];
        const categories = [ 'Essentials & Documents', 'Airport Outfit', 'Clothing', 'Shoes', 'Electronics', 'Toiletries & Health', 'Miscellaneous', 'Pre-Trip Grooming', 'Final Packing & Checks', 'Destination Tips' ];
        const categoryIcons = {
            'Essentials & Documents': 'alarm-clock',
            'Airport Outfit': 'plane-takeoff',
            'Clothing': 'shirt',
            'Shoes': 'footprints',
            'Electronics': 'plug-zap',
            'Toiletries & Health': 'spray-can',
            'Miscellaneous': 'box',
            'Pre-Trip Grooming': 'scissors',
            'Final Packing & Checks': 'clipboard-check',
            'Destination Tips': 'globe'
        };
        const themeMap = { City: 'theme-city', Beach: 'theme-beach', Trekking: 'theme-trekking', Business: 'theme-city', Snow: 'theme-snow', Mix: 'theme-trekking' };

        const tripTypeControls = document.getElementById('trip-type-controls');
        const seasonControls = document.getElementById('season-controls');
        const startDateInput = document.getElementById('start-date-input');
        const endDateInput = document.getElementById('end-date-input');
        const durationDisplay = document.getElementById('duration-display');
        const destinationInput = document.getElementById('destination-input');
        const longFlightCheckbox = document.getElementById('long-flight-checkbox');
        const checklistContainer = document.getElementById('checklist-container');
        const progressBar = document.getElementById('progress-bar');
        const body = document.body;

        const defaultState = { tripType: 'City', season: 'Shoulder', days: 0, startDate: '', endDate: '', longFlight: false, destination: '', checkboxes: {} };
        let currentState = { ...defaultState };

        // --- STATE MANAGEMENT FUNCTIONS ---
        function saveState() {
            // Get checkbox states
            const checkboxStates = {};
            document.querySelectorAll('.item-checkbox').forEach(cb => {
                const uniqueId = cb.dataset.uniqueId;
                const listItem = cb.closest('li');
                if (uniqueId) {
                    checkboxStates[uniqueId] = {
                        checked: cb.checked,
                        dismissed: listItem.classList.contains('dismissed-item')
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
                
                // Restore UI controls
                startDateInput.value = currentState.startDate || '';
                endDateInput.value = currentState.endDate || '';
                destinationInput.value = currentState.destination || '';
                longFlightCheckbox.checked = currentState.longFlight || false;

                // Set active buttons
                tripTypeControls.querySelectorAll('.control-btn').forEach(btn => btn.classList.toggle('selected', btn.dataset.value === currentState.tripType));
                seasonControls.querySelectorAll('.control-btn').forEach(btn => btn.classList.toggle('selected', btn.dataset.value === currentState.season));
            }
        }


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
            Object.values(themeMap).forEach(themeClass => body.classList.remove(themeClass));
            const theme = themeMap[currentState.tripType] || '';
            if (theme) body.classList.add(theme);
        }

        function getSeasonFromDate(date) {
            const month = date.getMonth(); // 0-11
            if (month >= 2 && month <= 4) return 'Shoulder'; // Spring
            if (month >= 5 && month <= 7) return 'Summer';
            if (month >= 8 && month <= 10) return 'Shoulder'; // Fall
            return 'Winter'; // Dec, Jan, Feb
        }

        function handleDateChange() {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            
            currentState.startDate = startDateInput.value;
            currentState.endDate = endDateInput.value;

            if (startDateInput.value && endDateInput.value && endDate >= startDate) {
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
                currentState.days = diffDays;
                durationDisplay.textContent = diffDays;

                // Auto-select season
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

        function getItemRelevance(item) {
            const { relevance } = item;
            const { tripType, season, longFlight } = currentState;
            
            const effectiveTripTypes = tripType === 'Mix' ? ['Trekking', 'Beach', 'City', 'Mix'] : [tripType];
            
            if (relevance.longFlight && longFlight) return 'recommended';
            if (relevance.tripTypes && relevance.tripTypes.some(t => effectiveTripTypes.includes(t))) return 'recommended';
            if (relevance.seasons && relevance.seasons.includes(season)) return 'recommended';
            
            return relevance.default || 'hidden';
        }

        function renderChecklist() {
            checklistContainer.innerHTML = '';
            
            const itemsToRender = allItems.map(item => {
                return { ...item, currentRelevance: getItemRelevance(item) };
            }).filter(item => item.currentRelevance !== 'hidden');

            const groupedItems = categories.reduce((acc, category) => {
                const itemsInCategory = itemsToRender.filter(item => item.category === category);
                if (itemsInCategory.length > 0) acc[category] = itemsInCategory;
                return acc;
            }, {});

            // Special handling for Destination Tips
            if (currentState.destination) {
                groupedItems['Destination Tips'] = [
                    { name: `Check visa requirements for ${currentState.destination}`, crucial: true },
                    { name: `Check power outlet type for ${currentState.destination}`, crucial: true },
                    { name: `Check must-see attractions`, crucial: false },
                    { name: `Check restaurants/reservations`, crucial: false },
                    { name: `Check local transportation options`, crucial: false },
                ];
            } else {
                delete groupedItems['Destination Tips'];
            }

            for (const category in groupedItems) {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card bg-card p-5 rounded-xl shadow-lg border border-theme collapsed';
                
                const categoryTitle = document.createElement('button');
                categoryTitle.className = 'w-full text-left text-xl font-semibold mb-0 pb-2 accent-primary-text flex justify-between items-center';
                
                const titleText = document.createElement('span');
                titleText.className = 'category-title-text';
                titleText.innerHTML = `<i data-lucide="${categoryIcons[category] || 'box'}" class="w-5 h-5"></i>${category}`;
                
                const titleChevrons = document.createElement('span');
                titleChevrons.innerHTML = `<span class="text-sm font-normal text-secondary mr-2 category-progress-summary"></span><i data-lucide="chevron-down" class="w-5 h-5 chevron-icon"></i>`;

                categoryTitle.appendChild(titleText);
                categoryTitle.appendChild(titleChevrons);
                
                categoryCard.appendChild(categoryTitle);

                const itemList = document.createElement('ul');
                itemList.className = 'space-y-3 category-item-list';

                groupedItems[category].forEach((item, index) => {
                    const uniqueId = `${item.name}-${category}`;
                    const savedCheckboxState = currentState.checkboxes[uniqueId] || { checked: false, dismissed: false };

                    const listItem = document.createElement('li');
                    listItem.className = `flex items-center p-2 rounded-lg transition-all duration-200`;
                    if (item.crucial) listItem.classList.add('crucial-item');
                    if (item.currentRelevance === 'optional') listItem.classList.add('optional-item');
                    if (savedCheckboxState.dismissed) listItem.classList.add('dismissed-item');

                    const checkboxId = `${category.replace(/\s+/g, '-')}-${index}`;
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = checkboxId;
                    checkbox.dataset.uniqueId = uniqueId;
                    checkbox.checked = savedCheckboxState.checked;
                    checkbox.disabled = savedCheckboxState.dismissed;
                    checkbox.className = 'item-checkbox h-5 w-5 rounded border-theme text-accent-primary ring-accent-primary mr-4 flex-shrink-0 bg-transparent';
                    
                    const label = document.createElement('label');
                    label.htmlFor = checkboxId;
                    label.className = 'item-label flex-grow cursor-pointer';

                    let itemName = item.name;
                    if (item.quantity) {
                        itemName += ` (x${item.quantity})`;
                    } else if (item.quantityRule) {
                        const days = parseInt(currentState.days, 10);
                        let quantity = 1;
                        if (item.quantityRule === 'days') quantity = days > 0 ? days : 1;
                        else if (item.quantityRule === 'pants') quantity = Math.max(1, Math.ceil(days / 2.5));
                        else if (item.quantityRule === 'linen') {
                            if (days >= 10) quantity = 3;
                            else if (days >= 5) quantity = 2;
                            else quantity = 1;
                        }
                        itemName += ` (x${quantity})`;
                    }

                    label.innerHTML = `<span class="transition-colors duration-200 text-primary">${itemName}</span>`;
                    
                    listItem.appendChild(checkbox);
                    listItem.appendChild(label);

                    if (item.currentRelevance === 'optional') {
                        const dismissBtn = document.createElement('button');
                        dismissBtn.innerHTML = '&#x2715;'; // X mark
                        dismissBtn.className = 'text-xs text-secondary hover:text-primary ml-2 px-2 py-1 rounded';
                        dismissBtn.title = 'Not Needed';
                        dismissBtn.onclick = (e) => {
                            e.stopPropagation(); // Prevent card from collapsing
                            listItem.classList.toggle('dismissed-item');
                            checkbox.checked = false;
                            checkbox.disabled = listItem.classList.contains('dismissed-item');
                            updateAllProgress();
                        };
                        listItem.appendChild(dismissBtn);
                    }
                    
                    checkbox.addEventListener('change', updateAllProgress);
                    itemList.appendChild(listItem);
                });

                categoryCard.appendChild(itemList);
                checklistContainer.appendChild(categoryCard);

                categoryTitle.addEventListener('click', () => {
                    categoryCard.classList.toggle('collapsed');
                    const isCollapsed = categoryCard.classList.contains('collapsed');
                    categoryCard.querySelector('.category-progress-summary').style.display = isCollapsed ? 'inline' : 'none';
                    if (!isCollapsed) {
                       categoryTitle.classList.add('mb-4', 'border-b', 'border-theme');
                    } else {
                       categoryTitle.classList.remove('mb-4', 'border-b', 'border-theme');
                    }
                });
                // Initial state update
                const isCollapsed = categoryCard.classList.contains('collapsed');
                categoryCard.querySelector('.category-progress-summary').style.display = isCollapsed ? 'inline' : 'none';
                if (!isCollapsed) {
                    categoryTitle.classList.add('mb-4', 'border-b', 'border-theme');
                }
            }
            updateAllProgress();
            lucide.createIcons(); // Render all icons
        }
        
        function updateCategoryProgress(categoryCard) {
            const summaryEl = categoryCard.querySelector('.category-progress-summary');
            if (!summaryEl) return;

            const allCheckboxes = categoryCard.querySelectorAll('.item-checkbox:not(:disabled)');
            const checkedCheckboxes = categoryCard.querySelectorAll('.item-checkbox:checked:not(:disabled)');
            
            summaryEl.textContent = `(${checkedCheckboxes.length}/${allCheckboxes.length})`;
        }

        function updateAllProgress() {
            // Update main progress bar
            const allCheckboxes = document.querySelectorAll('.item-checkbox:not(:disabled)');
            if (allCheckboxes.length === 0) {
                 progressBar.style.width = '100%';
                 progressBar.textContent = 'All Set!';
                 progressBar.parentElement.classList.add('hidden');
            } else {
                progressBar.parentElement.classList.remove('hidden');
                const checkedCheckboxes = document.querySelectorAll('.item-checkbox:checked:not(:disabled)');
                const percentage = Math.round((checkedCheckboxes.length / allCheckboxes.length) * 100);
                progressBar.style.width = `${percentage}%`;
                progressBar.textContent = `${percentage}%`;
            }

            // Update each category's progress summary
            document.querySelectorAll('.category-card').forEach(card => updateCategoryProgress(card));
            saveState(); // Save state on every progress update
        }
        
        function renderAndSave() {
            renderChecklist();
            saveState();
        }

        // --- INITIALIZATION ---
        loadState();
        createControlButtons(tripTypeControls, tripTypes, 'tripType', currentState.tripType);
        createControlButtons(seasonControls, seasons, 'season', currentState.season);
        startDateInput.addEventListener('change', handleDateChange);
        endDateInput.addEventListener('change', handleDateChange);
        destinationInput.addEventListener('input', (e) => {
            currentState.destination = e.target.value;
            renderAndSave();
        });
        longFlightCheckbox.addEventListener('change', (e) => {
            currentState.longFlight = e.target.checked;
            renderAndSave();
        });

        updateTheme();
        handleDateChange(); // Initial calculation and render
    });
